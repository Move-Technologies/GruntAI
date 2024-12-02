import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../../layout/app";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";

import { templates, result as resultdata } from "../../../../store";
import { Link } from "react-router-dom";
import { Label, Select, Textarea } from "../../../../components";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import slideDown from "../../../../utilities/slideDown";
import slideUp from "../../../../utilities/slideUp";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { Gallery, Item } from "react-photoswipe-gallery";
import axios from "../../../../lib/axios";
import FileComponent from "./FileComponent";
import axiosInstance from "../../../../lib/axios";
import GeneratedImagesComp from "./ImageAfterModeling";
const activityImages = [
  {
    src: "/images/generated/a-modern-and-innovative-commercial-booth-in-the-middle-of-the-desert.jpg",
    link: "#",
    prompt:
      "A modern and innovative commercial booth in the middle of the desert",
  },
  {
    src: "/images/generated/a-teeny-tiny-cute-redheaded-gremlin-girl-reaching-her-hands-into-the-air-saying-because-I-love-you.jpg",
    link: "#",
    prompt:
      "a teeny tiny cute redheaded gremlin girl reaching her hands into the air saying 'because I love you!'.jpg",
  },
  {
    src: "/images/generated/angry-doughnut-walking-down-the-street.jpg",
    link: "#",
    prompt: "Angry doughnut walking down the street",
  },
  {
    src: "/images/generated/design-the-world-through-the-eyes-of-a-neurodivergent-child-vivid-and-vibrant-colours-fun-white-background-hyper-realistic.jpg",
    link: "#",
    prompt:
      "design the world through the eyes of a neurodivergent child vivid and vibrant colours fun white background hyper-realistic",
  },
  {
    src: "/images/generated/happy-ice-cream-sining.jpg",
    link: "#",
    prompt: "Happy ice cream sining",
  },
  {
    src: "/images/generated/cute-cat-as-calculator-macaroon-as-the-buttons-of-the-calculator-ribbon-happy-colors.jpg",
    link: "#",
    prompt:
      "cute cat as calculator macaroon as the buttons of the calculator ribbon happy colors",
  },
  {
    src: "/images/generated/supplement-and-nutrition-company.jpg",
    link: "#",
    prompt: "supplement and nutrition company",
  },
  {
    src: "/images/generated/hyper-realistic-modern-sofa-with-pastel-colors-and-white-background-cinematic-light.jpg",
    link: "#",
    prompt:
      "Hyper realistic modern sofa with pastel colors and white background cinematic light",
  },
  {
    src: "/images/generated/hyper-realistic-modern-furniture-with-white-background-and-pastel-colors-cinematic-lights.jpg",
    link: "#",
    prompt:
      "Hyper realistic modern furniture with white background and pastel colors cinematic lights",
  },
  {
    src: "/images/generated/cute-cat-as-calculator-macaroon-as-the-buttons-of-the-calculator-ribbon-happy-colors2.jpg",
    link: "#",
    prompt:
      "cute cat as calculator macaroon as the buttons of the calculator ribbon happy colors",
  },
];

const imagestyle = [
  {
    src: "/images/generated/auto-detect.jpg",
    name: "Auto Detect",
  },
  {
    src: "/images/generated/natural-disaster.jpg",
    name: "Water Damage",
  },
  {
    src: "/images/generated/house-tree.jpg",
    name: "Disaster Damage",
  },
  {
    src: "/images/generated/fire-damage.jpeg",
    name: "Fire Damage",
  },
  {
    src: "/images/generated/house-inside.jpg",
    name: "Vandalism",
  },
];

const resolution = [
  { name: "256x256" },
  { name: "512x512" },
  { name: "1024x1024" },
];
const lighting = [{ name: "Ambient" }, { name: "Worm" }, { name: "Cold" }];

const iamgecountoptions = [{ name: "1" }, { name: "2" }, { name: "4" }];

