'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { api, SellerProfile } from '@/lib/api';

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

  // If we found the seller in the API, show their profile!
  if (sellerProfile) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Render seller profile inline */}
          <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {sellerProfile.seller.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {sellerProfile.statistics.totalProducts} products • {sellerProfile.statistics.totalReviews} reviews
            </p>
          </div>

          <Card hover={false}>
            <p className="text-gray-700 dark:text-gray-300">
              View full profile for {sellerProfile.seller.name} with all products and reviews.
            </p>
          </Card>
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

