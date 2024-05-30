import { Routes, Route } from 'react-router-dom';

import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <>
      <Navbar />
      <h1>App</h1>
     <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default App;
