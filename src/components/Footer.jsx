import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-0">
        <motion.footer
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="w-full h-16 bg-black/40 flex flex-col items-center justify-center text-center fixed bottom-0 left-0 z-0"
        >
          <p>@ 2025 AI Study Assistant. All rights reserved.</p>
        </motion.footer>
      </div>
    </>
  );
}

export default Footer;
