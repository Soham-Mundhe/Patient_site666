import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Lock, Mail, Smartphone } from 'lucide-react';

const Login = () => {
    const [method, setMethod] = useState('mobile');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="bg-sky-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">🏥</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Sign in to book appointments and manage your health.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    {/* Tabs */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${method === 'mobile' ? 'bg-white shadow-sm text-sky-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setMethod('mobile')}
                        >
                            Mobile + OTP
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${method === 'email' ? 'bg-white shadow-sm text-sky-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setMethod('email')}
                        >
                            Email + Password
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {method === 'mobile' ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Smartphone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <Button type="submit" className="w-full py-3 text-lg shadow-md hover:shadow-lg transition-shadow">
                            {method === 'mobile' ? 'Send OTP' : 'Login'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-sky-600 font-medium hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
