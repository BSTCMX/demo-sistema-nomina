import type { Empleado, PayrollTotals } from '../types/employee';

export function calcularBruto(empleado: Empleado): number {
  return empleado.salarioBase + empleado.percepciones.bono + empleado.percepciones.horasExtra;
}

export function calcularTotalDeducciones(empleado: Empleado): number {
  return empleado.deducciones.isr + empleado.deducciones.imss + empleado.deducciones.prestamo;
}

export function calcularNeto(empleado: Empleado): number {
  return calcularBruto(empleado) - calcularTotalDeducciones(empleado);
}

export function calcularTotales(empleado: Empleado): PayrollTotals {
  const bruto = calcularBruto(empleado);
  const totalDeducciones = calcularTotalDeducciones(empleado);
  return {
    bruto,
    totalDeducciones,
    neto: bruto - totalDeducciones,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function crearEmpleadoVacio(): Empleado {
  return {
    id: 0,
    nombre: '',
    puesto: '',
    area: 'Produccion',
    tipoContrato: 'Planta',
    estado: 'Activo',
    salarioBase: 0,
    percepciones: { bono: 0, horasExtra: 0 },
    deducciones: { isr: 0, imss: 0, prestamo: 0 },
  };
}
