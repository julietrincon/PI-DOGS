import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CreateDog from "./components/CreateDog/CreateDog";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="dog" element={<CreateDog/>}/>
      <Route path="/dogs/:id" element={<Detail/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;