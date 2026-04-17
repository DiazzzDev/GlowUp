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
                <SelectItem value="Cancelada">Cancelada</SelectItem>
                <SelectItem value="En proceso">En proceso</SelectItem>
                <SelectItem value="Entregada">Entregada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="rounded-sm text-base px-4 py-4">
          <Plus className="mr-2" strokeWidth={4} />
          Agregar Empleado
        </Button>
      </div>
      <div className="flex flex-col border-t border-slate-200 mt-4">
        {MOCK_EMPLOYEES.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between p-6 border-b border-slate-200 bg-transparent hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-6">
              {/* Placeholder de Imagen */}
              <div className="h-20 w-20 bg-[#e0e0e0] border border-slate-300 rounded-sm overflow-hidden">
                {employee.image && (
                  <img
                    src={employee.image}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              {/* Info Personal */}
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-800">
                  {employee.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {employee.email}
                </p>
              </div>
            </div>

            {/* Info de contacto y Estado */}
            <div className="flex flex-col gap-1 w-48">
              <span className="text-sm font-medium text-slate-600">
                {employee.phone}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    employee.status === "Cancelada"
                      ? "bg-[#e1665d]"
                      : employee.status === "En proceso"
                      ? "bg-[#2d4a44]"
                      : "bg-[#00c2a8]"
                  }`}
                />
                <span className="text-sm font-medium text-slate-700">
                  {employee.status}
                </span>
              </div>
            </div>

            {/* Botón de Acción (el cuadro turquesa de tu imagen) */}
            <Button className={"rounded-sm"}>Editar</Button>
          </div>
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
