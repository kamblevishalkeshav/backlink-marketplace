'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DirectLoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loginAsAdmin = async () => {
      try {
        setStatus('loading');
        
        // Attempt to sign in with admin credentials
        const result = await signIn('credentials', {
          redirect: false,
          email: 'admin@example.com',
          password: 'admin123',
        });

        if (result?.error) {
          setStatus('error');
          setErrorMessage(result.error);
        } else {
          setStatus('success');
          
          // Redirect to admin dashboard after successful login
          setTimeout(() => {
            router.push('/admin/marketplace/listings');
          }, 1000);
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage('An unexpected error occurred');
        console.error('Login error:', error);
      }
    };

    loginAsAdmin();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto w-full max-w-md space-y-8 rounded-lg border bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Quick Login</h1>
          
          {status === 'loading' && (
            <div className="mt-6 flex flex-col items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              <p className="mt-4 text-sm text-gray-600">Logging in as admin...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="mt-6">
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Login failed</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{errorMessage || 'There was an error logging in. Please try again.'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => loginAsAdmin()}
                className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Try Again
              </button>
            </div>
          )}
          
          {status === 'success' && (
            <div className="mt-6">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Login successful!</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>You are being redirected to the admin dashboard...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 