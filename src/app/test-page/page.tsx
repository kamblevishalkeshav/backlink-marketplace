'use client';

import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Test Page</h1>
      <p className="text-xl">If you can see this, routing is working correctly!</p>
      <div className="mt-8">
        <ul className="flex flex-col space-y-4">
          <li>
            <Link href="/" className="text-blue-500 underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-blue-500 underline">
              Register
            </Link>
          </li>
          <li>
            <Link href="/signin" className="text-blue-500 underline">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
} 