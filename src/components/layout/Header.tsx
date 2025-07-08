"use client";

import React, { useState } from "react";
import { ArrowLeft, Home, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";
import { LoginRegisterModal } from "@/components/auth/LoginModal";
import { HamburgerMenu } from "./HamburgerMenu";

interface HeaderProps {
  showBack?: boolean;
  showHome?: boolean;
  title?: string;
  onBack?: () => void;
  onHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  showBack = false,
  showHome = false,
  title = "Zenphare",
  onBack,
  onHome,
}) => {
  const t = useTranslations();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleHomeClick = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = "/";
    }
  };

  const handleLoginSuccess = (user: { name: string; email: string }) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    setIsLoginModalOpen(false);
  };

  const handleMenuItemClick = (item: string) => {
    console.log("Menu item clicked:", item);
    // TODO: 메뉴 항목별 로직 구현
    if (item === "logout") {
      setIsLoggedIn(false);
      setUserInfo({ name: "", email: "" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          {/* 왼쪽: 네비게이션 버튼들 */}
          <div className="flex items-center gap-2">
            {showBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="h-9 w-9 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4 text-gray-600" />
              </Button>
            )}

            {showHome && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHomeClick}
                className="h-9 w-9 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Home"
              >
                <Home className="h-4 w-4 text-gray-600" />
              </Button>
            )}
          </div>

          {/* 중앙: 앱 제목 */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-[#1F1F1F] tracking-tight">
              {title}
            </h1>
          </div>

          {/* 오른쪽: 언어 선택, 로그인, 햄버거 메뉴 */}
          <div className="flex items-center gap-2">
            {/* 언어 선택기 */}
            <LanguageSelector />

            {/* 로그인/사용자 버튼 */}
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 bg-[#8D7053] hover:bg-[#8D7053]/90 text-white rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
                onClick={() => setIsHamburgerMenuOpen(true)}
              >
                <User className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">
                  {userInfo.name || "User"}
                </span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoginModalOpen(true)}
                className="h-9 px-3 bg-[#8D7053] hover:bg-[#8D7053]/90 text-white rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <User className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Login</span>
              </Button>
            )}

            {/* 햄버거 메뉴 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsHamburgerMenuOpen(true)}
              className="h-9 w-9 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* 로그인 모달 */}
      <LoginRegisterModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* 햄버거 메뉴 */}
      <HamburgerMenu
        isOpen={isHamburgerMenuOpen}
        onClose={() => setIsHamburgerMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        onMenuItemClick={handleMenuItemClick}
      />
    </>
  );
};
