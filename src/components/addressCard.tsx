import { Link } from "react-router-dom";

import { Button } from "./ui/button";

const AddressCard = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="space-y-3">
        <p className="font-semibold">Name</p>
        <p className="">Jorhat, Assam, 785007</p>
        <div className="space-y-1">
          <p className="font-semibold">Mobile</p>
          <p className="">+91 9876543210</p>
        </div>
        <div>
          <Link to="/checkout?step=3">
            <Button className="">Deliver here</Button>
          </Link>
        </div>
      </div>

      {/* <Separator className="my-8 max-w-md w-full h-[1px] bg-gray-400" /> */}
    </div>
  );
};

export default AddressCard;
