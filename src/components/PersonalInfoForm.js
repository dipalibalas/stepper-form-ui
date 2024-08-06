import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, MenuItem } from "@mui/material";
import "./PersonalInfoForm.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  companyName: Yup.string().required("Company name is required"),
  companyWebsite: Yup.string()
    .url("Invalid URL format")
    .required("Company website is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("ZipCode is required"),
});

const states = ["Gujarat", "Karnataka", "Rajasthan", "Uttar Pradesh"];

const PersonalInfoForm = ({ handleNext, data }) => {
  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleNext(values);
      }}
    >
      {({ errors, touched }) => (
        <div className="personal-main-container">
          <Form className="personal-form-container">
            <div className="form-field">
              <Field
                name="firstName"
                as={TextField}
                label="First Name"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={<ErrorMessage name="firstName" />}
                fullWidth
                // required
              />
            </div>
            <div className="form-field">
              <Field
                name="lastName"
                as={TextField}
                label="Last Name"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={<ErrorMessage name="lastName" />}
                fullWidth
                // required
              />
            </div>
            <div className="form-field">
              <Field
                name="email"
                as={TextField}
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
                fullWidth
                // required
              />
            </div>
            <div className="form-field">
              <Field
                name="companyName"
                as={TextField}
                label="Company Name"
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={<ErrorMessage name="companyName" />}
                fullWidth
                // required
              />
            </div>
            <div className="form-field">
              <Field
                name="companyWebsite"
                as={TextField}
                label="Company Website"
                error={touched.companyWebsite && Boolean(errors.companyWebsite)}
                helperText={<ErrorMessage name="companyWebsite" />}
                fullWidth
                // required
              />
            </div>
            <div className="form-field">
              <Field
                name="state"
                as={TextField}
                select
                label="State"
                error={touched.state && Boolean(errors.state)}
                helperText={<ErrorMessage name="state" />}
                fullWidth
                // required
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div className="form-field">
              <Field
                name="zipCode"
                as={TextField}
                label="Zip Code"
                error={touched.zipCode && Boolean(errors.zipCode)}
                helperText={<ErrorMessage name="zipCode" />}
                fullWidth
                // required
              />
            </div>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default PersonalInfoForm;