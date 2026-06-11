import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.jsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";
import { useProductActions } from "../hooks/useProductActions";

export const AddProductModal = ({ onProductSuccess, productToEdit = null, triggerComponent }) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const isEditMode = !!productToEdit;
    const { loading, error, setError, registerProduct, updateProduct } = useProductActions();

    // 1. Inicialización de React Hook Form basado en tu Schema de Mongoose
    const form = useForm({
        defaultValues: {
            productName: "",
            brand: "",
            category: "",
            subCategory: "",
            skinType: "",
            description: "",
            stock: 0,
            status: "In Stock",
            price: "",
        },
    });

    // 2. Controlar reseteo al abrir/cerrar o cambiar a modo edición
    useEffect(() => {
        if (!open) return;

        if (isEditMode && productToEdit) {
            form.reset({
                productName: productToEdit.productName || "",
                brand: productToEdit.brand || "",
                category: productToEdit.category || "",
                subCategory: productToEdit.subCategory || "",
                skinType: productToEdit.skinType || "",
                description: productToEdit.description || "",
                stock: productToEdit.stock ?? 0,
                status: productToEdit.status || "In Stock",
                price: productToEdit.price || "",
            });
            const timer = setTimeout(() => {
                setPreviewUrl(productToEdit.image || null);
            }, 0);
            return () => clearTimeout(timer);
        } else {
            form.reset({
                productName: "", brand: "", category: "", subCategory: "", 
                skinType: "", description: "", stock: 0, status: "In Stock", price: ""
            });
            const timer = setTimeout(() => {
                setPreviewUrl(null);
                setSelectedFile(null);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [open, isEditMode, productToEdit, form]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // 3. Envío unificado usando la lógica del httpRequest global preparado para FormData
    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                await updateProduct(productToEdit._id, values, selectedFile);
            } else {
                await registerProduct(values, selectedFile);
            }
            onProductSuccess();
            handleCloseModal();
        } catch (err) {
            console.log(err);
            // El hook gestiona el estado del error global
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
        setError(null);
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => (isOpen ? setOpen(true) : handleCloseModal())}>
            <DialogTrigger onClick={() => setOpen(true)} asChild>
                {triggerComponent ? triggerComponent : (
                    <Button className="rounded-sm text-base px-4 py-4 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                        <Plus className="mr-2" strokeWidth={4} />
                        Agregar Producto
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="w-[850px] max-h-[90vh] overflow-y-auto bg-card text-card-foreground rounded-xl p-6 border border-border">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-foreground">
                        {isEditMode ? "Actualizar Datos del Producto" : "Registrar Nuevo Producto"}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">
                        {isEditMode ? "Modifica las especificaciones necesarias del producto." : "Complete el catálogo con un nuevo artículo."}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium rounded-lg text-center">
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">

                        {/* Dropzone de Imagen del Producto */}
                        <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-input rounded-xl p-4 bg-background/50">
                            {previewUrl ? (
                                <div className="relative w-28 h-28">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg border border-border" />
                                    <button type="button" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground p-1 rounded-full shadow hover:bg-destructive/90 cursor-pointer">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-1 cursor-pointer w-full py-3">
                                    <Upload className="w-7 h-7 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground font-medium">Subir imagen del producto</span>
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </label>
                            )}
                        </div>

                        {/* Nombre del Producto y Marca */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="productName"
                                rules={{ required: "El nombre del producto es obligatorio" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Nombre del Producto</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Crema hidratante" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="brand"
                                rules={{ required: "La marca es obligatoria" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Marca</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="CeraVe" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Categoría y Subcategoría */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="category"
                                rules={{ required: "La categoría es obligatoria" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Categoría</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Uso diario" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subCategory"
                                rules={{ required: "La subcategoría es obligatoria" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Subcategoría</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Cremas" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Tipo de piel e Indicador de Estado */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="skinType"
                                rules={{ required: "El tipo de piel es obligatorio" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Tipo de piel</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Seca, Grasa, Mixta" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Estado de Stock</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el estado" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="In Stock">In Stock</SelectItem>
                                                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                                <SelectItem value="Discontinued">Discontinued</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Stock y Precio */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="stock"
                                rules={{ required: "El stock es obligatorio", min: { value: 0, message: "No puede ser menor a 0" } }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Cantidad en Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" disabled={loading} placeholder="0" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                rules={{ required: "El precio es obligatorio", min: { value: 0.01, message: "Debe ser mayor a 0" } }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Precio ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" disabled={loading} placeholder="10.00" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || "")} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Descripción del Producto */}
                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: "La descripción es obligatoria" }}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1">
                                    <FormLabel className="text-xs font-medium">Descripción del Producto</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Escribe detalles del producto, beneficios..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-destructive" />
                                </FormItem>
                            )}
                        />

                        {/* Botonera de Acciones */}
                        <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4">
                            <Button type="button" variant="muted" onClick={handleCloseModal} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {loading ? "Guardando..." : isEditMode ? "Guardar Cambios" : "Agregar Producto"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};