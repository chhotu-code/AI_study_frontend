import React from "react";
import NavBar from "../components/Navbar";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-800 via-black to-blue-900 text-white flex flex-col">
      <NavBar />
      <MainSection />
      <Footer />
    </div>
  );
}

export default Home;
