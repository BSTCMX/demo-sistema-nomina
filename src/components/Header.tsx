import type { RolUsuario } from '../types/employee';
import { ROLES } from '../types/employee';

interface HeaderProps {
  rol: RolUsuario;
  onRolChange: (rol: RolUsuario) => void;
}

export function Header({ rol, onRolChange }: HeaderProps) {
  return (
    <header className="shrink-0 bg-cyan-600 text-white shadow-md">
      <div className="flex w-full flex-col gap-2 px-4 py-3 sm:px-5 md:flex-row md:items-center md:justify-between lg:px-6 xl:px-8">
        <div>
          <h1 className="text-lg font-bold sm:text-xl lg:text-2xl xl:text-3xl">Tornillos MX - Gestion de Nomina</h1>
          <p className="mt-0.5 text-xs text-cyan-100 sm:text-sm">
            Sistema de informacion para altas, consultas y calculo de nomina
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:min-w-[220px] md:min-w-[240px]">
          <label htmlFor="rol-usuario" className="text-xs font-medium text-cyan-50 sm:text-sm">
            Rol de acceso
          </label>
          <select
            id="rol-usuario"
            value={rol}
            onChange={(e) => onRolChange(e.target.value as RolUsuario)}
            className="rounded-md border border-cyan-400 bg-white px-3 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
