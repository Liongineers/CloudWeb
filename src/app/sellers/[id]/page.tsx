import SellerProfileClient from './SellerProfileClient';

// For static export, we need to specify which paths to pre-generate
// These are just examples - in production, you'd fetch from API or allow client-side routing
export function generateStaticParams() {
  return [
    // { id: 'a0af41aa-a456-45ce-9e5a-963a3972338c' },
    // // { id: '81c78020-90d3-4e07-b186-0846333b04ec' },
  ];
}

export default function SellerProfilePage() {
  return <SellerProfileClient />;
}
