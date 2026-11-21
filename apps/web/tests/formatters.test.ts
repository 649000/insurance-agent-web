import { describe, it, expect } from 'vitest';
import { formatSgd, formatSgDate, formatSgDateLong } from '@insurance-agent/shared';

describe('Singapore Locale Formatters', () => {
  it('formats SGD currency with S$ prefix and 2 decimals', () => {
    expect(formatSgd(1500)).toBe('S$ 1,500.00');
    expect(formatSgd(2400.5)).toBe('S$ 2,400.50');
    expect(formatSgd(0)).toBe('S$ 0.00');
  });

  it('formats SGD currency in compact notation', () => {
    expect(formatSgd(500000, { compact: true })).toBe('S$ 500K');
    expect(formatSgd(1500000, { compact: true })).toBe('S$ 1.5M');
  });

  it('formats date in Singapore DD/MM/YYYY standard', () => {
    // Note: Use UTC date or explicit ISO string to verify formatting
    const formatted = formatSgDate('2026-11-22T00:00:00Z');
    expect(formatted).toMatch(/^(21|22)\/11\/2026$/);
  });

  it('formats date in Singapore readable DD MMM YYYY format', () => {
    const formatted = formatSgDateLong('2026-11-22T00:00:00Z');
    expect(formatted).toMatch(/2026/);
    expect(formatted).toMatch(/Nov/);
  });
});
