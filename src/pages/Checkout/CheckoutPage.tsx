import { useState } from "react";

import Stepper from "@/components/stepper";
import OrderSummary from "./OrderSummary";
import DeliveryAddressForm from "./DeliveryAddressForm";

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // State to track step

  const handleStepChange = (newStep: number) => {
    setCurrentStep(newStep);
  };

  return (
    <div className="min-h-[100svh] px-4 md:px-6 py-12">
      <Stepper step={currentStep} onStepChange={handleStepChange} />
      <main>
        {currentStep === 2 && <DeliveryAddressForm />}
        {currentStep === 3 && <OrderSummary />}
        {currentStep === 4 && <p>Payment</p>}
      </main>
    </div>
  );
};

export default CheckoutPage;
