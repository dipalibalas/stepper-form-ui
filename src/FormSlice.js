import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    state: "",
    zipCode: "",
  },
  companyInfo: {
    fields: [],
    employees: "",
    wfhPolicy: "",
  },
  planSelection: {
    startDate: null,
    planType: "",
    numberOfUsers: 1,
    finalPrice: 0,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
    setPlanSelection: (state, action) => {
      state.planSelection = action.payload;
    },
  },
});

export const { setPersonalInfo, setCompanyInfo, setPlanSelection } =
  formSlice.actions;
export default formSlice.reducer;
