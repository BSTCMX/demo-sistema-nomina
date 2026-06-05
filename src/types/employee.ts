export type TipoContrato = 'Planta' | 'Temporal' | 'Honorarios';
export type EstadoEmpleado = 'Activo' | 'Inactivo';
export type RolUsuario = 'Administrador' | 'Recursos Humanos' | 'Contador';

export interface Empleado {
  id: number;
  nombre: string;
  puesto: string;
  area: string;
  tipoContrato: TipoContrato;
  estado: EstadoEmpleado;
  salarioBase: number;
  percepciones: {
    bono: number;
    horasExtra: number;
  };
  deducciones: {
    isr: number;
    imss: number;
    prestamo: number;
  };
}

export interface PayrollTotals {
  bruto: number;
  totalDeducciones: number;
  neto: number;
}

export interface FiltrosEmpleado {
  busqueda: string;
  area: string;
  tipoContrato: string;
  estado: string;
}

export const STORAGE_KEY = 'tornillos_nomina_empleados';

export const AREAS = ['Produccion', 'Administracion', 'Ventas', 'Almacen'] as const;
export const TIPOS_CONTRATO: TipoContrato[] = ['Planta', 'Temporal', 'Honorarios'];
export const ESTADOS: EstadoEmpleado[] = ['Activo', 'Inactivo'];
export const ROLES: RolUsuario[] = ['Administrador', 'Recursos Humanos', 'Contador'];
