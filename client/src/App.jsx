import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllVendors from "./components/Admin/AllVendors";
import Premium from "./components/Premium";
import Profile from "./components/Profile";
import ManagerLeads from "./components/Manager/ManagerLeads";
import ManagerDashboard from "./components/Manager/ManagerDashboard";
import ManagersEmployee from "./components/Manager/ManagersEmployee";

const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const ProtectedRoute = React.lazy(() => import("./utils/ProtectedRoute"));
const Dashboard = React.lazy(() => import("./components/Admin/Dashboard"));
const VendorDashboard = React.lazy(() =>
  import("./components/Vendor/VendorDashboard")
);
const AllEmployee = React.lazy(() => import("./components/Vendor/AllEmployee"));
const AllLeads = React.lazy(() => import("./components/Vendor/AllLeads"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={"Loading"}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={"Loading"}>
              <Register />
            </Suspense>
          }
        />

        <Route
          path="/premium"
          element={
            <Suspense fallback={"Loading"}>
              <Premium />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={"Loading"}>
              <Profile />
            </Suspense>
          }
        />

        <Route
          path="/superadmin"
          element={
            <Suspense fallback={"Loading"}>
              <ProtectedRoute role={"Admin"} />
            </Suspense>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={"Loading"}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="vendors"
            element={
              <Suspense fallback={"Loading"}>
                <AllVendors />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/vendor"
          element={
            <Suspense fallback={"Loading"}>
              <ProtectedRoute role={"Vendor"} />
            </Suspense>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={"Loading"}>
                <VendorDashboard />
              </Suspense>
            }
          />
          <Route
            path="leads"
            element={
              <Suspense fallback={"Loading"}>
                <AllLeads />
              </Suspense>
            }
          />
          <Route
            path="employees"
            element={
              <Suspense fallback={"Loading"}>
                <AllEmployee />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/manager"
          element={
            <Suspense fallback={"Loading"}>
              <ProtectedRoute role={"Manager"} />
            </Suspense>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={"Loading"}>
                <ManagerDashboard />
              </Suspense>
            }
          />
          <Route
            path="leads"
            element={
              <Suspense fallback={"Loading"}>
                <ManagerLeads />
              </Suspense>
            }
          />
          <Route
            path="employees"
            element={
              <Suspense fallback={"Loading"}>
                <ManagersEmployee />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
