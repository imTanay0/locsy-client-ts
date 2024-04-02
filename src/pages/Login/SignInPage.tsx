import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import GoogleIcon from "@/assets/GoogleIcon.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/firebase";

import {
  buyerLoginFailure,
  buyerLoginStart,
  buyerLoginSuccess,
} from "@/redux/slice/buyerSlice";
import { server } from "@/redux/store";
import { AxiosErrorWithData } from "@/types/api-types";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  accountType: z.enum(["buyer", "seller"]),
});

const SignInPage = () => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const accountType = form.watch("accountType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (accountType === "buyer") {
      const buyer = {
        email: values.email,
        password: values.password,
      };

      try {
        dispatch(buyerLoginStart());
        const { data } = await axios.post(
          `${server}/api/v1/buyer/login`,
          buyer
        );

        toast.success(data.message);
        dispatch(buyerLoginSuccess(data.message));
      } catch (error) {
        if (error instanceof Error) {
          const errorMessage = (error as AxiosErrorWithData).response?.data
            .message;
          toast.error(errorMessage);
          dispatch(buyerLoginFailure(errorMessage));
        } else {
          console.error(error);
        }
      }
    }

    if (accountType === "seller") {
      console.log(values);
    }

    // form.reset();
  }

  const googleLoginHandler = async () => {
    if (accountType === "buyer") {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
    }
  };

  return (
    <main className="min-h-[100svh] flex flex-col items-center p-5 md:p-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full pt-3 flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="mx-auto text-base md:text-lg">Or</p>
            <Button
              className="w-full"
              variant={"outline"}
              onClick={googleLoginHandler}
            >
              <span className="flex items-center gap-1">
                <img src={GoogleIcon} alt="google_icon" className="w-8" />
                Login with google
              </span>
            </Button>
          </div>
        </form>
      </Form>

      <Separator className="my-8 max-w-md w-full bg-gray-400" />

      <div className="flex max-w-md w-full justify-center gap-2 text-sm md:text-base">
        <p>Don't have an account?</p>
        <Link to="/register" className="hover:underline underline-offset-2">
          Register here
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
