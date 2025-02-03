import Pagination from "@/app/ui/estructura/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/estructura/table";
import { CreateEstructura } from "@/app/ui/estructura/buttons";
import { Suspense } from "react";
import { fetchEstructuraPages } from "@/app/lib/data";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchEstructuraPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Estructura</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar estructura..." />
        <CreateEstructura />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
