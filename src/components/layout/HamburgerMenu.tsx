"use client";

import React, { useEffect } from "react";
import {
  User,
  Lock,
  MessageSquare,
  Mail,
  Shield,
  LogOut,
  Trash,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  userInfo?: { name: string; email: string };
  onMenuItemClick: (item: string) => void;
}

interface MenuItem {
  id: string;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
  isDestructive?: boolean;
}

const menuItems: MenuItem[] = [
  { id: "change-username", labelKey: "changeUsername", icon: User },
  { id: "change-password", labelKey: "changePassword", icon: Lock },
  {
    id: "customer-suggestions",
    labelKey: "customerSuggestions",
    icon: MessageSquare,
  },
  { id: "contact-admin", labelKey: "contactAdmin", icon: Mail },
  { id: "legal-issues", labelKey: "legalIssues", icon: Shield },
  { id: "logout", labelKey: "logout", icon: LogOut, isDestructive: true },
  {
    id: "delete-account",
    labelKey: "deleteAccount",
    icon: Trash,
    isDestructive: true,
  },
];

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  userInfo,
  onMenuItemClick,
}) => {
  const t = useTranslations();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Tab") {
        const menuElement = document.getElementById("hamburger-menu");
        if (!menuElement?.contains(e.target as Node)) {
          e.preventDefault();
          const firstMenuItem = menuElement?.querySelector(
            '[role="menuitem"]'
          ) as HTMLElement;
          firstMenuItem?.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.isDestructive) {
      const confirmed = window.confirm(
        `Are you sure you want to ${item.labelKey
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()}?`
      );
      if (confirmed) {
        onMenuItemClick(item.id);
        onClose();
      }
    } else {
      onMenuItemClick(item.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-title"
    >
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300" />

      {/* Menu panel */}
      <div
        id="hamburger-menu"
        className={`
          relative w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
        role="menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 id="menu-title" className="text-xl font-semibold text-[#1F1F1F]">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8D7053]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-[#6b7280]" />
          </button>
        </div>

        {/* User Info Section */}
        {isLoggedIn && userInfo && (
          <div className="px-6 py-4 bg-[#f9f9f9] border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-[#8D7053] rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1F1F1F] truncate">
                  {userInfo.name}
                </p>
                <p className="text-xs text-[#6b7280] truncate">
                  {userInfo.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4">
          <ul role="none" className="space-y-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <li key={item.id} role="none">
                  <button
                    onClick={() => handleMenuItemClick(item)}
                    className={`
                      w-full flex items-center px-4 py-3 text-left rounded-lg text-sm font-medium
                      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8D7053]
                      ${
                        item.isDestructive
                          ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                          : "text-[#1F1F1F] hover:bg-[#8D7053]/5 hover:text-[#2D5016]"
                      }
                      active:scale-[0.98]
                    `}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleMenuItemClick(item);
                      }
                    }}
                  >
                    <IconComponent
                      className={`
                        h-5 w-5 mr-3 flex-shrink-0
                        ${
                          item.isDestructive ? "text-red-500" : "text-[#6b7280]"
                        }
                      `}
                    />
                    <span className="truncate">
                      {item.labelKey === "changeUsername" && "Change Username"}
                      {item.labelKey === "changePassword" && "Change Password"}
                      {item.labelKey === "customerSuggestions" &&
                        "Customer Suggestions"}
                      {item.labelKey === "contactAdmin" && "Contact Admin"}
                      {item.labelKey === "legalIssues" && "Legal Issues"}
                      {item.labelKey === "logout" && "Logout"}
                      {item.labelKey === "deleteAccount" && "Delete Account"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-[#6b7280]">Zenphare Health App</p>
            <p className="text-xs text-[#6b7280] mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
