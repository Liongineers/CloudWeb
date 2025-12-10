import SellerProfileClient from './SellerProfileClient';

// export async function generateStaticParams() {
//   const res = await fetch('https://composite-microservice-471529071641.us-east1.run.app/api/users');
//   const users = await res.json();
//   return users.map((user: { user_id: string }) => ({ id: user.user_id }));
// }

export default function SellerProfilePage() {
  return <SellerProfileClient />;
}
