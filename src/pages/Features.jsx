import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-800 via-black to-blue-900 text-white overflow-x-hidden ">
      <NavBar />
      <motion.main
        className="flex flex-col items-center justify-center flex-grow p-4 sm:p-6 md:p-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-300 mb-6 sm:mb-8 md:mb-10 text-center">
          Features
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 w-full max-w-5xl mx-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgb(0,0,255)" }}
            className="bg-white/10 p-4 sm:p-6 rounded-lg shadow-lg hover:bg-white/20 transition-all"
          >
            <Link to="/quiz-generator">
              <h3 className="text-xl sm:text-2xl">Quiz Generator</h3>
              <p className="mt-2 text-gray-300 text-sm sm:text-base">
                Generate AI-powered quizzes to enhance your learning experience.
              </p>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgb(0,0,255)" }}
            className="bg-white/10 p-4 sm:p-6 rounded-lg shadow-lg hover:bg-white/20 transition-all"
          >
            <h3 className="text-xl sm:text-2xl">Study Plan</h3>
            <p className="mt-2 text-gray-300 text-sm sm:text-base">
              Personalized study plans designed by AI to optimize your schedule.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgb(0,0,255)" }}
            className="bg-white/10 p-4 sm:p-6 rounded-lg shadow-lg hover:bg-white/20 transition-all"
          >
            <Link to="/note">
              <h3 className="text-xl sm:text-2xl">Notes Summarizer</h3>
              <p className="mt-2 text-gray-300 text-sm sm:text-base">
                Automatically summarize lengthy notes for quick review.
              </p>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgb(0,0,255)" }}
            className="bg-white/10 p-4 sm:p-6 rounded-lg shadow-lg hover:bg-white/20 transition-all"
          >
            <Link to="/progress">
              <h3 className="text-xl sm:text-2xl">Progress Tracker</h3>
              <p className="mt-2 text-gray-300 text-sm sm:text-base">
                Monitor and analyze your academic progress with insightful data.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}

export default Features;
