
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Tvshow from "./components/Tvshow";
import Homepage from "./components/Homepage";
import MyFooter from "./components/MyFooter";
import MyHeader from "./components/MyHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilmDetails from "./components/FilmDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RisultatoRicerca from "./components/RisultatoRicerca";
import MyList from "./components/MyList";
function App() {

  return (
    <BrowserRouter>
      <div>
        <MyNavbar></MyNavbar>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MyHeader></MyHeader>
                <Homepage></Homepage>
              </>
            }
          ></Route>

          <Route path="/Tvshow" element={<><MyHeader></MyHeader><Tvshow></Tvshow></>} />
          <Route path="/Detail/:type/:id" element={<FilmDetails></FilmDetails>} />
          <Route path="/search" element={<RisultatoRicerca></RisultatoRicerca>} />
          <Route path="/MyList" element={<MyList/>} />

        </Routes>

        <MyFooter></MyFooter>
      </div>
    </BrowserRouter>
  );
}

export default App;
