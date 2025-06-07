import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="flex">
            <div className="bg-black text-gray-200 max-w-[250px] h-screen overflow-y-auto md:min-w-[220px]">
              <Sidebar />
            </div>
            <div className="bg-[#212121] flex-1 h-screen overflow-hidden relative text-gray-200">
              <Header />
              {children}
            </div>
          </div>
        </SessionProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {background: "#000000", color: "#ffffff"}
          }}/>
      </body>
    </html>
  );
}
