import React, { useState } from "react";
import Layout from "../../../layout/website";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";

import { Label, Input, Button } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../lib/axios";

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    number: "",
    country: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    console.log(formData);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    console.log(formData);

    event.preventDefault();
    if (
      formData.firstName.trim() == "" ||
      formData.lastName.trim() == "" ||
      formData.email.trim() == "" ||
      formData.password.trim() == "" ||
      formData.number.trim() == "" ||
      formData.country.trim() == ""
    ) {
      return alert("Please fill all the fields");
    }

    if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) ==
      false
    ) {
      return alert("Please enter a valid email");
    }
    try {
      const response = await axiosInstance.post(
        "/signup",
        // "http://localhost:8000/signup",
        formData
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <Layout title="Signup">
      <Section className="my-auto py-10">
        <Container>
          <div className="-mx-3 flex justify-center">
            <div className="w-full px-3 xs:w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3">
              <div className="w-full rounded-lg border border-slate-200 bg-white p-6 pt-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-2">
                  <h3 className="mb-1 text-xl font-bold text-slate-700 dark:text-white">
                    Signup
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    With valid credentials
                  </p>
                </div>
                <div className="-mx-2 flex flex-wrap">
                  <div className="w-full px-2 py-2 md:w-1/2">
                    <Label htmlFor="first-name" className="mb-2">
                      First Name
                    </Label>
                    <Input
                      placeholder="John"
                      id="first-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                  </div>
                  <div className="w-full px-2 py-2 md:w-1/2">
                    <Label htmlFor="last-name" className="mb-2">
                      Last Name
                    </Label>
                    <Input
                      placeholder="Doe"
                      id="last-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      name="lastName"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <Label htmlFor="emial-address" className="mb-2">
                    Email Address
                  </Label>
                  <Input
                    placeholder="example@email.com"
                    id="emial-address"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="password"
                    className="mb-2 w-full items-center justify-between"
                  >
                    Password
                  </Label>
                  <Input
                    defaultValue="123456"
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                  />
                </div>
                <div className="-mx-2 flex flex-wrap">
                  <div className="w-full px-2 py-2 md:w-1/2">
                    <Label htmlFor="number" className="mb-2">
                      Number
                    </Label>
                    <Input
                      //   placeholder="John"
                      id="number"
                      value={formData.number}
                      onChange={handleChange}
                      name="number"
                    />
                  </div>
                  <div className="w-full px-2 py-2 md:w-1/2">
                    <Label htmlFor="country" className="mb-2">
                      Country
                    </Label>
                    <Input
                      //   placeholder="Doe"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      name="country"
                    />
                  </div>
                </div>
                <div className="pt-3">
                  <Button
                    block
                    className="bg-blue-600 text-white hover:bg-blue-800 mb-2"
                    onClick={handleSubmit}
                  >
                    Account Signup
                  </Button>
                  <div className="flex  justify-end">
                    <Link to={"/login"} className="text-xs text-blue-500">
                      Have an account?
                    </Link>
                  </div>
                </div>
                {/* <div className="mb-4 mt-5">
                  <h6 className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Login With
                  </h6>
                </div> */}
                {/* <div className="-mx-3 flex flex-wrap">
                  <div className="w-1/2 px-3">
                    <Button
                      block
                      className="border border-slate-200 bg-white text-slate-600 hover:bg-blue-100 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 hover:dark:border-blue-950 hover:dark:bg-blue-950 hover:dark:text-blue-600"
                    >
                      <FontAwesomeIcon icon={faGoogle} />
                      <span>Google</span>
                    </Button>
                  </div>
                  <div className="w-1/2 px-3">
                    <Button
                      block
                      className="border border-slate-200 bg-white text-slate-600 hover:bg-blue-100 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 hover:dark:border-blue-950 hover:dark:bg-blue-950 hover:dark:text-blue-600"
                    >
                      <FontAwesomeIcon icon={faFacebookF} />
                      <span>Facebook</span>
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export default SignupPage;
