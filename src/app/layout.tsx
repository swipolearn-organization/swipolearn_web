import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SwipOlearn – Learn Faster. Swipe Smarter.",
  description:
    "SwipOlearn helps students prepare for Government Exams and Competitive Exams through swipe-based learning, interactive quizzes, and mock tests. SSC, Banking, Railway, UPSC, Defence and more.",
  keywords:





  
    "SwipOlearn, swipe learning, exam preparation, SSC, Banking, UPSC, Railway, competitive exams, mock tests, quizzes",
  openGraph: {

<<<<<<< HEAD

=======
>>>>>>> 000d52cd095244b4af291fe0b9cb7c7f42b2d15f
    title: "SwipOlearn – Learn Faster. Swipe Smarter.",
    description:
      "The next-generation exam prep platform where every swipe helps you master concepts and crack competitive exams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
