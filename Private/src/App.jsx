import { RouterProvider } from "react-router"
import { AppRouter } from "./modules/AppRouter.jsx"

export const App = () => {
  return (
    <RouterProvider router={AppRouter} />
  )
}