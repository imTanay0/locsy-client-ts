import { useState } from "react";

import OrderCard from "@/components/orderCard";
import { Checkbox } from "@/components/ui/checkbox";

import { cartItemDemoData } from "@/data/cartItemDemoData";

interface Item {
  id: string;
  label: string;
}

const items: Item[] = [
  { id: "on_the_way", label: "On The Way" },
  { id: "deliverd", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
  { id: "returned", label: "Returned" },
];

const OrdersPage = () => {
  const [deliveryStatus, setDeliveryStatus] = useState<string[]>([]);

  function handleDeliveryStatus(id: string) {
    setDeliveryStatus((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  console.log(deliveryStatus);

  return (
    <div className="min-h-[100svh] md:px-6 py-12 container flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-[22%] h-fit px-4 py-5 flex flex-col gap-4 shadow-custom rounded-lg">
        <h2 className="text-2xl font-semibold">Filters</h2>
        <div className="w-full">
          <h4 className="text-lg mb-4">Order Status</h4>

          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={item.id}
                onClick={() => handleDeliveryStatus(item.id)}
              />
              <label>{item.label}</label>
            </div>
          ))}
          {/* <h1>Delivery Status: {deliveryStatus}</h1> */}
        </div>
      </aside>
      <main className="w-full md:w-[78%]">
        <div className="flex flex-col gap-5">
        {cartItemDemoData.map((cartItem) => (
          <OrderCard key={cartItem._id} orderItem={cartItem} />
        ))}
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
