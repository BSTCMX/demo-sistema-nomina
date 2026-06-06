import type { ReactNode } from 'react';
import type { Empleado } from '../types/employee';
import { AREAS, ESTADOS, TIPOS_CONTRATO } from '../types/employee';
import type { PermisosRol } from '../utils/permissions';
import { formularioSoloLectura, tieneAccionesFormulario } from '../utils/permissions';

interface EmployeeFormProps {
  formData: Empleado;
  esNuevo: boolean;
  permisos: PermisosRol;
  errors: Record<string, string>;
  onChange: (data: Empleado) => void;
  onAgregar: () => void;
  onEditar: () => void;
  onEliminar: () => void;
  onLimpiar: () => void;
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-0.5 block text-xs font-medium text-gray-700 sm:text-sm lg:text-base">
        {label}
      </label>
      {children}
      {error ? <p className="mt-0.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

const inputClass =
  'w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-600 lg:px-3 lg:py-2 lg:text-base';
const inputErrorClass =
  'w-full rounded-md border border-red-500 px-2.5 py-1.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:bg-gray-100 lg:px-3 lg:py-2 lg:text-base';

export function EmployeeForm({
  formData,
  esNuevo,
  permisos,
  errors,
  onChange,
  onAgregar,
  onEditar,
  onEliminar,
  onLimpiar,
}: EmployeeFormProps) {
  const soloLectura = formularioSoloLectura(permisos);
  const mostrarAcciones = tieneAccionesFormulario(permisos);

  const setField = <K extends keyof Empleado>(key: K, value: Empleado[K]) => {
    if (soloLectura) return;
    onChange({ ...formData, [key]: value });
  };

  const setNumber = (path: 'salarioBase' | 'percepciones.bono' | 'percepciones.horasExtra' | 'deducciones.isr' | 'deducciones.imss' | 'deducciones.prestamo', value: string) => {
    if (soloLectura) return;
    const num = value === '' ? 0 : Number(value);
    if (path === 'salarioBase') {
      onChange({ ...formData, salarioBase: num });
      return;
    }
    if (path.startsWith('percepciones.')) {
      const key = path.split('.')[1] as 'bono' | 'horasExtra';
      onChange({ ...formData, percepciones: { ...formData.percepciones, [key]: num } });
      return;
    }
    const key = path.split('.')[1] as 'isr' | 'imss' | 'prestamo';
    onChange({ ...formData, deducciones: { ...formData.deducciones, [key]: num } });
  };

  return (
    <section className="flex min-h-[280px] flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex shrink-0 flex-col gap-2 border-b border-gray-100 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4 lg:px-5 lg:py-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800 sm:text-lg lg:text-xl">
            {soloLectura ? 'Consulta de empleado' : esNuevo ? 'Agregar empleado' : 'Editar empleado'}
          </h2>
          <p className="text-xs text-gray-500 sm:text-sm">
            {soloLectura ? 'Vista de solo lectura segun tu rol' : 'Informacion agrupada por secciones'}
          </p>
        </div>
        <button
          type="button"
          onClick={onLimpiar}
          className="shrink-0 rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 sm:text-sm"
        >
          Limpiar formulario
        </button>
      </div>

      <div className="px-3 py-3 sm:px-4 lg:px-5">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h3 className="mb-2 border-b border-gray-200 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
              Empleado
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
              <Field label="Numero de empleado" id="numero" error={errors.id}>
                <input
                  id="numero"
                  type="number"
                  value={formData.id || ''}
                  onChange={(e) => setField('id', Number(e.target.value))}
                  disabled={!esNuevo || soloLectura}
                  readOnly={soloLectura}
                  className={errors.id ? inputErrorClass : inputClass}
                />
              </Field>
              <Field label="Nombre completo" id="nombre" error={errors.nombre}>
                <input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setField('nombre', e.target.value)}
                  readOnly={soloLectura}
                  disabled={soloLectura}
                  className={errors.nombre ? inputErrorClass : inputClass}
                />
              </Field>
              <Field label="Puesto" id="puesto" error={errors.puesto}>
                <input
                  id="puesto"
                  type="text"
                  value={formData.puesto}
                  onChange={(e) => setField('puesto', e.target.value)}
                  readOnly={soloLectura}
                  disabled={soloLectura}
                  className={errors.puesto ? inputErrorClass : inputClass}
                />
              </Field>
              <Field label="Area" id="area">
                <select
                  id="area"
                  value={formData.area}
                  onChange={(e) => setField('area', e.target.value)}
                  disabled={soloLectura}
                  className={inputClass}
                >
                  {AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Tipo de contrato" id="tipoContrato">
                <select
                  id="tipoContrato"
                  value={formData.tipoContrato}
                  onChange={(e) => setField('tipoContrato', e.target.value as Empleado['tipoContrato'])}
                  disabled={soloLectura}
                  className={inputClass}
                >
                  {TIPOS_CONTRATO.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Estado" id="estado">
                <select
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => setField('estado', e.target.value as Empleado['estado'])}
                  disabled={soloLectura}
                  className={inputClass}
                >
                  {ESTADOS.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Salario base" id="salarioBase" error={errors.salarioBase}>
                <input
                  id="salarioBase"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.salarioBase || ''}
                  onChange={(e) => setNumber('salarioBase', e.target.value)}
                  readOnly={soloLectura}
                  disabled={soloLectura}
                  className={errors.salarioBase ? inputErrorClass : inputClass}
                />
              </Field>
            </div>
          </div>

          <div>
            <h3 className="mb-2 border-b border-gray-200 pb-1 text-xs font-semibold uppercase tracking-wide text-green-700">
              Percepciones
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              <Field label="Bono" id="bono">
                <input
                  id="bono"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.percepciones.bono || ''}
                  onChange={(e) => setNumber('percepciones.bono', e.target.value)}
                  readOnly={soloLectura}
                  disabled={soloLectura}
                  className={inputClass}
                />
              </Field>
              <Field label="Horas extra" id="horasExtra">
                <input
                  id="horasExtra"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.percepciones.horasExtra || ''}
                  onChange={(e) => setNumber('percepciones.horasExtra', e.target.value)}
                  readOnly={soloLectura}
                  disabled={soloLectura}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>

          <div>
            <h3 className="mb-2 border-b border-gray-200 pb-1 text-xs font-semibold uppercase tracking-wide text-red-700">
              Deducciones
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-3 xl:gap-4">
              <Field label="ISR" id="isr">
                <input
                  id="isr"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.deducciones.isr || ''}
                  onChange={(e) => setNumber('deducciones.isr', e.target.value)}
                  readOnly={soloLectura}
                  disabled={soloLectura}
                  className={inputClass}
                />
              </Field>
              <Field label="IMSS" id="imss">
                <input
                  id="imss"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.deducciones.imss || ''}
                  onChange={(e) => setNumber('deducciones.imss', e.target.value)}
                  readOnly={soloLectura}
                  disabled={soloLectura}
                  className={inputClass}
                />
              </Field>
              <Field label="Prestamo" id="prestamo">
                <input
                  id="prestamo"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.deducciones.prestamo || ''}
                  onChange={(e) => setNumber('deducciones.prestamo', e.target.value)}
                  readOnly={soloLectura}
                  disabled={soloLectura}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        </div>
      </div>

      {mostrarAcciones ? (
        <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-3 py-2.5 sm:px-4 lg:px-5 lg:py-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            {permisos.agregar ? (
              <button
                type="button"
                onClick={onAgregar}
                disabled={!esNuevo}
                className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 lg:py-2.5 lg:text-base"
              >
                Agregar
              </button>
            ) : null}
            {permisos.editar ? (
              <button
                type="button"
                onClick={onEditar}
                disabled={esNuevo}
                className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 lg:py-2.5 lg:text-base"
              >
                Editar
              </button>
            ) : null}
            {permisos.eliminar ? (
              <button
                type="button"
                onClick={onEliminar}
                disabled={esNuevo}
                className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 lg:py-2.5 lg:text-base"
              >
                Eliminar
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
