
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
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";

import { useGetProducts } from "../hooks/useGetProducts.js";
import { AddProductModal } from "../components/AddProductModal.jsx";

export const ProductPage = () => {
    // Extraemos la lista y el método para refrescar los datos
    const { error, loading, products, refetch } = useGetProducts();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end items-end gap-4">
                {/* 
                <div className="flex flex-1 items-end gap-4">
                    <div className="flex flex-col flex-1 max-w-xl">
                        <Input placeholder="Buscar producto..." className="w-full" />
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
                                <SelectItem value="Disponible">Disponible</SelectItem>
                                <SelectItem value="Sin stock">Sin stock</SelectItem>
                                <SelectItem value="Descontinuado">Descontinuado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-foreground">
                            Tipo de piel
                        </label>
                        <Select defaultValue="todos">
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Tipo de piel" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="Seca">Seca</SelectItem>
                                <SelectItem value="Grasa">Grasa</SelectItem>
                                <SelectItem value="Mixta">Mixta</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                    */}
                {/* MODAL PARA AGREGAR PRODUCTO (Botón por defecto incorporado) */}
                <AddProductModal
                    productToEdit={null}
                    onProductSuccess={refetch}
                />
            </div>

            {/* Manejo del Estado de Error */}
            {error ? (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-center">
                    <p>Hubo un error al cargar los productos. Por favor, inténtalo de nuevo.</p>
                </div>
            ) : (
                <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="max-h-[70dvh] overflow-auto">
                        <table className="w-full text-left border-collapse">
                            <TableHeader className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
                                <TableRow className="hover:bg-transparent border-b border-border">
                                    <TableHead className="py-4 px-4">Imagen</TableHead>
                                    <TableHead className="py-4 px-4">Producto</TableHead>
                                    <TableHead className="py-4 px-4">Marca</TableHead>
                                    <TableHead className="py-4 px-4">Categoria</TableHead>
                                    <TableHead className="py-4 px-4">Tipo de piel</TableHead>
                                    <TableHead className="py-4 px-4">Estado</TableHead>
                                    <TableHead className="py-4 px-4">Precio</TableHead>
                                    <TableHead className="py-4 px-4"></TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <TableRow key={`skeleton-${index}`} className="border-b border-border/50 animate-pulse">
                                            <TableCell className="py-3 px-4">
                                                <div className="h-12 w-12 rounded-md bg-slate-200" />
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <div className="h-4 bg-slate-200 rounded w-32" />
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <div className="h-4 bg-slate-200 rounded w-20" />
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <div className="flex flex-col gap-2">
                                                    <div className="h-4 bg-slate-200 rounded w-24" />
                                                    <div className="h-3 bg-slate-200 rounded w-16" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <div className="h-4 bg-slate-200 rounded w-16" />
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <div className="h-7 bg-slate-200 rounded-full w-24" />
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <div className="h-4 bg-slate-200 rounded w-12" />
                                            </TableCell>
                                            <TableCell className="py-3 px-4 text-right">
                                                <div className="h-4 bg-slate-200 rounded w-4 ml-auto" />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : products && products.length > 0 ? (
                                    products.map((item) => (
                                        <TableRow
                                            key={item._id || item.id}
                                            className="border-b border-border/50 hover:bg-slate-50/50 transition-colors"
                                        >
                                            <TableCell className="py-3 px-4">
                                                <div className="h-12 w-12 rounded-md bg-slate-200 border border-border overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-3 px-4 font-medium text-foreground">
                                                {item.productName}
                                            </TableCell>

                                            <TableCell className="py-3 px-4 text-muted-foreground">
                                                {item.brand}
                                            </TableCell>

                                            <TableCell className="py-3 px-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">
                                                        {item.category}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {item.subCategory}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-3 px-4 text-muted-foreground">
                                                {item.skinType}
                                            </TableCell>

                                            <TableCell className="py-3 px-4">
                                                <div
                                                    className={`
                                                        inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-sm font-medium
                                                        ${item.status === "In Stock" || item.status === "Disponible"
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : item.status === "Out of Stock" || item.status === "Sin stock"
                                                                ? "bg-amber-50 text-amber-700"
                                                                : "bg-rose-50 text-rose-700"
                                                        }
                                                    `}
                                                >
                                                    <div
                                                        className={`h-2 w-2 rounded-full ${item.status === "In Stock" || item.status === "Disponible"
                                                            ? "bg-emerald-500"
                                                            : item.status === "Out of Stock" || item.status === "Sin stock"
                                                                ? "bg-amber-500"
                                                                : "bg-rose-500"
                                                            }`}
                                                    />
                                                    <span>{item.status}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-3 px-4 text-muted-foreground">
                                                ${item.price}
                                            </TableCell>

                                            <TableCell className="py-3 px-4 text-right">
                                                {/* MODAL PARA EDITAR PRODUCTO */}
                                                {/* Nota crucial: pasamos las props del trigger de forma explícita */}
                                                <AddProductModal
                                                    productToEdit={item}
                                                    onProductSuccess={refetch}
                                                    triggerComponent={
                                                        <Button
                                                            type="button"
                                                            className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-3 h-8 text-sm cursor-pointer"
                                                        >
                                                            Editar
                                                        </Button>
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                                            No se encontraron productos.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </table>
                    </div>
                </div>
            )}

            {/* Paginación */}
            {!loading && !error && products && products.length > 0 && (
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