"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthStatus from "./AuthStatus";

export default function NavBar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="px-6 py-3 bg-gray-900 text-white shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold">
          Market Flick AI
        </Link>
        
        <div className="hidden md:flex space-x-4">
          <Link 
            href="/" 
            className={`hover:text-blue-400 transition ${isActive('/') ? 'text-blue-400' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/analyze" 
            className={`hover:text-blue-400 transition ${isActive('/analyze') ? 'text-blue-400' : ''}`}
          >
            Analyze
          </Link>
          <Link 
            href="/previous-analysis" 
            className={`hover:text-blue-400 transition ${isActive('/previous-analysis') ? 'text-blue-400' : ''}`}
          >
            Previous Analysis
          </Link>
        </div>
      </div>
      
      <AuthStatus />
    </nav>
  );
}
