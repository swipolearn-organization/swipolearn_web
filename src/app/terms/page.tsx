import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-deep-space-navy relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-electric-indigo/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-green/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 py-24 relative z-10 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="glass p-8 md:p-16 rounded-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8">
            Terms & <span className="text-electric-indigo">Conditions</span>
          </h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold font-heading text-white mb-4">1. Agreement to Terms</h2>
              <p>By accessing our App, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold font-heading text-white mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on Swipolearn's App for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-heading text-white mb-4">3. Swipolearn Premium</h2>
              <p>Premium features, including ad-free access, unlimited Drill Mode, and exclusive Mock Tests, are billed on a subscription basis. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-heading text-white mb-4">4. Content Liability</h2>
              <p>While we strive for 100% accuracy in our MCQs, Mock Tests, and Current Affairs modules, Swipolearn shall not be hold responsible for any errors or omissions in the educational content provided.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
