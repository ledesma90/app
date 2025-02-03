import Link from "next/link";
import { Button } from "@/app/ui/button";
import { createEstructura } from "@/app/lib/actions";

export default function CreateEstructuraForm() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Crear Estructura</h2>
      <form action={createEstructura} className="space-y-4">
        {/* Campo Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese el nombre"
          />
        </div>

        {/* Campo Descripción */}
        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese una descripción"
          ></textarea>
        </div>

        {/* Campo Parent ID */}
        <div>
          <label
            htmlFor="parent_id"
            className="block text-sm font-medium text-gray-700"
          >
            Parent ID (opcional)
          </label>
          <input
            type="number"
            id="parent_id"
            name="parent_id"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese el ID del padre"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Link href="/dashboard/estructura">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
