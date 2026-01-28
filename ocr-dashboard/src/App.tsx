import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ui/layout/ProtectedRoute";
import DashboardLayout from "./components/ui/layout/DashboardLayout";

// These will be your main views - create placeholder files for now
const OcrList = () => <div className="p-6">OCR List Table (Coming Soon)</div>;
const OcrDetails = () => (
  <div className="p-6">OCR Request Details (Coming Soon)</div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* These are "Nested Routes" - they render inside DashboardLayout's <Outlet /> */}
            <Route index element={<OcrList />} />
            <Route path="request/:id" element={<OcrDetails />} />
          </Route>

          {/* Redirect any unknown path to login or dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
