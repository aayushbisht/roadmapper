'use client';

import { useAuth } from '@/app/providers/AuthProvider';
import EmailAuth from '@/app/components/AuthForm';

export default function LoginPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl  text-[#b0b0b0]">
            Roadmapper
          </h1>
        </div>

        <div className="mt-8 space-y-6">
          <EmailAuth />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#303030]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2  text-[#daa7a7]">Or continue with</span>
            </div>
          </div>

          <div>
            <button
              onClick={signInWithGoogle}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#daa7a7] bg-[#2a2a2a] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 