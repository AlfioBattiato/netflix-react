import React, { useState } from "react";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Tvshow from "./components/Tvshow";
import ContainerCards from "./components/ContainerCards";
import MyFooter from "./components/MyFooter";
import MyHeader from "./components/MyHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilmDetails from "./components/FilmDetails";

function App() {
  const [Ricerca, setRicerca] = useState("");

  return (
    <BrowserRouter>
      <div>
        <MyNavbar updateRicerca={setRicerca}></MyNavbar>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <MyHeader></MyHeader>
                <ContainerCards object={Ricerca}></ContainerCards>
              </>
            }
          ></Route>

          <Route path="/Tvshow" element={<Tvshow></Tvshow>} />
          <Route path="/Detail/:filmId" element={<FilmDetails></FilmDetails>} />

        </Routes>

        <MyFooter></MyFooter>
      </div>
    </BrowserRouter>
  );
}

export default App;
