import { useState } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Login />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
