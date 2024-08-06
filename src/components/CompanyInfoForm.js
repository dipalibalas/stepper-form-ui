import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import "./CompanyInfoForm.css";

const validationSchema = Yup.object({
  fields: Yup.array()
    .min(1, "At least one field must be selected")
    .required("Field is required"),
  employees: Yup.string().required("Number of employees is required"),
  wfhPolicy: Yup.string().required("Work from home policy is required"),
});

const fieldsOptions = [
  "Web Developement",
  "App Developement",
  "Machnie Learning",
  "AI",
];
const employeesOptions = ["1-10", "10-20", "20-30", "40+"];

const CompanyInfoForm = ({ handleNext, handleBack, data }) => {
  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleNext(values);
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <div className="company-main-container">
          <Form className="company-form-container">
            <div className="form-field">
              <FormControl
                component="fieldset"

                // required
              >
                <FormLabel component="legend">
                  Your company is working on which field
                </FormLabel>
                <FormGroup>
                  {fieldsOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={values.fields.includes(option)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setFieldValue("fields", [
                                ...values.fields,
                                option,
                              ]);
                            } else {
                              setFieldValue(
                                "fields",
                                values.fields.filter(
                                  (field) => field !== option
                                )
                              );
                            }
                          }}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>

                <ErrorMessage
                  name="fields"
                  className="error-message"
                  component="div"
                />
              </FormControl>
            </div>

            <div className="form-field">
              <Field
                name="employees"
                as={TextField}
                select
                label="How many employees are in your company?"
                // error={touched.employees && Boolean(errors.employees)}
                // helperText={<ErrorMessage name="employees" />}
                fullWidth
                // required
              >
                {employeesOptions.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage
                name="employees"
                className="error-message"
                component="div"
              />
            </div>
            <div className="form-field">
              <FormControl
                component="fieldset"
                // error={touched.wfhPolicy && Boolean(errors.wfhPolicy)}
                // required
              >
                <FormLabel component="legend">
                  Does the company have a WFH policy?
                </FormLabel>
                <RadioGroup
                  name="wfhPolicy"
                  value={values.wfhPolicy}
                  onChange={(e) => setFieldValue("wfhPolicy", e.target.value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {/* <ErrorMessage name="wfhPolicy" component="div" /> */}
                <ErrorMessage
                  name="wfhPolicy"
                  className="error-message"
                  component="div"
                />
              </FormControl>
            </div>
            <div className="form-buttons">
              <Button onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button type="submit" variant="contained">
                Next
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CompanyInfoForm;