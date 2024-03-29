import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deliveryAddressFromSchema } from "@/lib/formSchema";

const SellerProducts = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof deliveryAddressFromSchema>>({
    resolver: zodResolver(deliveryAddressFromSchema),
    defaultValues: {
      fname: "",
      lname: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      contactNo: "",
    },
  });

  async function handleDeliveryForm(
    values: z.infer<typeof deliveryAddressFromSchema>
  ) {
    console.log(values);
    navigate(`/checkout?step=3`);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-between w-full">
      <div className=" p-5 flex flex-col items-center flex-1 shadow-custom rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleDeliveryForm)}
            className="space-y-4  w-full"
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
              name="street"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Street" rows={4} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
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
            </div>
            <div className="flex gap-4">
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

              <FormField
                control={form.control}
                name="contactNo"
                render={({ field }) => (
                  <FormItem className="w-full">
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
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SellerProducts;