function ImageGenerator() {
  const template = templates.filter((template) => template.api === "Image");

  const [selectedStyle, setSelectedStyle] = useState("Photo");
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [generatedData, setGeneratedData] = useState({});
  const [responseText, setResponseText] = useState("");
  const ref = useRef();

  //   this is for uploading image from user's device
  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result);
      };

      reader.readAsDataURL(uploadedFile);
    }
  }, [uploadedFile]);

  useEffect(() => {
    showAdvanced ? slideDown(ref.current) : slideUp(ref.current);
  }, [showAdvanced]);

  const [result, setResult] = useState("");

  // this is for send an http request
  async function handleGenerate() {
    if (!uploadedFile) {
      return;
    }
    // const res = axios;
    try {
      setIsImageGenerating(true);
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", uploadedFile);

      // Use axios to send the POST request
      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data?.items?.length)
        setResponseText("Sorry, cannot detect anything");
      else setResponseText("");
      // The response data is already parsed by Axios
      console.log("Image uploaded successfully:", response.data);
      setGeneratedData(response.data || {});
      setIsImageGenerating(false);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setIsImageGenerating(false);
    }
  }
  const clearField = () => {
    setImageUrl("");
    setResponseText("");
    setUploadedFile(null);
    setGeneratedData({});
  };

  return (
    <Layout title="Image Generator">
      <Section className="py-10">
        <Container>
          <div className="flex items-start">
            <div className="flex-grow-1 flex w-full flex-wrap rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <div className="w-full border-b border-slate-200 p-5 dark:border-slate-800 xs:p-7 lg:w-1/2 lg:border-b-0 lg:border-e">
                <h3 className="mb-3 text-4xl font-bold text-slate-700 dark:text-white">
                  Document Damages Quickly
                </h3>
                <p className="mb-5 max-w-md text-slate-500 dark:text-slate-400">
                  Upload images to document damages and proof of loss within a
                  few seconds.
                </p>
                {/* <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAdvanced(!showAdvanced);
                  }}
                  className="mb-6  flex items-center text-sm text-blue-600"
                >
                  <span className="">Advanced Options</span>
                  <div className="ms-2 h-4">
                    {showAdvanced ? (
                      <MinusIcon className="h-4" />
                    ) : (
                      <PlusIcon className="h-4" />
                    )}
                  </div>
                </a> */}
                <div className="hidden" ref={ref}>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full">
                      <div className="p-3">
                        <Label className="mb-4">Documentation Type</Label>
                        <RadioGroup
                          value={selectedStyle}
                          onChange={setSelectedStyle}
                          className="grid grid-cols-3 gap-3 sm:grid-cols-5"
                        >
                          {imagestyle.map((item, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={item.name}
                              className={({ active, checked }) =>
                                classNames({
                                  ["rounded-md transition-all duration-500 "]: true,
                                  ["cursor-default"]: checked,
                                  ["cursor-pointer"]: !checked,
                                })
                              }
                            >
                              {({ checked }) => (
                                <div className="flex h-full flex-col">
                                  <img
                                    className="aspect-square flex-shrink-0 rounded-t-md object-cover"
                                    src={item.src}
                                  />
                                  <div
                                    className={classNames({
                                      ["flex flex-grow items-center justify-center rounded-b-md border border-t-0 p-2 text-center text-xs font-bold transition-all duration-500"]: true,
                                      ["border-blue-200 bg-blue-100 text-slate-700 dark:border-blue-900 dark:bg-blue-950 dark:text-white"]:
                                        checked,
                                      ["border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-200"]:
                                        !checked,
                                    })}
                                  >
                                    {item.name}
                                  </div>
                                </div>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>
                {generatedData?.items?.length && (
                  <img
                    src={imageUrl}
                    width={300}
                    height={300}
                    alt="Uploaded image"
                    className="mx-auto my-5 rounded-xl"
                  />
                )}
                <div className="mt-3 w-full pb-1">
                  <Label htmlFor="prompt" className="mb-4">
                    Give it some more instructions
                  </Label>
                  <div className="flex flex-wrap items-center rounded-md border border-slate-200  p-1 dark:border-slate-800 sm:flex-nowrap">
                    <div className="relative w-full flex-grow sm:w-auto">
                      <Textarea
                        className="w-full rounded-md px-3 py-3 text-sm"
                        rows="1"
                        notheme={true}
                        placeholder="Delicious pizza with toppings"
                        defaultValue="Find me price estimations when generating the report..."
                        id="prompt"
                      />
                    </div>
                    <button
                      onClick={() => {
                        // setResult(resultdata.image);
                        handleGenerate();
                      }}
                      className={`inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-800 disabled:pointer-events-none disabled:bg-blue-600/50 disabled:hover:bg-blue-600/50 sm:w-auto`}
                      disabled={isImageGenerating}
                    >
                      {isImageGenerating ? "Generating..." : "Generate"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col justify-center gap-5 p-6 lg:w-1/2 lg:p-10">
                {result ? (
                  <div className="grid grid-cols-2 gap-7">
                    <Gallery>
                      {result.map((item, index) => (
                        <Item
                          key={index}
                          original={item.src}
                          thumbnail={item.src}
                          width="1000"
                          height="1000"
                        >
                          {({ ref, open }) => (
                            <div className="group relative">
                              <img className="rounded-lg" src={item.src} />
                              <div className="absolute bottom-4 end-4 flex translate-x-2 translate-y-2 flex-col gap-px rounded-md bg-slate-200 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-700">
                                <button
                                  className="flex h-8 w-8 items-center justify-center bg-white text-slate-600 transition-all first:rounded-t-md last:rounded-b-md hover:bg-green-500 hover:text-white dark:bg-slate-900 dark:text-white hover:dark:bg-green-600"
                                  ref={ref}
                                  onClick={open}
                                >
                                  <ArrowTopRightOnSquareIcon className="h-4" />
                                </button>
                                <a
                                  className="flex h-8 w-8 items-center justify-center bg-white text-slate-600 transition-all first:rounded-t-md last:rounded-b-md hover:bg-green-500 hover:text-white dark:bg-slate-900 dark:text-white hover:dark:bg-green-600"
                                  href={item.src}
                                  download
                                >
                                  <ArrowDownTrayIcon className="h-4" />
                                </a>
                              </div>
                            </div>
                          )}
                        </Item>
                      ))}
                    </Gallery>
                  </div>
                ) : (
                  <>
                    <div className={uploadedFile && "flex-1"}>
                      {generatedData?.items?.length && imageUrl ? (
                        <GeneratedImagesComp responseData={generatedData} />
                      ) : (
                        <FileComponent
                          handleGenerate={handleGenerate}
                          isImageGenerating={isImageGenerating}
                          imageUrl={imageUrl}
                          setUploadedFile={setUploadedFile}
                        />
                      )}
                    </div>
                    {responseText && !!imageUrl && (
                      <div className="pb-4">
                        <p className="flex items-center justify-center gap-2 text-center text-sm text-slate-600 dark:text-slate-400">
                          {responseText} <FaceFrownIcon className="w-5" />
                        </p>
                      </div>
                    )}
                    {imageUrl && (
                      <button
                        onClick={clearField}
                        className="mr-auto mt-10  inline-block w-20 rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-red-800 disabled:pointer-events-none disabled:bg-red-600/50 disabled:hover:bg-red-600/50 sm:w-auto"
                        disabled={isImageGenerating}
                      >
                        Clear
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="pb-10">
        {/* <Container>
          <h5 className="mb-4 text-lg font-bold text-slate-700 dark:text-white">
            Generated History
          </h5>
          <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 xs:p-7">
            <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 md:grid-cols-5">
              {activityImages.map((item, index) => (
                <Link
                  className="group relative overflow-hidden rounded-md border border-slate-200 dark:border-slate-800"
                  key={index}
                  to={item.link}
                >
                  <img
                    className="rounded-md"
                    src={item.src}
                    alt={item.prompt}
                  />
                  <div className="absolute bottom-0 w-full rounded-b-md bg-gradient-to-b from-transparent via-slate-900 via-70% to-slate-900 p-3 opacity-0 transition-all group-hover:opacity-100">
                    <span className="mb-1 inline-flex rounded bg-blue-500 px-2 pb-1 text-xs font-bold text-white">
                      prompt
                    </span>
                    <span className="line-clamp-2 text-xs font-bold text-white">
                      {item.prompt}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container> */}
      </Section>
    </Layout>
  );
}

export default ImageGenerator;
