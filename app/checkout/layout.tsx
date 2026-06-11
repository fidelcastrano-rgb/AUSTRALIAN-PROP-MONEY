import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout | Australian Prop Money',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
