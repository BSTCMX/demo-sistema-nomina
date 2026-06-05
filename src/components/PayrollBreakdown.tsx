import type { Empleado } from '../types/employee';
import { calcularTotales, formatCurrency } from '../utils/payroll';

interface PayrollBreakdownProps {
  empleado: Empleado | null;
}

export function PayrollBreakdown({ empleado }: PayrollBreakdownProps) {
  if (!empleado) {
    return (
      <section className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">Totales</h2>
        <p className="mt-3 text-sm text-gray-500">
          Selecciona un empleado para ver el desglose de percepciones y deducciones.
        </p>
      </section>
    );
  }

  const totales = calcularTotales(empleado);

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">Visualizacion de calculos</h2>
      <p className="mt-1 text-sm text-gray-500">
        Desglose para {empleado.nombre} (#{empleado.id})
      </p>

      <div className="mt-4 space-y-3">
        <div className="rounded-md border border-green-200 bg-green-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-800">Ingresos</p>
          <div className="mt-2 space-y-1 text-sm text-green-900">
            <div className="flex justify-between">
              <span>Salario base</span>
              <span className="font-mono">{formatCurrency(empleado.salarioBase)}</span>
            </div>
            <div className="flex justify-between">
              <span>Bono</span>
              <span className="font-mono">{formatCurrency(empleado.percepciones.bono)}</span>
            </div>
            <div className="flex justify-between">
              <span>Horas extra</span>
              <span className="font-mono">{formatCurrency(empleado.percepciones.horasExtra)}</span>
            </div>
            <div className="flex justify-between border-t border-green-200 pt-2 font-semibold">
              <span>Sueldo bruto</span>
              <span className="font-mono">{formatCurrency(totales.bruto)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-800">Deducciones</p>
          <div className="mt-2 space-y-1 text-sm text-red-900">
            <div className="flex justify-between">
              <span>ISR</span>
              <span className="font-mono">{formatCurrency(empleado.deducciones.isr)}</span>
            </div>
            <div className="flex justify-between">
              <span>IMSS</span>
              <span className="font-mono">{formatCurrency(empleado.deducciones.imss)}</span>
            </div>
            <div className="flex justify-between">
              <span>Prestamo</span>
              <span className="font-mono">{formatCurrency(empleado.deducciones.prestamo)}</span>
            </div>
            <div className="flex justify-between border-t border-red-200 pt-2 font-semibold">
              <span>Total deducciones</span>
              <span className="font-mono">{formatCurrency(totales.totalDeducciones)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-cyan-300 bg-cyan-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-cyan-900">Neto por pagar</span>
            <span className="text-xl font-bold font-mono text-cyan-900">{formatCurrency(totales.neto)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
