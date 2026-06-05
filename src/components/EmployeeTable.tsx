import type { Empleado } from '../types/employee';
import { formatCurrency } from '../utils/payroll';

interface EmployeeTableProps {
  empleados: Empleado[];
  seleccionadoId: number | null;
  onSelect: (empleado: Empleado) => void;
}

export function EmployeeTable({ empleados, seleccionadoId, onSelect }: EmployeeTableProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-800">Gestion de empleados</h2>
        <p className="text-sm text-gray-500">{empleados.length} registro(s) visibles</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Puesto
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Salario base
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {empleados.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
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
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{empleado.nombre}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{empleado.puesto}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-800">
                      {formatCurrency(empleado.salarioBase)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
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
