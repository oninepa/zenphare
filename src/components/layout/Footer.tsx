"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Youtube, Instagram, Twitter, AtSign } from "lucide-react";

interface FooterProps {
  usageGuide?: string;
}

export const Footer: React.FC<FooterProps> = ({
  usageGuide = "Welcome to Zenphare! This mindfulness app helps you track your daily wellness journey. Use the dashboard to monitor your progress, set goals, and access guided meditation sessions. For best results, check in daily and explore all features available.",
}) => {
  const [clickCount, setClickCount] = useState(0);

  const handleZenphareClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 2) {
      // Open admin panel on third click
      window.open("/admin", "_blank");
      setClickCount(0);
    }
  };

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Usage Guide Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Usage Guide</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {usageGuide}
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Contact</h3>
            <div className="space-y-2">
              <Link
                href="mailto:info@21c-info.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <AtSign className="h-4 w-4" />
                <span>info@21c-info.com</span>
              </Link>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://youtube.com/@zenphare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-red-600 transition-colors duration-200"
                aria-label="Follow us on YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>

              <Link
                href="https://instagram.com/zenphare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-600 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>

              <Link
                href="https://threads.net/@zenphare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gray-800 transition-colors duration-200"
                aria-label="Follow us on Threads"
              >
                <AtSign className="h-5 w-5" />
              </Link>

              <Link
                href="https://x.com/zenphare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gray-800 transition-colors duration-200"
                aria-label="Follow us on X"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}
              <span
                className="cursor-default select-none ml-1"
                onClick={handleZenphareClick}
              >
                Zenphare
              </span>
              . All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              Mindfulness for modern life
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
