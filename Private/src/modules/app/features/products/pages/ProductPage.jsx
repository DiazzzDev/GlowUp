import { MoreVertical, Plus } from "lucide-react";
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
import { MOCK_PRODUCTS } from "../mock/products.mock.js";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination.jsx";

export const ProductPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end gap-4">
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

        <Button className="rounded-sm text-base px-4 py-4">
          <Plus className="mr-2" strokeWidth={4} />
          Agregar Producto
        </Button>
      </div>
      {MOCK_PRODUCTS.length > 0 ? (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="max-h-[70dvh] overflow-auto">
            <table className="w-full text-left border-collapse">
              {/* Header con tu estilo original + Sticky/Blur */}
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
                {MOCK_PRODUCTS.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-border/50 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Imagen con tu div original */}
                    <TableCell className="py-3 px-4">
                      <div className="h-12 w-12 rounded-md bg-slate-200 border border-border overflow-hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>

                    {/* Texto: font-medium text-foreground */}
                    <TableCell className="py-3 px-4 font-medium text-foreground">
                      {item.name}
                    </TableCell>

                    {/* Texto: text-muted-foreground */}
                    <TableCell className="py-3 px-4 text-muted-foreground">
                      {item.brand}
                    </TableCell>

                    {/* Categoría con tu estructura original */}
                    <TableCell className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {item.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.subcategory}
                        </span>
                      </div>
                    </TableCell>

                    {/* Texto: text-muted-foreground */}
                    <TableCell className="py-3 px-4 text-muted-foreground">
                      {item.skinType}
                    </TableCell>

                    {/* Estado con tus colores originales (Punto + Texto) */}
                    <TableCell className="py-3 px-4">
                      <div
                        className={`
					 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-sm
					 ${
             item.status === "In Stock" || item.status === "Disponible"
               ? "bg-emerald-50 text-emerald-700"
               : item.status === "Out of Stock" || item.status === "Sin stock"
               ? "bg-amber-50 text-amber-700"
               : "bg-rose-50 text-rose-700"
           }
				   `}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            item.status === "In Stock" ||
                            item.status === "Disponible"
                              ? "bg-emerald-500"
                              : item.status === "Out of Stock" ||
                                item.status === "Sin stock"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                        />
                        <span>{item.status}</span>
                      </div>
                    </TableCell>

                    {/* Texto: text-muted-foreground */}
                    <TableCell className="py-3 px-4 text-muted-foreground">
                      ${item.price}
                    </TableCell>

                    <TableCell className="py-3 px-4 text-right">
                      <button size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </table>
          </div>
        </div>
      ) : (
        <p>No hay datos</p>
      )}
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
