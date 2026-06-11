import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ListItemCard } from "@/modules/app/components/ListItemCard.jsx";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useGetOrders } from "../hooks/useGetOrders.js";

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
                <Button className="rounded-sm text-base px-4 py-4">
                    <Plus className="mr-2" strokeWidth={4} />
                    Agregar Pedido
                </Button>
            </div>

            {/* Manejo de Error */}
            {error ? (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-center mt-4">
                    <p>Hubo un error al obtener los pedidos. Por favor, inténtalo de nuevo.</p>
                </div>
            ) : (
                <div className="flex flex-col border-t border-slate-200 mt-4 max-h-[65dvh] overflow-y-auto">
                    {loading ? (
                        /* Skeleton Shimmer adaptado a la forma del ListItemCard de Órdenes */
                        Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="flex items-center justify-between p-4 border-b border-slate-100 animate-pulse"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="h-12 w-12 rounded-md bg-slate-200" />
                                    <div className="flex flex-col gap-2 flex-1 max-w-xs">
                                        <div className="h-4 bg-slate-200 rounded w-2/3" />
                                        <div className="h-3 bg-slate-200 rounded w-1/3" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="h-6 bg-slate-200 rounded-full w-20" />
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="h-3 bg-slate-200 rounded w-16" />
                                        <div className="h-5 bg-slate-200 rounded w-12" />
                                    </div>
                                    <div className="h-8 bg-slate-200 rounded w-12" />
                                </div>
                            </div>
                        ))
                    ) : orders && orders.length > 0 ? (
                        /* Renderizado de la data real */
                        orders.map((order) => {
                            // Extraemos la imagen del primer producto del carrito de la orden (si existe)
                            const fallbackImage = order.products?.[0]?.productId?.image || "";
                            const client = order.customerId || {};

                            return (
                                <ListItemCard
                                    key={order._id} // Mapped desde MongoDB _id
                                    image={fallbackImage}
                                    title={`${client.firstName || "Cliente"} ${client.lastName || ""}`}
                                    subtitle={`${order.orderNumber}`} // Ya trae el "N°" incorporado en el JSON
                                    details={[`Tel: ${client.phone || "N/A"}`]}
                                    status={translateStatus(order.status)}
                                    actionLabel="Editar"
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
                            );
                        })
                    ) : (
                        /* Estado de lista vacía */
                        <div className="p-8 text-center text-muted-foreground">
                            No se encontraron pedidos en el sistema.
                        </div>
                    )}
                </div>
            )}

            {/* Paginación defensiva */}
            {!loading && !error && orders && orders.length > 0 && (
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