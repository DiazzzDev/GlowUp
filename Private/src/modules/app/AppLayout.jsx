import { Outlet } from "react-router"
import { Navbar } from "./components/Navbar.jsx"


export const AppLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--background)]">
            <Navbar />
            <main className="flex-1 w-full p-4 max-w-[85%] mx-auto mt-15">
                <Outlet />
            </main>
        </div>
    )
}