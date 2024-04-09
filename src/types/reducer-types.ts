import { Buyer, Seller, User } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  role: Buyer | Seller | null;
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
