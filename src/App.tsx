import { useEffect, useMemo, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Download, FileText, X } from 'lucide-react';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeTable } from './components/EmployeeTable';
import { Header } from './components/Header';
import { PayrollBreakdown } from './components/PayrollBreakdown';
import { SearchFilters } from './components/SearchFilters';
import { useEmployees } from './hooks/useEmployees';
import type { Empleado, RolUsuario } from './types/employee';
import { calcularNeto, calcularTotales, crearEmpleadoVacio, formatCurrency } from './utils/payroll';
import { mensajePermisoDenegado, permisosPorRol } from './utils/permissions';

function validarEmpleado(data: Empleado, esNuevo: boolean, ids: number[]): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.id || data.id <= 0) errors.id = 'Numero valido requerido';
  if (esNuevo && ids.includes(data.id)) errors.id = 'Numero de nomina duplicado';
  if (!data.nombre.trim() || data.nombre.trim().length < 3) errors.nombre = 'Minimo 3 caracteres';
  if (!data.puesto.trim()) errors.puesto = 'Puesto requerido';
  if (!data.salarioBase || data.salarioBase <= 0) errors.salarioBase = 'Salario base positivo requerido';
  return errors;
}

export default function App() {
  const {
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
  } = useEmployees();

  const [rol, setRol] = useState<RolUsuario>('Administrador');
  const [formData, setFormData] = useState<Empleado>(crearEmpleadoVacio());
  const [esNuevo, setEsNuevo] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReporte, setShowReporte] = useState(false);

  const permisos = useMemo(() => permisosPorRol(rol), [rol]);

  useEffect(() => {
    if (empleadoSeleccionado) {
      setFormData(empleadoSeleccionado);
      setEsNuevo(false);
      setErrors({});
    }
  }, [empleadoSeleccionado]);

  useEffect(() => {
    const modalAbierto = showConfirm || showReporte;
    document.body.classList.toggle('modal-scroll-lock', modalAbierto);
    return () => document.body.classList.remove('modal-scroll-lock');
  }, [showConfirm, showReporte]);

  const limpiarFormulario = () => {
    setFormData(crearEmpleadoVacio());
    setEsNuevo(true);
    setErrors({});
    setSeleccionadoId(null);
  };

  const handleSelect = (empleado: Empleado) => {
    setSeleccionadoId(empleado.id);
    setFormData(empleado);
    setEsNuevo(false);
    setErrors({});
  };

  const handleAgregar = () => {
    if (!permisos.agregar) {
      toast.error(mensajePermisoDenegado('agregar empleados'));
      return;
    }
    const nextErrors = validarEmpleado(
      formData,
      true,
      empleados.map((e) => e.id),
    );
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error('Corrige los errores del formulario');
      return;
    }
    guardarEmpleado(formData, true);
    setEsNuevo(false);
    toast.success(`Empleado #${formData.id} registrado`);
  };

  const handleEditar = () => {
    if (!permisos.editar) {
      toast.error(mensajePermisoDenegado('editar empleados'));
      return;
    }
    const nextErrors = validarEmpleado(formData, false, []);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error('Corrige los errores del formulario');
      return;
    }
    guardarEmpleado(formData, false);
    toast.success(`Empleado #${formData.id} actualizado`);
  };

  const handleEliminar = () => {
    if (!permisos.eliminar) {
      toast.error(mensajePermisoDenegado('eliminar empleados'));
      return;
    }
    if (!formData.id) {
      toast.error('Selecciona un empleado para eliminar');
      return;
    }
    setShowConfirm(true);
  };

  const confirmarEliminar = () => {
    eliminarEmpleado(formData.id);
    setShowConfirm(false);
    limpiarFormulario();
    toast.success(`Empleado #${formData.id} eliminado`);
  };

  const handleGenerarReporte = () => {
    if (!permisos.exportarReporte) {
      toast.error(mensajePermisoDenegado('exportar reportes'));
      return;
    }
    if (empleadosFiltrados.length === 0) {
      toast.warning('No hay empleados visibles para el reporte');
      return;
    }
    setShowReporte(true);
  };

  const exportarTxt = () => {
    const lineas = empleadosFiltrados.map((emp) => {
      const neto = calcularNeto(emp);
      return `${emp.id}\t${emp.nombre}\t${emp.puesto}\t${emp.salarioBase}\t${neto}`;
    });
    const encabezado = 'ID\tNombre\tPuesto\tSalario base\tNeto';
    const contenido = [encabezado, ...lineas].join('\n');
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_nomina_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Reporte exportado en formato txt');
    setShowReporte(false);
  };

  const totalNetoReporte = empleadosFiltrados.reduce((sum, emp) => sum + calcularNeto(emp), 0);

  return (
    <div className="flex min-h-dvh flex-col bg-gray-100">
      <Toaster position="top-right" richColors />
      <Header rol={rol} onRolChange={setRol} />

      <main className="flex w-full flex-1 flex-col gap-2 px-3 py-2 sm:gap-3 sm:px-4 lg:px-5 lg:py-3 xl:gap-4 xl:px-6 2xl:px-8">
        <p className="shrink-0 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 sm:text-sm lg:py-2.5 lg:text-base">
          Datos de demostracion guardados en este navegador (localStorage). No hay base de datos en el servidor.
        </p>

        <div className="shrink-0">
          <SearchFilters filtros={filtros} onChange={setFiltros} onClear={limpiarFiltros} />
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)_minmax(280px,0.85fr)] lg:gap-4 xl:gap-5">
          <div className="flex min-h-[220px] min-w-0 flex-col md:col-span-2 lg:col-span-1">
            <EmployeeTable
              empleados={empleadosFiltrados}
              seleccionadoId={seleccionadoId}
              onSelect={handleSelect}
            />
          </div>

          <div className="flex min-h-[320px] min-w-0 flex-col md:min-h-[360px] lg:col-span-1">
            <EmployeeForm
              formData={formData}
              esNuevo={esNuevo}
              permisos={permisos}
              errors={errors}
              onChange={setFormData}
              onAgregar={handleAgregar}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
              onLimpiar={limpiarFormulario}
            />
          </div>

          <div className="flex min-w-0 flex-col gap-2 sm:gap-3 md:min-h-[360px] lg:col-span-1 xl:gap-4">
            <PayrollBreakdown empleado={empleadoSeleccionado} />
            {permisos.exportarReporte ? (
              <section className="shrink-0 rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
                <h2 className="text-base font-semibold text-gray-800 sm:text-lg lg:text-xl">Reporte</h2>
                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm lg:text-base">
                  Consolida empleados visibles segun filtros actuales.
                </p>
                <button
                  type="button"
                  onClick={handleGenerarReporte}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600 lg:py-3 lg:text-base"
                >
                  <FileText className="h-4 w-4" />
                  Generar reporte
                </button>
              </section>
            ) : null}
          </div>
        </div>
      </main>

      {showConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Confirmar eliminacion</h3>
            <p className="mt-3 text-sm text-gray-700">
              Eliminar al empleado #{formData.id} - {formData.nombre}?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarEliminar}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showReporte ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-900">Reporte de nomina</h3>
              <button type="button" onClick={() => setShowReporte(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              <div className="mb-4 grid grid-cols-1 gap-4 rounded-md bg-gray-50 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600">Total empleados</p>
                  <p className="text-2xl font-bold text-gray-900">{empleadosFiltrados.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total neto</p>
                  <p className="text-2xl font-bold text-green-700">{formatCurrency(totalNetoReporte)}</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left">Nombre</th>
                      <th className="px-3 py-2 text-left">Puesto</th>
                      <th className="px-3 py-2 text-left">Salario base</th>
                      <th className="px-3 py-2 text-left">Neto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empleadosFiltrados.map((emp) => (
                      <tr key={emp.id} className="border-t">
                        <td className="px-3 py-2">{emp.nombre}</td>
                        <td className="px-3 py-2">{emp.puesto}</td>
                        <td className="px-3 py-2 font-mono">{formatCurrency(emp.salarioBase)}</td>
                        <td className="px-3 py-2 font-mono">{formatCurrency(calcularTotales(emp).neto)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={exportarTxt}
                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                <Download className="h-4 w-4" />
                Exportar txt
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
