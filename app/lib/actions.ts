"use server";
import { z } from "zod";
const connectionPool = require("../../db");
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await connectionPool.query(`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES ('${customerId}', '${amountInCents}', '${status}', '${date}')
  `);
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
  // Test it out:
  //console.log(rawFormData);
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await connectionPool.query(`
    UPDATE invoices
    SET customer_id = '${customerId}', amount = '${amountInCents}', status = '${status}'
    WHERE id = '${id}'
  `);
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  await connectionPool.query(`DELETE FROM invoices WHERE id = '${id}'`);
  revalidatePath("/dashboard/invoices");
}

export async function createEstructura(formData: FormData) {
  const nombre = formData.get("nombre");
  const descripcion = formData.get("descripcion");
  const parent_id = formData.get("parent_id") || null;
  const nivel = parent_id ? Number(parent_id) + 1 : 1;

  try {
    await connectionPool.query(`
      INSERT INTO estructura (nombre, descripcion, parent_id, nivel)
      VALUES ('${nombre}', '${descripcion}', ${parent_id}, ${nivel})
    `);
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/estructura");
  redirect("/dashboard/estructura");
}

export async function updateEstructura(id: number, formData: FormData) {
  const nombre = formData.get("nombre");
  const descripcion = formData.get("descripcion");
  const parent_id = formData.get("parent_id") || null;
  const nivel = parent_id ? Number(parent_id) + 1 : 1;

  try {
    await connectionPool.query(`
      UPDATE estructura
      SET nombre = '${nombre}', descripcion = '${descripcion}', parent_id = ${parent_id}, nivel = ${nivel}
      WHERE id = ${id}
    `);
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/estructura");
  redirect("/dashboard/estructura");
}

export async function deleteEstructura(id: number) {
  try {
    await connectionPool.query(`DELETE FROM estructura WHERE id = ${id}`);
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/estructura");
}
