import bcrypt from "bcrypt";
//import { db } from '@vercel/postgres';
const connectionPool = require("../../db");
import {
  invoices,
  customers,
  revenue,
  users,
  estructura,
} from "../lib/placeholder-data";

//const client = await db.connect();

async function seedEstructura() {
  await connectionPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS estructura (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(250) NOT NULL,
      descripcion VARCHAR(1000),
      parent_id INT REFERENCES estructura(id),
      nivel INT NOT NULL
    );
  `);

  const insertedEstructura = await Promise.all(
    estructura.map(async (estruc) => {
      //const hashedPassword = await bcrypt.hash(estruc.password, 10);
      return connectionPool.query(`
        INSERT INTO estructura (nombre, descripcion, parent_id, nivel)
      VALUES ('${estruc.nombre}', '${estruc.descripcion}', ${estruc.parent_id}, ${estruc.nivel})
      ON CONFLICT (id) DO NOTHING;
      `);
    })
  );

  return insertedEstructura;
}

async function seedUsers() {
  await connectionPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return connectionPool.query(`
        INSERT INTO users (id, name, email, password)
        VALUES ('${user.id}', '${user.name}', '${user.email}', '${hashedPassword}')
        ON CONFLICT (id) DO NOTHING;
      `);
    })
  );

  return insertedUsers;
}

async function seedInvoices() {
  await connectionPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `);

  const insertedInvoices = await Promise.all(
    invoices.map((invoice) =>
      connectionPool.query(`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES ('${invoice.customer_id}', '${invoice.amount}', '${invoice.status}', '${invoice.date}')
        ON CONFLICT (id) DO NOTHING;
      `)
    )
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await connectionPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `);

  const insertedCustomers = await Promise.all(
    customers.map((customer) =>
      connectionPool.query(`
        INSERT INTO customers (id, name, email, image_url)
        VALUES ('${customer.id}', '${customer.name}', '${customer.email}', '${customer.image_url}')
        ON CONFLICT (id) DO NOTHING;
      `)
    )
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await connectionPool.query(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `);

  const insertedRevenue = await Promise.all(
    revenue.map((rev) =>
      connectionPool.query(`
        INSERT INTO revenue (month, revenue)
        VALUES ('${rev.month}', '${rev.revenue}')
        ON CONFLICT (month) DO NOTHING;
      `)
    )
  );

  return insertedRevenue;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    //await connectionPool.query(`BEGIN`);
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    await seedEstructura();
    //await connectionPool.query(`COMMIT`);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    //await connectionPool.query(`ROLLBACK`);
    return Response.json({ error }, { status: 500 });
  }
}
