import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Product } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ErrorWithMessage } from "@/types/api-types";

interface NewProduct {
  productName: string;
  productDescription: string;
  price: number;
  stock: number;
  file: File;
}

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [newProduct, setNewProduct] = useState<NewProduct>();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/product/${productId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setProduct(response.data.product);
        setNewProduct(response.data.product);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    getProduct();
  }, [productId]);

  const changeImageHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result as string);
      setNewProduct(
        (prev) =>
          prev && {
            ...prev,
            file: file,
          }
      );
    };
  };

  const haandleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (newProduct) {
      if (newProduct.productName !== product?.productName) {
        formData.append("productName", newProduct.productName);
      }
      if (newProduct.productDescription !== product?.productDescription) {
        formData.append("productDescription", newProduct.productDescription);
      }
      if (newProduct.price !== product?.price) {
        formData.append("price", newProduct.price.toString());
      }
      if (newProduct.stock !== product?.stock) {
        formData.append("stock", newProduct.stock.toString());
      }
      if (newProduct.file) {
        formData.append("file", newProduct.file);
      }
    }

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/product/${productId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/seller/products");
      }
    } catch (error) {
      console.error("Error: ", error);
      const errorMessage = (error as ErrorWithMessage).data.message as string;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <h1 className="font-semibold text-2xl h-fit mb-10">Update Products</h1>
      {newProduct ? (
        <div className="flex flex-col lg:flex-row gap-8 justify-between w-full">
          <div className="p-5 flex flex-col flex-1 shadow-custom rounded-lg">
            <form
              className="flex flex-col gap-4"
              onSubmit={haandleUpdateProduct}
            >
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  value={newProduct.productName}
                  className="w-full"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea
                  id="productDescription"
                  value={newProduct.productDescription}
                  className="w-full"
                  rows={4}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-5">
                <div className="w-full flex flex-col gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    className="w-full"
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    className="w-full"
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="image">Shop Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={changeImageHadler}
                />
              </div>

              {image ? (
                <div>
                  <img
                    src={image}
                    alt="product_image"
                    className="w-48 h-auto"
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={product?.mainImage.image.url}
                    alt="product_img"
                    className="w-48 h-auto"
                  />
                </div>
              )}

              <div className="w-full flex justify-center mt-5">
                {isLoading ? (
                  <Button type="submit" className="w-[70%]" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Update Product
                  </Button>
                ) : (
                  <Button type="submit" className="w-[70%]">
                    Update Product
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default UpdateProduct;
