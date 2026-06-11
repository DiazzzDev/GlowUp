import { httpRequest } from "@/utils/httpRequest";
import { useEffect, useState } from "react";

export const useGetCustomers = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. Creamos una función asíncrona INTERNA
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const response = await httpRequest.get('/customers');
                setEmployees(response.data);
                setError(null); // Limpiamos errores previos si los hubiera
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false); // Se ejecuta tanto si va bien como si va mal
            }
        };

        // 2. La ejecutamos inmediatamente
        fetchEmployees();
    }, []); // Array vacío para que solo se ejecute al montar el componente

    // 3. El return SIEMPRE va al final del hook, fuera de cualquier bloque
    return { error, loading, employees };
}