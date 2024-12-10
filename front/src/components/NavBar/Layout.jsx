import Index from "./Index";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Index />
      <Outlet />
    </div>
  );
}
