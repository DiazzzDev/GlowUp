import { httpRequest } from "@/utils/httpRequest"
import { useCallback, useEffect, useState } from "react";

export const useGetProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Encapsulamos la petición asíncrona dentro de una función interna
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await httpRequest.get("/products");
            // Ajusta esto según si tu API devuelve los datos directos o envueltos
            setProducts(response.data || []); 
        } catch (err) {
            console.error("Error fetching products:", err);
            setError(err.message || "Error al obtener productos");
        } finally {
            setLoading(false);
        }
    }, []);

    // Se ejecuta automáticamente al montar el componente
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Retornamos los estados y la función para volver a cargar
    return { 
        products, 
        loading, 
        error, 
        refetch: fetchProducts 
    };
};