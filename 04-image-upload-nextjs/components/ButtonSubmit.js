"use client";
import { useFormStatus } from "react-dom";

function ButtonSubmit({ value, ...props }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} {...props} className="border-2">
      {pending ? "Loading..." : value}
    </button>
  );
}

export default ButtonSubmit;
