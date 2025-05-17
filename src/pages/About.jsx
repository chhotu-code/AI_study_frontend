import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-800 via-black to-blue-900 text-white overflow-x-hidden">
      <NavBar />
      <motion.main
        className="flex flex-col items-center justify-center flex-grow p-4 sm:p-6 md:p-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-300 mb-6 sm:mb-8 md:mb-10 text-center px-2">
          About AI Study Assistant
        </h2>
        <motion.div
          className="bg-white/10 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-3xl mx-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm sm:text-base md:text-lg text-gray-300 text-center leading-relaxed">
            AI Study Assistant is a revolutionary platform designed to enhance
            the learning experience for students. Our mission is to provide
            AI-driven tools that simplify and personalize the process of
            studying, making it easier to achieve academic success. With
            features like quiz generation, progress tracking, and study
            planning, AI Study Assistant empowers students to learn smarter, not
            harder.
          </p>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}

export default About;
