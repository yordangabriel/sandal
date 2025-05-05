import { Metadata } from 'next';
import SandalsProduct from '@/components/product/SandalsProduct';

export const metadata: Metadata = {
  title: 'Premium Sandals | Barely Used - 3 Days Only',
  description: 'Premium quality sandals, barely used for only 3 days. In pristine condition with all original packaging.',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <SandalsProduct />
    </main>
  );
}