/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 20,
      stiffness: 150,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};
const Modal = ({ handleClose, text }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal m-auto
        py-2
        rounded-lg flex flex-col items-center bg-slate-100"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{text}</p>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};
export default Modal;
