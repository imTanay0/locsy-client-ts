import { Buyer, User } from "./types";

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

export type BuyerState = {
  user: User | null;  
  buyer: Buyer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
