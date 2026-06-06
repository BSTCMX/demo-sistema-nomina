import type { Empleado } from '../types/employee';
import { formatCurrency } from '../utils/payroll';

interface EmployeeTableProps {
  empleados: Empleado[];
  seleccionadoId: number | null;
  onSelect: (empleado: Empleado) => void;
}

export function EmployeeTable({ empleados, seleccionadoId, onSelect }: EmployeeTableProps) {
  return (
    <section className="flex min-h-[220px] flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="shrink-0 border-b border-gray-200 px-3 py-2 sm:px-4 lg:px-5 lg:py-3">
        <h2 className="text-base font-semibold text-gray-800 sm:text-lg lg:text-xl">Gestion de empleados</h2>
        <p className="text-xs text-gray-500 sm:text-sm lg:text-base">{empleados.length} registro(s) visibles</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 sm:px-4 lg:py-2.5 lg:text-sm">
                Nombre
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 sm:px-4 lg:py-2.5 lg:text-sm">
                Puesto
              </th>
              <th className="hidden px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 sm:table-cell sm:px-4 lg:py-2.5 lg:text-sm">
                Salario base
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 sm:px-4 lg:py-2.5 lg:text-sm">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {empleados.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500">
                  No se encontraron empleados con los filtros actuales
                </td>
              </tr>
            ) : (
              empleados.map((empleado) => {
                const selected = seleccionadoId === empleado.id;
                return (
                  <tr
                    key={empleado.id}
                    onClick={() => onSelect(empleado)}
                    className={`cursor-pointer transition-colors ${
                      selected ? 'bg-cyan-50 hover:bg-cyan-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-3 py-2 text-sm font-medium text-gray-900 sm:px-4 lg:py-2.5 lg:text-base">{empleado.nombre}</td>
                    <td className="px-3 py-2 text-sm text-gray-700 sm:px-4 lg:py-2.5 lg:text-base">{empleado.puesto}</td>
                    <td className="hidden px-3 py-2 font-mono text-sm text-gray-800 sm:table-cell sm:px-4 lg:py-2.5 lg:text-base">
                      {formatCurrency(empleado.salarioBase)}
                    </td>
                    <td className="px-3 py-2 text-sm sm:px-4 lg:py-2.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          empleado.estado === 'Activo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {empleado.estado}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
