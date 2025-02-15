import { useState } from "react";
import FormOne from "./FormOne";
import FormThree from "./FormThree";
import FormTwo from "./FormTwo";

export default function Events() {

  const [step, setStep] = useState(1);

  const renderForm = () => {
    switch (step) {
      case 1:
        return <FormOne setStep={setStep} />;
      case 2:
        return <FormTwo setStep={setStep} />;
      case 3:
        return <FormThree setStep={setStep} />;
      default:
        return <FormOne setStep={setStep} />;
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto">
        <div className="lg:w-[700px] py-[64px] px-[1.5rem] lg:p-[48px] bg-[#041E23] rounded-4xl border-2 border-[#07373F] mb-10">
        {renderForm()}
        </div>
    </div>
  )
}
