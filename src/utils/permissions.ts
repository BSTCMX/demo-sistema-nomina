import type { RolUsuario } from '../types/employee';

export interface PermisosRol {
  agregar: boolean;
  editar: boolean;
  eliminar: boolean;
  exportarReporte: boolean;
}

export function permisosPorRol(rol: RolUsuario): PermisosRol {
  switch (rol) {
    case 'Administrador':
      return { agregar: true, editar: true, eliminar: true, exportarReporte: true };
    case 'Recursos Humanos':
      return { agregar: true, editar: true, eliminar: false, exportarReporte: false };
    case 'Contador':
      return { agregar: false, editar: false, eliminar: false, exportarReporte: true };
    default:
      return { agregar: false, editar: false, eliminar: false, exportarReporte: false };
  }
}

export function mensajePermisoDenegado(accion: string): string {
  return `Tu rol no tiene permiso para ${accion}.`;
}

/** Solo lectura cuando el rol no puede crear ni modificar empleados (p. ej. Contador). */
export function formularioSoloLectura(permisos: PermisosRol): boolean {
  return !permisos.agregar && !permisos.editar;
}

export function tieneAccionesFormulario(permisos: PermisosRol): boolean {
  return permisos.agregar || permisos.editar || permisos.eliminar;
}
