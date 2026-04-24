import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination.jsx";
import { ListItemCard } from "@/modules/app/components/ListItemCard.jsx";
import { MOCK_EMPLOYEES } from "../mock/employees.mock.js";

export const EmployeePage = () => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-end gap-4">
				<div className="flex flex-1 items-end gap-4">
					<div className="flex flex-col flex-1 max-w-xl">
						<Input placeholder="Buscar empleado..." className="w-full" />
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-foreground">
							Estado
						</label>
						<Select defaultValue="todos">
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Estado" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="todos">Todos</SelectItem>
								<SelectItem value="Activo">Activo</SelectItem>
								<SelectItem value="Inactivo">Inactivo</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<Button className="rounded-sm text-base px-4 py-4">
					<Plus className="mr-2" strokeWidth={4} />
					Agregar Empleado
				</Button>
			</div>

			<div className="flex flex-col border-t border-slate-200 mt-4 max-h-[65dvh] overflow-y-auto">
				{MOCK_EMPLOYEES.map((employee) => (
					<ListItemCard
						key={employee.id}
						image={employee.image}
						title={employee.name}
						subtitle={employee.email}
						details={[employee.phone]}
						status={employee.status}
						actionLabel="Editar"
					/>
				))}
			</div>

			<div className="flex justify-end w-full">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};
