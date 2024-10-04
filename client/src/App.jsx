import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllVendors from "./components/Admin/AllVendors";
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const ProtectedRoute = React.lazy(() => import("./utils/ProtectedRoute"));
const Dashboard = React.lazy(() => import("./components/Admin/Dashboard"));

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
      </Routes>
    </Router>
  );
}

export default App;
