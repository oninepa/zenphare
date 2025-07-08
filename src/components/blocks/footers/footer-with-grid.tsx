import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export function FooterWithGrid() {
  return (
    <div className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="border-b border-border pb-2">
          <div className="mb-10 max-w-xl">
            <Logo className="justify-start" />
            <p className="mb-4 text-sm text-muted-foreground">
              Revolutionizing brain wellness through advanced synchronization
              technology.
            </p>
            <div className="text-sm text-foreground">
              A product by{" "}
              <Link
                href="/"
                className="font-medium text-secondary underline hover:text-primary"
              >
                Zenphare
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 border-b border-border pb-10 pt-10 md:grid-cols-5">
          <ul className="text-base font-medium text-foreground">
            <li className="mb-4 text-sm font-bold text-secondary">Product</li>
            {PRODUCT_LINKS.map((item, idx) => (
              <li key={"product" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-foreground">
            <li className="mb-4 text-sm font-bold text-secondary">Company</li>
            {COMPANY_LINKS.map((item, idx) => (
              <li key={"company" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-foreground">
            <li className="mb-4 text-sm font-bold text-secondary">Support</li>
            {SUPPORT_LINKS.map((item, idx) => (
              <li key={"support" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-foreground">
            <li className="mb-4 text-sm font-bold text-secondary">
              Google AdSense
            </li>
            {ADSENSE_LINKS.map((item, idx) => (
              <li key={"adsense" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-base font-medium text-foreground">
            <div className="mb-4 text-sm font-bold text-secondary">
              Follow Us
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/zenphare"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com/zenphare"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/zenphare"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/zenphare"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="text-secondary font-medium">Contact</div>
              <div className="text-muted-foreground">support@zenphare.com</div>
              <div className="text-muted-foreground">1-800-ZENPHARE</div>
            </div>
          </div>
        </div>

        <p className="mb-4 pt-10 text-sm text-muted-foreground">
          © 2024 Zenphare. All rights reserved.
        </p>
      </div>
    </div>
  );
}

const PRODUCT_LINKS = [
  { title: "Download App", href: "/download" },
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Support", href: "/support" },
  { title: "User Guide", href: "/user-guide" },
];

const COMPANY_LINKS = [
  { title: "About Us", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Press", href: "/press" },
  { title: "Blog", href: "/blog" },
  { title: "Privacy Policy", href: "/privacy" },
];

const SUPPORT_LINKS = [
  { title: "Help Center", href: "/help" },
  { title: "Contact Us", href: "/contact" },
  { title: "System Status", href: "/status" },
  { title: "Community", href: "/community" },
  { title: "Documentation", href: "/docs" },
];

const ADSENSE_LINKS = [
  { title: "Advertising Partners", href: "/advertising" },
  { title: "Ad Policies", href: "/ad-policies" },
  { title: "Advertise With Us", href: "/advertise" },
  { title: "Partner Program", href: "/partners" },
];

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex flex-shrink-0 items-center justify-center space-x-2 py-6 text-center text-2xl font-bold text-secondary selection:bg-primary",
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md border border-secondary bg-secondary text-sm text-white antialiased md:h-6 md:w-6">
        <div className="absolute inset-x-0 -top-10 h-10 w-full rounded-full bg-white/[0.2] blur-xl" />
        <div className="relative z-20 text-sm text-white">Z</div>
      </div>
      <div className={cn("flex items-center gap-2 text-xl text-secondary")}>
        Zenphare
      </div>
    </Link>
  );
};
