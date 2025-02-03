"use client";
import { CustomerField, Estructura } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateEstructura } from '@/app/lib/actions';

export default function EditEstructuraForm({
  estructura,
}: {
  estructura: Estructura; // Asegúrate de definir el tipo adecuado para "estructura"
}) {
  const updateEstructuraWithId = updateEstructura.bind(null, estructura.id);

  return (
    <form action={updateEstructuraWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Campo Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nombre"
                name="nombre"
                type="text"
                defaultValue={estructura.nombre}
                placeholder="Ingrese el nombre"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Campo Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="mb-2 block text-sm font-medium">
            Descripción
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="descripcion"
                name="descripcion"
                defaultValue={estructura.descripcion}
                placeholder="Ingrese la descripción"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Campo Parent ID */}
        <div className="mb-4">
          <label htmlFor="parent_id" className="mb-2 block text-sm font-medium">
            Parent ID (opcional)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="parent_id"
                name="parent_id"
                type="number"
                defaultValue={estructura.parent_id || ''}
                placeholder="Ingrese el Parent ID"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/estructura"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Actualizar Estructura</Button>
      </div>
    </form>
  );
}