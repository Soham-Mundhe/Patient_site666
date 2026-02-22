import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Lock, Mail, Smartphone, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { trackEvent, trackPageView } from '../utils/analytics';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    useEffect(() => {
        trackPageView('Login');
    }, []);
    const [method, setMethod] = useState('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signInWithPhone } = useAuth();
    const navigate = useNavigate();

    const setupRecaptcha = (containerId) => {
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
        }
        window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (method === 'mobile') {
            if (showOTP) {
                try {
                    setError('');
                    setLoading(true);
                    await confirmationResult.confirm(otp);
                    trackEvent('login', { method: 'phone' });
                    navigate('/home');
                } catch (err) {
                    setError('Invalid OTP. Please try again.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
                return;
            }

            try {
                setError('');
                setLoading(true);
                setupRecaptcha('recaptcha-container');
                const appVerifier = window.recaptchaVerifier;

                // Prepend +91 if not present
                const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

                const confirmation = await signInWithPhone(formattedPhone, appVerifier);
                setConfirmationResult(confirmation);
                setShowOTP(true);
                trackEvent('otp_sent', { method: 'phone' });
            } catch (err) {
                setError('Failed to send OTP. ' + err.message);
                console.error(err);
                if (window.recaptchaVerifier) {
                    window.recaptchaVerifier.clear();
                }
            } finally {
                setLoading(false);
            }
            return;
        }

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            trackEvent('login', { method: 'email' });
            navigate('/home');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        } finally {
            setLoading(false);
        }
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
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-100 italic">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}
                        {method === 'mobile' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Smartphone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none pr-1">
                                            <span className="text-gray-500 text-sm font-medium">+91</span>
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="98765 43210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            disabled={showOTP || loading}
                                            className="block w-full pl-20 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                {showOTP && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="6-digit code"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">Code sent to {phone}</p>
                                    </div>
                                )}
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div id="recaptcha-container"></div>

                        <Button type="submit" disabled={loading} className="w-full py-3 text-lg shadow-md hover:shadow-lg transition-shadow">
                            {loading ? 'Processing...' : (method === 'mobile' ? (showOTP ? 'Verify & Login' : 'Send OTP') : 'Login')}
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
