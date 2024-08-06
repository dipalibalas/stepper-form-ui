import React, { useState } from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import PersonalInfo from "./components/PersonalInfoForm";
import CompanyInfo from "./components/CompanyInfoForm";
import PlanSelection from "./components/PlanSelectionForm";
import { useSelector, useDispatch } from "react-redux";
import { setPersonalInfo, setCompanyInfo, setPlanSelection } from "./FormSlice";
import "./App.css";

const steps = ["First Step", "Second Step", "Third Step"];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const handleNext = (data) => {
    if (activeStep === 0) {
      dispatch(setPersonalInfo(data));
    } else if (activeStep === 1) {
      dispatch(setCompanyInfo(data));
    } else if (activeStep === 2) {
      dispatch(setPlanSelection(data));
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo handleNext={handleNext} data={formState.personalInfo} />
        );
      case 1:
        return (
          <CompanyInfo
            handleNext={handleNext}
            handleBack={handleBack}
            data={formState.companyInfo}
          />
        );
      case 2:
        return (
          <PlanSelection
            handleNext={handleNext}
            handleBack={handleBack}
            data={formState.planSelection}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Stepper Form</h1>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <div>All steps completed</div>
        ) : (
          <div>{getStepContent(activeStep)}</div>
        )}
      </Box>
    </>
  );
}

export default App;
