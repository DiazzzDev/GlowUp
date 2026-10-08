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
import { useGetCustomers } from "../hooks/useGetCustomers.js";
import { AddCustomerModal } from "../components/AddCustomerModal.jsx";

export const CustomerPage = () => {
    // Consumimos los datos reales del hook
    const { error, loading, customers, refetch } = useGetCustomers();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end items-end gap-4">
                {/*
                <div className="flex flex-1 items-end gap-4">
                    <div className="flex flex-col flex-1 max-w-xl">
                        <Input placeholder="Buscar cliente..." className="w-full" />
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
                                <SelectItem value="Active">Activo</SelectItem>
                                <SelectItem value="Inactive">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>*/}

                <AddCustomerModal onCustomerSuccess={refetch} />
            </div>

            {/* Manejo de estados de la API (Error, Loading, Éxito) */}
            {error ? (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-center">
                    <p>Hubo un error al cargar los clientes. Por favor, inténtalo de nuevo.</p>
                </div>
            ) : (
                <div className="flex flex-col border-t border-slate-200 mt-4 max-h-[65dvh] overflow-y-auto">
                    {loading ? (
                        // Skeleton Loader estructurado para ListItemCard
                        Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="flex items-center justify-between p-4 border-b border-slate-100 animate-pulse"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full" />
                                    <div className="flex flex-col gap-2">
                                        <div className="h-4 bg-slate-200 rounded w-40" />
                                        <div className="h-3 bg-slate-200 rounded w-52" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="h-6 bg-slate-200 rounded-full w-16" />
                                    <div className="h-8 bg-slate-200 rounded w-16" />
                                </div>
                            </div>
                        ))
                    ) : customers && customers.length > 0 ? (
                        // Renderizado de clientes reales de la base de datos
                        customers.map((customer) => {
                            // Unificamos el nombre y apellido provenientes de tu BD
                            const fullName = `${customer.firstName || ""} ${customer.lastName || ""}`.trim();

                            return (
                                <ListItemCard
                                    key={customer._id}
                                    image={customer.image} // Maneja automáticamente si viene null o URL
                                    title={fullName}
                                    subtitle={customer.email}
                                    details={[customer.phone, customer.status]}
                                    status={customer.status} // "Active" o "Inactive"
                                    rightContent={
                                        <AddCustomerModal
                                            customerToEdit={customer}
                                            onCustomerSuccess={refetch}
                                            triggerComponent={
                                                <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-3 h-8 text-sm cursor-pointer">
                                                    Editar
                                                </Button>
                                            }
                                        />
                                    }
                                />
                            );
                        })
                    ) : (
                        <div className="py-8 text-center text-muted-foreground">
                            No se encontraron clientes registrados.
                        </div>
                    )}
                </div>
            )}

            {/* Paginación Condicional (Solo se muestra si hay datos y no está cargando) */}
            {!loading && !error && customers && customers.length > 0 && (
                <div className="flex justify-end w-full">
                    {/*<Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    */}
                </div>
            )}
        </div>
    );
};