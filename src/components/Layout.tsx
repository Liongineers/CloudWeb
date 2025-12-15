'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/AuthContext';

const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
              Student Marketplace
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium">
                Browse
              </Link>
              {user && (
                <>
                  <Link href="/products/new/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium">
                    Sell Item
                  </Link>
                  <Link href="/reviews/new/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium">
                    Write Review
                  </Link>
                  <Link href="/profile/edit/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-bold">
                    Account
                  </Link>
                </>
              )}
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {user.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={login}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Login
                </button>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Student Marketplace</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Campus marketplace for students to buy and sell textbooks, supplies, and more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/" className="hover:text-gray-900 dark:hover:text-white">Browse Sellers</Link></li>
                <li><Link href="/signup/" className="hover:text-gray-900 dark:hover:text-white">Create Account</Link></li>
                <li><Link href="/products/new/" className="hover:text-gray-900 dark:hover:text-white">List an Item</Link></li>
                <li><Link href="/reviews/new/" className="hover:text-gray-900 dark:hover:text-white">Write a Review</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">How It Works</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse items, contact sellers directly via phone, and complete transactions offline for safety.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500 dark:text-gray-500">
            Cloud Computing Project 2025
          </div>
        </div>
      </footer>
    </div>
  );
}