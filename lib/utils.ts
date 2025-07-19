import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate un nombre en devise FCFA
 * @param amount - Le montant à formater
 * @param options - Options de formatage
 * @returns Le montant formaté en FCFA
 */
export function formatCurrency(
  amount: number,
  options: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {},
) {
  const {
    locale = 'fr-FR',
    currency = 'XOF',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(amount);
}

/**
 * Formate un nombre en FCFA (version simplifiée)
 * @param amount - Le montant à formater
 * @returns Le montant formaté en FCFA
 */
export function formatFCFA(amount: number) {
  return formatCurrency(amount);
}
