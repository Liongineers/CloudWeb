'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { api, User } from '@/lib/api';

export default function Home() {
  const [sellers, setSellers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSellers() {
      try {
        const data = await api.getUsers();
        setSellers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load sellers. Please check if the composite microservice is running.');
        setLoading(false);
      }
    }
    loadSellers();
  }, []);

  const categories = [
    { name: 'Textbooks', count: '50+' },
    { name: 'Dorm Supplies', count: '30+' },
    { name: 'Graduation', count: '15+' },
    { name: 'Electronics', count: '40+' },
    { name: 'Furniture', count: '25+' },
    { name: 'Other', count: '20+' },
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-[#0f0f0f] py-16 px-4 sm:px-6 lg:px-8 -mt-0">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Campus Marketplace
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Buy and sell textbooks, dorm supplies, graduation regalia, and more with fellow students. Connect directly and transact safely offline.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Active Sellers</h2>
          <p className="text-gray-600 dark:text-gray-400">Connect with verified student sellers on campus</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-600 dark:text-gray-400">Loading sellers from composite microservice...</div>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-xl mb-6">
            <p className="text-sm text-red-800 dark:text-red-300 font-medium mb-2">Connection Error</p>
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              Make sure the composite microservice is running at: {process.env.NEXT_PUBLIC_API_URL || 'https://composite-microservice-471529071641.us-east1.run.app'}
            </p>
          </div>
        )}

        {!loading && !error && sellers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400">No sellers found</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <Link key={seller.user_id} href={`/sellers/${seller.user_id}`}>
              <Card className="cursor-pointer h-full group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {seller.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500 truncate">
                      {seller.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                        Active
                      </span>
                      {seller.merch && (
                        <span className="text-xs">Selling {seller.merch}</span>
                      )}
                    </div>
                    {seller.phonenumber && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Contact: {seller.phonenumber}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
