import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { RootState, server } from "@/redux/store";
import { Address } from "@/types/types";
import { setAddress } from "@/redux/slice/addressSlice";

type AddressCardProps = {
  button?: boolean;
};

const AddressCard = ({ button }: AddressCardProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddresses();
  }, []);

  if (!user) {
    return <p>Loding...</p>;
  }

  return (
    <div className="w-full flex flex-col">
      {addresses.length > 0 ? (
        <>
          {addresses.map((address) => (
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
                  <p className="">+91 {user.contactNo}</p>
                </div>
                {button && (
                  <div>
                    <Link
                      to="/checkout?step=2"
                      onClick={() => dispatch(setAddress(address))}
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
