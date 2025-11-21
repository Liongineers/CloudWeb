'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { api, SellerProfile, Product, Review } from '@/lib/api';

export default function SellerProfileClient() {
  const params = useParams();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await api.getSellerProfile(params.id as string);
        setProfile(data);
        setLoading(false);
      } catch {
        setError('Failed to load seller profile');
        setLoading(false);
      }
    }
    loadProfile();
  }, [params.id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-gray-600 dark:text-gray-400 mb-2">Loading seller profile...</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Fetching data from composite microservice (parallel execution)</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">{error || 'Seller not found'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Composite microservice: {process.env.NEXT_PUBLIC_API_URL || 'https://composite-microservice-471529071641.us-east1.run.app'}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white font-bold text-3xl shrink-0">
              {profile.seller.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.seller.name}</h1>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                {profile.seller.merch && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Selling: <span className="font-medium text-gray-900 dark:text-white capitalize">{profile.seller.merch}</span></span>
                  </div>
                )}
                {profile.seller.phonenumber && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{profile.seller.phonenumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card hover={false} className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{profile.statistics.totalProducts}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Items Listed</div>
          </Card>
          <Card hover={false} className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{profile.statistics.averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Average Rating</div>
          </Card>
          <Card hover={false} className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{profile.statistics.totalReviews}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Reviews</div>
          </Card>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Items for Sale</h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">{profile.products.length} items</span>
          </div>
          {profile.products.length === 0 ? (
            <Card hover={false} className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No items listed yet</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.products.map((product: Product) => (
                <Card key={product.prod_id}>
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{product.prod_name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[40px]">
                      {product.description || 'No description provided'}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.availability ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                        {product.availability ? 'Available' : 'Sold Out'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>Qty: {product.quantity}</span>
                      <span>{product.condition || 'N/A'}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Reviews</h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">{profile.reviews.length} reviews</span>
          </div>
          {profile.reviews.length === 0 ? (
            <Card hover={false} className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {profile.reviews.map((review: Review) => (
                <Card key={review.review_id} hover={false}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                        <span className="text-lg font-bold text-blue-700 dark:text-blue-400">{review.rating}</span>
                        <span className="text-sm text-blue-600 dark:text-blue-500 ml-1">/5</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment || 'No comment provided'}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
