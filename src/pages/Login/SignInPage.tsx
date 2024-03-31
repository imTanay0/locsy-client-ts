import { z } from "zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import GoogleIcon from "@/assets/GoogleIcon.png";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  accountType: z.enum(["buyer", "seller"]),
});

const SignInPage = () => {
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
      const newBuyer = {
        email: values.email,
        password: values.password,
      };

      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/buyer/login",
          {
            method: "POST",
            body: JSON.stringify(newBuyer),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!result.success) {
          toast.error("Login Failed");
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        toast.success("Login Successfully");
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    if (accountType === "seller") {
      console.log(values);
    }

    form.reset();
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
