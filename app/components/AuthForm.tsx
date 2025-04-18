'use client';

import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function EmailAuth() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const { error } = await signUpWithEmail(email, password);
        if (error) {
          toast.error(error);
        } else {
          toast.success('Check your email for the confirmation link!');
        }
      } else {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          toast.error(error);
        } else {
          toast.success('Successfully signed in!');
          router.push('/');
        }
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    const { error } = await resetPassword(email);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Password reset link sent to your email');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#2a2a2a] rounded-lg shadow-md">
      <h2 className="text-2xl text-[#b0b0b0] mb-6 text-center">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#b0b0b0]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm shadow-[#232121] focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#b0b0b0]">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm shadow-[#232121] focus:border-gray-800 focus:ring-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#b0b0b0] bg-[#303030] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-[#b0b0b0] hover:text-[#daa7a7]"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>

        {!isSignUp && (
          <button
            onClick={handleResetPassword}
            className="block w-full text-sm text-[#b0b0b0] hover:text-[#daa7a7]"
          >
            Forgot your password?
          </button>
        )}
      </div>
    </div>
  );
} 