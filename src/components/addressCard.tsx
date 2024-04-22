import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { setAddress } from "@/redux/slice/addressSlice";
import { RootState, server } from "@/redux/store";
import { Address } from "@/types/types";

type AddressCardProps = {
  button?: boolean;
};

const AddressCard = ({ button }: AddressCardProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [contactNo, setContactNo] = useState<string>("");
  const { user, role } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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

  const handleSetState = (address: Address, contactNo: string) => {
    const data = {
      address,
      contactNo
    };

    dispatch(setAddress(data));
  };

  if (!user || !role) {
    return <p>Loding...</p>;
  }

  return (
    <div className="w-full flex flex-col">
      {addresses.length > 0 ? (
        <>
          {addresses.map((address, i) => (
            <div key={address._id}>
              <div className="space-y-3">
                <p className="font-semibold">{`${user.fname} ${user.lname}`}</p>
                <p className="">
                  <span>{address.street}</span>
                  <span>, {address.city}</span>
                  <span>, {address.state}</span>
                  <span>, {address.zipCode}</span>
                </p>
                <div className="space-y-1">
                  <p className="font-semibold">Phone Number</p>
                  <p className="">+91 {contactNo[i]}</p>
                </div>
                {button && (
                  <div>
                    <Link
                      to="/checkout?step=2"
                      onClick={() => handleSetState(address, contactNo[i])}
                    >
                      <Button className="">Deliver Here</Button>
                    </Link>
                  </div>
                )}
              </div>

              {button && <Separator className="my-4" />}
            </div>
          ))}
        </>
      ) : (
        <div>
          <p>No address found.</p>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
