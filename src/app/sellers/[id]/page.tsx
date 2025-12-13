import SellerProfileClient from './SellerProfileClient';

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default function SellerProfilePage() {
  return <SellerProfileClient />;
}
