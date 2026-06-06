import type { Empleado } from '../types/employee';
import { calcularTotales, formatCurrency } from '../utils/payroll';

interface PayrollBreakdownProps {
  empleado: Empleado | null;
}

export function PayrollBreakdown({ empleado }: PayrollBreakdownProps) {
  if (!empleado) {
    return (
      <section className="shrink-0 rounded-lg border border-dashed border-gray-300 bg-white p-4 text-center shadow-sm sm:p-5 lg:p-6">
        <h2 className="text-base font-semibold text-gray-800 sm:text-lg lg:text-xl">Totales</h2>
        <p className="mt-2 text-xs text-gray-500 sm:text-sm lg:text-base">
          Selecciona un empleado para ver el desglose de percepciones y deducciones.
        </p>
      </section>
    );
  }

  const totales = calcularTotales(empleado);

  return (
    <section className="shrink-0 rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
      <h2 className="text-base font-semibold text-gray-800 sm:text-lg lg:text-xl">Visualizacion de calculos</h2>
      <p className="mt-0.5 text-xs text-gray-500 sm:text-sm lg:text-base">
        Desglose para {empleado.nombre} (#{empleado.id})
      </p>

      <div className="mt-3 space-y-2 sm:space-y-3">
        <div className="rounded-md border border-green-200 bg-green-50 p-2.5 sm:p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-800">Ingresos</p>
          <div className="mt-1.5 space-y-0.5 text-xs text-green-900 sm:space-y-1 sm:text-sm">
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

        <div className="rounded-md border border-red-200 bg-red-50 p-2.5 sm:p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-800">Deducciones</p>
          <div className="mt-1.5 space-y-0.5 text-xs text-red-900 sm:space-y-1 sm:text-sm">
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

        <div className="rounded-md border border-cyan-300 bg-cyan-50 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-900 sm:text-sm">Neto por pagar</span>
            <span className="text-lg font-bold font-mono text-cyan-900 sm:text-xl">{formatCurrency(totales.neto)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
