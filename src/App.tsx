import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Chanels from "./Pages/Chanels";
import Footer from "./components/Footer";

const App = () => {
  return (
    <main className="min-h-screen min-w-full bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/categories/:category"
          element={
            <div className="flex flex-col min-h-screen">
              <Categories />
              <Footer />
            </div>
          }
        />
        <Route path="/sources/:source" element={<Chanels />} />
      </Routes>
    </main>
  );
};

export default App;
