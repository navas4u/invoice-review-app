import { Routes, Route, NavLink } from "react-router-dom";
import PendingInvoices from "./pages/PendingInvoices";
import ApprovedInvoices from "./pages/ApprovedInvoices";

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b shadow-sm px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Ezinvy
          <span className="text-sm text-gray-500 ml-2">
            Invoice Review
          </span>
        </h1>
      </header>

      {/* Navigation Tabs */}
      <nav className="px-6 bg-white border-b">
        <div className="flex space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `py-3 border-b-2 font-medium transition ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-500"
              }`
            }
          >
            Pending
          </NavLink>

          <NavLink
            to="/approved"
            className={({ isActive }) =>
              `py-3 border-b-2 font-medium transition ${
                isActive
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-green-500"
              }`
            }
          >
            Approved
          </NavLink>
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        <Routes>
          <Route path="/" element={<PendingInvoices />} />
          <Route path="/approved" element={<ApprovedInvoices />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
