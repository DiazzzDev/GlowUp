import { useState, useEffect, useCallback } from "react";
// Asegúrate de que la ruta a tu instancia de axios/http sea la correcta
import { httpRequest } from "@/utils/httpRequest"; 

export const useGetEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Encapsulamos la petición asíncrona dentro de una función interna
    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await httpRequest.get("/employees");
            // Ajusta esto según si tu API devuelve los datos directos o envueltos
            setEmployees(response.data || []); 
        } catch (err) {
            console.error("Error fetching employees:", err);
            setError(err.message || "Error al obtener empleados");
        } finally {
            setLoading(false);
        }
    }, []);

    // Se ejecuta automáticamente al montar el componente
    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    // Retornamos los estados y la función para volver a cargar
    return { 
        employees, 
        loading, 
        error, 
        refetch: fetchEmployees 
    };
};