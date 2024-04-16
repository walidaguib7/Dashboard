import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";

import BlogPage from "./pages/Blogs/BlogPage.tsx";
import ServicesPage from "./pages/Services/ServicesPage.tsx";
import RootLayout from "./RootLayout.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import MessagesPage from "./pages/Messages/MessagesPage.tsx";
import AuthPage from "./pages/Auth/AuthPage.tsx";
import Login from "./pages/Auth/Login/Login.tsx";
import SignUp from "./pages/Auth/SignUp/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: sessionStorage.getItem("user") ? <RootLayout /> : <AuthPage />,

    children: sessionStorage.getItem("user")
      ? [
          { path: "", element: <Home /> },
          { path: "/blogs", element: <BlogPage /> },
          { path: "/services", element: <ServicesPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/messages", element: <MessagesPage /> },
        ]
      : [
          { path: "", element: <Login /> },
          { path: "/create", element: <SignUp /> },
        ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
