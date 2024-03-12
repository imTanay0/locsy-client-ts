import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";

import "@/css/stepper.css";
import { Button } from "./ui/button";

type StepperProps = {
  step: number;
  onStepChange: (currentStep: number) => void;
};

const Stepper = ({ onStepChange }: StepperProps) => {
  const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  const stepQuery = querySearch.get("step");

  let step: number = 1;

  if (!stepQuery) {
    const newUrl = `/checkout?step=1`;
    window.history.pushState({}, "", newUrl);
  } else {
    step = stepQuery ? parseInt(stepQuery) : 1;
  }

  const [currentStep, setCurrentStep] = useState(step);
  const [complete, setComplete] = useState(false);

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
      if (onStepChange) {
        const newStep = currentStep + 1;
        const newUrl = `/checkout?step=${newStep}`;
        window.history.pushState({}, "", newUrl);
        setCurrentStep(newStep);
        onStepChange(newStep);
      }
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
      {!complete && (
        <Button onClick={handleNext}>
          {currentStep === steps.length ? `Finish` : `Next`}
        </Button>
      )}
    </>
  );
};

export default Stepper;
