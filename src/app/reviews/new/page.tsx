'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { api, CreateReviewData, User } from '@/lib/api';

export default function NewReviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<CreateReviewData>({
    writer_id: '',
    seller_id: '',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await api.getUsers();
        setUsers(data);
        if (data.length > 0) {
          setFormData(prev => ({ 
            ...prev, 
            writer_id: data[0].user_id,
            seller_id: data.length > 1 ? data[1].user_id : data[0].user_id
          }));
        }
        setLoadingUsers(false);
      } catch {
        setError('Failed to load users from API');
        setLoadingUsers(false);
      }
    }
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.createReview(formData);
      router.push(`/sellers/${formData.seller_id}/`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create review');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Write a Review
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your experience to help other students make informed decisions
          </p>
        </div>
        
        <Card hover={false}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Account</label>
              <select
                name="writer_id"
                value={formData.writer_id}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                required
                disabled={loadingUsers}
              >
                {loadingUsers ? (
                  <option>Loading users...</option>
                ) : users.length === 0 ? (
                  <option>No users available</option>
                ) : (
                  <>
                    <option key="empty-writer" value="">Select your account</option>
                    {users.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Seller to Review</label>
              <select
                name="seller_id"
                value={formData.seller_id}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                required
                disabled={loadingUsers}
              >
                {loadingUsers ? (
                  <option>Loading users...</option>
                ) : users.length === 0 ? (
                  <option>No users available</option>
                ) : (
                  <>
                    <option key="empty-seller" value="">Select a seller</option>
                    {users.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className={`w-14 h-14 rounded-lg border-2 font-semibold text-base transition-all ${
                      star <= formData.rating 
                        ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md scale-105' 
                        : 'bg-white dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-600 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500'
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                1 = Poor, 5 = Excellent
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Comment (Optional)</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent resize-none"
                placeholder="Share details about your transaction experience, communication, item quality, etc..."
              />
            </div>

            <div className="space-y-3">

              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-300 font-medium mb-1">
                  Help the community
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-400">
                  Your honest review helps other students make informed decisions about who to transact with.
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
                {loading ? 'Submitting...' : 'Submit Review'}
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
