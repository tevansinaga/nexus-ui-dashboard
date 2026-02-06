import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-white text-slate-900 dark:bg-[#020617] dark:text-white antialiased transition-colors duration-300`}
      >
        {/* Render halaman secara langsung tanpa bungkus sidebar di sini */}
        {children}

        <Toaster 
          position="top-right" 
          richColors 
          expand={false} 
          closeButton
          theme="system" 
        />
      </body>
    </html>
  );
}