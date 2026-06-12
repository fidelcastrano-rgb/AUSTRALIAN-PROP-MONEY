'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, KeyRound, Mail, AlertTriangle, ArrowLeft, RefreshCw, Send, Terminal, CheckCircle2, CloudLightning } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiagnosticInfo {
  hasApiKey: boolean;
  apiKeyLength: number;
  apiKeyMasked: string;
  fromEmail: string;
  adminEmail: string;
}

export default function ResendDiagnosticSuite() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [diagnostics, setDiagnostics] = useState<DiagnosticInfo | null>(null);
  
  // Test Email States
  const [targetEmail, setTargetEmail] = useState('yamahaoutboardss@gmail.com');
  const [isSending, setIsSending] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    status?: number;
    message: string;
    detail?: string;
    data?: any;
  } | null>(null);

  // Authorize administrative access
  useEffect(() => {
    async function checkSession() {
      try {
        // Check if we have active session
        const sessionRes = await fetch('/api/admin/login');
        
        if (sessionRes.ok) {
          setIsUnlocked(true);
          // Fetch backend configuration metrics safely (server masked details)
          const diagRes = await fetch('/api/admin/test-email');
          if (diagRes.ok) {
            const data = await diagRes.json();
            setDiagnostics(data);
          }
        } else {
          router.replace('/admin');
        }
      } catch (err) {
        console.error("Session lookup exception:", err);
        router.replace('/admin');
      } finally {
        setIsCheckingSession(false);
      }
    }
    checkSession();
  }, [router]);

  const handleFetchDiagnostics = async () => {
    try {
      const diagRes = await fetch('/api/admin/test-email');
      if (diagRes.ok) {
        const data = await diagRes.json();
        setDiagnostics(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetEmail) return;

    setIsSending(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail }),
      });

      const data = await res.json();
      setTestResult({
        success: res.ok,
        status: data.status,
        message: data.message,
        detail: data.detail,
        data: data.data,
      });

      // Update diagnostic summary to log the changes
      handleFetchDiagnostics();
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Network transmission crash: ${err.message}`,
      });
    } finally {
      setIsSending(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="bg-slate-950 min-h-screen text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-t-2 border-emerald-500 border-r-2 border-transparent animate-spin mx-auto"></div>
          <p className="text-xs font-mono text-slate-400 tracking-widest uppercase">Initializing Diagnostic Protocols...</p>
        </div>
      </div>
    );
  }

  // Render the diagnostics panel directly if loaded
  return (
    <div className="bg-slate-950 min-h-screen text-slate-150 py-12 px-4 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] rounded-full bg-emerald-950/10 filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] rounded-full bg-indigo-950/10 filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Navigation / Header menu */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/orders"
              className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all hover:border-slate-700 hover:bg-slate-850"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[10px] font-black tracking-widest text-emerald-400 uppercase font-mono">Mail Diagnostics Gateway</p>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Resend API testing ground</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              href="/admin/orders"
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs px-4 py-2 rounded-xl transition-all font-semibold uppercase tracking-wider"
            >
              Back to Order Desk
            </Link>
          </div>
        </div>

        {/* Diagnostic Panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Diagnostic Sidebar configuration card */}
          <div className="lg:col-span-5 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden"
            >
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500"></div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black uppercase tracking-wider text-white">Credentials Status</h2>
                <button
                  onClick={handleFetchDiagnostics}
                  className="p-1 px-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-100 rounded-lg text-[10px] font-mono tracking-wider flex items-center gap-1 transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  RELOAD
                </button>
              </div>

              {diagnostics ? (
                <div className="space-y-4">
                  
                  {/* API Key Box */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">RESEND_API_KEY</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                        diagnostics.hasApiKey ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-400' : 'bg-red-955/80 border border-red-900 text-red-400'
                      }`}>
                        {diagnostics.hasApiKey ? 'Configured' : 'Missing'}
                      </span>
                    </div>
                    {diagnostics.hasApiKey ? (
                      <div>
                        <p className="text-sm font-semibold text-slate-200 font-mono tracking-wider">{diagnostics.apiKeyMasked}</p>
                        <p className="text-[10px] text-slate-500 mt-1 font-medium">Loaded secure key of {diagnostics.apiKeyLength} characters.</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-red-400 font-semibold leading-relaxed">No key detected in your .env configuration. Mail operations will default to simulated Mock output logs.</p>
                      </div>
                    )}
                  </div>

                  {/* Sender Details Box */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block mb-1">From Sender Address</span>
                      <p className="text-xs font-mono font-medium text-slate-300 break-all">{diagnostics.fromEmail}</p>
                      <p className="text-[9px] text-slate-500 mt-1 leading-normal">
                        Defaults to <span className="text-slate-400">onboarding@resend.dev</span>. Must correspond to certified domain records verified inside your Resend control console.
                      </p>
                    </div>

                    <div className="border-t border-slate-850 pt-2.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block mb-1">Admin Recipient Notification</span>
                      <p className="text-xs font-mono font-medium text-slate-300 break-all">{diagnostics.adminEmail}</p>
                      <p className="text-[9px] text-slate-500 mt-1 leading-normal">
                        The email address that receives notifications whenever buyers trigger checkout requests.
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-8 space-y-2">
                  <RefreshCw className="w-6 h-6 text-slate-600 animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-mono">Reading credentials metrics...</p>
                </div>
              )}

            </motion.div>

            {/* Quick Tutorial warning block */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <h3 className="text-xs font-black uppercase tracking-wider">Operational Warning</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Testing can only issue emails on unverified domains if resolving target addresses registered to your <strong>official Resend account email</strong>. To deliver email testing to alternative domains, first confirm you have added and authorized your custom domains under Resend&apos;s records dashboard.
              </p>
            </div>

          </div>

          {/* Core Interactive Testing Suite */}
          <div className="lg:col-span-7 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CloudLightning className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white">Issue Diagnostic Mail</h2>
                  <p className="text-slate-400 text-xs font-medium">Dispatches an authentic test email template through your active endpoint.</p>
                </div>
              </div>

              {/* Action Form */}
              <form onSubmit={handleSendTestEmail} className="space-y-5">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Target Destination Email</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Enter email to receive test mail..."
                    value={targetEmail}
                    onChange={(e) => setTargetEmail(e.target.value)}
                    disabled={isSending}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                  />
                  <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider font-mono">
                    PROTIP: Ensure your active RESEND_API_KEY supports sending to this domain!
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSending || !targetEmail}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-850 disabled:text-slate-500 text-white font-bold py-3 px-5 rounded-xl transition-all uppercase tracking-wide text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.982]"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      <span>Transmitting secure test package...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 shrink-0" />
                      <span>Deliver Test Mail via Resend</span>
                    </>
                  )}
                </button>

              </form>

              {/* Live Test Results View */}
              <AnimatePresence mode="wait">
                {testResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-slate-800/80 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Diagnostic API Output</h3>
                    </div>

                    {/* Status header banner */}
                    <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
                      testResult.success 
                        ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-250' 
                        : 'bg-red-952/40 border-red-900/60 text-red-200'
                    }`}>
                      {testResult.success ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <p className="text-xs font-bold leading-normal">
                          {testResult.message}
                        </p>
                        {testResult.status && (
                          <p className="text-[10px] font-mono font-semibold text-slate-400">
                            HTTP Status Code: {testResult.status}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Code Output panel */}
                    {(testResult.detail || testResult.data) && (
                      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 font-mono text-[11px] text-slate-300 space-y-2 overflow-x-auto">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Server Telemetry log</p>
                        
                        {testResult.detail && (
                          <pre className="whitespace-pre-wrap text-red-400 font-semibold bg-red-950/15 p-2.5 rounded-lg border border-red-950/30">
                            {testResult.detail}
                          </pre>
                        )}

                        {testResult.data && (
                          <pre className="p-2 bg-slate-900 rounded-lg border border-slate-850 scrollbar-none">
                            {JSON.stringify(testResult.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
}
