"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function DeleteAccount() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <main className="min-h-screen bg-deep-space-navy relative overflow-hidden flex items-center justify-center py-24">
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="glass p-8 md:p-12 rounded-3xl border border-red-500/20">
          <div className="flex items-center gap-4 mb-6 text-red-400">
            <AlertTriangle size={32} />
            <h1 className="text-3xl font-bold font-heading text-white">Delete Account</h1>
          </div>
          
          {!submitted ? (
            <>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Deleting your account is permanent. All your data, including mock test history, swipe learning progress, and premium subscription status, will be permanently erased.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                    placeholder="Enter your registered email"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-400 mb-2">Reason for leaving (Optional)</label>
                  <textarea 
                    id="reason" 
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                    placeholder="Tell us why you are deleting your account..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="confirm" required className="mt-1" />
                  <label htmlFor="confirm" className="text-sm text-gray-400">
                    I understand that this action is irreversible and all my data will be lost.
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-red-600/80 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                >
                  Request Deletion
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mb-6">
                ✓
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Request Submitted</h2>
              <p className="text-gray-400">
                Your account deletion request has been received. Our team will process it within 48 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
