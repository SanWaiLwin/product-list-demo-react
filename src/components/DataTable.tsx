import React, { useMemo, useState, useEffect } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

type Column = {
  key: string;
  header: React.ReactNode;
  sortable?: boolean;
  sortKey?: string;
  render: (row: any) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  selectable?: boolean;
  selectedIds?: number[];
  onSelectAll?: () => void;
  onSelectRow?: (id: number) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (key: string) => void;
  // Client-side filtering
  enableFiltering?: boolean;
  filterText?: string;
  onFilterTextChange?: (text: string) => void;
  filterKeys?: string[]; // keys in row object used for filtering
  // Client-side pagination
  enablePagination?: boolean;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  // Multi-column sorting (client-side)
  enableMultiSort?: boolean;
  // Expandable rows
  expandable?: boolean;
  expandedRowId?: string | null;
  onToggleExpand?: (id: string) => void;
  expandedRowRender?: (row: any) => React.ReactNode;
  // Compact layout to reduce horizontal overflow
  compact?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  selectable = false,
  selectedIds = [],
  onSelectAll,
  sortBy: controlledSortBy,
  sortOrder: controlledSortOrder = 'asc',
  onSortChange,
  enableFiltering = false,
  filterText: controlledFilterText,
  onFilterTextChange,
  filterKeys,
  enablePagination = false,
  page: controlledPage,
  pageSize: controlledPageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  enableMultiSort = true,
  // expandable rows props
  expandable = false,
  expandedRowId,
  onToggleExpand,
  expandedRowRender,
  // compact layout
  compact = false,
}) => {
  const [internalSortBy, setInternalSortBy] = useState<string | undefined>(undefined);
  const [internalSortOrder, setInternalSortOrder] = useState<'asc' | 'desc'>('asc');
  const [internalFilterText, setInternalFilterText] = useState('');
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  // Expanded row local state (uncontrolled)
  const [internalExpandedId, setInternalExpandedId] = useState<string | null>(null);
  // Determine effective expanded id to support controlled/uncontrolled usage
  const effectiveExpandedId = expandedRowId ?? internalExpandedId;

  const sortBy = controlledSortBy ?? internalSortBy;
  const sortOrder = controlledSortOrder ?? internalSortOrder;
  const allSelected = data.length > 0 && selectedIds.length === data.length;

  const effectiveFilterText = enableFiltering
    ? (controlledFilterText ?? internalFilterText)
    : '';

  const effectivePage = enablePagination
    ? (controlledPage ?? internalPage)
    : 1;
  const effectivePageSize = enablePagination
    ? (controlledPageSize ?? internalPageSize)
    : data.length || 10;

  const computedFilterKeys = filterKeys && filterKeys.length > 0
    ? filterKeys
    : columns
        .map((c) => c.sortKey || c.key)
        .filter((k) => k && k !== 'select');

  // Build TanStack columns for sorting/filtering (client-side)
  const tanstackColumns = useMemo<ColumnDef<any, any>[]>(() => {
    return columns.map((col) => {
      const id = col.sortKey || col.key;
      return {
        id,
        header: col.header,
        // Use accessorFn for sortable columns; non-sortable will still be present
        accessorFn: (row) => {
          const v = row[id as keyof typeof row];
          if (typeof v === 'string') {
            // If the value is numeric-like (digits only), sort numerically
            if (/^\d+$/.test(v)) {
              return Number(v);
            }
            // Otherwise sort case-insensitively
            return v.toLowerCase();
          }
          return v;
        },
        enableSorting: !!col.sortable,
      } as ColumnDef<any, any>;
    });
    // Note: the actual cell rendering still uses the provided `render` function below
  }, [columns]);

  useEffect(() => {
    if (!onSortChange && sortBy) {
      setSorting([{ id: sortBy, desc: sortOrder === 'desc' }]);
    }
  }, [sortBy, sortOrder, onSortChange]);

  // Compute sorting state for the table, honoring controlled props when provided
  const sortingStateForTable = useMemo<SortingState>(() => {
    if (onSortChange) {
      if (controlledSortBy) {
        return [{ id: controlledSortBy, desc: (controlledSortOrder || 'asc') === 'desc' }];
      }
      return [];
    }
    return sorting;
  }, [onSortChange, controlledSortBy, controlledSortOrder, sorting]);

  const table = useReactTable({
    data,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sortingStateForTable,
      globalFilter: effectiveFilterText,
    },
    onSortingChange: onSortChange ? undefined : setSorting,
    globalFilterFn: (row, _columnId, filterValue) => {
      const q = String(filterValue ?? '').toLowerCase();
      if (!q) return true;
      return computedFilterKeys.some((key) => {
        const value = String(row.original?.[key as keyof typeof row.original] ?? '').toLowerCase();
        return value.includes(q);
      });
    },
    enableMultiSort: enableMultiSort,
  });

  const processedData = useMemo(() => {
    // Use TanStack to get filtered/sorted rows
    let rows = table.getRowModel().rows.map((r) => r.original);

    // Pagination (client-side)
    if (enablePagination) {
      const startIndex = (effectivePage - 1) * effectivePageSize;
      const endIndex = startIndex + effectivePageSize;
      rows = rows.slice(startIndex, endIndex);
    }

    return rows;
  }, [table, data, effectiveFilterText, enablePagination, effectivePage, effectivePageSize, sortingStateForTable]);

  const totalAfterFilter = useMemo(() => {
    if (!enableFiltering || !effectiveFilterText.trim()) return data.length;
    const q = effectiveFilterText.toLowerCase();
    return data.filter((row) => {
      return computedFilterKeys.some((key) => {
        const value = String(row[key as keyof typeof row] ?? '').toLowerCase();
        return value.includes(q);
      });
    }).length;
  }, [data, enableFiltering, effectiveFilterText, computedFilterKeys]);

  const totalPages = enablePagination
    ? Math.max(1, Math.ceil(totalAfterFilter / effectivePageSize))
    : 1;

  const handleHeaderClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    colKey: string
  ) => {
    const isMulti = enableMultiSort && e.shiftKey;
    if (!onSortChange) {
      const currentSorting = table.getState().sorting;
      if (isMulti) {
        const existingIndex = currentSorting.findIndex((s) => s.id === colKey);
        let nextSorting = [...currentSorting];
        if (existingIndex >= 0) {
          const existing = nextSorting[existingIndex];
          nextSorting[existingIndex] = { id: colKey, desc: !existing.desc };
        } else {
          nextSorting.push({ id: colKey, desc: false });
        }
        setSorting(nextSorting);
        setInternalSortBy(colKey);
        const colEntry = nextSorting.find((s) => s.id === colKey);
        setInternalSortOrder(colEntry?.desc ? 'desc' : 'asc');
      } else {
        const current = currentSorting[0];
        if (current && current.id === colKey) {
          const newDesc = !current.desc;
          setSorting([{ id: colKey, desc: newDesc }]);
          setInternalSortOrder(newDesc ? 'desc' : 'asc');
        } else {
          setSorting([{ id: colKey, desc: false }]);
          setInternalSortBy(colKey);
          setInternalSortOrder('asc');
        }
      }
    } else {
      onSortChange(colKey);
    }
  };

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onFilterTextChange) onFilterTextChange(val);
    else setInternalFilterText(val);
    // Reset to first page when filter changes
    if (enablePagination) {
      if (onPageChange) onPageChange(1);
      else setInternalPage(1);
    }
  };

  const changePage = (nextPage: number) => {
    if (onPageChange) onPageChange(nextPage);
    else setInternalPage(nextPage);
  };

  const changePageSize = (size: number) => {
    if (onPageSizeChange) onPageSizeChange(size);
    else setInternalPageSize(size);
    // Reset to first page when page size changes
    if (enablePagination) {
      if (onPageChange) onPageChange(1);
      else setInternalPage(1);
    }
  };
  // Row click handler to toggle expansion; ignore clicks from interactive elements
  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, rowId: string) => {
    if (!expandable) return;
    const target = e.target as HTMLElement;
    if (target && (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('svg'))) {
      return;
    }
    if (onToggleExpand) onToggleExpand(rowId);
    else setInternalExpandedId((prev) => (prev === rowId ? null : rowId));
  };

  return (
    <div className="">
      {enableFiltering && (
        <div className="mb-3">
          <input
            type="text"
            value={effectiveFilterText}
            onChange={handleFilterInput}
            placeholder="Filter rows..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      <table className="min-w-full table-fixed divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => {
              const colKey = col.sortKey || col.key;
              const sortingState = table.getState().sorting;
              const isSorted = onSortChange
                ? (controlledSortBy || internalSortBy) === colKey
                : sortingState.some((s) => s.id === colKey);
              const showSortIcon = col.sortable;
              const isDesc = onSortChange
                ? (controlledSortOrder || internalSortOrder) === 'desc'
                : !!sortingState.find((s) => s.id === colKey)?.desc;

              return (
                <th
                  key={col.key}
                  scope="col"
                  className={
                    col.headerClassName ||
                    'px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  }
                >
                  {col.key === 'select' && selectable && onSelectAll ? (
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={onSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      aria-label="Select all rows"
                    />
                  ) : (
                    <button
                      type="button"
                      title={enableMultiSort ? 'Click to sort. Shift+Click to add multi-sort.' : 'Click to sort.'}
                      className={
                        showSortIcon
                          ? 'inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer'
                          : 'text-gray-700'
                      }
                      onClick={(e) => {
                        if (col.sortable) {
                          handleHeaderClick(e, colKey);
                        }
                      }}
                      disabled={!col.sortable}
                    >
                      <span>{col.header}</span>
                      {showSortIcon && (
                        isSorted ? (
                          isDesc ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : (
                            <ArrowUp className="h-4 w-4" />
                          )
                        ) : (
                          <ArrowUpDown className="h-4 w-4 text-gray-600" />
                        )
                      )}
                    </button>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-2 text-center text-sm text-gray-500">
                Loading...
              </td>
            </tr>
          ) : processedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-2 text-center text-sm text-gray-500">
                No data
              </td>
            </tr>
          ) : (
            processedData.map((row) => (
              // Wrap row + expanded row together
              <React.Fragment key={row.id}>
                <tr className="hover:bg-gray-50" onClick={(e) => handleRowClick(e, row.id)}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={col.cellClassName || 'px-3 py-2 whitespace-normal break-words text-sm text-gray-900'}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
                {expandable && expandedRowRender && effectiveExpandedId === row.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={columns.length} className="px-3 py-2">
                      {expandedRowRender(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {enablePagination && (
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Page {effectivePage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={effectivePageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="rounded-md border border-gray-300 px-2 py-1 text-sm"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt} / page</option>
              ))}
            </select>
            <div className="flex items-center gap-1">
              <button
                onClick={() => changePage(Math.max(1, effectivePage - 1))}
                disabled={effectivePage === 1 || loading}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => changePage(Math.min(totalPages, effectivePage + 1))}
                disabled={effectivePage === totalPages || loading}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;