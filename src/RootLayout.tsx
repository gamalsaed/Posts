import { Outlet } from "react-router-dom";
import Header from "./components/Header";
export default function RootLayout() {
  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center px-10 pt-5"
        style={{ backgroundImage: `url('/background.jpg')` }}
      >
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
