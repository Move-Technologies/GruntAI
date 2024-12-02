import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Label } from "../../../../components";

import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";

import Layout from "../../../../layout/app";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";
import { Gallery, Item } from "react-photoswipe-gallery";

import blankImageIllustration from "../../../../assets/images/illustration/blank-image.svg";

import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

// -------------------FOR TEMPLATE --------------------------------

const imagestyle = [
  {
    src: "/images/generated/fire-damage.jpg",
    name: "Fire Damage",
  },
  {
    src: "/images/generated/water-damage-in-the-living-room.jpg",
    name: "Water Damage",
  },
];

// -------------------FOR TEMPLATE --------------------------------

function ImageGenerator3() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // for tracking loading from the server
  const [result, setResult] = useState(null);

  // ------------------------------------FOR TEMPLATE -----------------------------------

  const canvasRef = useRef(null);
  const ref = useRef();

  const [selectedStyle, setSelectedStyle] = useState("Photo");
  // ------------------------------------FOR TEMPLATE -----------------------------------

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log()
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setResult(null);
  };

  const cropImage = (image, bbox) => {
    const [xmin, ymin, xmax, ymax] = bbox;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = xmax - xmin;
    canvas.height = ymax - ymin;

    ctx.drawImage(
      image,
      xmin,
      ymin,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return canvas.toDataURL(); // cropped image URL
  };

  // const cropImage = (imageSrc, bbox) => {
  //   return new Promise((resolve, reject) => {
  //     const [xmin, ymin, xmax, ymax] = bbox;
  //     const image = new Image();

  //     // Load the image
  //     image.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");

  //       const cropWidth = xmax - xmin;
  //       const cropHeight = ymax - ymin;

  //       // Validate dimensions
  //       if (cropWidth <= 0 || cropHeight <= 0) {
  //         reject(new Error("Invalid bounding box dimensions."));
  //         return;
  //       }

  //       canvas.width = cropWidth;
  //       canvas.height = cropHeight;

  //       ctx.drawImage(
  //         image,
  //         xmin,
  //         ymin,
  //         cropWidth,
  //         cropHeight,
  //         0,
  //         0,
  //         cropWidth,
  //         cropHeight
  //       );

  //       resolve(canvas.toDataURL()); // Return cropped image as a Data URL
  //     };

  //     image.onerror = (err) => {
  //       reject(new Error("Failed to load image."));
  //     };

  //     // Assign the image source
  //     image.src = imageSrc;
  //   });
  // };

  const drawBoundingBoxes = (image, predictions) => {};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    setLoading(true);
    try {
      const response = await axios.post(
        // "http://localhost:8000/upload", // Your FastAPI server URL
        "https://root-sajjan-backend-image-detection.hf.space/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response from backend:", response);
      setResult(response.data);
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response || error.message || error
      );
      alert("Error processing the image.");
    } finally {
      setLoading(false);
    }
  };

  // Redraw if results are updated
  useEffect(() => {
    if (result && imagePreview) {
      const image = new Image();
      image.src = imagePreview;
      image.onload = () => drawBoundingBoxes(image, result.items);
    }
  }, [result, imagePreview]);

  // download Excel
  const downloadExcel = async () => {
    if (!result) return;

    try {
      // Request the Excel file from FastAPI
      const response = await axios.post(
        "http://localhost:8082/generate-excel", // FastAPI endpoint to generate Excel
        { items: result.items }, // Send result items to the server
        {
          responseType: "blob", // Get the response as a Blob
        }
      );

      // Create a link and trigger the download
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      link.href = url;
      link.setAttribute("download", "analysis_results.xlsx");
      link.click();
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
      alert("Error downloading the Excel file.");
    }
  };

  return (
    <Layout title="Recnognize the Products">
      <Section className="py-10">
        <Container>
          <div className="flex items-start">
            <div className="flex-grow-1 flex w-full flex-wrap rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <div className="w-full border-b border-slate-200 p-5 dark:border-slate-800 xs:p-7 lg:w-1/2 lg:border-b-0 lg:border-e">
                <h3 className="mb-3 text-4xl font-bold text-slate-700 dark:text-white">
                  Recognize the Product!
                </h3>
                <p className="mb-5 max-w-md text-slate-500 dark:text-slate-400">
                  Recognize the products that you have in the image.
                </p>

                <div className="hidden" ref={ref}>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full">
                      <div className="p-3">
                        <Label className="mb-4">Type of Damage</Label>
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
                                  ["rounded-md transition-all duration-500"]: true,
                                  ["cursor-default"]: checked,
                                  ["cursor-pointer"]: !checked,
                                })
                              }
                            >
                              {({ checked }) => (
                                <div className="flex h-full flex-col">
                                  <img
                                    className="flex-shrink-0 rounded-t-md"
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
                <div className="mt-3 w-full pb-1">
                  <div className="flex flex-wrap items-center rounded-md border border-slate-200  p-1 dark:border-slate-800 sm:flex-nowrap">
                    <div className="relative w-full flex-grow sm:w-auto">
                      <div className="-mx-3 flex flex-wrap">
                        <div className="w-full">
                          <div className="p-3">
                            <form onSubmit={handleSubmit}>
                              <label className="mb-4">
                                Upload Image:
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </label>
                              <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-800 sm:w-auto"
                              >
                                Submit
                              </button>
                            </form>
                            {loading && (
                              <div className="spinner-container">
                                <div className="spinner"></div>
                                <p>Processing your image... Hang tight!</p>
                              </div>
                            )}

                            {imagePreview && (
                              <div
                                style={{
                                  position: "relative",
                                  marginTop: "20px",
                                }}
                              >
                                <h2>Uploaded Image</h2>
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={imagePreview}
                                    alt="Uploaded Preview"
                                    style={{
                                      maxWidth: "100%",
                                      height: "auto",
                                      display: "block",
                                      position: "relative",
                                    }}
                                  />
                                  <canvas
                                    ref={canvasRef}
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      pointerEvents: "none",
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full p-6 lg:w-1/2 lg:p-10">
                {result ? (
                  <div className="grid grid-cols-2 gap-7">
                    {/* <h2>Analysis Results</h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "20px",
                    }}
                  > */}
                    <Gallery>
                      {result.items.map((item, index) => {
                        const image = new Image();
                        image.src = imagePreview;

                        return (
                          <Item
                            key={index}
                            original={image.src}
                            thumbnail={image.src}
                            width="1000"
                            height="1000"
                          >
                            {({ ref, open }) => (
                              // <div key={index} style={{ textAlign: "center" }}>
                              <div className="group relative">
                                <img
                                  className="rounded-lg"
                                  src={cropImage(image, item.bbox)}
                                  alt={`Cropped ${item.category}`}
                                  // style={{
                                  //   maxWidth: "150px",
                                  //   height: "auto",
                                  //   border: "1px solid #ccc",
                                  //   borderRadius: "5px",
                                  //   marginBottom: "10px",
                                  // }}
                                />
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
                                    href={cropImage(image, item.bbox)}
                                    download
                                  >
                                    <ArrowDownTrayIcon className="h-4" />
                                  </a>
                                </div>
                                <div>
                                  <strong>Category:</strong> {item.category}{" "}
                                  <br />
                                  <strong>Confidence of YOLO:</strong>{" "}
                                  {item.confidence} <br />
                                  <strong>Category by LLM:</strong>{" "}
                                  {item.category_llm} <br />
                                  <strong>Predicted Brand:</strong>{" "}
                                  {item.predicted_brand} <br />
                                  <strong>Details:</strong> {item.details}{" "}
                                  <br />
                                  <strong>Price:</strong> ${item.price} <br />
                                  <strong>Bounding Box:</strong>{" "}
                                  {item.bbox.join(", ")} <br />
                                </div>
                              </div>
                            )}
                          </Item>
                        );
                      })}
                    </Gallery>

                    {/* <button onClick={downloadExcel} style={{ marginTop: "20px" }}>
                Download Excel
              </button> */}
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center">
                    <div className="flex flex-col items-center py-2">
                      <div className="h-36">
                        <img
                          className="h-full"
                          src={blankImageIllustration}
                          alt=""
                        />
                      </div>
                      <div className="mt-5 max-w-xs">
                        <p className="text-xl text-slate-500 dark:text-slate-400 ">
                          Describe your concept or proposal then hit Generate
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export default ImageGenerator3;
