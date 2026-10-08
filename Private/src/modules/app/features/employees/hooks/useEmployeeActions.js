import { useState } from "react";
import { httpRequest } from "@/utils/httpRequest";

export const useEmployeeActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. Acción de registrar (Paso 1: dispara correo con OTP)
    const registerEmployee = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await httpRequest.post("/employees", data);
            return response;
        } catch (err) {
            const msg = err.response?.data?.message || "Error al registrar el empleado.";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    // 3. Acción de actualizar (PUT)
    const updateEmployee = async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await httpRequest.put(`/employees/${id}`, data);
            return response;
        } catch (err) {
            const msg = err.response?.data?.message || "Error al actualizar el empleado.";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        setError,
        registerEmployee,
        updateEmployee
    };
};