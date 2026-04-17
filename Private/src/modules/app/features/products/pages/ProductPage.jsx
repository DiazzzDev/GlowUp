import { MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const ProductPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end gap-4">
                <div className="flex flex-1 items-end gap-4">

                    <div className="flex flex-col flex-1 max-w-xl">
                        <Input placeholder="Buscar producto..." className="w-full" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-foreground">Estado</label>
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
                        <label className="text-sm font-medium text-foreground">Tipo de piel</label>
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
            <table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Marca</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Tipo de piel</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Precio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-b border-border/50 hover:bg-slate-50/50 transition-colors">
                        <TableCell>
                            <div className="h-12 w-12 rounded-md bg-slate-200 border border-border" />
                        </TableCell>

                        <TableCell className="font-medium text-foreground">
                            Crema hidratante
                        </TableCell>

                        <TableCell className="text-muted-foreground">CeraVe</TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="font-medium text-foreground">Skincare</span>
                                <span className="text-xs text-muted-foreground">Serum</span>
                            </div>
                        </TableCell>

                        <TableCell className="text-muted-foreground">Seca</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[var(--color-main)]" />
                                <span className="text-sm">Disponible</span>
                            </div>
                        </TableCell>

                        <TableCell className="text-muted-foreground">$29.99</TableCell>

                        <TableCell className="text-right">
                            <button size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </table>
        </div>
    )
}