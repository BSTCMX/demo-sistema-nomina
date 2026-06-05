import { useEffect, useMemo, useState } from 'react';
import { seedEmpleados } from '../data/seed';
import type { Empleado, FiltrosEmpleado } from '../types/employee';
import { STORAGE_KEY } from '../types/employee';

function loadEmpleados(): Empleado[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedEmpleados;
    const parsed = JSON.parse(raw) as Empleado[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedEmpleados;
  } catch {
    return seedEmpleados;
  }
}

const filtrosIniciales: FiltrosEmpleado = {
  busqueda: '',
  area: '',
  tipoContrato: '',
  estado: '',
};

export function useEmployees() {
  const [empleados, setEmpleados] = useState<Empleado[]>(loadEmpleados);
  const [filtros, setFiltros] = useState<FiltrosEmpleado>(filtrosIniciales);
  const [seleccionadoId, setSeleccionadoId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(empleados));
  }, [empleados]);

  const empleadosFiltrados = useMemo(() => {
    return empleados
      .filter((emp) => {
        const q = filtros.busqueda.trim().toLowerCase();
        const matchBusqueda =
          !q ||
          emp.nombre.toLowerCase().includes(q) ||
          emp.puesto.toLowerCase().includes(q) ||
          String(emp.id).includes(q);
        const matchArea = !filtros.area || emp.area === filtros.area;
        const matchContrato = !filtros.tipoContrato || emp.tipoContrato === filtros.tipoContrato;
        const matchEstado = !filtros.estado || emp.estado === filtros.estado;
        return matchBusqueda && matchArea && matchContrato && matchEstado;
      })
      .sort((a, b) => a.id - b.id);
  }, [empleados, filtros]);

  const empleadoSeleccionado = useMemo(
    () => empleados.find((e) => e.id === seleccionadoId) ?? null,
    [empleados, seleccionadoId],
  );

  const guardarEmpleado = (empleado: Empleado, esNuevo: boolean) => {
    setEmpleados((prev) => {
      if (esNuevo) {
        return [...prev, empleado].sort((a, b) => a.id - b.id);
      }
      return prev.map((e) => (e.id === empleado.id ? empleado : e));
    });
    setSeleccionadoId(empleado.id);
  };

  const eliminarEmpleado = (id: number) => {
    setEmpleados((prev) => prev.filter((e) => e.id !== id));
    setSeleccionadoId((current) => (current === id ? null : current));
  };

  const limpiarFiltros = () => setFiltros(filtrosIniciales);

  return {
    empleados,
    empleadosFiltrados,
    empleadoSeleccionado,
    filtros,
    setFiltros,
    seleccionadoId,
    setSeleccionadoId,
    guardarEmpleado,
    eliminarEmpleado,
    limpiarFiltros,
  };
}
