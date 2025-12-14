'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { api, SellerProfile, Product, Review } from '@/lib/api';

export default function NotFound() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);

  useEffect(() => {
    // Check if this is a seller profile URL
    const sellerMatch = pathname?.match(/\/sellers\/([^/]+)/);
    
    if (sellerMatch) {
      const sellerId = sellerMatch[1];
      
      // Try to fetch the seller from the API
      api.getSellerProfile(sellerId)
        .then((profile) => {
          setSellerProfile(profile);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [pathname]);

  // If we found the seller in the API, show their FULL profile!
  if (sellerProfile) {
    const { seller, products, reviews, statistics } = sellerProfile;
    
    return (
      <Layout>
        <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white font-bold text-3xl shrink-0">
                {seller.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{seller.name}</h1>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {seller.merch && (
                    <div className="flex items-center gap-2">
                      <span>Selling: <span className="font-medium text-gray-900 dark:text-white capitalize">{seller.merch}</span></span>
                    </div>
                  )}
                  {seller.phonenumber && (
                    <div className="flex items-center gap-2">
                      <span>{seller.phonenumber}</span>
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
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{statistics.totalProducts}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Items Listed</div>
            </Card>
            <Card hover={false} className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {statistics.averageRating ? statistics.averageRating.toFixed(1) : 'N/A'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Average Rating</div>
            </Card>
            <Card hover={false} className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{statistics.totalReviews}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Reviews</div>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Items for Sale</h2>
            {products.length === 0 ? (
              <Card hover={false} className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No items listed yet</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: Product) => (
                  <Card key={product.product_id}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{product.product_name}</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Student Reviews</h2>
            {reviews.length === 0 ? (
              <Card hover={false} className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {reviews.map((review: Review, index: number) => (
                  <Card key={review.review_id || `review-${index}`} hover={false}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-blue-700 dark:text-blue-400">{review.rating || review.stars}/5</span>
                      <span className="text-gray-600 dark:text-gray-400">{review.writer_name || 'Anonymous'}</span>
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

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">Checking if this page exists...</p>
        </div>
      </Layout>
    );
  }

  // True 404 - page does not exist
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Page not found</p>
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          Return to home
        </Link>
      </div>
    </Layout>
  );
}

