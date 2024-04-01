import { Buyer, User } from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
  user?: User;
  role?: Buyer;
};
