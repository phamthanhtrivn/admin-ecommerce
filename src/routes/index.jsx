import LayoutDefault from "../layout/LayoutDefault";
import Add from "../pages/Add";
import Home from "../pages/Home";
import List from "../pages/List";
import Orders from "../pages/Orders";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add",
        element: <Add />
      },
      {
        path: "/list",
        element: <List />
      },
      {
        path: "/orders",
        element: <Orders />
      }
    ]
  }
]