import Link from "next/link";
import { ArrowLeft, Mail, MessageCircleQuestion, Phone } from "lucide-react";

export default function HelpCenter() {
  return (
    <main className="min-h-screen bg-deep-space-navy relative overflow-hidden flex items-center justify-center py-24">
      {/* Background Glow */}
      <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-electric-indigo/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="glass p-8 md:p-12 rounded-3xl border border-electric-indigo/20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-electric-indigo/20 text-electric-indigo mb-6">
            <MessageCircleQuestion size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Help <span className="text-electric-indigo">Center</span>
          </h1>
          
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Need assistance with your account, mock tests, or premium subscription? Our support team is always here to help you master your exams.
          </p>

          <div className="flex flex-col gap-6 items-center">
            <a 
              href="mailto:swipolearn@gmail.com"
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-electric-indigo to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] w-full md:w-auto"
            >
              <Mail size={24} />
              swipolearn@gmail.com
            </a>
            
            <p className="text-sm text-gray-400 mt-4">
              We typically reply within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
