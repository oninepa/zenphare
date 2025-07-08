"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, User, Grid3x3, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSituationSave: (data: any) => void;
  onPersonalSave: (data: any) => void;
}

interface SituationData {
  need: string;
  music: string;
  background: string;
  duration: string;
  space: string;
  device: string;
}

interface PersonalData {
  gender: string;
  birthDate: string;
  zodiac: string;
  mbti: string;
}

const zodiacSigns = [
  { name: "aries", start: [3, 21], end: [4, 19] },
  { name: "taurus", start: [4, 20], end: [5, 20] },
  { name: "gemini", start: [5, 21], end: [6, 21] },
  { name: "cancer", start: [6, 22], end: [7, 22] },
  { name: "leo", start: [7, 23], end: [8, 22] },
  { name: "virgo", start: [8, 23], end: [9, 22] },
  { name: "libra", start: [9, 23], end: [10, 22] },
  { name: "scorpio", start: [10, 23], end: [11, 21] },
  { name: "sagittarius", start: [11, 22], end: [12, 21] },
  { name: "capricorn", start: [12, 22], end: [1, 19] },
  { name: "aquarius", start: [1, 20], end: [2, 18] },
  { name: "pisces", start: [2, 19], end: [3, 20] },
];

const mbtiTypes = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
];

