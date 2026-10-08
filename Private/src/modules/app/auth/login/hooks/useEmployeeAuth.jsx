import { useState } from "react";
import { httpRequest } from "@/utils/httpRequest"; // Ajusta la ruta donde tengas guardado tu helper

export const useEmployeeAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        // Usamos tu método post: post(endpoint, body, options)
        const response = await httpRequest.post("/employee/login", {
            email: email.trim(),
            password,
        });

        setLoading(false);

        // Tu helper ya estructura las respuestas fallidas con error: true
        if (response.error) {
            // Extrae el mensaje de error del backend o usa un fallback si viene null
            const errorMessage = response.data?.message || "Ocurrió un error inesperado.";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }

        // Si error es false, la petición fue un éxito total (status 200)
        return { success: true, data: response.data };
    };

    return {
        login,
        loading,
        error,
        setError,
    };
};