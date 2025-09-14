import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  return <RouterProvider router={router} />;
}

export default App;
