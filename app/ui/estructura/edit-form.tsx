import { updateEstructura } from "@/app/lib/actions";

export default function Form({ estructura }: { estructura: any }) {
  return (
    <form action={(formData) => updateEstructura(estructura.id, formData)}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          defaultValue={estructura.nombre}
          required
        />
      </label>
      <label>
        Descripción:
        <textarea
          name="descripcion"
          defaultValue={estructura.descripcion}
        ></textarea>
      </label>
      <label>
        Parent ID:
        <input
          type="number"
          name="parent_id"
          defaultValue={estructura.parent_id}
        />
      </label>
      <button type="submit">Actualizar</button>
    </form>
  );
}
