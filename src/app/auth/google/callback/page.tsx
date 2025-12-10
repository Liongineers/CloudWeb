'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = () => {
      // Read query params from the browser URL
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const userParam = params.get('user');

      if (token && userParam) {
        try {
          const user = JSON.parse(decodeURIComponent(userParam));

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

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

    // Only run in the browser
    if (typeof window !== 'undefined') {
      handleCallback();
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Authenticating...</p>
      </div>
    </div>
  );
}