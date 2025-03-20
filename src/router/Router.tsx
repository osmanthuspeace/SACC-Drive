import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "@/pages/Login.tsx";
import Home from "@/pages/Home.tsx";
import Register from "@/pages/Register.tsx";
import Reset from "@/pages/Reset.tsx";


const Router = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/home" replace={true}/>,
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/home',
      element: <Home/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/reset',
      element: <Reset/>
    }]
  );
  return <RouterProvider router={routes}/>
}

export default Router;
