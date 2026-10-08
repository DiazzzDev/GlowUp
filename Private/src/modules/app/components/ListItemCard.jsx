import { Button } from "@/components/ui/button.jsx";

const statusColorClasses = {
    Inactivo: "bg-[#e1665d]",
    Activo: "bg-[#2d4a44]",
    Entregada: "bg-[#00c2a8]",
    "En proceso": "bg-[#2d4a44]",
    Cancelada: "bg-[#e1665d]",
    default: "bg-[#00c2a8]",
};

export const ListItemCard = ({
    image,
    title,
    subtitle,
    details = [],
    status,
    actionLabel,
    onAction,
    rightContent,
}) => {
    const statusDotClass = statusColorClasses[status] ?? statusColorClasses.default;

    return (
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-transparent hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-6">
                {image && (
                    <div className="h-20 w-20 bg-[#e0e0e0] border border-slate-300 rounded-sm overflow-hidden">
                        <img src={image} className="object-cover w-full h-full" alt={title} />
                    </div>
                )}

                <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                    {subtitle && (
                        <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1 w-48">
                    {details.map((detail, index) => (
                        <span key={index} className="text-sm font-medium text-slate-600">
                            {detail}
                        </span>
                    ))}

                    {status && (
                        <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${statusDotClass}`} />
                            <span className="text-sm font-medium text-slate-700">{status}</span>
                        </div>
                    )}
                </div>

                {rightContent && <div className="flex items-center">{rightContent}</div>}

                {actionLabel &&
                    < Button className="rounded-sm" onClick={onAction}>
                        {actionLabel}
                    </Button>
                }
            </div>
        </div >
    );
};