export const BottomNavigation = ({
  activeTab,
  onTabChange,
  onSituationSave,
  onPersonalSave,
}: BottomNavigationProps) => {
  const t = useTranslations();
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [situationData, setSituationData] = useState<SituationData>({
    need: "",
    music: "",
    background: "",
    duration: "",
    space: "",
    device: "",
  });
  const [personalData, setPersonalData] = useState<PersonalData>({
    gender: "",
    birthDate: "",
    zodiac: "",
    mbti: "",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const calculateZodiac = (birthDate: string) => {
    if (!birthDate) return "";
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;

      if (startMonth === endMonth) {
        if (month === startMonth && day >= startDay && day <= endDay) {
          return sign.name;
        }
      } else {
        if (
          (month === startMonth && day >= startDay) ||
          (month === endMonth && day <= endDay)
        ) {
          return sign.name;
        }
      }
    }
    return "";
  };

  useEffect(() => {
    const zodiac = calculateZodiac(personalData.birthDate);
    setPersonalData((prev) => ({ ...prev, zodiac }));
  }, [personalData.birthDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    setShowDropdown(showDropdown === tab ? null : tab);
  };

  const handleSituationSave = () => {
    onSituationSave(situationData);
    setShowDropdown(null);
  };

  const handlePersonalSave = () => {
    onPersonalSave(personalData);
    setShowDropdown(null);
  };

  const OptionButton = ({
    value,
    selectedValue,
    onSelect,
    children,
  }: {
    value: string;
    selectedValue: string;
    onSelect: (value: string) => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => onSelect(value)}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        selectedValue === value
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  const renderSituationDropdown = () => (
    <div className="space-y-6 p-6">
      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          Need
        </Label>
        <div className="flex flex-wrap gap-2">
          {[
            "Meditation",
            "Focus",
            "Sleep",
            "Study",
            "Work",
            "Creativity",
            "Love",
            "Healing",
            "Memory",
            "Walking",
            "Hiking",
            "Exercise",
          ].map((item) => (
            <OptionButton
              key={item}
              value={item}
              selectedValue={situationData.need}
              onSelect={(value) =>
                setSituationData((prev) => ({ ...prev, need: value }))
              }
            >
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          Music Selection
        </Label>
        <div className="flex flex-wrap gap-2">
          {["Classical", "Ballad", "Jazz", "Meditation", "Rock"].map((item) => (
            <OptionButton
              key={item}
              value={item}
              selectedValue={situationData.music}
              onSelect={(value) =>
                setSituationData((prev) => ({ ...prev, music: value }))
              }
            >
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          Background Selection
        </Label>
        <div className="flex flex-wrap gap-2">
          {[
            "Rain Sound",
            "Nature Sound",
            "Cafe Sound",
            "City Sound",
            "Animal Sound",
          ].map((item) => (
            <OptionButton
              key={item}
              value={item}
              selectedValue={situationData.background}
              onSelect={(value) =>
                setSituationData((prev) => ({ ...prev, background: value }))
              }
            >
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          Time Selection
        </Label>
        <div className="flex flex-wrap gap-2">
          {[
            "10min",
            "30min",
            "1hour",
            "2hours",
            "3hours",
            "6hours",
            "12hours",
          ].map((item) => (
            <OptionButton
              key={item}
              value={item}
              selectedValue={situationData.duration}
              onSelect={(value) =>
                setSituationData((prev) => ({ ...prev, duration: value }))
              }
            >
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          Space Information
        </Label>
        <div className="flex flex-wrap gap-2">
          {["Indoor", "Outdoor"].map((item) => (
            <OptionButton
              key={item}
              value={item}
              selectedValue={situationData.space}
              onSelect={(value) =>
                setSituationData((prev) => ({ ...prev, space: value }))
              }
            >
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          Audio Device
        </Label>
        <div className="flex flex-wrap gap-2">
          {[
            "Phone Speaker",
            "Regular Earphones",
            "Stereo Earphones",
            "External Speaker",
          ].map((item) => (
            <OptionButton
              key={item}
              value={item}
              selectedValue={situationData.device}
              onSelect={(value) =>
                setSituationData((prev) => ({ ...prev, device: value }))
              }
            >
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <Button onClick={handleSituationSave} className="w-full mt-6">
        Save
      </Button>
    </div>
  );

  const renderPersonalDropdown = () => (
    <div className="space-y-6 p-6">
      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          Gender
        </Label>
        <div className="flex gap-2">
          {["Male", "Female"].map((item) => (
            <OptionButton
              key={item}
              value={item}
              selectedValue={personalData.gender}
              onSelect={(value) =>
                setPersonalData((prev) => ({ ...prev, gender: value }))
              }
            >
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <Label
          htmlFor="birthDate"
          className="text-sm font-semibold text-foreground mb-3 block"
        >
          Birth Date
        </Label>
        <Input
          id="birthDate"
          type="date"
          value={personalData.birthDate}
          onChange={(e) =>
            setPersonalData((prev) => ({ ...prev, birthDate: e.target.value }))
          }
          className="w-full"
        />
      </div>

      {personalData.zodiac && (
        <div>
          <Label className="text-sm font-semibold text-foreground mb-3 block">
            Zodiac Sign
          </Label>
          <div className="p-3 bg-muted rounded-lg">
            <span className="text-foreground font-medium capitalize">
              {personalData.zodiac}
            </span>
          </div>
        </div>
      )}

      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">
          MBTI
          <a
            href="https://www.16personalities.com/free-personality-test"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center text-primary hover:text-primary/80 text-xs"
          >
            <ExternalLink size={12} className="mr-1" />
            Test
          </a>
        </Label>
        <div className="grid grid-cols-4 gap-2">
          {mbtiTypes.map((type) => (
            <OptionButton
              key={type}
              value={type}
              selectedValue={personalData.mbti}
              onSelect={(value) =>
                setPersonalData((prev) => ({ ...prev, mbti: value }))
              }
            >
              {type}
            </OptionButton>
          ))}
        </div>
      </div>

      <Button onClick={handlePersonalSave} className="w-full mt-6">
        Save
      </Button>
    </div>
  );

  const renderOtherDropdown = () => (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="aspect-square h-16 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {showDropdown && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-200"
          onClick={() => setShowDropdown(null)}
        />
      )}

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="fixed bottom-20 left-0 right-0 z-50 mx-4 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-2"
        >
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-0 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-center py-2 border-b border-border">
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              </div>
              {showDropdown === "Situation" && renderSituationDropdown()}
              {showDropdown === "You" && renderPersonalDropdown()}
              {showDropdown === "Other" && renderOtherDropdown()}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-lg">
        <div className="flex h-20 items-center justify-around px-4">
          {/* Situation Tab */}
          <button
            onClick={() => handleTabClick("Situation")}
            className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 ${
              activeTab === "Situation" || showDropdown === "Situation"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Settings
              size={22}
              className={`mb-1 transition-transform duration-200 ${
                showDropdown === "Situation" ? "scale-110" : ""
              }`}
            />
            <span className="text-xs font-medium">Situation</span>
          </button>

          {/* You Tab */}
          <button
            onClick={() => handleTabClick("You")}
            className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 ${
              activeTab === "You" || showDropdown === "You"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User
              size={22}
              className={`mb-1 transition-transform duration-200 ${
                showDropdown === "You" ? "scale-110" : ""
              }`}
            />
            <span className="text-xs font-medium">You</span>
          </button>

          {/* Other Tab */}
          <button
            onClick={() => handleTabClick("Other")}
            className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 ${
              activeTab === "Other" || showDropdown === "Other"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid3x3
              size={22}
              className={`mb-1 transition-transform duration-200 ${
                showDropdown === "Other" ? "scale-110" : ""
              }`}
            />
            <span className="text-xs font-medium">Other</span>
          </button>
        </div>
      </div>
    </>
  );
};
