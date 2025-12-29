import Navbar from "./components/Navbar/navbar";
import Table from "./components/Table/table";

import Footer from "./components/Footer/footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4 md:p-8">
        <Table />
      </main>
      <Footer />
    </div>
  );
}
