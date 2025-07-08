"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  Square,
  Volume2,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface AdvancedSettings {
  baseFrequency: number;
  beatFrequency: number;
  isIsochronic: boolean;
  leftEar: number;
  rightEar: number;
}

interface AudioControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  musicVolume: number;
  backgroundVolume: number;
  brainwaveVolume: number;
  onMusicVolumeChange: (volume: number) => void;
  onBackgroundVolumeChange: (volume: number) => void;
  onBrainwaveVolumeChange: (volume: number) => void;
  deviceType: string;
  onAdvancedSettingsApply: (settings: AdvancedSettings) => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onStop,
  musicVolume,
  backgroundVolume,
  brainwaveVolume,
  onMusicVolumeChange,
  onBackgroundVolumeChange,
  onBrainwaveVolumeChange,
  deviceType,
  onAdvancedSettingsApply,
}) => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    baseFrequency: 440,
    beatFrequency: 10,
    isIsochronic: false,
    leftEar: 0,
    rightEar: 0,
  });

  const isIsochronicAvailable =
    deviceType === "stereo" || deviceType === "external";

  const handleAdvancedSettingChange = <K extends keyof AdvancedSettings>(
    key: K,
    value: AdvancedSettings[K]
  ) => {
    setAdvancedSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyAdvancedSettings = () => {
    onAdvancedSettingsApply(advancedSettings);
  };

  const VolumeControl = ({
    label,
    value,
    onChange,
    icon,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon?: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <Label className="text-sm font-medium text-muted-foreground">
            {label}
          </Label>
        </div>
        <span className="text-sm font-semibold text-primary">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  );

  return (
    <Card className="w-full bg-white shadow-lg border border-border">
      <CardContent className="p-6 space-y-6">
        {/* Main Playback Controls */}
        <div className="flex justify-center items-center space-x-4">
          <Button
            size="lg"
            variant="outline"
            onClick={onStop}
            className="w-16 h-16 rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={!isPlaying && !isPaused}
          >
            <Square className="w-6 h-6" />
          </Button>

          <Button
            size="lg"
            onClick={isPlaying ? onPause : onPlay}
            className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-lg hover:shadow-xl scale-100 hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            className="w-16 h-16 rounded-full border-2 border-muted-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Volume Controls */}
        <div className="space-y-6">
          <VolumeControl
            label="Music"
            value={musicVolume}
            onChange={onMusicVolumeChange}
            icon={<Volume2 className="w-4 h-4 text-muted-foreground" />}
          />

          <VolumeControl
            label="Background"
            value={backgroundVolume}
            onChange={onBackgroundVolumeChange}
            icon={<Volume2 className="w-4 h-4 text-muted-foreground" />}
          />

          <VolumeControl
            label="Brainwave"
            value={brainwaveVolume}
            onChange={onBrainwaveVolumeChange}
            icon={<Volume2 className="w-4 h-4 text-muted-foreground" />}
          />
        </div>

        {/* Advanced Settings Toggle */}
        <Button
          variant="ghost"
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          className="w-full flex items-center justify-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          <span className="text-sm font-medium">Advanced Settings</span>
          {showAdvancedSettings ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>

        {/* Advanced Settings Panel */}
        {showAdvancedSettings && (
          <div className="space-y-6 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
            {/* Base Frequency */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-muted-foreground">
                  Base Frequency
                </Label>
                <span className="text-sm font-semibold text-primary">
                  {advancedSettings.baseFrequency} Hz
                </span>
              </div>
              <Slider
                value={[advancedSettings.baseFrequency]}
                onValueChange={(values) =>
                  handleAdvancedSettingChange("baseFrequency", values[0])
                }
                min={100}
                max={1000}
                step={10}
                className="w-full"
              />
            </div>

            {/* Beat Frequency */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-muted-foreground">
                  Beat Frequency
                </Label>
                <span className="text-sm font-semibold text-primary">
                  {advancedSettings.beatFrequency} Hz
                </span>
              </div>
              <Slider
                value={[advancedSettings.beatFrequency]}
                onValueChange={(values) =>
                  handleAdvancedSettingChange("beatFrequency", values[0])
                }
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            {/* Isochronic Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Isochronic Tones
                  </Label>
                  {!isIsochronicAvailable && (
                    <p className="text-xs text-muted-foreground">
                      Available only for stereo/external speakers
                    </p>
                  )}
                </div>
                <Switch
                  checked={advancedSettings.isIsochronic}
                  onCheckedChange={(checked) =>
                    handleAdvancedSettingChange("isIsochronic", checked)
                  }
                  disabled={!isIsochronicAvailable}
                />
              </div>

              {/* Left/Right Ear Inputs - Only show if Isochronic is enabled */}
              {advancedSettings.isIsochronic && isIsochronicAvailable && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="leftEar"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Left Ear (Hz)
                    </Label>
                    <Input
                      id="leftEar"
                      type="number"
                      value={advancedSettings.leftEar}
                      onChange={(e) =>
                        handleAdvancedSettingChange(
                          "leftEar",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="text-center"
                      min="0"
                      max="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="rightEar"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Right Ear (Hz)
                    </Label>
                    <Input
                      id="rightEar"
                      type="number"
                      value={advancedSettings.rightEar}
                      onChange={(e) =>
                        handleAdvancedSettingChange(
                          "rightEar",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="text-center"
                      min="0"
                      max="1000"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <Button
              onClick={handleApplyAdvancedSettings}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
            >
              Apply Settings
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
