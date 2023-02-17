import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./styles.scss"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { currentUser } = useContext(AuthContext)

  const ProptectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="login" />
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProptectedRoute>
            <Home />
          </ProptectedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
