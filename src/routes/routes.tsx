import { createBrowserRouter } from "react-router-dom";
import Main from "@/pages/main.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  }
]);
export default router;
