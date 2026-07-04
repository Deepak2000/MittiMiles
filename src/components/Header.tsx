"use client";

import React, { useState, useEffect } from "react";
import { Compass, Menu, X, Globe } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-bg/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-orange-100/50 dark:border-zinc-800/50 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-xl text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MittiMiles
          </span>
        </a>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#story"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary transition-colors"
          >
            Our Story
          </a>
          <a
            href="#problem"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary transition-colors"
          >
            The Issue
          </a>
          <a
            href="#solution"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary transition-colors"
          >
            Our Solution
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-secondary transition-colors">
            <Globe className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
          <a href="/discovery" className="px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-full shadow-md shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all duration-200">
            Launch Discovery
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-primary focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-bg dark:bg-zinc-950 border-b border-orange-100 dark:border-zinc-800 py-6 px-6 shadow-xl flex flex-col space-y-4 animate-in slide-in-from-top-4 duration-200">
          <a
            href="#story"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-primary"
          >
            Our Story
          </a>
          <a
            href="#problem"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-primary"
          >
            The Issue
          </a>
          <a
            href="#solution"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-primary"
          >
            Our Solution
          </a>
          <hr className="border-orange-100 dark:border-zinc-800" />
          <div className="flex flex-col space-y-3 pt-2">
            <button className="w-full py-3 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 rounded-full">
              Language (EN)
            </button>
            <a href="/discovery" className="w-full py-3 text-center text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-full shadow-lg">
              Launch Discovery
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
