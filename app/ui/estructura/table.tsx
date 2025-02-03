import Image from "next/image";
import {
  UpdateEstructura,
  DeleteEstructura,
} from "@/app/ui/estructura/buttons";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredEstructura } from "@/app/lib/data";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const estructura = await fetchFilteredEstructura(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      {/* Versión de escritorio */}
      <div className="hidden min-w-full lg:block">
        <table className="min-w-full text-gray-900">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Nombre
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Descripción
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Nivel
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {estructura.map((item) => (
              <tr
                key={item.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap px-3 py-3">{item.nombre}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  {item.descripcion}
                </td>
                <td className="whitespace-nowrap px-3 py-3">{item.nivel}</td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3 flex gap-2">
                  <UpdateEstructura id={item.id} />
                  <DeleteEstructura id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versión móvil */}
      <div className="block lg:hidden">
        {estructura.map((item) => (
          <div key={item.id} className="mb-2 w-full rounded-md bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{item.nombre}</p>
              <div className="flex gap-2">
                <UpdateEstructura id={item.id} />
                <DeleteEstructura id={item.id} />
              </div>
            </div>
            <p className="truncate text-sm text-gray-500">{item.descripcion}</p>
            <p className="mt-2 text-sm text-gray-500">Nivel: {item.nivel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
