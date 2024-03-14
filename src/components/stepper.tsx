import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "@/css/stepper.css";
import DeliveryAddressForm from "@/pages/Checkout/DeliveryAddressForm";
import OrderSummary from "@/pages/Checkout/OrderSummary";

const Stepper = () => {
  const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  const stepQuery = querySearch.get("step");
  const step = stepQuery ? parseInt(stepQuery) : 1;

  const [currentStep, setCurrentStep] = useState(step);
  const [complete, setComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (step > steps.length) {
      setComplete(true);
    }

    setCurrentStep(step);
  }, [step, steps.length]);

  const handleNext = () => {
    if (currentStep === steps.length) {
      setComplete(true);
    } else {
      const newStep = currentStep + 1;
      navigate(`/checkout?step=${newStep}`);

      setCurrentStep(newStep);
    }
  };

  const handlePrev = () => {
    if (currentStep === 1) {
      setComplete(false);
    } else {
      const newStep = currentStep - 1;
      navigate(`/checkout?step=${newStep}`);

      setCurrentStep(newStep);
    }
  };

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
      {/* <Button onClick={handleNext}>
        {currentStep === steps.length ? `Finish` : `Next`}
      </Button>
      <Button onClick={handlePrev}>Back</Button> */}

      <main className="mt-8">
        {currentStep === 2 && (
          <DeliveryAddressForm
            step={step}
            onPrevious={handlePrev}
            onNext={handleNext}
          />
        )}
        {currentStep === 3 && <OrderSummary />}
        {currentStep === 4 && <p>Payment</p>}
      </main>
    </>
  );
};

export default Stepper;
