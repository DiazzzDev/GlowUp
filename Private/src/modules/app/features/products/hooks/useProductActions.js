import { useState } from "react";
import { httpRequest } from "@/utils/httpRequest"; // Tu request global mejorado

export const useProductActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const prepareFormData = (values, file) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });
        if (file) {
            formData.append("image", file); // Mismo nombre que intercepta tu middleware multer
        }
        return formData;
    };

    const registerProduct = async (values, file) => {
        setLoading(true);
        setError(null);
        const body = prepareFormData(values, file);
        const response = await httpRequest.post("/products", body); // Tu ruta del backend
        setLoading(false);
        if (response.error) {
            setError(response.data?.message || "Error al registrar el producto");
            throw response;
        }
        return response.data;
    };

    const updateProduct = async (id, values, file) => {
        setLoading(true);
        setError(null);
        const body = prepareFormData(values, file);
        const response = await httpRequest.put(`/products/${id}`, body);
        setLoading(false);
        if (response.error) {
            setError(response.data?.message || "Error al actualizar el producto");
            throw response;
        }
        return response.data;
    };

    return { loading, error, setError, registerProduct, updateProduct };
};