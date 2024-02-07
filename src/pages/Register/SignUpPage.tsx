import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

// fname, lname, email, password, contactNo, address

// For Seller ->
// street,
// city,
// state,
// zipCode,
// shopName,
// shopDescription,

const formSchema = z
  .object({
    fname: z.string().min(1, {
      message: "Required",
    }),
    lname: z.string().min(1, {
      message: "Required",
    }),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    accountType: z.enum(["buyer", "seller"]),
    shopName: z.string().optional(),
    shopDescription: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.accountType === "seller") {
        return !!data.shopName;
      }
      return true;
    },
    {
      message: "Shop name is required",
      path: ["shopName"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "seller") {
        return !!data.shopDescription;
      }
      return true;
    },
    {
      message: "Shop description is required",
      path: ["shopDescription"],
    }
  );

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      shopName: "",
      shopDescription: "",
    },
  });

  const accountType = form.watch("accountType");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="min-h-[100svh] flex flex-col items-center p-5 md:p-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md w-full"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          {accountType === "seller" && (
            <>
              <FormField
                control={form.control}
                name="shopName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the shop name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shopDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the shop description."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
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
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>

      <Separator className="my-8 max-w-md w-full bg-gray-400" />

      <div className="flex max-w-md w-full justify-center gap-2 text-sm md:text-base">
        <p>Already have an account?</p>
        <Link to="/login" className="hover:underline underline-offset-2">
          Login here
        </Link>
      </div>
    </main>
  );
};

export default SignUpPage;
