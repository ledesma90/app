import Form from "@/app/ui/estructura/edit-form";
import Breadcrumbs from "@/app/ui/estructura/breadcrumbs";
import { fetchEstructuraById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const estructura = await fetchEstructuraById(id);

  if (!estructura) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Estructura", href: "/dashboard/estructura" },
          {
            label: "Editar Estructura",
            href: `/dashboard/estructura/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form estructura={estructura} />
    </div>
  );
}
