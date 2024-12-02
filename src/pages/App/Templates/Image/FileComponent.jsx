import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import blankImageIllustration from "../../../../assets/images/illustration/blank-image.svg";
import axiosInstance from "../../../../lib/axios";

export function FileComponent({
  handleGenerate,
  imageUrl,
  isImageGenerating,
  setUploadedFile,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles[0]);
    setUploadedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`mb-5 flex w-full items-center justify-center text-center ${
        isImageGenerating ? "pointer-events-none opacity-50" : ""
      }`}
      htmlFor="imageFile"
      {...getRootProps()}
    >
      <div className="flex flex-col items-center justify-center py-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            width={300}
            height={300}
            className="w-80 rounded-xl"
          />
        ) : (
          <>
            {" "}
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .webp, .svg"
              id="imageFile"
              className="hidden"
              {...getInputProps()}
            />
            <div className="h-36">
              <img
                className="pointer-events-none h-full"
                src={blankImageIllustration}
                alt="upload image here"
              />
            </div>
            <div className="mt-5 max-w-xs">
              <p className="text-xl text-slate-500 dark:text-slate-400 ">
                {isDragActive
                  ? "Drop the files here ..."
                  : " Upload images or drag and drop them to this area."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FileComponent;

// <div {...getRootProps()}>
//   <input {...getInputProps()} />
//   {isDragActive ? (
//     <p>Drop the files here ...</p>
//   ) : (
//     <p>Drag 'n' drop some files here, or click to select files</p>
//   )}
// </div>
