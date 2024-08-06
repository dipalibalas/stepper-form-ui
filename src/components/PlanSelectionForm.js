import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./PlanSelectionForm.css";

const validationSchema = Yup.object({
  startDate: Yup.date().required("Start date is required"),
  planType: Yup.string().required("Plan type is required"),
  numberOfUsers: Yup.number()
    .min(1, "At least 1 user required")
    .required("Number of users is required"),
});

const plans = [
  { type: "monthly_gold", label: "Monthly Gold", price: 1000 },
  { type: "monthly_titanium", label: "Monthly Titanium", price: 2000 },
  { type: "yearly_gold", label: "Yearly Gold", price: 10000 },
  { type: "yearly_titanium", label: "Yearly Titanium", price: 20000 },
];

const PlanSelectionForm = ({ handleNext, handleBack, data }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);
  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // console.log(values);
        setOpenModal(true);
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <div className="plan-main-container">
          {console.log(values)}
          <Form className="plan-form-container">
            <div className="form-field">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Start Date"
                    value={values.startDate}
                    onChange={(date) => setFieldValue("startDate", date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        error={touched.startDate && Boolean(errors.startDate)}
                        helperText={<ErrorMessage name="startDate" />}
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            {/* <div className="form-field">
              <Field
                name="planType"
                as={TextField}
                select
                label="Plan Type"
                value={values.planType}
                onChange={(event) =>
                  setFieldValue("planType", event.target.value)
                }
                error={touched.planType && Boolean(errors.planType)}
                helperText={<ErrorMessage name="planType" />}
                required
              >
                {plans.map((plan) => (
                  <MenuItem key={plan.type} value={plan.label}>
                    {plan.label} (${plan.price})
                  </MenuItem>
                ))}
              </Field>
            </div> */}
            <div className="form-field">
              <Field
                name="planType"
                as={TextField}
                select
                label="PlanType"
                value={values.planType}
                onChange={(event) =>
                  setFieldValue("planType", event.target.value)
                }
                error={touched.planType && Boolean(errors.planType)}
                helperText={<ErrorMessage name="planType" />}
                fullWidth
                required
              >
                {plans.map((val) => (
                  <MenuItem key={val.type} value={val.label}>
                    {val.label} (Rs.{val.price})
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div className="form-field">
              <Field
                name="numberOfUsers"
                as={TextField}
                label="Number of Users"
                type="number"
                error={touched.numberOfUsers && Boolean(errors.numberOfUsers)}
                helperText={<ErrorMessage name="numberOfUsers" />}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                required
              />
            </div>
            <div className="form-actions">
              <Button onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                // onClick={() => setOpenModal(true)}
              >
                Submit
              </Button>
            </div>
            {values.planType && (
              <div className="summary">
                <p>Selected Plan: {values.planType}</p>
                <p>Number of Users: {values.numberOfUsers}</p>
                <p>
                  Final Price: $
                  {values.planType
                    ? plans.find((plan) => plan.label === values.planType)
                        .price * values.numberOfUsers
                    : 0}
                </p>
              </div>
            )}
            <Dialog
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="success-dialog-title"
              aria-describedby="success-dialog-description"
            >
              <DialogTitle id="success-dialog-title">Success</DialogTitle>
              <DialogContent>
                <Typography variant="h6" color="green">
                  Form submitted successfully!
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default PlanSelectionForm;
