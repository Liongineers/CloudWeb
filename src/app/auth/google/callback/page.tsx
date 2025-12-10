'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const userParam = searchParams.get('user');

      if (token && userParam) {
        try {
          const user = JSON.parse(decodeURIComponent(userParam));

          // Save to localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          // Login with context
          login(user, token);

          // Redirect to main app
          window.location.href = '/';
        } catch (error) {
          console.error('Error parsing user data:', error);
          router.push('/');
        }
      } else {
        console.error('No token or user in callback');
        router.push('/');
      }
    };

    handleCallback();
  }, [searchParams, router, login]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Authenticating...</p>
      </div>
    </div>
  );
}