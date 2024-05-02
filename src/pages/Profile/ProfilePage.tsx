import { useState } from "react";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AddressCartForProfile from "./addressCartForProfile";

import { userExist } from "@/redux/slice/authSlice";
import { server } from "@/redux/store";
import { Role, User } from "@/types/types";

type ProfilePageProps = {
  user: User | null;
  role: Role | null;
};

const ProfilePage = ({ user, role }: ProfilePageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [newRole, setNewRole] = useState<Role>(role || ({} as Role));
  const [newUser, setNewUser] = useState<User>(user || ({} as User));
  const [file, setFile] = useState<File>();

  const dispatch = useDispatch();

  const validateContactNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (!value) {
      return;
    }
    value = value.trim();
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    if (/^[0-9]+$/.test(value)) {
      setNewUser({ ...newUser, contactNo: value });
    } else {
      setNewUser({ ...newUser, contactNo: value.replace(/[^\d]/g, "") });
    }
  };

  const changeImageHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result as string);
      setFile(file);
    };
  };

  const handleUpdateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // UPDATE SELLER ACCOUNT
    if (user?.role === 2) {
      const formData = new FormData();

      if (newUser && newRole) {
        if (newUser.fname) formData.append("fname", newUser.fname);
        if (newUser.lname) formData.append("lname", newUser.lname);
        if (newUser.email) formData.append("email", newUser.email);
        if (newUser.contactNo) formData.append("contactNo", newUser.contactNo);
        if (newRole.shopName) formData.append("shopName", newRole.shopName);
        if (newRole.shopDescription)
          formData.append("shopDescription", newRole.shopDescription);
        if (newRole.shopAddress.street)
          formData.append("street", newRole.shopAddress.street);
        if (newRole.shopAddress.city)
          formData.append("city", newRole.shopAddress.city);
        if (newRole.shopAddress.state)
          formData.append("state", newRole.shopAddress.state);
        if (newRole.shopAddress.zipCode)
          formData.append("zipCode", newRole.shopAddress.zipCode);
        if (file) formData.append("file", file);
      }

      try {
        setIsLoading(true);

        const { data } = await axios.put(
          `${server}/api/v1/seller/update`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (data.success) {
          dispatch(userExist(data));
          toast.success(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to update account");
      } finally {
        setIsLoading(false);
      }
    }

    // if (user?.role === 3) {}

    console.log("New Role: ", newRole);
    console.log("New User", newUser);
  };

  return (
    <div className="min-h-[100svh] container px-4 md:px-6">
      <h1 className="font-semibold text-2xl h-fit my-8">Profile</h1>
      <div className="px-16 flex flex-col lg:flex-row gap-8 justify-between w-full">
        <div className="p-5 flex flex-col flex-1 shadow-custom rounded-lg">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleUpdateAccount(e)}
          >
            <div className="flex gap-5">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  type="text"
                  value={newUser?.fname}
                  onChange={(e) =>
                    setNewUser({ ...newUser, fname: e.target.value })
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  type="text"
                  value={newUser?.lname}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lname: e.target.value })
                  }
                />
              </div>
            </div>

            {user?.role === 3 ? (
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  value={newUser?.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="flex gap-5">
                <div className="w-full flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={newUser?.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Label htmlFor="contactNo">Contact Number</Label>
                  <Input
                    id="contactNo"
                    type="text"
                    value={newUser?.contactNo}
                    onChange={(e) => validateContactNo(e)}
                  />
                </div>
              </div>
            )}
            {user?.role === 2 && (
              <>
                <div className="flex justify-between gap-5">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="w-full flex flex-col gap-2">
                      <Label htmlFor="shopName">Shop Name</Label>
                      <Input
                        id="shopName"
                        type="text"
                        className="w-full"
                        value={`${newRole?.shopName}`}
                        onChange={(e) =>
                          setNewRole({ ...newRole, shopName: e.target.value })
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <Label htmlFor="shopDescription">Shop Description</Label>
                      <Textarea
                        id="shopDescription"
                        className="w-full"
                        value={`${newRole?.shopDescription}`}
                        onChange={(e) =>
                          setNewRole({
                            ...newRole,
                            shopDescription: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
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
                          alt="shop_image"
                          className="w-44 h-auto rounded-md"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src={role?.shopImage.url}
                          alt="shop_image"
                          className="w-44 h-auto rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-full flex flex-col gap-2">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      type="text"
                      className="w-full"
                      value={`${newRole?.shopAddress.street}`}
                      onChange={(e) =>
                        setNewRole({
                          ...newRole,
                          shopAddress: {
                            ...newRole.shopAddress,
                            street: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      className="w-full"
                      value={`${newRole?.shopAddress.city}`}
                      onChange={(e) =>
                        setNewRole({
                          ...newRole,
                          shopAddress: {
                            ...newRole.shopAddress,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-full flex flex-col gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      type="text"
                      className="w-full"
                      value={`${newRole?.shopAddress.state}`}
                      onChange={(e) =>
                        setNewRole({
                          ...newRole,
                          shopAddress: {
                            ...newRole.shopAddress,
                            state: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      type="text"
                      className="w-full"
                      value={`${newRole?.shopAddress.zipCode}`}
                      onChange={(e) =>
                        setNewRole({
                          ...newRole,
                          shopAddress: {
                            ...newRole.shopAddress,
                            zipCode: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {user?.role === 3 && (
              <>
                <h3 className="font-semibold text-lg py-1">Addresses</h3>
                <div className="w-full max-h-[230px] overflow-y-auto">
                  <AddressCartForProfile />
                </div>
              </>
            )}

            <div className="w-full flex justify-center mt-5">
              {isLoading ? (
                <Button type="submit" className="w-[70%]" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Update Account
                </Button>
              ) : (
                <Button type="submit" className="w-[70%]">
                  Update Account
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
