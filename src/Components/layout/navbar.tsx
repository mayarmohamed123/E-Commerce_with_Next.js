"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Import the correct hook
import { Search, User } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuTrigger, Input } from "../ui";


export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/categories", label: "Categories" },
    { path: "/brands", label: "Brands" },
    { path: "/orders", label: "Orders" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 🔹 Logo Section */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent-blue rounded-lg flex items-center justify-center">
              <span className="text-[#ffffff] font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl text-foreground">
              EliteStore
            </span>
          </Link>

          {/* 🔹 Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Search Bar  */}
          <div className="hidden lg:flex items-center max-w-sm w-full mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input type="text" placeholder="Search product" className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
