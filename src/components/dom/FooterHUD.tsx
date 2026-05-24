"use client";

import { ShieldAlert, Download, Mail, Info } from "lucide-react";
import Link from "next/link";

export default function FooterHUD() {
  return (
    <footer className="relative w-full py-12 pointer-events-auto z-20 mt-32">
      <div className="container mx-auto px-6">
        <div className="glass p-8 md:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold font-heading mb-4 text-emerald-green">Swipolearn</h3>
            <p className="text-gray-400 mb-6 max-w-sm">
              The ultimate ecosystem for competitive exam preparation. Master your syllabus with data-driven insights.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                <Download size={20} /> App Store
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                <Download size={20} /> Play Store
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Info size={18} /> About
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li>
                <Link href="/help-center" className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={16} /> Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <ShieldAlert size={18} /> Legal & Compliance
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/delete-account" className="text-red-400 hover:text-red-300 transition-colors font-semibold">Delete Account / Data</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-8 text-sm">
          &copy; {new Date().getFullYear()} Swipolearn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
