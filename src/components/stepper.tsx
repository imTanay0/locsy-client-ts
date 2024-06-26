import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "@/css/stepper.css";

import DeliveryAddressForm from "@/pages/Checkout/DeliveryAddressForm";
import OrderSummary from "@/pages/Checkout/OrderSummary";
import NotFoundPage from "./notFoundPage";

const Stepper = () => {
  const steps = ["Delivery Address", "Order Summary", "Payment"];

  // const navigate = useNavigate();
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  const stepQuery = querySearch.get("step");
  const step = stepQuery ? parseInt(stepQuery) : 1;

  const [currentStep, setCurrentStep] = useState(step);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (step > steps.length) {
      setComplete(true);
    }

    setCurrentStep(step);
  }, [step, steps.length]);

  if (currentStep > steps.length) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }`}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <Check width={18} /> : i + 1}
            </div>
            <p className="text-gray-600">{step}</p>
          </div>
        ))}
      </div>

      <main className="mt-8">
        {currentStep === 1 && <DeliveryAddressForm />}
        {currentStep === 2 && <OrderSummary />}
        {currentStep === 3 && <p>Payment</p>}
      </main>
    </>
  );
};

export default Stepper;
