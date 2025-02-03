import Form from "@/app/ui/estructura/edit-form";
import Breadcrumbs from "@/app/ui/estructura/breadcrumbs";
import { fetchEstructura, fetchEstructuraById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {

    const params = await props.params;
    const id = parseInt(params.id, 10);
    const [estructura, customers] = await Promise.all([
      fetchEstructuraById(id),
      fetchEstructura(),
    ]);

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
