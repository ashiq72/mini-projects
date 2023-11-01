"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  const [isDraging, setIsDraging] = useState(false);
  const fileInputRef = useRef(null);
  function selectFiles() {
    fileInputRef.current.click();
  }
  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    console.log(index);
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDraging(true);
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
    setIsDraging(false);
  }
  function onDrop(event) {
    event.preventDefault();
    setIsDraging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  function uploadImage() {
    console.log("images:", images);
  }

  return (
    <div className="card">
      <div className="top">
        <p>Drog & Drop image uploading</p>
      </div>
      <div
        className="drag-area"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDraging ? (
          <span className="select">Drop images here</span>
        ) : (
          <>
            Drag & Drop image here or
            <span className="select" role="button" onClick={selectFiles}>
              Browse
            </span>
          </>
        )}

        <input
          name="file"
          type="file"
          className="file"
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        ></input>
      </div>
      <div className="container">
        {images?.map((image, index) => (
          <div key={index} className="image">
            <span onClick={() => deleteImage(index)} className="delete">
              &times;
            </span>
            <Image alt="" src={image.url} width={200} height={200} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          uploadImage;
        }}
      >
        Upload
      </button>
    </div>
  );
}
