"use client";

import { deletePhoto } from "@/actions/uploadActions";
import PhotoCard from "./PhotoCard";

const PhotoList = ({ photos }) => {
  async function handleDeletePhoto(public_id) {
    await deletePhoto(public_id);
  }
  return (
    <div className="flex flex-wrap gap-5">
      {photos?.map((photo) => (
        <PhotoCard
          key={photo?.public_id}
          url={photo?.secure_url}
          onClick={() => handleDeletePhoto(photo?.public_id)}
        />
      ))}
    </div>
  );
};

export default PhotoList;
