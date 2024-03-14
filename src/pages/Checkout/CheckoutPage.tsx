// import { useState } from "react";
// import { useLocation } from "react-router-dom";

import Stepper from "@/components/stepper";
// import OrderSummary from "./OrderSummary";
// import DeliveryAddressForm from "./DeliveryAddressForm";

const CheckoutPage = () => {
  // const location = useLocation();
  // const querySearch = new URLSearchParams(location.search);

  // const stepQuery = querySearch.get("step");
  // const step = stepQuery ? parseInt(stepQuery) : 1;

  // const [currentStep, setCurrentStep] = useState(step);

  // const handleStepChange = (newStep: number) => {
  //   setCurrentStep(newStep);
  // };

  return (
    <div className="min-h-[100svh] px-4 md:px-6 py-12 container">
      <Stepper />
      {/* <Stepper step={step} onStepChange={handleStepChange} /> */}
    </div>
  );
};

export default CheckoutPage;
