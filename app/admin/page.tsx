'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Eye, EyeOff, KeyRound, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Check and authorize session
  useEffect(() => {
    async function checkSession() {
      try {
        // Check if we already have an active admin orders workspace session
        const sessionRes = await fetch('/api/admin/login');
        if (sessionRes.ok) {
          router.replace('/admin/orders');
          return;
        }
      } catch (err) {
        console.error("Session verification error:", err);
      } finally {
        setIsCheckingSession(false);
      }
    }
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;

    setIsVerifying(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/orders');
      } else {
        setErrorMessage(data.error || 'Incorrect passcode. Access rejected.');
      }
    } catch (err) {
      setErrorMessage('Connection lost. Please review database link.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Loading Screen while resolving authentication
  if (isCheckingSession) {
    return (
      <div className="bg-slate-950 min-h-screen text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-t-2 border-emerald-500 border-r-2 border-transparent animate-spin mx-auto"></div>
          <p className="text-xs font-mono text-slate-400 tracking-widest uppercase">Verifying Host Clearance...</p>
        </div>
      </div>
    );
  }

  // Render original beautiful passcode card
  return (
    <div className="bg-slate-950 min-h-screen text-slate-150 flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Decorative Ambient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-950/15 filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-950/15 filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 relative"
        >
          {/* Accent Line */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>

          {/* Icon Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 relative shadow-inner">
              <Shield className="w-8 h-8 text-emerald-400" />
              <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl animate-pulse"></div>
            </div>
            
            <span className="inline-block text-[10px] uppercase font-black tracking-[0.2em] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full mb-2">
              Secure Terminal Gateway
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Desk Portal</h1>
            <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto font-medium">
              Authorized personnel only. Secure passcode session key required for order log review.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Clearance Passcode</span>
                </label>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">NODE_AUTH</span>
              </div>

              <div className="relative">
                <input
                  required
                  type={showPasscode ? 'text' : 'password'}
                  placeholder="Enter secure passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  disabled={isVerifying}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono placeholder-slate-650"
                />

                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-lg"
                >
                  {showPasscode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3.5 bg-red-950/45 border border-red-900/60 rounded-xl flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-red-200 leading-relaxed">{errorMessage}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isVerifying || !passcode}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-850 disabled:text-slate-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-emerald-900/10 active:scale-[0.98]"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>{isVerifying ? 'Authenticating Gateway...' : 'Initialize Clearance'}</span>
            </button>

          </form>

          {/* Footer warning */}
          <div className="mt-8 border-t border-slate-800/60 pt-4 text-center">
            <p className="text-[9px] text-slate-500 tracking-wider font-semibold uppercase leading-relaxed max-w-xs mx-auto">
              Federal auditing networks are fully enabled. Unauthorized tampering attempts are logged to immutable storage buffers.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
