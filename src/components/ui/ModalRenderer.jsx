

import React from "react";
import { modalIndex, modalStackAtom, } from "@/store/countAtom";
import { useAtom } from "jotai";
import Modal3 from "./Modal3";
import { AnimatePresence } from "framer-motion";
import { useModal } from "@/store/useModal";

export const ModalRenderer = () => {
  const [modalStack] = useAtom(modalStackAtom);
 // const [modalIndex,setModalIndex] = useAtom(modalIndex);
  const { closeModal } = useModal();

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {modalStack.map((modal, index) => (
//setModalIndex(index),
        <Modal3
          key={modal.title + index}
          show={true} // modal is mounted
         // onClose={() => closeModal(index)} // close specific modal
          onClose={() => closeModal()}
          title={modal.title}
          size={modal.size || "md"}
          height={modal.height}
          className={`z-[${50 + index * 10}]`}
        >
          {modal.content}
        </Modal3>
      ))}
    </AnimatePresence>
  );
};
