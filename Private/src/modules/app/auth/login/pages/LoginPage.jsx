import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import bgLogin from "@/assets/bg.png";
import { useNavigate } from "react-router";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
// Si usas un react-router o un contexto global para guardar el usuario, puedes importarlo aquí
// import { useNavigate } from "react-router-dom"; 

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login, loading, error } = useEmployeeAuth();
    // const navigate = useNavigate(); // Descomenta si usas react-router

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(email, password);

        if (result.success) {
            navigate("/admin/employee");
        }
    };

    return (
        /* Fondo utilizando tu asset 'bgLogin' centrado, sin repetir y cubriendo el área */
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgLogin})` }}
        >

            {/* Contenedor de la Tarjeta del Login utilizando variables CSS (@theme) */}
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl p-10 flex flex-col gap-8 border border-white/20">

                {/* Título Principal */}
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
                        Bienvenido
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Ingresa tus credenciales de empleado</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Campo: Correo Electrónico */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Correo electrónico
                        </label>
                        <Input
                            type="email"
                            required
                            disabled={loading}
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/50 border-slate-200 text-slate-800 h-11 px-4 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-md"
                        />
                    </div>

                    {/* Campo: Contraseña */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Contraseña
                        </label>
                        <Input
                            type="password"
                            required
                            disabled={loading}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/50 border-slate-200 text-slate-800 h-11 px-4 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-md"
                        />
                    </div>

                    {/* Alerta de Error dinámica conectada a los mensajes de tu backend */}
                    {error && (
                        <p className="text-sm text-rose-600 font-semibold text-center bg-rose-50 p-2.5 rounded-lg border border-rose-100 animate-fadeIn">
                            {error}
                        </p>
                    )}

                    {/* Botón de Envío usando la variante primaria mapeada a tu turquesa habitual */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00c2a8] hover:bg-[#00c2a8]/90 text-white font-medium text-base h-12 rounded-lg shadow-sm transition-colors mt-4 cursor-pointer flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Autenticando...
                            </>
                        ) : (
                            "Iniciar sesión"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};