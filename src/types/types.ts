export interface Login {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  contactNo: string;
  role: number;
}

export interface Buyer {
  _id: string;
  userId: string;
  addresses?: AddressUser[];
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Seller {
  _id: string;
  userId: string;
  shopName: string;
  shopImage: {
    public_id: string;
    url: string;
  };
  shopDescription: string;
  subscription?: string;
  shopAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  isApproved: boolean;
  approvalDetails?: {
    reason?: string;
    adminUserId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface AddressUser {
  address?: string;
  isDefault?: boolean;
}

export interface Product {
  _id: string;
  productId: string;
  productName: string;
  productDescription: string;
  price: number;
  discount: number;
  mainImage: Image;
  sellerId: string;
  rating?: number;
  stock: number;
}

export interface Image {
  image: {
    public_id: string;
    url: string;
  };
}

export interface Cart {
  buyerId: string;
  products: CartProduct[];
  totalPrice: number;
  totalItems: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartProduct {
  productId: string;
  productName: string;
  productDescription: string;
  price: number;
  stock: number;
  quantity: number;
  ProductImage: {
    public_id: string;
    url: string;
  };
  sellerName: string;
  createdAt: Date;
  updatedAt: Date;
}
