import { Search, FilterX } from 'lucide-react';
import type { FiltrosEmpleado } from '../types/employee';
import { AREAS, ESTADOS, TIPOS_CONTRATO } from '../types/employee';

interface SearchFiltersProps {
  filtros: FiltrosEmpleado;
  onChange: (filtros: FiltrosEmpleado) => void;
  onClear: () => void;
}

export function SearchFilters({ filtros, onChange, onClear }: SearchFiltersProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-800">Busqueda y filtros</h2>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <FilterX className="h-4 w-4" />
          Limpiar
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="md:col-span-2 xl:col-span-1">
          <label htmlFor="busqueda" className="mb-1 block text-sm font-medium text-gray-700">
            Buscador dinamico
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="busqueda"
              type="text"
              value={filtros.busqueda}
              onChange={(e) => onChange({ ...filtros, busqueda: e.target.value })}
              placeholder="Nombre, puesto o numero"
              className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
          </div>
        </div>
        <div>
          <label htmlFor="filtro-area" className="mb-1 block text-sm font-medium text-gray-700">
            Area
          </label>
          <select
            id="filtro-area"
            value={filtros.area}
            onChange={(e) => onChange({ ...filtros, area: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            <option value="">Todas</option>
            {AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filtro-contrato" className="mb-1 block text-sm font-medium text-gray-700">
            Tipo de contrato
          </label>
          <select
            id="filtro-contrato"
            value={filtros.tipoContrato}
            onChange={(e) => onChange({ ...filtros, tipoContrato: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            <option value="">Todos</option>
            {TIPOS_CONTRATO.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filtro-estado" className="mb-1 block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            id="filtro-estado"
            value={filtros.estado}
            onChange={(e) => onChange({ ...filtros, estado: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            <option value="">Todos</option>
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
