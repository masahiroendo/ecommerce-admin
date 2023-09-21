"use client";

import { Heading } from "@/components/ui/heading";

import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

type OrderClientProps = {
  data: OrderColumn[];
};

export function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}
