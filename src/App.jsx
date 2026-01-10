import { Routes, Route, Link } from "react-router-dom";
import PendingInvoices from "./pages/PendingInvoices";
import ApprovedInvoices from "./pages/ApprovedInvoices";

function App() {
 return (
      <div className="App">
       <header className="bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Ezinvy <span className="text-sm text-gray-500 ml-2">Invoice Review</span>
        </h1>
      </header>
      <nav className="p-4 bg-gray-100">
        <Link className="mr-4" to="/">
          Pending
        </Link>
        <Link to="/approved">Approved</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PendingInvoices />} />
        <Route path="/approved" element={<ApprovedInvoices />} />
      </Routes>
    </div>
  );
}

export default App;
