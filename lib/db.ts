import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";

interface Order {
  created_at: string | number | Date;
  id: string | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  product_id: string;
  product_name: string;
  product_price: number;
}

let db: DatabaseType | null = null;

function initializeDb() {
  if (!db) {
    db = new Database("orders.db");
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        message TEXT,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        product_price REAL NOT NULL,
        product_size TEXT,
        product_color TEXT,
        status TEXT DEFAULT 'pending',
        tracking_number TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    db.pragma("journal_mode = WAL"); // Better performance
  }
  return db;
}

export function saveOrder(orderData: Order) {
  const db = initializeDb();
  try {
    const stmt = db.prepare(`
      INSERT INTO orders (
        name, email, phone, address, message,
        product_id, product_name, product_price
      ) VALUES (
        @name, @email, @phone, @address, @message,
        @product_id, @product_name, @product_price
      )
    `);
    return stmt.run(orderData);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save order");
  }
}

export function getOrders(): Order[] {
  const db = initializeDb();
  const result = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
  return result as Order[]; // Type assertion
}
