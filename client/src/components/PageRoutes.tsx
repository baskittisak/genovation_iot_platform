import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import NotFound from "./NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
