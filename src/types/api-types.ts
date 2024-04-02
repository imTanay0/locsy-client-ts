import { AxiosError } from "axios";
import { Buyer, User } from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
  user?: User;
  role?: Buyer;
};

export type AxiosErrorWithData = AxiosError & {
  response: {
    data: MessageResponse;
    status: number;
    statusText: string;
    request: XMLHttpRequest;
  };
};

