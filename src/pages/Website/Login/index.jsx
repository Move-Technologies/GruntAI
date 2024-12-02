import React, { useState } from "react";
import Layout from "../../../layout/website";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";

import { Label, Input, Button } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import axiosInstance from "../../../lib/axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.email.trim() == "" || formData.password.trim() == "") {
      return alert("Please enter email and password");
    }
    try {
      const response = await axiosInstance.post(
        "/login",
        // "http://localhost:8000/login",
        formData
      );
      alert(response.data.message);
      console.log(response);

      // get the name of the user
      const user = response.data.user;
      // Store user info in localStorage or state management
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Call onLogin to update App state
      //   onLogin(user);

      navigate("/"); // Redirect to dashboard or home page
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <Layout title="Login">
      <Section className="my-auto py-10">
        <Container>
          <div className="-mx-3 flex justify-center">
            <div className="w-full px-3 xs:w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3">
              <div className="w-full rounded-lg border border-slate-200 bg-white p-6 pt-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-2">
                  <h3 className="mb-1 text-xl font-bold text-slate-700 dark:text-white">
                    Login
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    With valid credentials
                  </p>
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
                    <a
                      className="text-xs text-blue-500 hover:text-blue-700"
                      href="#"
                    >
                      Forgot
                    </a>
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
                <div className="pt-3">
                  <Button
                    block
                    className="bg-blue-600 text-white hover:bg-blue-800"
                    onClick={handleSubmit}
                  >
                    Account Login
                  </Button>
                </div>
                <div className="mb-4 mt-5">
                  <h6 className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Login With
                  </h6>
                </div>
                <div className="-mx-3 flex flex-wrap">
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
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export default LoginPage;
