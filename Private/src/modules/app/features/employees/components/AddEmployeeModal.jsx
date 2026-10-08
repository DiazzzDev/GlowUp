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
import { useEmployeeActions } from "../hooks/useEmployeeActions";

export const AddEmployeeModal = ({ onEmployeeSuccess, employeeToEdit = null, triggerComponent }) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const isEditMode = !!employeeToEdit;
    const { loading, error, setError, registerEmployee, updateEmployee } = useEmployeeActions();

    // 1. Inicialización de React Hook Form
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            dui: "",
            phone: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (!open) return;

        if (isEditMode && employeeToEdit) {
            form.reset({
                firstName: employeeToEdit.firstName || "",
                lastName: employeeToEdit.lastName || "",
                dui: employeeToEdit.dui || "",
                phone: employeeToEdit.phone || "",
                email: employeeToEdit.email || "",
                password: "",
            });
        } else {
            form.reset({
                firstName: "", lastName: "", dui: "", phone: "", email: "", password: ""
            });
        }
    }, [open, isEditMode, employeeToEdit, form]);

    // Funciones de formateo dinámico (Máscaras de El Salvador)
    const formatDUI = (value) => {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length <= 8) return numbers;
        return `${numbers.slice(0, 8)}-${numbers.slice(8, 9)}`;
    };

    const formatPhone = (value) => {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length <= 4) return numbers;
        return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
    };

    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                await updateEmployee(employeeToEdit._id, values, selectedFile);
            } else {
                await registerEmployee(values, selectedFile);
            }
            // Flujo directo: Éxito -> Refrescar tabla -> Cerrar Modal
            onEmployeeSuccess();
            handleCloseModal();
        } catch (err) {
            console.log(err);
            // El hook ya gestiona el estado 'error'
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
        setError(null);
        setSelectedFile(null);
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => (isOpen ? setOpen(true) : handleCloseModal())}>
            <DialogTrigger asChild>
                {triggerComponent ? triggerComponent : (
                    <Button className="rounded-sm text-base px-4 py-4 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                        <Plus className="mr-2" strokeWidth={4} />
                        Agregar Empleado
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="w-[800px] bg-card text-card-foreground rounded-xl p-6 border border-border">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-foreground">
                        {isEditMode ? "Actualizar Datos del Empleado" : "Registrar Nuevo Empleado"}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">
                        {isEditMode ? "Modifica los campos necesarios del perfil." : "Complete los datos del perfil del empleado."}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium rounded-lg text-center">
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">

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
                                            <Input disabled={loading} placeholder="Christian" {...field} />
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
                                            <Input disabled={loading} placeholder="Contreras" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* DUI y Teléfono con Máscara en Tiempo Real */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="dui"
                                rules={{
                                    required: "El DUI es obligatorio",
                                    pattern: { value: /^\d{8}-\d$/, message: "Formato inválido (00000000-0)" }
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">DUI</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="00000000-0"
                                                {...field}
                                                onChange={(e) => field.onChange(formatDUI(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                rules={{
                                    required: "El teléfono es obligatorio",
                                    pattern: { value: /^[2678]\d{3}-\d{4}$/, message: "Formato inválido (0000-0000)" }
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Teléfono</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="6929-2896"
                                                {...field}
                                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Correo Electrónico */}
                        <div className="grid grid-cols-1 gap-3">
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{
                                    required: "El correo es obligatorio",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo electrónico inválido" }
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input type="email" disabled={loading} placeholder="correo@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Contraseña */}
                        {!isEditMode && (
                            <FormField
                                control={form.control}
                                name="password"
                                rules={{ required: !isEditMode ? "La contraseña es obligatoria" : false }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel className="text-xs font-medium">
                                            {isEditMode ? "Nueva Contraseña (Opcional)" : "Contraseña provisional"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="password" disabled={loading} placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                        )
                        }

                        <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4">
                            <Button type="button" variant="muted" onClick={handleCloseModal} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {loading ? "Guardando..." : isEditMode ? "Guardar Cambios" : "Registrar Empleado"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};