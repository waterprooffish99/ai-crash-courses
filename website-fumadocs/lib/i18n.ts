export const languages = ['en'] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'en';

// Content is English-only today. Keeping locale configuration centralized lets a
// later phase add translated collections and locale-prefixed routes deliberately.
