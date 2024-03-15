import "./App.css";
import MyNavbar from "./components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Tvshow from "./components/Tvshow";
import ContainerCards from "./components/ContainerCards";
import MyFooter from "./components/MyFooter";

function App() {
  return (
    <div>
      <MyNavbar></MyNavbar>
      <Tvshow></Tvshow>
      <ContainerCards></ContainerCards>
      <MyFooter></MyFooter>
    </div>
  );
}

export default App;
