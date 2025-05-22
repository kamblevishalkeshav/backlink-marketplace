'use client';

import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Successful login would redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    router.push('/admin/dashboard');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex">
      {/* Left Column - Feature Panel */}
      <div className="hidden md:flex md:w-1/2 bg-[#2ac37a] p-8 flex-col justify-center h-full">
        <div className="max-w-lg mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white mb-6">Boost your site&apos;s SEO with our backlink platform</h1>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-white/20 rounded-xl p-5 space-y-2">
              <div className="font-semibold text-white text-xl mb-2">100K+ Link Options</div>
              <p className="text-sm text-white font-medium">Guest posts and backlinks from trusted domains.</p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-white/20 rounded-xl p-5 space-y-2">
              <div className="font-semibold text-white text-xl mb-2">SEO Metrics</div>
              <p className="text-sm text-white font-medium">Complete data on DA, traffic, and more.</p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-white/20 rounded-xl p-5 space-y-2">
              <div className="font-semibold text-white text-xl mb-2">Link Tracking</div>
              <p className="text-sm text-white font-medium">Automated monitoring of all backlinks.</p>
            </div>
            
            {/* Feature Card 4 */}
            <div className="bg-white/20 rounded-xl p-5 space-y-2">
              <div className="font-semibold text-white text-xl mb-2">Competitor Analysis</div>
              <p className="text-sm text-white font-medium">Close your link gap with detailed insights.</p>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/30 h-10 w-10 flex items-center justify-center">
                <Image 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E" 
                  alt="Alex Morgan" 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="text-white font-medium">Alex Morgan</div>
                <div className="text-white/90 text-sm">Marketing Director at TechCorp</div>
              </div>
            </div>
            <p className="text-white font-medium mt-2 italic">
              &quot;This platform helped us increase our organic traffic by 230% in just 3 months. The ROI has been incredible.&quot;
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Column - Form Panel */}
      <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-5">
              <span className="text-[#2ac37a] font-extrabold text-2xl">Backlink</span>
              <span className="text-[#2b2e2f] font-extrabold text-2xl">Marketplace</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome back</h2>
            <p className="text-gray-600 mt-2 text-center">Sign in to access your account</p>
          </div>
          
          {/* Google Sign In Button */}
          <button
            type="button"
            className="w-full h-11 px-4 mb-6 border border-gray-300 text-gray-800 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 186.69 190.5">
              <g transform="translate(1184.583 765.171)">
                <path d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4"/>
                <path d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"/>
                <path d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"/>
                <path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335"/>
              </g>
            </svg>
            Continue with Google
          </button>
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                OR CONTINUE WITH EMAIL
              </span>
            </div>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="block w-full pl-10 h-10 rounded-md border border-input bg-white text-gray-800 ring-offset-background focus:ring-2 focus:ring-[#2ac37a] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm font-medium text-[#2ac37a] hover:text-[#2ac37a]/90">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="block w-full pl-10 h-10 rounded-md border border-input bg-white text-gray-800 ring-offset-background focus:ring-2 focus:ring-[#2ac37a] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 border-gray-300 rounded text-[#2ac37a] focus:ring-[#2ac37a]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me for 30 days
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 inline-flex justify-center items-center rounded-md bg-[#2ac37a] text-white text-sm font-medium hover:bg-[#2ac37a]/90 focus:outline-none disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-[#2ac37a] hover:text-[#2ac37a]/90">
              Sign up
            </Link>
          </div>
          
          <div className="mt-8 text-center text-xs text-gray-500">
            By continuing, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </div>
          
          {/* Admin access link (for testing purposes) */}
          <div className="mt-6 text-center">
            <button
              onClick={handleAdminLogin}
              className="text-xs text-gray-400 hover:text-[#2ac37a]"
            >
              Access Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 