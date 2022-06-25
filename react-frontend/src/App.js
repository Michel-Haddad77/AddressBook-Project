import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/contacts" element={<Contacts/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
