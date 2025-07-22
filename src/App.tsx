import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Register/>} path='/register'/>
        <Route element={<SignIn/>} path='/sign-in'/>
        <Route element={<Contact/>} path='/contact'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;