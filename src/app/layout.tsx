"use client";  // Ensure it's a client component for hooks

import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();  // Get the current URL path

  const isActive = (route: string) => pathname === route;  // Function to check if link is active

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ backgroundColor: '#F5F5F7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <nav style={{ backgroundColor: '#705C53', padding: '1rem', color: '#F5F5F7', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            
            <Link
              href="/"
              style={{
                margin: '0 1rem',
                padding: '0.5rem 1rem',
                color: isActive("/") ? "#705C53" : "#F5F5F7",
                backgroundColor: isActive("/") ? "#F5F5F7" : "transparent",
                borderRadius: "8px",
                border: isActive("/") ? "2px solid #705C53" : "none",
                textDecoration: "none",
                fontWeight: isActive("/") ? "bold" : "normal",
              }}
            >
              Shopfront
            </Link>

            <Link
              href="/manage"
              style={{
                margin: '0 1rem',
                padding: '0.5rem 1rem',
                color: isActive("/manage") ? "#705C53" : "#F5F5F7",
                backgroundColor: isActive("/manage") ? "#F5F5F7" : "transparent",
                borderRadius: "8px",
                border: isActive("/manage") ? "2px solid #705C53" : "none",
                textDecoration: "none",
                fontWeight: isActive("/manage") ? "bold" : "normal",
              }}
            >
              Manage Products
            </Link>

            <Link
              href="/search"
              style={{
                margin: '0 1rem',
                padding: '0.5rem 1rem',
                color: isActive("/search") ? "#705C53" : "#F5F5F7",
                backgroundColor: isActive("/search") ? "#F5F5F7" : "transparent",
                borderRadius: "8px",
                border: isActive("/search") ? "2px solid #705C53" : "none",
                textDecoration: "none",
                fontWeight: isActive("/search") ? "bold" : "normal",
              }}
            >
              Search
            </Link>

          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
