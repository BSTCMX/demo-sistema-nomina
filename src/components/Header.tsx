import type { RolUsuario } from '../types/employee';
import { ROLES } from '../types/employee';

interface HeaderProps {
  rol: RolUsuario;
  onRolChange: (rol: RolUsuario) => void;
}

export function Header({ rol, onRolChange }: HeaderProps) {
  return (
    <header className="bg-cyan-600 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Tornillos MX - Gestion de Nomina</h1>
          <p className="mt-1 text-sm text-cyan-100">
            Sistema de informacion para altas, consultas y calculo de nomina
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:min-w-[260px]">
          <label htmlFor="rol-usuario" className="text-sm font-medium text-cyan-50">
            Rol de acceso
          </label>
          <select
            id="rol-usuario"
            value={rol}
            onChange={(e) => onRolChange(e.target.value as RolUsuario)}
            className="rounded-md border border-cyan-400 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-200"
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
