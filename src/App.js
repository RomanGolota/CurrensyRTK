import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
      <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/favourites" element={<FavouritesPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </>
  );
}

export default App;
