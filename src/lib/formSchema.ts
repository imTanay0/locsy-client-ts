import { z } from "zod";

// REGISTER USER FORM
export const registerFormSchema = z
  .object({
    fname: z.string().min(1, { message: "Required" }),
    lname: z.string().min(1, { message: "Required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    accountType: z.enum(["buyer", "seller"]),
    shopName: z.string().optional(),
    shopDescription: z.string().optional(),
    file: z.instanceof(FileList).optional(),
    contactNo: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
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
  )
  .refine(
    (data) => {
      if (data.contactNo === undefined) {
        return true;
      }

      if (data.accountType === "seller") {
        return /^\d{10}$/.test(data.contactNo);
      }
      return true;
    },
    {
      message: "Contact number must be 10 digits",
      path: ["contactNo"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "seller") {
        return !!(data.file?.length === 1);
      }
      return true;
    },
    {
      message: "Shop image is required",
      path: ["file"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "seller") {
        return !!data.street;
      }
      return true;
    },
    {
      message: "Address is required",
      path: ["street"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "seller") {
        return !!data.city;
      }
      return true;
    },
    {
      message: "Address is required",
      path: ["city"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "seller") {
        return !!data.state;
      }
      return true;
    },
    {
      message: "Address is required",
      path: ["state"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "seller") {
        return !!data.zipCode;
      }
      return true;
    },
    {
      message: "Address is required",
      path: ["zipCode"],
    }
  );

// DELIVERRY ADDRESS FORM
export const deliveryAddressFromSchema = z.object({
  street: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  state: z.string().min(1, { message: "Required" }),
  zipCode: z.string().min(1, { message: "Required" }),
  contactNo: z
    .string()
    .min(1, { message: "Required" })
    .refine((data) => {
      return /^\d{10}$/.test(data);
    }),
});

// PRODUCT UPLOAD FORM
export const uploadProductFormSchema = z
  .object({
    productName: z.string().min(1, { message: "Required" }),
    productDescription: z.string().min(1, { message: "Required" }),
    price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
    stock: z.coerce.number().min(1, { message: "Stock must be at least 1" }),
    file: z.instanceof(FileList).optional(),
  })
  .refine(
    (data) => {
      if (data.file?.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: "Product image is required",
      path: ["file"],
    }
  );
