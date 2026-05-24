import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-deep-space-navy relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electric-indigo/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-green/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 py-24 relative z-10 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="glass p-8 md:p-16 rounded-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8">
            Privacy <span className="text-emerald-green">Policy</span>
          </h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold font-heading text-white mb-4">1. Introduction</h2>
              <p>Welcome to Swipolearn. We are committed to protecting your personal information and your right to privacy. This Privacy Policy applies to all information collected through our app and website.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold font-heading text-white mb-4">2. Information We Collect</h2>
              <p>We collect personal information that you voluntarily provide to us when you register on the App, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number.</li>
                <li><strong>Usage Data:</strong> Mock test scores, swipe learning patterns, time spent on drill modes to optimize your learning path.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-heading text-white mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect or receive to provide, operate, and maintain our App; to improve, personalize, and expand our App; and to understand and analyze how you use our App.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-heading text-white mb-4">4. Data Security & Retention</h2>
              <p>We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
