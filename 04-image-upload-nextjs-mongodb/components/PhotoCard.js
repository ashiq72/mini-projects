import Image from "next/image";
import { useTransition } from "react";

const PhotoCard = ({ url, onClick }) => {
  const [isPending, startTramsition] = useTransition();
  return (
    <div>
      <div className=" border-2 border-green-500">
        <Image src={url} alt="" width={300} height={300} priority />
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTramsition(onClick)}
      >
        {isPending ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};

export default PhotoCard;
