import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import UserPage from "./pages/UserPage/UserPage";
import UserDetail from "./pages/UserDetails/UserDetails";
import PhotoPage from "./pages/PhotoPage/PhotoPage";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/users" element={<UserPage />}></Route>
        <Route path="/users/:id" element={<UserDetail />}></Route>
        <Route path="/photos" element={<PhotoPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
