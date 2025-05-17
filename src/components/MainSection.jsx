import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import homeIcon from "../assets/lootie/homes.json";

function MainSection() {
  return (
    <motion.main
      className="flex flex-col items-center justify-center mt-5 mb-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col md:flex-row items-center md:space-x-10 space-y-6 md:space-y-0">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl mb-4 text-purple-300 font-semibold">
            AI Study Assistant
          </h2>
          <p className="text-base sm:text-lg max-w-md text-gray-300">
            Elevate your study experience with personalized AI-powered tools.
          </p>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 8px rgb(255,255,255)",
            }}
            className="mt-6 px-6 py-2 bg-purple-600 rounded-full shadow-md text-white hover:bg-black transition-colors duration-300"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-56 h-56 sm:h-72 md:h-96 bg-blue-500 rounded-xl shadow-lg"
        >
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-400 rounded-xl blur-lg opacity-50"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Lottie
              animationData={homeIcon}
              loop={true}
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/quiz-generator">
          <FeatureCard
            title="Quiz Generator"
            description="Create personalized quizzes for better retention."
          />
        </Link>
        <FeatureCard
          title="Study Plans"
          description="Generate study plans tailored to your needs."
        />
        <Link to="/progress">
          <FeatureCard
            title="Progress Tracker"
            description="Track your study progress and performance."
          />
        </Link>
      </motion.div>
    </motion.main>
  );
}

export default MainSection;
