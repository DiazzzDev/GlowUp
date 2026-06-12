import { httpRequest } from "@/utils/httpRequest";
import { useCallback, useEffect, useState } from "react";

export const useGetCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Encapsulamos la petición asíncrona dentro de una función interna
    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await httpRequest.get("/customer");
            // Ajusta esto según si tu API devuelve los datos directos o envueltos
            setCustomers(response.data || []);
        } catch (err) {
            console.error("Error fetching customers:", err);
            setError(err.message || "Error al obtener clientes");
        } finally {
            setLoading(false);
        }
    }, []);

    // Se ejecuta automáticamente al montar el componente
    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    // Retornamos los estados y la función para volver a cargar
    return {
        customers,
        loading,
        error,
        refetch: fetchCustomers
    };
};