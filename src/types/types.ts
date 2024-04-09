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
  productName: string;
  productImg: string;
  price: number;
  stock: number;
  seller: string;
}
