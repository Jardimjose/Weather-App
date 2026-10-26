//import { useState } from "react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Header />
        <main className="flex-1 px-6 py-8"></main>
        <Footer />
      </div>
    </>
  );
}

export default App;
