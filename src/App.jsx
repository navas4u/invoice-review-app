import { Routes, Route, Link } from "react-router-dom";
import PendingInvoices from "./pages/PendingInvoices";
import ApprovedInvoices from "./pages/ApprovedInvoices";

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      
      {/* App Header */}
      <header className="bg-white border-b shadow-sm px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Ezinvy
          <span className="text-sm text-gray-500 ml-2">
            Invoice Review
          </span>
        </h1>
      </header>

      {/* Navigation */}
      <nav className="p-4 bg-gray-100 flex gap-6">
        <Link
          className="font-medium text-gray-700 hover:text-blue-600"
          to="/"
        >
          Pending
        </Link>

        <Link
          className="font-medium text-gray-700 hover:text-blue-600"
          to="/approved"
        >
          Approved
        </Link>
      </nav>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<PendingInvoices />} />
        <Route path="/approved" element={<ApprovedInvoices />} />
      </Routes>

    </div>
  );
}

export default App;
