import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Home from "../Pages/Home";
import ProductPage from "../Pages/ProductPage";
import ProductDetails from "../Pages/ProductDetails";
import About from "../Pages/About";

import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
import AuthLayout from "../Layouts/AuthLayout";
import MainLayout from "../Layouts/MainLayouts";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <LoginPage />,
            },
            {
              path: "register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/main",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "products",
              element: <ProductPage />,
            },
            {
              path: "products/:id",
              element: <ProductDetails />,
            },
            {
              path: "about",
              element: <About />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;