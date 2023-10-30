"use client";

import { useRef, useState } from "react";
import PhotoCard from "./PhotoCard";
import ButtonSubmit from "./ButtonSubmit";
import { revalidate, uploadPhoto } from "@/actions/uploadActions";

export default function UploadForm() {
  const formRef = useRef();
  const [files, setFiles] = useState([]);

  const handleInputFiles = async (e) => {
    const files = e.target.files;
    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        //Only accept image files less than 1mb in size.
        return file;
      }
    });

    setFiles((prev) => [...newFiles, ...prev]);
    formRef.current.reset();
  };
  async function handleDelete(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }
  async function handleUpload() {
    if (!files.length) {
      alert("No Image file are selected.");
    }
    // if (files.length > 3) {
    //   alert("Upload up to 3 image files.");
    // }
    const formData = new FormData(); //eta k ki boleS
    files.forEach((file) => {
      formData.append("files", file);
    });
    const res = await uploadPhoto(formData);
    // if (res?.msg) alert(`Sucess: ${res?.msg}`); // Await delay (2000)
    if (res?.errMsg) alert(`Error: ${res.errMsg}`);
    setFiles([]);
    formRef.current.reset();
    // revalidate("/");
  }
  return (
    <form action={handleUpload} ref={formRef}>
      <div
        style={{
          background: "ddd",
          minHeight: 200,
          margin: "10px 0",
          padding: 10,
        }}
      >
        <input
          type="file"
          accept="image/"
          multiple
          onChange={handleInputFiles}
        />
        <h5 className="text-red-600 font-semibold pt-2">
          (*) Only accept image files less than 1mb in size. up to 3 photo
          files.
        </h5>
        <div className="flex gap-10 flex-wrap m-10">
          {files.map((file, index) => (
            <PhotoCard
              key={index}
              url={URL.createObjectURL(file)}
              onClick={() => handleDelete(index)}
            />
          ))}
        </div>
      </div>
      <ButtonSubmit value="Upload to cloudinary" />
    </form>
  );
}
