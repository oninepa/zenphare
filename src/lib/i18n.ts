export const locales = ["en", "ko", "es", "fr", "zh", "ja"] as const;
export type Locale = (typeof locales)[number];
