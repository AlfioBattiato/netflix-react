import React, { useState } from "react";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Tvshow from "./components/Tvshow";
import ContainerCards from "./components/ContainerCards";
import MyFooter from "./components/MyFooter";

function App() {
  const [Ricerca, setRicerca] = useState("");

  return (
    <div>
      <MyNavbar updateRicerca={setRicerca}></MyNavbar>

      <Tvshow></Tvshow>
      <ContainerCards object={Ricerca}></ContainerCards>
      <MyFooter></MyFooter>
    </div>
  );
}

export default App;
