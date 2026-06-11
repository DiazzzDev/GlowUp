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
import { useGetEmployees } from "../hooks/useGetEmployees.js";
import { AddEmployeeModal } from "../components/AddEmployeeModal.jsx";

export const EmployeePage = () => {
    const { error, employees, loading, refetch } = useGetEmployees();

    return (
        <div className="flex flex-col gap-6 h-full flex-1">
            <div className="flex justify-end items-end gap-4">
                {/* 
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
                */}
                <AddEmployeeModal
                    onEmployeeSuccess={refetch}
                    triggerComponent={
                        <Button className="rounded-sm text-base px-4 py-4 cursor-pointer">
                            <Plus className="mr-2" strokeWidth={4} />
                            Agregar Empleado
                        </Button>
                    }
                />
            </div>

            {/* Manejo de Estados principales */}
            {error ? (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-center mt-4">
                    <p>Hubo un error al cargar los empleados. Por favor, inténtalo de nuevo.</p>
                </div>
            ) : (
                <div className="flex flex-col border-t border-slate-200 mt-4 max-h-[65dvh] overflow-y-auto flex-1">
                    {loading ? (
                        /* Estado de Carga: Skeletons con la forma exacta del ListItemCard */
                        Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="flex items-center justify-between p-4 border-b border-slate-100 animate-pulse"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Simulación de la foto de perfil */}
                                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                                    <div className="flex flex-col gap-2 flex-1 max-w-xs">
                                        {/* Simulación del Nombre */}
                                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                                        {/* Simulación del Email */}
                                        <div className="h-3 bg-slate-200 rounded w-1/2" />
                                        {/* Simulación del Teléfono (detalles) */}
                                        <div className="h-3 bg-slate-200 rounded w-1/3" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    {/* Simulación del Badge de Estado */}
                                    <div className="h-6 bg-slate-200 rounded-full w-16" />
                                    {/* Simulación del Botón Editar */}
                                    <div className="h-8 bg-slate-200 rounded w-14" />
                                </div>
                            </div>
                        ))
                    ) : employees && employees.length > 0 ? (
                        /* Renderizado cuando hay datos válidos */
                        employees.map((emp) => (
                            <ListItemCard
                                key={emp._id}
                                title={`${emp.firstName} ${emp.lastName}`}
                                subtitle={emp.email}
                                details={[`DUI: ${emp.dui}`]}
                                status={emp.status === "Active" ? "Activo" : "Inactivo"}
                                /* Pasamos el modal configurado como acción de edición */
                                rightContent={
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <span className="block text-sm text-slate-500">{emp.phone}</span>
                                        </div>

                                        {/* MODAL EN MODO EDICIÓN */}
                                        <AddEmployeeModal
                                            employeeToEdit={emp}
                                            onEmployeeSuccess={refetch}
                                            triggerComponent={
                                                <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-3 h-8 text-sm cursor-pointer">
                                                    Editar
                                                </Button>
                                            }
                                        />
                                    </div>
                                }
                            />
                        ))
                    ) : (
                        /* Estado vacío cuando la respuesta fue un array sin registros */
                        <div className="p-8 text-center text-muted-foreground">
                            No se encontraron empleados registrados.
                        </div>
                    )}
                </div>
            )}

            {/* Oculta la paginación si está cargando, si hay error o si la lista está vacía */}
            {!loading && !error && employees && employees.length > 0 && (
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
            )}
        </div>
    );
};