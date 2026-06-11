import { createBrowserRouter } from 'react-router'
import { AppLayout } from './app/AppLayout.jsx'
import { EmployeePage } from './app/features/employees/pages/EmployeePage.jsx'
import { ProductPage } from './app/features/products/pages/ProductPage.jsx'
import { OrderPage } from './app/features/orders/pages/OrderPage.jsx'
import { CustomerPage } from './app/features/customers/pages/CustomerPage.jsx'
import { LoginPage } from './app/auth/login/pages/LoginPage.jsx'

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/admin",
        element: <AppLayout />,
        children: [
            {
                path: "employee",
                element: <EmployeePage />
            },
            {
                path: "order",
                element: <OrderPage />
            },
            {
                path: "product",
                element: <ProductPage />
            },
            {
                path: "customer",
                element: <CustomerPage />
            }
        ]
    }
])