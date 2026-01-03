import Review from "./pages/Review";
import { Routes, Route, Link } from "react-router-dom";
import PendingInvoices from "./pages/PendingInvoices";
import ApprovedInvoices from "./pages/ApprovedInvoices";

// import ApprovedInvoices from "./pages/ApprovedInvoices"; // later

function App() {
  return (
    <div className="App">
      {/* Optional: simple nav */}
      <nav className="p-4 bg-gray-100">
        <Link className="mr-4" to="/">Pending</Link>
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
