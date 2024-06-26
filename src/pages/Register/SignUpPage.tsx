import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
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
import { Textarea } from "@/components/ui/textarea";

import { registerFormSchema } from "@/lib/formSchema";
import { useBuyerCreateMutation } from "@/redux/api/buyerAPI";
import { useRegisterSellerMutation } from "@/redux/api/sellerAPI";
import { registerFailure, registerSuccess } from "@/redux/slice/authSlice";
import {
  buyerRegisterFailure,
  buyerRegisterStart,
  buyerRegisterSuccess,
} from "@/redux/slice/buyerSlice";
import { ErrorWithMessage, MessageResponse } from "@/types/api-types";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const [buyerCreate] = useBuyerCreateMutation();
  const [registerSeller] = useRegisterSellerMutation();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      shopName: "",
      shopDescription: "",
      file: undefined,
      contactNo: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const accountType = form.watch("accountType");
  const fileRef = form.register("file");

  async function registerHandler(values: z.infer<typeof registerFormSchema>) {
    if (accountType === "buyer") {
      const newBuyer = {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
      };

      try {
        dispatch(buyerRegisterStart());
        const response = await buyerCreate(newBuyer);

        if ("data" in response) {
          const data = response.data;
          toast.success(data.message);
          dispatch(buyerRegisterSuccess(data));
        } else {
          const error = response.error as FetchBaseQueryError;
          const errorMessage = (error.data as MessageResponse).message;
          toast.error(errorMessage);
          buyerRegisterFailure(errorMessage);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    if (
      (accountType === "seller" && values.file && values.shopName,
      values.shopDescription,
      values.contactNo,
      values.street,
      values.city,
      values.state,
      values.zipCode)
    ) {
      const seller = {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
        shopName: values.shopName,
        shopDescription: values.shopDescription,
        file: values.file,
        contactNo: values.contactNo,
        street: values.street,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      };

      // console.log(newSeller);

      const formData = new FormData();

      formData.append("fname", seller.fname);
      formData.append("lname", seller.lname);
      formData.append("email", seller.email);
      formData.append("password", seller.password);
      if (seller.shopName) {
        formData.append("shopName", seller.shopName);
      }
      if (seller.shopDescription) {
        formData.append("shopDescription", seller.shopDescription);
      }
      if (seller.contactNo) {
        formData.append("contactNo", seller.contactNo);
      }
      if (seller.street) {
        formData.append("street", seller.street);
      }
      if (seller.city) {
        formData.append("city", seller.city);
      }
      if (seller.state) {
        formData.append("state", seller.state);
      }
      if (seller.zipCode) {
        formData.append("zipCode", seller.zipCode);
      }
      if (seller.file && seller.file.length > 0) {
        formData.append("file", seller.file[0]);
      }

      try {
        const data = await registerSeller(formData).unwrap();
        // console.log(data);
        toast.success(data.message);
        dispatch(registerSuccess(data));
      } catch (error) {
        console.log("Error: ", error);
        const errorMessage = (error as ErrorWithMessage).data.message as string;

        toast.error(errorMessage);
        dispatch(registerFailure());
      }
    }

    // form.reset();
  }

  return (
    <main className="min-h-[100svh] flex flex-col items-center p-5 md:p-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(registerHandler)}
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
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>Shop image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        {...fileRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your contact number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Street" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Zip code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip code" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
          <div className="w-full pt-3">
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
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
