export const SG_LOCALE = 'en-SG';
export const SG_TIMEZONE = 'Asia/Singapore';

/**
 * Formats a numeric amount in Singapore Dollars (SGD).
 * Standard Singapore notation uses the "S$" prefix followed by standard thousands grouping.
 *
 * Example:
 *   formatSgd(1500) -> "S$ 1,500.00"
 *   formatSgd(500000, { compact: true }) -> "S$ 500K"
 */
export function formatSgd(
  amount: number,
  options?: {
    compact?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  },
): string {
  if (options?.compact) {
    const formatted = new Intl.NumberFormat(SG_LOCALE, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(amount);
    return `S$ ${formatted}`;
  }

  const formatted = new Intl.NumberFormat(SG_LOCALE, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(amount);

  return `S$ ${formatted}`;
}

/**
 * Formats a date string (YYYY-MM-DD or ISO timestamp) into Singapore standard display: DD/MM/YYYY.
 *
 * Example:
 *   formatSgDate("2026-11-22") -> "22/11/2026"
 */
export function formatSgDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(SG_LOCALE, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: SG_TIMEZONE,
  }).format(date);
}

/**
 * Formats a date string into readable Singapore long format: DD MMM YYYY.
 *
 * Example:
 *   formatSgDateLong("2026-11-22") -> "22 Nov 2026"
 */
export function formatSgDateLong(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(SG_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: SG_TIMEZONE,
  }).format(date);
}
