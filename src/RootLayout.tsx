import { Outlet } from "react-router-dom";
import Header from "./components/Header";
export default function RootLayout() {
  return (
    <div>
      <div
        className="min-h-screen max-w-full bg-cover bg-center px-40 max-md:px-5 max-sm:px-5 pt-5"
        style={{ backgroundImage: `url('/background.jpg')` }}
      >
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
