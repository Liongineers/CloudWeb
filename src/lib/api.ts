const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://composite-microservice-471529071641.us-east1.run.app';

export interface User {
  user_id: string;
  name: string;
  role: string;
  phonenumber: string | null;
  merch: string | null;
}

export interface Product {
  prod_id: string;
  prod_name: string;
  category: string;
  seller_info: string;
  description: string | null;
  availability: number;
  price: number;
  condition: string | null;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  review_id?: string;
  writer_id: string;
  seller_id?: string;
  rating?: number;
  stars?: number;
  comment: string | null;
  created_at?: string;
  updated_at?: string;
  latest_update?: string;
}

export interface SellerProfile {
  seller: User;
  products: Product[];
  reviews: Review[];
  statistics: {
    totalProducts: number;
    averageRating: number;
    totalReviews: number;
  };
}

export interface CreateProductData {
  prod_name: string;
  category: string;
  seller_info: string;
  description: string;
  availability: number;
  price: number;
  condition: string;
  quantity: number;
}

export interface CreateReviewData {
  writer_id: string;
  seller_id: string;
  rating: number;
  comment: string;
}

export interface CreateUserData {
  name: string;
  role: string;
  phoneNumber: string;
  merch: string;
}

export const api = {
  async getSellerProfile(sellerId: string): Promise<SellerProfile> {
    const res = await fetch(`${API_BASE_URL}/api/sellers/${sellerId}/profile`);
    if (!res.ok) throw new Error('Failed to fetch seller profile');
    return res.json();
  },

  async getUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE_URL}/api/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async createProduct(data: CreateProductData) {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      let errorMessage = 'Failed to create product';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    return res.json();
  },

  async createReview(data: CreateReviewData) {
    const res = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to create review');
    }
    return res.json();
  },

  async createUser(data: CreateUserData) {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to create user');
    }
    return res.json();
  },
};

