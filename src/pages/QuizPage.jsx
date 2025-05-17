import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Pie } from "react-chartjs-2";
import { FaUser, FaBook, FaTrophy } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz, correctAnswers, topic } = location.state;
  const { isAuthenticated, userId } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(40);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userName, setUserName] = useState("Chhotu Kumar");
  const [topicName, setTopicName] = useState("JavaScript Basics");
  const [userAnswers, setUserAnswers] = useState(
    new Array(quiz.length).fill(null)
  );

  useEffect(() => {
    console.log("Component mounted or userId changed:", userId);
  }, [userId]);

  const handleQuestionSubmit = (skip = true) => {
    if (!skip && selectedAnswer.trim() === "") {
      console.log("Answer cannot be empty!");
      return;
    }
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = skip ? null : selectedAnswer;
    setUserAnswers(updatedUserAnswers);

    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer("");
      setTimeLeft(40);
    } else {
      setQuizCompleted(true);
      if (isAuthenticated) {
        submitResults();
      }
    }
  };

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !quizCompleted) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    if (timeLeft === 10) {
      toast.error("Your time is almost up! Hurry up!");
    }
    if (timeLeft === 0) {
      handleQuestionSubmit(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted, selectedAnswer]);

  const getColor = (progress) => {
    if (progress < 20) return "bg-red-700";
    if (progress < 40) return "bg-yellow-500";
    if (progress < 60) return "bg-purple-500";
    if (progress < 80) return "bg-green-500";
    return "bg-orange-500";
  };

  const submitResults = async () => {
    if (!userId || !topic || !userAnswers.length) {
      console.error("Missing required data:", { userId, topic, userAnswers });
      return;
    }
    let totalScore = 0;
    const results = {
      userId,
      topic,
      quizResults: userAnswers.map((answer, index) => {
        const correctAnswer = correctAnswers[index]
          .replace(/\*\*$/, "")
          .trim()
          .toLowerCase();
        const userAnswer = answer ? answer.trim().toLowerCase() : "";

        const isCorrect = userAnswer !== "" && userAnswer === correctAnswer;
        if (isCorrect) {
          totalScore += 1;
        }

        return {
          question: quiz[index].question,
          userAnswer: answer || "No Answer",
          isCorrect,
        };
      }),
    };
    console.log("Total Score:", totalScore);
    setScore(totalScore);
    setQuizCompleted(true);
    console.log("Submitting results:", results);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/submit-results",
        results
      );
      console.log("Response from server:", response.data);
      if (response.status === 201) {
        console.log("Results saved successfully");
      } else {
        console.error("Failed to save results:", response.data);
      }
    } catch (error) {
      console.error(
        "Error saving results:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const correct = score;
  const incorrect = quiz.length - score;

  const chartData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [correct, incorrect],
        backgroundColor: ["#10B981", "#EF4444"],
        borderWidth: 0,
      },
    ],
  };

  const handleBackToQuizGenerator = () => {
    navigate("/quiz-generator");
  };

  const currentQuestion = quiz[currentQuestionIndex];
  const progressBarWidth = ((timeLeft / 40) * 100).toFixed(2);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-800 via-black to-blue-900 text-white flex flex-col pb-16">
      {quizCompleted ? <NavBar /> : ""}
      <main className="flex flex-col items-center justify-center flex-grow w-full p-6 sm:p-8 md:p-10">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              animation: "slideInLeft 0.5s forwards",
            },
          }}
          reverseOrder={false}
        />
        {quizCompleted ? (
          <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 sm:px-6 lg:px-8 rounded-2xl shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-gray-800 p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-72 lg:w-full max-w-3xl text-white space-y-6"
            >
              <h2 className="text-2xl sm:text-4xl font-bold text-center text-green-400">
                🎉 Quiz Summary Report
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 text-md lg:text-lg">
                <div className="flex items-center gap-3">
                  <FaUser className="text-blue-400" />
                  <span className="text-gray-300 font-semibold">Name:</span>
                </div>
                <div>{userName}</div>

                <div className="flex items-center gap-3">
                  <FaBook className="text-purple-400" />
                  <span className="text-gray-300 font-semibold">Topic:</span>
                </div>
                <div>{topicName}</div>

                <div className="flex items-center gap-3">
                  <FaTrophy className="text-yellow-400" />
                  <span className="text-gray-300 font-semibold">Score:</span>
                </div>
                <div>
                  {score} / {quiz.length}
                </div>
              </div>

              <div className="w-full max-w-xs mx-auto">
                <Pie data={chartData} />
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl text-purple-300 font-bold mb-2">
                  📌 Recommendations:
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                  <li>Review incorrect questions for better retention.</li>
                  <li>Focus more on weak areas using targeted practice.</li>
                  <li>Use spaced repetition for long-term memory.</li>
                </ul>
              </div>

              <div className="text-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToQuizGenerator}
                  className="bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-500 transition"
                >
                  🔁 Back to Quiz Generator
                </motion.button>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="relative w-full bg-gray-700 h-6 mb-6 rounded-full">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progressBarWidth}%` }}
                transition={{ ease: "linear", duration: 1 }}
                className={`h-full ${getColor(progressBarWidth)} rounded-full`}
              />
              <span className="absolute inset-0 flex justify-center items-center text-sm font-bold text-white">
                {progressBarWidth}%
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl w-full bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">
                Question {currentQuestionIndex + 1} / {quiz.length}
              </h3>
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 p-5 rounded-lg mb-6"
              >
                <p className="text-xl mb-4 font-semibold">
                  {currentQuestion.question}
                </p>
                {currentQuestion.options &&
                currentQuestion.options.length > 0 ? (
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { staggerChildren: 0.1 },
                      },
                    }}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <motion.li
                        key={index}
                        whileHover={{ scale: 1.05, backgroundColor: "#4A5568" }}
                        whileTap={{ scale: 0.95 }}
                        className="mb-2 p-4 bg-gray-700 rounded cursor-pointer"
                        onClick={() => setSelectedAnswer(option)} // Make the entire option clickable
                      >
                        <label className="w-full h-full cursor-pointer flex items-center">
                          <input
                            type="radio"
                            name={`question-${currentQuestionIndex}`}
                            value={option}
                            className="mr-2"
                            checked={selectedAnswer === option}
                            onChange={() => setSelectedAnswer(option)}
                          />
                          <span className="text-lg">{option}</span>
                        </label>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <div className="text-sm text-gray-500">
                    No options available
                  </div>
                )}
              </motion.div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleQuestionSubmit(true)}
                  className="px-6 py-3 text-sm bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition"
                >
                  Skip
                </button>
                <button
                  onClick={() => handleQuestionSubmit(false)}
                  className="px-6 py-3 text-sm bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 transition"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default QuizPage;
