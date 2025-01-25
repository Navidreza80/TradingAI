// type saftey
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fa-IR').format(date);
} 