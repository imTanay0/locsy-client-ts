import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

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

import LoadingButton from "@/components/loadingButton";
import { useBuyerLoginMutation } from "@/redux/api/buyerAPI";
import { useSellerLoginMutation } from "@/redux/api/sellerAPI";
import { loginFailure, loginSuccess } from "@/redux/slice/authSlice";
import { ErrorWithMessage } from "@/types/api-types";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  accountType: z.enum(["buyer", "seller"]),
});

const SignInPage = () => {
  const dispatch = useDispatch();
  const [loginBuyer] = useBuyerLoginMutation();
  const [loginSeller] = useSellerLoginMutation();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const accountType = form.watch("accountType");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (accountType === "buyer") {
      const buyer = {
        email: values.email,
        password: values.password,
      };

      try {
        setIsLoading(true);
        const data = await loginBuyer(buyer).unwrap();

        toast.success(data.message);
        dispatch(loginSuccess(data));

        setIsLoading(false);
      } catch (error) {
        // console.log("Error: ", error);
        const errorMessage = (error as ErrorWithMessage).data.message as string;

        toast.error(errorMessage);
        dispatch(loginFailure(errorMessage));
        setIsLoading(false);
      }
    }

    if (accountType === "seller") {
      setIsLoading(true);
      try {
        const data = await loginSeller({
          email: values.email,
          password: values.password,
        }).unwrap();

        console.log(data);
        toast.success(data.message);
        dispatch(loginSuccess(data));

        setIsLoading(false);
      } catch (error) {
        console.log("Error: ", error);
        const errorMessage = (error as ErrorWithMessage).data.message as string;

        toast.error(errorMessage);
        dispatch(loginFailure(errorMessage));
        setIsLoading(false);
      }
    }

    form.reset();
  };

  // const googleLoginHandler = async () => {
  //   if (accountType === "buyer") {
  //     const provider = new GoogleAuthProvider();
  //     const { user } = await signInWithPopup(auth, provider);
  //     console.log(user);
  //   }
  // };

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
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="w-full">
              Login
            </Button>
          )}

          {/* GOOGLE LOGIN */}

          {/* <div className="w-full pt-3 flex flex-col gap-2">
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
          </div> */}
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
