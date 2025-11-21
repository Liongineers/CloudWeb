'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { api, CreateProductData, User } from '@/lib/api';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingSellers, setLoadingSellers] = useState(true);
  const [sellers, setSellers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<CreateProductData>({
    prod_name: '',
    category: '',
    seller_info: '',
    description: '',
    availability: 1,
    price: 0,
    condition: '',
    quantity: 1,
  });

  useEffect(() => {
    async function loadSellers() {
      try {
        const data = await api.getUsers();
        setSellers(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, seller_info: data[0].user_id }));
        }
        setLoadingSellers(false);
      } catch {
        setError('Failed to load sellers from API');
        setLoadingSellers(false);
      }
    }
    loadSellers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.createProduct(formData);
      router.push(`/sellers/${formData.seller_info}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'availability', 'quantity'].includes(name) ? Number(value) : value,
    }));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            List an Item for Sale
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill out the details below to list your item on the marketplace
          </p>
        </div>
        
        <Card hover={false}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Item Name"
              name="prod_name"
              value={formData.prod_name}
              onChange={handleChange}
              placeholder="e.g., Calculus Textbook 3rd Edition"
              required
            />

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="Textbooks">Textbooks</option>
                <option value="Dorm Supplies">Dorm Supplies</option>
                <option value="Graduation">Graduation Regalia</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Seller</label>
              <select
                name="seller_info"
                value={formData.seller_info}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                required
                disabled={loadingSellers}
              >
                {loadingSellers ? (
                  <option>Loading sellers...</option>
                ) : sellers.length === 0 ? (
                  <option>No sellers available</option>
                ) : (
                  <>
                    <option key="empty" value="">Select a seller</option>
                    {sellers.map((seller) => (
                      <option key={seller.user_id} value={seller.user_id}>
                        {seller.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent resize-none"
                placeholder="Describe your item's condition, features, and any other relevant details..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />

              <Input
                label="Quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Condition (Optional)"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="e.g., New, Like New, Good"
              />

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                >
                  <option value={1}>Available</option>
                  <option value={0}>Not Available</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 rounded-lg">
                <p className="text-sm text-green-900 dark:text-green-300 font-medium mb-1">
                  Composite Microservice with FK Validation
                </p>
                <p className="text-xs text-green-800 dark:text-green-400">
                  This form validates the seller_id against the Users microservice (logical foreign key) before delegating the product creation to the Products microservice.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-300 font-medium mb-1">
                  How transactions work
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-400">
                  Interested buyers will contact you directly via your phone number. All meetings and transactions happen offline for safety.
                </p>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Listing Item...' : 'List Item'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
