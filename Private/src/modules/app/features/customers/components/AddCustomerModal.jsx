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
import { useCustomerActions } from "../hooks/useCustomerActions";

export const AddCustomerModal = ({ onCustomerSuccess, customerToEdit = null, triggerComponent }) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const isEditMode = !!customerToEdit;
    const { loading, error, setError, registerCustomer, updateCustomer } = useCustomerActions();

    // 1. Inicialización de React Hook Form adaptado a tu esquema JSON
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            status: "Active",
        },
    });

    // 2. Controlar reseteo del formulario únicamente CUANDO SE ABRE el modal
    useEffect(() => {
        if (!open) return;

        if (isEditMode && customerToEdit) {
            form.reset({
                firstName: customerToEdit.firstName || "",
                lastName: customerToEdit.lastName || "",
                phone: customerToEdit.phone || "",
                email: customerToEdit.email || "",
                password: "",
                status: customerToEdit.status || "Active",
            });
            // Despachamos de forma asíncrona al final de la cola de ejecución para evitar re-renders en cascada
            setTimeout(() => {
                setPreviewUrl(customerToEdit.image || null);
            }, 0);
        } else {
            form.reset({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                password: "",
                status: "Active",
            });
            setTimeout(() => {
                setPreviewUrl(null);
            }, 0);
        }
    }, [open, isEditMode, customerToEdit, form]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // 3. Envío unificado (Crear o Editar)
    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                if (!values.password) delete values.password;
                await updateCustomer(customerToEdit._id, values, selectedFile);
            } else {
                await registerCustomer(values, selectedFile);
            }

            handleCloseModal();
            if (onCustomerSuccess) onCustomerSuccess();
        } catch (err) {
            console.error("Error al procesar el cliente:", err);
        }
    };

    // 4. Aquí limpiamos los estados de archivos de forma segura al cerrar
    const handleCloseModal = () => {
        setOpen(false);
        setError(null);
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => (isOpen ? setOpen(true) : handleCloseModal())}>
            <DialogTrigger asChild>
                {triggerComponent ? triggerComponent : (
                    <Button className="rounded-sm text-base px-4 py-4 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                        <Plus className="mr-2" strokeWidth={4} />
                        Agregar Cliente
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="w-[600px] max-h-[90vh] overflow-y-auto bg-card text-card-foreground rounded-xl p-6 border border-border">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-foreground">
                        {isEditMode ? "Actualizar Perfil del Cliente" : "Registrar Nuevo Cliente"}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">
                        {isEditMode ? "Modifica los datos personales o el estado del cliente." : "Crea una cuenta para un nuevo cliente en la plataforma."}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium rounded-lg text-center">
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">

                        {/* Foto de perfil del Cliente */}
                        <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-input rounded-xl p-4 bg-background/50">
                            {previewUrl ? (
                                <div className="relative w-24 h-24">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-full border border-border" />
                                    <button type="button" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground p-1 rounded-full shadow hover:bg-destructive/90 cursor-pointer">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-1 cursor-pointer w-full py-2">
                                    <Upload className="w-6 h-6 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground font-medium">Subir foto de perfil</span>
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </label>
                            )}
                        </div>

                        {/* Nombres y Apellidos */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="firstName"
                                rules={{ required: "El nombre es obligatorio" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Nombres</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Juan" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                rules={{ required: "El apellido es obligatorio" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Apellidos</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Pérez" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Teléfono y Correo Electrónico */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="phone"
                                rules={{ required: "El teléfono es obligatorio" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Teléfono</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="+503 7000-0000" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{
                                    required: "El correo es obligatorio",
                                    pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" }
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input type="email" disabled={loading} placeholder="juan.perez@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Contraseña y Estado */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="password"
                                rules={!isEditMode ? { required: "La contraseña es obligatoria", minLength: { value: 6, message: "Mínimo 6 caracteres" } } : {}}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">
                                            {isEditMode ? "Contraseña (Opcional)" : "Contraseña"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={loading}
                                                placeholder={isEditMode ? "••••••••" : "Mínimo 6 caracteres"}
                                                {...field}
                                            />
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
                                        <FormLabel className="text-xs font-medium">Estado del Usuario</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el estado" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4">
                            <Button type="button" variant="muted" onClick={handleCloseModal} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {loading ? "Guardando..." : isEditMode ? "Guardar Cambios" : "Agregar Cliente"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};