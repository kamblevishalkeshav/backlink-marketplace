'use client';

import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      alert('You must accept the terms and conditions to register.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Successful registration
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex">
      {/* Left Column - Feature Panel */}
      <div className="hidden md:flex md:w-1/2 bg-[#2ac37a] p-8 flex-col justify-center h-full">
        <div className="max-w-lg mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white mb-6">Join the #1 backlink marketplace today</h1>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-white/20 rounded-xl p-5 space-y-2">
              <div className="font-semibold text-white text-xl mb-2">Instant Access</div>
              <p className="text-sm text-white font-medium">Start finding quality backlinks immediately after registration.</p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-white/20 rounded-xl p-5 space-y-2">
              <div className="font-semibold text-white text-xl mb-2">No Setup Fees</div>
              <p className="text-sm text-white font-medium">Free account creation with no hidden charges.</p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-white/20 rounded-xl p-5 space-y-2">
              <div className="font-semibold text-white text-xl mb-2">Secure Payments</div>
              <p className="text-sm text-white font-medium">Your transactions are protected with our escrow system.</p>
            </div>
            
            {/* Feature Card 4 */}
            <div className="bg-white/20 rounded-xl p-5 space-y-2">
              <div className="font-semibold text-white text-xl mb-2">24/7 Support</div>
              <p className="text-sm text-white font-medium">Our team is available around the clock to assist you.</p>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/30 h-10 w-10 flex items-center justify-center">
                <Image 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E" 
                  alt="Sarah Johnson" 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="text-white font-medium">Sarah Johnson</div>
                <div className="text-white/90 text-sm">SEO Specialist at GrowthCo</div>
              </div>
            </div>
            <p className="text-white font-medium mt-2 italic">
              &quot;Signing up was a breeze, and I found high-quality backlink opportunities within minutes. The ROI has been amazing.&quot;
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
            <h2 className="text-3xl font-bold text-gray-800 text-center">Create your account</h2>
            <p className="text-gray-600 mt-2 text-center">Start building your backlink profile today</p>
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
                OR REGISTER WITH EMAIL
              </span>
            </div>
          </div>
          
          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="block w-full pl-10 h-10 rounded-md border border-input bg-white text-gray-800 ring-offset-background focus:ring-2 focus:ring-[#2ac37a] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="block w-full pl-10 h-10 rounded-md border border-input bg-white text-gray-800 ring-offset-background focus:ring-2 focus:ring-[#2ac37a] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
            
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
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
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with a number and a special character.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  className="h-4 w-4 border-gray-300 rounded text-[#2ac37a] focus:ring-[#2ac37a]"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-500">
                  I agree to the <Link href="/terms" className="text-[#2ac37a] hover:text-[#25a868]">Terms of Service</Link> and <Link href="/privacy" className="text-[#2ac37a] hover:text-[#25a868]">Privacy Policy</Link>
                </label>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 inline-flex justify-center items-center rounded-md bg-[#2ac37a] text-white text-sm font-medium hover:bg-[#25a868] focus:outline-none disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[#2ac37a] hover:text-[#25a868]">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 