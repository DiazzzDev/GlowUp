import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import bgLogin from "@/assets/bg.png";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Iniciando sesión con:", { email, password });
            // Simulación de respuesta de la API
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch (err) {
            console.error(err);
            setError("Correo electrónico o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Fondo utilizando tu asset 'bgLogin' centrado, sin repetir y cubriendo el área */
        <div 
            className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgLogin})` }}
        >
            
            {/* Contenedor de la Tarjeta del Login utilizando variables CSS (@theme) */}
            <div className="w-full max-w-md bg-card text-card-foreground backdrop-blur-sm rounded-[2rem] shadow-xl p-10 flex flex-col gap-8 border border-white/20">
                
                {/* Título Principal */}
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-foreground tracking-tight">
                        Bienvenido
                    </h1>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Campo: Correo Electrónico */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground/80">
                            Correo electrónico
                        </label>
                        <Input
                            type="email"
                            required
                            disabled={loading}
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-input text-foreground h-11 px-4 focus-visible:ring-ring focus-visible:border-ring rounded-md"
                        />
                    </div>

                    {/* Campo: Contraseña */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground/80">
                            Contraseña
                        </label>
                        <Input
                            type="password"
                            required
                            disabled={loading}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-input text-foreground h-11 px-4 focus-visible:ring-ring focus-visible:border-ring rounded-md"
                        />
                    </div>

                    {/* Alerta de Error adaptada al color 'destructive' de tu tema */}
                    {error && (
                        <p className="text-sm text-destructive font-medium text-center bg-destructive/10 p-2.5 rounded-lg border border-destructive/20 animate-fadeIn">
                            {error}
                        </p>
                    )}

                    {/* Botón de Envío usando la variante primaria por defecto de Shadcn (que mapea a tu --color-main turquesa) */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base h-12 rounded-lg shadow-sm transition-colors mt-4 cursor-pointer"
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </Button>
                </form>
            </div>
        </div>
    );
};