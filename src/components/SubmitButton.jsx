"use client";

// import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  //   const { pending } = useFormStatus();

  return (
    <button disabled={false} type="submit" className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-200 text-white rounded-md w-full py-1 px-6">
      Subscribe
      {/* {pending ?"Subscribing" : "Subscribe"} */}
    </button>
  );
};

export default SubmitButton;
