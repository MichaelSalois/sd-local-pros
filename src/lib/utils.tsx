import {
  Wrench,
  Zap,
  Thermometer,
  Home,
  TreePine,
  Sparkles,
  Paintbrush,
  Bug,
  Hammer,
  DoorOpen,
} from 'lucide-react';

/** Map category icon names to Lucide components */
export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Zap,
  Thermometer,
  Home,
  TreePine,
  Sparkles,
  Paintbrush,
  Bug,
  Hammer,
  DoorOpen,
};

/** Convert a name to a URL slug */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Convert a slug to a readable name */
export function fromSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Format a phone number */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

/** Format currency */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Get a canonical URL */
export function getCanonicalUrl(path: string): string {
  return `https://sdlocalpros.com${path}`;
}
