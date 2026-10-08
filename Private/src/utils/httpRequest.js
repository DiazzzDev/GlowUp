async function request(endpoint, options = {}) {
    const url = `http://localhost:4000/api${endpoint}`;
    console.log("Opciones de petición:", options);
    
    // 1. Identificar si el cuerpo enviado es una instancia de FormData (imágenes / archivos)
    const isFormData = options.body instanceof FormData;

    // 2. Cabeceras por defecto
    const defaultHeaders = {};
    
    // Solo añadimos application/json si NO es un FormData
    if (!isFormData) {
        defaultHeaders["Content-Type"] = "application/json";
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers, // Permite sobrescribir o añadir cabeceras extras
        },
        credentials: "include", 
    };

    // 3. Serialización inteligente del Body
    if (options.body && !isFormData && typeof options.body === "object") {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url, config);
        
        let data = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        }

        if (!response.ok) {
            return {
                status: response.status,
                data: data || { message: "Error en la petición" },
                error: true
            };
        }

        return {
            status: response.status,
            data: data,
            error: false
        };

    } catch (error) {
        console.error(`Error en la petición [${config.method || 'GET'}] a ${endpoint}:`, error);

        return {
            status: 500,
            data: null,
            error: true
        };
    }
}

export const httpRequest = {
    get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
    post: (endpoint, body, options) => request(endpoint, { ...options, method: "POST", body }),
    put: (endpoint, body, options) => request(endpoint, { ...options, method: "PUT", body }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: "DELETE" }),
};