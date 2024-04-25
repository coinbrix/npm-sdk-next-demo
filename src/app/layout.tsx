"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { initializeSingularity } from 'singularity-init'

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const API_KEY = 'YOUR_API_KEY_HERE'
  const idToken = 'YOUR_ID_TOKEN_HERE'
  const accessToken = 'YOUR_ACCESS_TOKEN_HERE'

  const performCustomAuth = async () => {
    try {
      window.SingularityEvent.subscribe('SingularityEvent-login', data => {
        console.log('login data --->', data);
      });

      const response = await window.SingularityEvent.customAuth('CLIENT_AUTH', {
        idToken: idToken,
        accessToken: accessToken
      });
      console.log('Custom auth response:', response);
    } catch (error) {
      console.error('Error during custom auth:', error);
    }
  };


  const initSingularity = async () => {
    if (typeof window !== 'undefined' && !window.Singularity) {
      console.log('1');
      const {initializeSingularity} = await import('singularity-init');
      await initializeSingularity(window, document, '1.7.30-sandbox.1', 'production', API_KEY, async () => {
        console.log('2');
        performCustomAuth();
      });
    }
  }


  return (
    <html lang="en">
      <body className={inter.className}>
        <button onClick={initSingularity}>Init Singularity</button>
        {children}
      </body>
    </html>
  );
}
