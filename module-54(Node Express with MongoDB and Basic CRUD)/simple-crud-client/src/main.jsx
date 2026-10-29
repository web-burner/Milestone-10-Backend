import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import UserDetail from "./UserDetail.jsx";
import UpdateUser from "./UpdateUser.jsx";

const router = createBrowserRouter([
  { path: "/users", Component: App },
  { path: "/users/:id",loader:({params})=> fetch(`http://localhost:3500/users/${params.id}`), Component: UserDetail },{
    path: '/update/:id', loader : ({params})=> fetch(`http://localhost:3500/users/${params.id}`),Component: UpdateUser
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
