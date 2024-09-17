interface Translations {
  [key: string]: string;
}

class TranslationService {
  private static instance: TranslationService;
  private translations: { [lang: string]: Translations } = {};
  private currentLang: string = 'en';

  // Constructor to load translation files
  private constructor() {
    try {
      this.translations['en'] = require('./locale/en.json');
      this.translations['de'] = require('./locale/de.json');
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  // Singleton instance
  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  // Method to change the language
  public setLanguage(lang: string) {
    if (this.translations[lang]) {
      this.currentLang = lang;
    } else {
      console.warn(`Language ${lang} not supported. Falling back to 'en'.`);
      this.currentLang = 'en'; // Fallback to default language
    }
  }

  // Method to translate a key
  public translate(key: string): string {
    const translation = this.translations[this.currentLang][key];
    if (!translation) {
      console.warn(`Translation for key "${key}" not found.`);
    }
    return translation || key; // Return key if not found
  }
}

export default TranslationService;
