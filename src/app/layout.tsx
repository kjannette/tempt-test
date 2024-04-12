"use client";

import { Inter } from "next/font/google";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Elements stripe={stripePromise}>
        <body className={inter.className}>{children}</body>
      </Elements>
    </html>
  );
}
