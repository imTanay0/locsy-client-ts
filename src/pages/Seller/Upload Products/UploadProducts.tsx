import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";

import { uploadProductFormSchema } from "@/lib/formSchema";
import { useCreateProductMutation } from "@/redux/api/productAPI";
import { ErrorWithMessage } from "@/types/api-types";

const UploadProducts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [createProduct] = useCreateProductMutation();

  const form = useForm<z.infer<typeof uploadProductFormSchema>>({
    resolver: zodResolver(uploadProductFormSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      price: 1,
      stock: 1,
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  async function handleUploadProducts(
    values: z.infer<typeof uploadProductFormSchema>
  ) {
    const formData = new FormData();

    formData.append("productName", values.productName);
    formData.append("productDescription", values.productDescription);
    formData.append("price", values.price.toString());
    formData.append("stock", values.stock.toString());
    if (values.file && values.file[0]) {
      formData.append("file", values.file[0]);
    }

    try {
      setIsLoading(true);
      const data = await createProduct(formData).unwrap();

      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      const errorMessage = (error as ErrorWithMessage).data.message as string;

      toast.error(errorMessage);
      setIsLoading(false);
    }

    form.reset();
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <h1 className="font-semibold text-2xl h-fit mb-10">Upload Products</h1>
      <div className="flex flex-col lg:flex-row gap-8 justify-between w-full">
        <div className=" p-5 flex flex-col items-center flex-1 shadow-custom rounded-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUploadProducts)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the product name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        rows={4}
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
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter the price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="placeholder"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <div className="w-full flex justify-center p-5">
                {isLoading ? (
                  <Button type="submit" className="w-[70%]" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </Button>
                ) : (
                  <Button type="submit" className="w-[70%]">
                    Upload
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UploadProducts;
