import React, { useEffect } from 'react';
import DataTable from '@/components/DataTable';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash } from 'lucide-react';
import { useProductStore } from '@/stores/productStore';
import { Product } from '@/types';
import { toast } from 'sonner';

const ProductList: React.FC = () => {
  const products = useProductStore((s) => s.products);
  const loadingState = useProductStore((s) => s.loadingState);
  const error = useProductStore((s) => s.error);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const deleteProduct = useProductStore((s) => s.deleteProduct);

  useEffect(() => {
    fetchProducts({ page: 1, limit: 1000 });
    // Avoid dependency on unstable function identity to prevent loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeQuantity = async (id: string, delta: number) => {
    try {
      const current = products.find(p => p.id === id);
      if (!current) return;
      const next = Math.max(0, current.quantity + delta);
      await updateProduct(id, { quantity: next });
      toast.success(delta > 0 ? 'Quantity increased' : 'Quantity reduced');
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const removeProduct = async (id: string) => {
    try {
      const current = products.find(p => p.id === id);
      if (!current) return;
      if (current.quantity !== 0) {
        toast.error('Quantity must be 0 to remove');
        return;
      }
      const ok = window.confirm('Remove this product from the listing?');
      if (!ok) return;
      await deleteProduct(id);
      toast.success('Product removed');
    } catch {
      toast.error('Failed to remove product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Product Listing</h1>
            <Link to="/add" className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Products</h2>
          </div>

          <div className="px-6 py-4">
            {error && (
              <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            <DataTable
              columns={[
                {
                  key: 'name',
                  header: 'Product Name',
                  sortable: true,
                  render: (row: Product) => (
                    <span className="text-gray-900">{row.name}</span>
                  ),
                },
                {
                  key: 'description',
                  header: 'Description',
                  sortable: true,
                  render: (row: Product) => (
                    <span className="text-gray-900">{row.description}</span>
                  ),
                },
                {
                  key: 'quantity',
                  header: 'Quantity',
                  sortable: true,
                  render: (row: Product) => (
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        disabled={loadingState === 'loading'}
                        onClick={() => changeQuantity(row.id, -1)}
                        className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50"
                        aria-label="Decrease quantity"
                        title="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-gray-900 min-w-[2rem] text-center">{row.quantity}</span>
                      <button
                        type="button"
                        disabled={loadingState === 'loading'}
                        onClick={() => changeQuantity(row.id, 1)}
                        className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50"
                        aria-label="Increase quantity"
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  ),
                },
                {
                  key: 'actions',
                  header: 'Actions',
                  sortable: false,
                  render: (row: Product) => (
                    <div className="flex items-center gap-3">
                      <Link to={`/${row.id}/edit`} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Link>
                      {row.quantity === 0 && (
                        <button
                          type="button"
                          disabled={loadingState === 'loading'}
                          onClick={() => removeProduct(row.id)}
                          className="inline-flex items-center px-2 py-1 border border-red-300 text-red-700 rounded-md text-sm bg-white hover:bg-red-50"
                          title="Remove product"
                        >
                          <Trash className="h-4 w-4 mr-1" /> Remove
                        </button>
                      )}
                    </div>
                  ),
                },
              ]}
              data={products as Product[]}
              loading={loadingState === 'loading'}
              enableFiltering
              filterKeys={['name', 'description']}
              enablePagination
              pageSize={10}
              pageSizeOptions={[10, 25, 50]}
              enableMultiSort
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
