import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useProductStore } from '@/stores/productStore';
import { CreateProductRequest, UpdateProductRequest } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { toast } from 'sonner';

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  quantity: z.number().int().min(0, 'Quantity must be 0 or more'),
  description: z.string().min(2, 'Description must be at least 2 characters'),
});

type ProductFormSchema = z.infer<typeof productSchema>;

const ProductMaintenance: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const editingProduct = useProductStore((s) => s.editingProduct);
  const loadingState = useProductStore((s) => s.loadingState);
  const error = useProductStore((s) => s.error);
  const fetchProductById = useProductStore((s) => s.fetchProductById);
  const createProduct = useProductStore((s) => s.createProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const clearError = useProductStore((s) => s.clearError);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: { name: '', quantity: 0, description: '' },
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchProductById(id);
    }
    // Intentionally exclude fetchProductById to avoid effect loop on unstable function identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, id]);

  useEffect(() => {
    if (isEditing && editingProduct) {
      form.reset({ name: editingProduct.name, quantity: editingProduct.quantity, description: editingProduct.description });
    }
  }, [isEditing, editingProduct, form]);

  const onSubmit: SubmitHandler<ProductFormSchema> = async (data) => {
    try {
      setIsSubmitting(true);
      clearError();
      if (isEditing && id) {
        const updateData: UpdateProductRequest = { name: data.name, quantity: data.quantity, description: data.description };
        await updateProduct(id, updateData);
        toast.success('Product updated');
      } else {
        const createData: CreateProductRequest = { name: data.name, quantity: data.quantity, description: data.description };
        await createProduct(createData);
        toast.success('Product created');
      }
      navigate('/products');
    } catch {
      toast.error(isEditing ? 'Failed to update product' : 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => navigate('/products');

  if (isEditing && loadingState === 'loading') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update product details</p>
        </div>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" text="Loading product..." />
        </div>
      </div>
    );
  }

  if (error && loadingState !== 'loading') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
          <p className="text-gray-600">{isEditing ? 'Update product details' : 'Create a new product'}</p>
        </div>
        <ErrorMessage title={isEditing ? 'Failed to load product' : 'Error'} message={error} onDismiss={() => clearError()} className="max-w-2xl" />
        <div className="mt-6">
          <button onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white">Back to Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <button onClick={handleCancel} className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
        <p className="text-gray-600">{isEditing ? 'Update product details' : 'Create a new product'}</p>
      </div>
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input {...form.register('name')} type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter name" disabled={isSubmitting} />
                  {form.formState.errors.name && <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input {...form.register('quantity', { valueAsNumber: true })} type="number" min={0} step={1} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="0" disabled={isSubmitting} />
                  {form.formState.errors.quantity && <p className="mt-1 text-sm text-red-600">{form.formState.errors.quantity.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea {...form.register('description')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter description" disabled={isSubmitting} />
                {form.formState.errors.description && <p className="mt-1 text-sm text-red-600">{form.formState.errors.description.message}</p>}
              </div>
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={handleCancel} disabled={isSubmitting} className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white">Cancel</button>
                  <button type="submit" disabled={isSubmitting || !form.formState.isValid} className="inline-flex items-center px-4 py-2 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? 'Saving...' : (<><Save className="h-4 w-4 mr-2" />{isEditing ? 'Update Product' : 'Create Product'}</>)}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMaintenance;
