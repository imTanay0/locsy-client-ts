import { useState } from "react";
import { Check } from "lucide-react";

import "@/css/stepper.css";
import { Button } from "./ui/button";

const Stepper = () => {
  const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const stepHandler = () => {
    currentStep === steps.length
      ? setComplete(true)
      : setCurrentStep((prev) => prev + 1);
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
      {!complete && (
        <Button onClick={stepHandler}>
          {currentStep === steps.length ? "Finish" : "Next"}
        </Button>
      )}
    </>
  );
};

export default Stepper;
