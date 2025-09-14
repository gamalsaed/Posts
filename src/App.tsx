import "./App.css";
import { useContext, useEffect } from "react";
import { UsersContext } from "./Context/UsersContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./lib/api";
import RootLayout from "./RootLayout";
import Post from "./Pages/Post";
import CreatePost from "./Pages/CreatePost";
import Posts from "./Pages/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
    ],
  },
]);

function App() {
  const { setUsers } = useContext(UsersContext);
  const { data: users, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (users) {
      setUsers([...users]);
    }
  }, [users, isSuccess]);
  return <RouterProvider router={router} />;
}

export default App;
