import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Eye, Calendar, User, Phone, Hash } from "lucide-react";

export const ViewOrderModal = ({ order, triggerComponent }) => {
    const [open, setOpen] = useState(false);

    if (!order) return null;

    // Adaptado fielmente a la estructura de tu JSON
    const client = order.customerId || {};
    const productsList = order.products || [];

    // Formateador de fechas interno
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Helper para los estilos de la burbuja de estado
    const getStatusStyles = (status) => {
        switch (status) {
            case "Pending":
            case "En proceso":
                return "bg-[#e1665d]/10 text-[#e1665d] border-[#e1665d]/20";
            case "Delivered":
            case "Entregada":
                return "bg-[#2d4a44]/10 text-[#2d4a44] border-[#2d4a44]/20";
            default:
                return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    const translateStatus = (status) => {
        const states = {
            "Pending": "En proceso",
            "Delivered": "Entregada",
            "Cancelled": "Cancelada"
        };
        return states[status] || status;
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerComponent ? triggerComponent : (
                    <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
                        <Eye className="w-4 h-4" />
                        Ver Detalles
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="w-[500px] max-w-[90vw] max-h-[85vh] overflow-y-auto bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
                <DialogHeader className="border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between mt-2">
                        <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-1.5">
                            <Hash className="w-5 h-5 text-[#00c2a8]" />
                            Pedido {order.orderNumber || "—"}
                        </DialogTitle>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusStyles(order.status)}`}>
                            {translateStatus(order.status)}
                        </span>
                    </div>
                    <DialogDescription className="text-slate-400 text-xs flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Registrado el {formatDate(order.orderDate)}
                    </DialogDescription>
                </DialogHeader>

                {/* Sección: Datos del Cliente */}
                <div className="flex flex-col gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl my-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Información del Cliente
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-700">
                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="font-semibold truncate">
                                {`${client.firstName || "Cliente"} ${client.lastName || ""}`.trim()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 justify-self-end">
                            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="font-medium">
                                {client.phone || "—"}
                            </span>
                        </div>
                    </div>
                    {client.email && (
                        <div className="text-xs text-slate-400 border-t border-slate-200/60 pt-2 truncate">
                            {client.email}
                        </div>
                    )}
                </div>

                {/* Sección: Artículos Comprados */}
                <div className="flex flex-col gap-3 mt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Resumen de Productos ({productsList.length})
                    </h3>
                    
                    <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                        {productsList.map((item, index) => {
                            const product = item.productId || {};
                            // item.price viene en la raíz del objeto del arreglo de productos
                            const priceToShow = item.price || product.price || 0; 
                            
                            return (
                                <div 
                                    key={item._id || index} 
                                    className="flex items-center justify-between border border-slate-100 p-2.5 rounded-lg bg-white hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-12 h-12 rounded-md border border-slate-200 bg-slate-50 overflow-hidden shrink-0">
                                            {product.image ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.productName || "Producto"} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold text-[10px]">
                                                    SIN FOTO
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            {/* Corregido a product.productName según tu JSON */}
                                            <span className="text-sm font-bold text-slate-800 truncate">
                                                {product.productName || "Producto Desconocido"}
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium">
                                                {product.brand ? `${product.brand} • ` : ""}Cant: {item.quantity || 1}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-slate-800 pl-2 shrink-0">
                                        ${(priceToShow * (item.quantity || 1)).toFixed(2)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sección: Total General */}
                <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">Total del Pedido</span>
                    <span className="text-2xl font-black text-slate-900">${order.total || 0}</span>
                </div>

                {/* Botón de Cierre */}
                <div className="flex justify-end mt-4">
                    <Button 
                        type="button" 
                        className="bg-[#00c2a8] hover:bg-[#00c2a8]/90 text-white font-medium cursor-pointer px-6 rounded-md text-sm h-9 transition-colors" 
                        onClick={() => setOpen(false)}
                    >
                        Cerrar Ventana
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};