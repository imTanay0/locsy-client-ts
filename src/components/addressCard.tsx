import { Link } from "react-router-dom";

import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";

type AddressCardProps = {
  button?: boolean;
};

const AddressCard = ({ button }: AddressCardProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="space-y-3">
        <p className="font-semibold">Tanay Bhowal</p>
        <p className="">Jorhat, Assam, 785007</p>
        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p className="">+91 9876543210</p>
        </div>
        {button && (
          <div>
            <Link to="/checkout?step=3">
              <Button className="">Deliver here</Button>
            </Link>
          </div>
        )}
      </div>

      {button && <Separator className="my-4" />}
    </div>
  );
};

export default AddressCard;
