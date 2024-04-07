import { AxiosError } from "axios";
import { Buyer, User } from "./types";

export type MessageResponse = {
  success: boolean;
  message?: string;
  user: User | null;
  role: Buyer | null;
};

export type AxiosErrorWithMessage = AxiosError & {
  response: {
    data: {
      message: string;
    };
    status: number;
    statusText: string;
    request: XMLHttpRequest;
  };
};

export type RegisterBuyer = {
  fname: string;
  lname: string;
  email: string;
  password: string;
};

export type LoginBuyer = {
  email: string;
  password: string;
}

export type BuyerResponse = {
  success: boolean;
  user: User;
  buyer: Buyer;
};
