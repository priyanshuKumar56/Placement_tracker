'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', { email, password, rememberMe });
        // Add your login logic here
    };

    return (
        <div className="bg-[#030303] flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-[0.04]">
                    <Image
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Gradient Orbs */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Container */}
            <div className="w-full  max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 relative z-10">

                {/* Left Side - Branding & Image */}
                <div className="hidden lg:flex flex-col justify-between p-8 relative rounded-l-3xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl border border-white/5 border-r-0">
                    {/* Background Image for Left Panel */}
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                            alt="Team collaboration"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
                    </div>

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="flex items-center gap-3 text-white mb-16">
                            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                <Icon icon="solar:atom-bold" className="text-2xl" />
                            </div>
                            <div>
                                <div className="text-xl font-semibold tracking-tight">Nexus</div>
                                <div className="text-xs text-zinc-400">Career Platform</div>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div className="space-y-6">
                            <h1 className="text-5xl font-medium tracking-tight text-white leading-tight">
                                Welcome back to your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                                    career journey
                                </span>
                            </h1>
                            <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
                                Connect with elite opportunities, showcase your skills, and accelerate your professional growth.
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="relative z-10 grid grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-semibold text-white mb-1">10k+</div>
                            <div className="text-xs text-zinc-500">Active Jobs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-semibold text-white mb-1">500+</div>
                            <div className="text-xs text-zinc-500">Companies</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-semibold text-white mb-1">50k+</div>
                            <div className="text-xs text-zinc-500">Developers</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="glass-panel rounded-3xl lg:rounded-l-none lg:rounded-r-3xl p-8 md:p-11 bg-[#050505]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 text-white mb-8">
                        <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center">
                            <Icon icon="solar:atom-bold" className="text-lg" />
                        </div>
                        <span className="text-lg font-semibold">Nexus</span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">
                            Sign in to your account
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Don&apos;t have an account?{' '}
                            <a href="#" className="text-white hover:text-zinc-300 font-medium underline">
                                Sign up
                            </a>
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3 mb-6">
                        <button className="w-full bg-white hover:bg-zinc-100 text-black rounded-lg py-3 px-4 flex items-center justify-center gap-3 transition-all font-medium group">
                            <Icon icon="logos:google-icon" className="text-xl" />
                            Continue with Google
                        </button>
                        
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#050505] px-2 text-zinc-600">Or continue with email</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs text-zinc-400 ml-1 font-medium">Email Address</label>
                            <div className="relative group">
                                <Icon
                                    icon="solar:letter-linear"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors text-lg"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="alex@example.com"
                                    required
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-zinc-600 focus:bg-zinc-800/50 transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-zinc-400 ml-1 font-medium">Password</label>
                            <div className="relative group">
                                <Icon
                                    icon="solar:lock-password-linear"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors text-lg"
                                />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-zinc-600 focus:bg-zinc-800/50 transition-all placeholder:text-zinc-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <Icon icon={showPassword ? 'solar:eye-linear' : 'solar:eye-closed-linear'} className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-4 h-4 border border-zinc-700 rounded bg-zinc-900 peer-checked:bg-white peer-checked:border-white transition-all"></div>
                                    <Icon
                                        icon="solar:check-read-linear"
                                        className="absolute inset-0 text-black opacity-0 peer-checked:opacity-100 text-xs flex items-center justify-center pointer-events-none"
                                    />
                                </div>
                                <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors font-medium">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-white hover:bg-zinc-200 text-black rounded-lg py-3.5 px-4 font-semibold transition-all shadow-lg shadow-white/5 hover:shadow-white/10 flex items-center justify-center gap-2 group"
                        >
                            Sign In
                            <Icon icon="solar:arrow-right-linear" className="text-lg group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
                            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
                            <span>•</span>
                            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
                            <span>•</span>
                            <a href="#" className="hover:text-zinc-400 transition-colors">Help Center</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements - Decorative */}
            <div className="hidden lg:block absolute top-20 right-20 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
            <div className="hidden lg:block absolute bottom-40 left-40 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="hidden lg:block absolute top-1/2 right-40 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
    );
}