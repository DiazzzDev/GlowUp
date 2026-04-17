import { NavLink } from "react-router";

export const Navbar = () => {
	// Estilos base para evitar repetición
	const tabBase = "px-6 py-3 flex items-center gap-2 font-medium transition-all duration-200";

	return (
		<nav className="bg-[var(--color-main)] flex items-end justify-between px-6 h-16 shadow-md">
			<div className="flex items-end h-full space-x-4">

				{/* Administradores */}
				<NavLink
					to="/admin/employee"
					className={({ isActive }) =>
						`${tabBase} rounded-t-xl self-end ${isActive
							? "bg-[var(--color-white)] text-[var(--color-main)]"
							: "text-white hover:bg-white/10 mb-1 rounded-lg"
						}`
					}
				>
					Administradores
				</NavLink>

				{/* Productos */}
				<NavLink
					to="/admin/product"
					className={({ isActive }) =>
						`${tabBase} rounded-t-xl self-end ${isActive
							? "bg-[var(--color-white)] text-[var(--color-main)]"
							: "text-white hover:bg-white/10 mb-1 rounded-lg"
						}`
					}
				>
					Productos
				</NavLink>

				{/* Pedidos */}
				<NavLink
					to="/admin/order"
					className={({ isActive }) =>
						`${tabBase} rounded-t-xl self-end ${isActive
							? "bg-[var(--color-white)] text-[var(--color-main)]"
							: "text-white hover:bg-white/10 mb-1 rounded-lg"
						}`
					}
				>Pedidos
				</NavLink>

				{/* Clientes */}
				<NavLink
					to="/admin/customer"
					className={({ isActive }) =>
						`${tabBase} rounded-t-xl self-end ${isActive
							? "bg-[var(--color-white)] text-[var(--color-main)]"
							: "text-white hover:bg-white/10 mb-1 rounded-lg"
						}`
					}
				>
					Clientes
				</NavLink>
			</div>

			{/* Perfil de Usuario */}
			<div className="pb-3">
				<button className="border-2 border-white rounded-full p-1 text-white hover:bg-white/20 transition-all">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
				</button>
			</div>
		</nav>
	);
};