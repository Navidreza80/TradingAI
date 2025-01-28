// توابع کمکی و utility ها
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fa-IR').format(date);
}

/**
 * Convert numbers to Persian/Arabic numerals
 */
export const convertToLocaleNumber = (num: number, locale: string): string => {
  if (locale === 'fa' || locale === 'ar') {
    return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'ar-SA').format(num);
  }
  return num.toString();
}; 