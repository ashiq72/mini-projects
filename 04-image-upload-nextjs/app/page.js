import { getAllPhotos } from "@/actions/uploadActions";
import PhotoList from "@/components/PhotoList";
import UploadForm from "@/components/UploadForm";

const Home = async () => {
  const photos = await getAllPhotos();
  console.log(photos);
  return (
    <div className="p-10">
      <div>
        <h1 className="font-bold text-lg pb-8">
          Next js Server Action image upload{" "}
        </h1>
        <UploadForm value="Upload to Cloudinary" />

        <h1>All Photos</h1>
        <PhotoList photos={photos || []} />
      </div>
    </div>
  );
};

export default Home;
