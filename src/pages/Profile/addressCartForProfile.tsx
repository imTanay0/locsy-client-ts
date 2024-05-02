import React, { useEffect, useState } from "react";
import axios from "axios";

import MyLoader from "@/components/myLoader";
import { Separator } from "@/components/ui/separator";

import { server } from "@/redux/store";
import { Address } from "@/types/types";

const AddressCartForProfile: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [contactNo, setContactNo] = useState<string[]>();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/address/get`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.success) {
          setAddresses(data.addresses);
          setContactNo(data.contactNo);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddresses();
  }, []);

  if (
    !addresses ||
    addresses.length === 0 ||
    !contactNo ||
    contactNo.length === 0
  ) {
    return <MyLoader />;
  }

  return (
    <div>
      {addresses.map((address, index) => (
        <div key={address._id} className="">
          <div className="space-y-3">
            <p className="">
              <span>{address.street}</span>
              <span>, {address.city}</span>
              <span>, {address.state}</span>
              <span>, {address.zipCode}</span>
            </p>
            <div className="space-y-1">
              <p className="font-semibold">Phone Number</p>
              <p className="">+91 {contactNo[index]}</p>
            </div>
          </div>
          <Separator className="my-4" />
        </div>
      ))}
    </div>
  );
};

export default AddressCartForProfile;
