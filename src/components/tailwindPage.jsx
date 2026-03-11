import { useState } from "react";
import Modal from "../components/ui/Modal";
import Modal2 from "./ui/Modal2";

const TailwindPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Modal
      </button>
<Modal2
 show={open}
        onClose={() => setOpen(false)}
        size="md"
        title="Tailwind Info"

>
   <p className="text-gray-600 text-center">
          This modal is fully controlled via props.
        </p>
        <h1>hi </h1>
</Modal2>
      {/* <Modal
        show={open}
        onClose={() => setOpen(false)}
        size="md"
        title="Tailwind Info"
      >
        <p className="text-gray-600 text-center">
          This modal is fully controlled via props.
        </p>
        <h1>hi </h1>
      </Modal> */}
    </>
  );
};

export default TailwindPage;
