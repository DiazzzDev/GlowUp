import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ListItemCard } from "@/modules/app/components/ListItemCard.jsx";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useGetOrders } from "../hooks/useGetOrders.js";
import { ViewOrderModal } from "../components/ViewOrderModal.jsx";

export const OrderPage = () => {
    // 1. Extraemos los estados reales desde tu hook
    const { error, orders, loading } = useGetOrders();

    // Función auxiliar para formatear la fecha ISO de la API ("2026-06-10T...") a formato local legible
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Función auxiliar para traducir el estado del backend al diseño de tu Select
    const translateStatus = (status) => {
        const states = {
            "Pending": "En proceso",
            "Delivered": "Entregada",
            "Cancelled": "Cancelada"
        };
        return states[status] || status;
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end items-end gap-4">
                {/*  
                <div className="flex flex-1 items-end gap-4">
                    <div className="flex flex-col flex-1 max-w-xl">
                        <Input placeholder="Buscar pedido..." className="w-full" />
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
                                <SelectItem value="Entregada">Entregada</SelectItem>
                                <SelectItem value="En proceso">En proceso</SelectItem>
                                <SelectItem value="Cancelada">Cancelada</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                */}
            </div>

            {error ? (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-center mt-4">
                    <p>Hubo un error al obtener los pedidos. Por favor, inténtalo de nuevo.</p>
                </div>
            ) : (
                <div className="flex flex-col border-t border-slate-200 mt-4 max-h-[65dvh] overflow-y-auto">
                    {loading ? (
                        /* ... Tu render de Skeletons existente */
                        null
                    ) : orders && orders.length > 0 ? (
                        orders.map((order) => {
                            const fallbackImage = order.products?.[0]?.productId?.image || "";
                            const client = order.customerId || {};

                            return (
                                /* 2. Envolvemos o inyectamos el modal usando la prop de trigger */
                                <ViewOrderModal
                                    key={order._id}
                                    order={order}
                                    triggerComponent={
                                        <div className="cursor-pointer group">
                                            <ListItemCard
                                                image={fallbackImage}
                                                title={`${client.firstName || "Cliente"} ${client.lastName || ""}`}
                                                subtitle={`${order.orderNumber}`}
                                                details={[`Tel: ${client.phone || "N/A"}`]}
                                                status={translateStatus(order.status)}
                                                actionLabel="Ver Detalles" // <-- Cambiamos "Editar" por "Ver Detalles"
                                                rightContent={
                                                    <div className="text-right">
                                                        <span className="block text-sm text-slate-500">
                                                            {formatDate(order.orderDate)}
                                                        </span>
                                                        <span className="text-lg font-bold text-slate-900">
                                                            ${order.total}
                                                        </span>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    }
                                />
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            No se encontraron pedidos en el sistema.
                        </div>
                    )}
                </div>
            )}

            {/* Paginación defensiva */}
            {!loading && !error && orders && orders.length > 0 && (
                <div className="flex justify-end w-full">
                    {/*<Pagination>
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
                    </Pagination>*/}
                </div>
            )}
        </div>
    );
};