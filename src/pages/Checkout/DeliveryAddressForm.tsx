import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
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
import AddressCard from "@/components/addressCard";

import { deliveryAddressFromSchema } from "@/lib/formSchema";
import { server } from "@/redux/store";
import { setAddress } from "@/redux/slice/addressSlice";

const DeliveryAddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof deliveryAddressFromSchema>>({
    resolver: zodResolver(deliveryAddressFromSchema),
    defaultValues: {
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
    try {
      const { data } = await axios.post(
        `${server}/api/v1/address/add`,
        values,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        dispatch(setAddress(data));
        navigate(`/checkout?step=2`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add delivery address");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-between w-full">
      <div className="p-5 w-full lg:w-[33%] shadow-custom overflow-y-scroll max-h-[424px] rounded-lg">
        <AddressCard button />
      </div>
      <div className="h-fit p-5 flex flex-col items-center flex-1 shadow-custom rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleDeliveryForm)}
            className="space-y-4  w-full"
          >
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

            <div className="flex justify-between pt-5">
              <Link
                to={"/cart"}
                className="bg-gray-100 rounded-full p-2 border border-sky-500 hover:bg-white"
              >
                <ChevronLeft />
              </Link>
              <button
                type="submit"
                className="bg-gray-100 rounded-full p-2 border border-sky-500 hover:bg-white"
              >
                <ChevronRight />
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
