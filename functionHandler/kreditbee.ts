import { useState } from "react"; // Import any necessary dependencies
import { v4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/router";

let rid: string = v4().split("-");
rid = rid[0] + rid[1] + rid[2] + rid[3];

const router = useRouter();

const Kreditbee = async (
  data: {
    mobile: string;
    email: string;
    fname: string;
    lname: string;
    gender: string;
    pancard: string;
    pincode: string;
    profession: string;
    income: string;
    company: string;
    notification: string;
  },
  loading: boolean
) => {
  let newdata = {
    ...data,
    imei: "website",
    key1: "",
    key2: "",
    campaign: "",
  };

  const res = await axios.put(
    "https://lms29api.buynsta.com/main/eligible/kreditbee",
    {
      mobile: newdata.mobile,
      email: newdata.email,
      firstname: newdata.fname,
      lastname: newdata.lname,
      gender: newdata.gender,
      pan: newdata.pancard,
      dob: "2019-01-05",
      pincode: newdata.pincode,
      profession: newdata.profession,
      salary: newdata.income,
      imei: "website",
      referenceId: rid, // Make sure 'rid' is defined somewhere
      company: newdata.company,
      campaign: "",
      key1: "",
      key2: "",
      notification: newdata.notification,
    },
    {
      headers: {
        Authorization: "Basic " + process.env.NEXT_PUBLIC_AUTHORIZATION_KEY,
      },
    }
  );
  console.log(res, newdata);
  const path = res.data.model ? res.data.model.referenceId : "";
  if (res.data.code === "200") {
    switch (res.data.model.statusCode) {
      case "A001": {
        // setLoading(false);
        router.push("/find/" + path); // Make sure 'router' is defined somewhere
        break;
      }

      case "W001": {
        // setLoading(false);
        router.push("/find/" + path); // Make sure 'router' is defined somewhere
        console.log(newdata);
        break;
      }

      case "R001": // Additional cases go here...
      case "R002":
      case "R003":
      case "R004":
      case "R005":
      case "R006":
      case "R007": {
        // setLoading(false);
        router.push("/find/" + path); // Make sure 'router' is defined somewhere
        break;
      }

      default: {
        // setLoading(false);
        let searchParams: any = new URLSearchParams(res.data);
        searchParams = searchParams.toString();
        router.push("/error" + "?" + searchParams); // Make sure 'router' is defined somewhere
      }
    }
  } else {
    let searchParams: any = new URLSearchParams(res.data);
    searchParams = searchParams.toString();
    router.push("/error" + "?" + searchParams); // Make sure 'router' is defined somewhere
    // setLoading(false);
  }
};

// Export the function


const Cashe = async (data: {
  mobile: string;
  email: string;
  fname: string;
  lname: string;
  gender: string;
  dob: string;
  pancard: string;
  pincode: string;
  profession: string;
  income: string;
  company: string;
  notification: string;
  addressLine1: string;
  locality: string;
  state: string;
  city: string;
  loanAmount: number;
  employmentType: number;
  salaryReceivedType: number;
}) => {
  const res = await axios.put(
    "https://partners.cashe.co.in/partner/checkDuplicateCustomerLead",
    {
      mobile_no: data.mobile,
      email_id: data.email,
      partner_name: "",
    },
    {
      headers: {
        "Content-Type": "application/json ",
        "Check-Sum": 11111111,
      },
    }
  );

  if (res.data.duplicateStatusCode === 1) {
    const dataSent = await axios.post(
      "https://test-partners.cashe.co.in/report/getLoanApprovalDetails",
      {
        partner_name: "",
        mobileNo: data.mobile,
        emailId: data.email,
        name: data.fname + data.lname,
        pan: data.pancard,
        addressLine1: data.addressLine1,
        locality: data.locality,
        pincode: data.pincode,
        gender: data.gender,
        salary: data.income,
        state: data.state,
        city: data.city,
        dob: data.dob,
        companyName: data.company,
        salaryReceivedType: data.salaryReceivedType,
        employmentType: data.employmentType,
        loanAmount: data.loanAmount,
      },
      {
        headers: {
          "Content-Type": "application/json ",
          "Check-Sum": 11111111,
        },
      }
    );

    switch (dataSent.data.statusCode) {
      case 200: {
        return dataSent.data.payLoad;
        break;
      }
      default: {
        return dataSent.data;
        break;
      }
    }
  }
};



export { Kreditbee,Cashe };