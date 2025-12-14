import SellerProfileClient from './SellerProfileClient';

export async function generateStaticParams() {
  try {
    // Fetch all sellers from the composite microservice at BUILD TIME
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://composite-microservice-471529071641.us-east1.run.app';
    const response = await fetch(`${API_URL}/api/users`);
    
    if (!response.ok) {
      console.error('Failed to fetch users for static generation');
      return [{ id: '1' }]; // Fallback to single page
    }
    
    const users = await response.json();
    
    // Generate a page for each user
    return users.map((user: { user_id: string }) => ({
      id: user.user_id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ id: '1' }]; // Fallback to single page
  }
}

export default function SellerProfilePage() {
  return <SellerProfileClient />;
}
