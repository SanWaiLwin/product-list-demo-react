import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Download,
  Upload,
  Users,
  RefreshCw
} from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { useAuthStore } from '../stores/authStore';
import { User } from '../types';
import { cn, formatDate, debounce, capitalizeFirst } from '../lib/utils';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import DataTable from '@/components/DataTable';
import { toast } from 'sonner';

export const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();
  const {
    users,
    editingUser,
    totalUsers,
    currentPage,
    totalPages,
    loadingState,
    error,
    selectedUsers,
    fetchUsers,
    deleteUser,
    bulkDeleteUsers,
    bulkUpdateUserStatus,
    setSelectedUsers,
    clearError,
    toggleUserSelection,
    selectAllUsers,
  } = useUserStore(
    (state) => ({
      users: state.users,
      editingUser: state.editingUser,
      totalUsers: state.totalUsers,
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      loadingState: state.loadingState,
      error: state.error,
      selectedUsers: state.selectedUsers,
      fetchUsers: state.fetchUsers,
      deleteUser: state.deleteUser,
      bulkDeleteUsers: state.bulkDeleteUsers,
      bulkUpdateUserStatus: state.bulkUpdateUserStatus,
      setSelectedUsers: state.setSelectedUsers,
      clearError: state.clearError,
      toggleUserSelection: state.toggleUserSelection,
      selectAllUsers: state.selectAllUsers,
    })
  );

  const PAGE_LIMIT = 10; const USE_DATATABLE_PAGINATION = true;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'created_at' | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const isLoading = loadingState === 'loading';

  useEffect(() => {
    fetchUsers({
      page: 1,
      limit: PAGE_LIMIT,
      search: searchTerm,
      status: statusFilter === 'all' ? undefined : statusFilter,
      role: roleFilter === 'all' ? undefined : roleFilter,
      sortBy,
      sortOrder,
    });
  }, [fetchUsers, searchTerm, statusFilter, roleFilter, sortBy, sortOrder]);

  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  const handlePageChange = (page: number) => {
    fetchUsers({
      page,
      limit: PAGE_LIMIT,
      search: searchTerm,
      status: statusFilter === 'all' ? undefined : statusFilter,
      role: roleFilter === 'all' ? undefined : roleFilter,
      sortBy,
      sortOrder,
    });
  };

  const handleSortChange = (key: string) => {
    if (sortBy === key) {
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
      fetchUsers({
        page: currentPage || 1,
        limit: PAGE_LIMIT,
        search: searchTerm,
        status: statusFilter === 'all' ? undefined : statusFilter,
        role: roleFilter === 'all' ? undefined : roleFilter,
        sortBy: key as 'name' | 'email' | 'created_at',
        sortOrder: newOrder,
      });
    } else {
      setSortBy(key as 'name' | 'email' | 'created_at');
      setSortOrder('asc');
      fetchUsers({
        page: currentPage || 1,
        limit: PAGE_LIMIT,
        search: searchTerm,
        status: statusFilter === 'all' ? undefined : statusFilter,
        role: roleFilter === 'all' ? undefined : roleFilter,
        sortBy: key as 'name' | 'email' | 'created_at',
        sortOrder: 'asc',
      });
    }
  };

  const handleSelectUser = (id: number) => {
    toggleUserSelection(id);
  };

  const handleSelectAll = () => {
    selectAllUsers();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      toast.success('User deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      toast.error(message);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await bulkDeleteUsers(selectedUsers);
      toast.success('Selected users deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete selected users';
      toast.error(message);
    }
  };

  const handleBulkStatusUpdate = async (status: 'active' | 'inactive') => {
    try {
      await bulkUpdateUserStatus(selectedUsers, status);
      toast.success(`Selected users ${status === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status for selected users';
      toast.error(message);
    }
  };

  const handleRetry = () => {
    fetchUsers({
      page: currentPage || 1,
      limit: PAGE_LIMIT,
      search: searchTerm,
      status: statusFilter === 'all' ? undefined : statusFilter,
      role: roleFilter === 'all' ? undefined : roleFilter,
      sortBy,
      sortOrder,
    });
  };

  const isAdmin = currentUser?.role === 'admin';

  // Show error state
  if (error && !isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">Manage and organize your users</p>
        </div>
        
        <ErrorMessage
          title="Failed to load users"
          message={error}
          onDismiss={handleRetry}
          className="max-w-2xl"
        />
        
        <div className="mt-6">
          <button
            onClick={handleRetry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">Manage and organize your users</p>
        </div>
        {isAdmin && (
          <div className="mt-4 sm:mt-0">
            <Link
              to="/users/add"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6">
          <ErrorMessage
            title="Error"
            message={error}
            onDismiss={() => clearError()}
            variant="error"
          />
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="search"
                placeholder="Search users..."
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as 'all' | 'admin' | 'user')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRetry}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {isAdmin && selectedUsers.length > 0 && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-blue-700">
              {selectedUsers.length} user(s) selected
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkStatusUpdate('active')}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserCheck className="h-3 w-3 mr-1" />
                Activate
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('inactive')}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserX className="h-3 w-3 mr-1" />
                Deactivate
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" text="Loading users..." />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' || roleFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding a new user.'}
            </p>
            {isAdmin && !searchTerm && statusFilter === 'all' && roleFilter === 'all' && (
              <div className="mt-6">
                <Link
                  to="/users/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <DataTable
                columns={[
                  // Admin selection checkbox column
                  ...(isAdmin ? [{
                    key: 'select',
                    header: '',
                    sortable: false,
                    render: (user: User) => (
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    ),
                  }] : []),
                  {
                    key: 'user',
                    header: 'User',
                    sortable: true,
                    sortKey: 'name',
                    render: (user: User) => (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'role',
                    header: 'Role',
                    sortable: false,
                    render: (user: User) => (
                      <span className={cn(
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      )}>
                        {capitalizeFirst(user.role)}
                      </span>
                    ),
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    sortable: false,
                    render: (user: User) => (
                      <span className={cn(
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      )}>
                        {capitalizeFirst(user.status)}
                      </span>
                    ),
                  },
                  {
                    key: 'created_at',
                    header: 'Created',
                    sortable: true,
                    sortKey: 'created_at',
                    render: (user: User) => (
                      <span className="text-sm text-gray-500">{formatDate(user.created_at)}</span>
                    ),
                  },
                  {
                    key: 'actions',
                    header: <span className="sr-only">Actions</span>,
                    sortable: false,
                    render: (user: User) => (
                      <div className="flex items-center justify-end space-x-2">
                        {isAdmin && (
                          <>
                            <Link
                              to={`/users/edit/${user.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(user.id)}
                              disabled={isLoading}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ),
                  },
                ]}
                data={users}
                loading={isLoading}
                selectable={isAdmin}
                selectedIds={selectedUsers}
                onSelectAll={handleSelectAll}
                onSelectRow={handleSelectUser}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                enableFiltering={true}
                filterKeys={["name", "email", "role", "status"]}
                enablePagination={USE_DATATABLE_PAGINATION}
                pageSizeOptions={[10, 25, 50]}
               />
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              <div className="space-y-4 p-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {isAdmin && (
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        )}
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/users/edit/${user.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={isLoading}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={cn(
                          "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                          user.role === 'admin'
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        )}>
                          {capitalizeFirst(user.role)}
                        </span>
                        <span className={cn(
                          "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                          user.status === 'active'
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        )}>
                          {capitalizeFirst(user.status)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(user.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * PAGE_LIMIT) + 1} to{' '}
            {Math.min(currentPage * PAGE_LIMIT, totalUsers)} of{' '}
            {totalUsers} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={isLoading}
                  className={cn(
                    "px-3 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
                    page === currentPage
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
