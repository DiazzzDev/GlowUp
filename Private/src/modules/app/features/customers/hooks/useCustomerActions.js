import { useState } from "react";
import { httpRequest } from "@/utils/httpRequest"; // Asegúrate de apuntar a la ruta real de tu request global

export const useCustomerActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Función helper interna para empaquetar los campos del formulario
     * y el archivo binario de la imagen dentro de un FormData.
     */
    const prepareFormData = (values, file) => {
        const formData = new FormData();

        // Mapeamos dinámicamente cada campo del objeto de React Hook Form al FormData
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        // Si el usuario seleccionó un archivo de imagen, lo adjuntamos
        if (file) {
            // El nombre "image" debe coincidir con el campo binario que espera tu middleware (ej. Multer)
            formData.append("image", file);
        }

        return formData;
    };

    /**
     * Acción para REGISTRAR un nuevo cliente
     */
    const registerCustomer = async (values, file) => {
        setLoading(true);
        setError(null);

        const body = prepareFormData(values, file);

        try {
            // Ajusta el endpoint "/customers" según la ruta exacta de tu API de Backend
            const response = await httpRequest.post("/customer", body);

            if (response.error) {
                // Capturamos el mensaje de error estructurado que devuelve tu request global
                setError(response.data?.message || "Error al registrar el cliente");
                throw response;
            }

            return response.data;
        } catch (err) {
            // Si ocurre un error de red o la promesa falla de otra forma
            if (!error) setError(err.data?.message || "Error de conexión con el servidor");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Acción para ACTUALIZAR un cliente existente
     */
    const updateCustomer = async (id, values, file) => {
        setLoading(true);
        setError(null);

        const body = prepareFormData(values, file);

        try {
            // Ajusta el endpoint según tu enrutador del backend (ej. /customers/:id)
            const response = await httpRequest.put(`/customer/${id}`, body);

            if (response.error) {
                setError(response.data?.message || "Error al actualizar el cliente");
                throw response;
            }

            return response.data;
        } catch (err) {
            if (!error) setError(err.data?.message || "Error de conexión con el servidor");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        setError,
        registerCustomer,
        updateCustomer
    };
};