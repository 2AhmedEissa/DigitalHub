import Navbar from "./components/Navbar/navbar";
import Inventory from "./Pages/Inventory";
import Users from "./Pages/Users";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50/50">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: "16px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <Navbar />
        <main className="grow p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
