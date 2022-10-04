import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RedirectPage from "./pages/auth/RedirectPage";

function App() {
  return (
      <>
          <Routes>
            <Route path="/" element={<RedirectPage/>}/>
            <Route path="/homepage" element={<HomePage/>}/>
            <Route path="/favourites" element={<FavouritesPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </>
  );
}

export default App;
