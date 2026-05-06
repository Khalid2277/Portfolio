import { redirect } from 'next/navigation';

// Legacy redirect parity: /solutions → /portfolio (was 301 in netlify.toml).
// Next renders this as a static page that performs a runtime redirect.
export default function SolutionsIndex(): never {
  redirect('/portfolio');
}
