import { Address, Buyer, Cart, Product, Role, User } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface BuyerReducerInitialState {
  user: User | null;
  buyer: Buyer | null;
  role: Buyer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface ProductInititalState {
  products: Product[];
  product: Product | null;
  isLoading: boolean;
  isError: boolean;
}

export type BuyerRegisterData = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  address?: string;
  role: string;
};

export type BuyerState = {
  user: User | null;
  buyer: Buyer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
};

export type CartInitialState = {
  cart: Cart | null;
  isLoading: boolean;
};

export interface AddressInitialState {
  address: Address | null;
  contactNo: string | null;
  isLoading: boolean;
}
