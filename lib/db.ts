// Dual-mode database adaptor for Cloudflare D1 & Local Memory Fallback
// This avoids any native binary compilation issues (like better-sqlite3) on the serverless edge.

export interface Order {
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  shipping_address: string;
  country: string;
  state_region: string;
  notes: string;
  shipping_method: string;
  shipping_cost: number;
  payment_method: string;
  payment_details?: string;
  products: string; // JSON string
  total_amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  created_at: string;
}

// Global in-memory storage for dev modes
if (typeof globalThis !== 'undefined' && !(globalThis as any).__ordersStore) {
  (globalThis as any).__ordersStore = [];
}

function getD1() {
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.DB) return process.env.DB;
    if (process.env.D1_DATABASE) return process.env.D1_DATABASE;
  }
  if (typeof globalThis !== 'undefined') {
    if ((globalThis as any).DB) return (globalThis as any).DB;
    if ((globalThis as any).D1_DATABASE) return (globalThis as any).D1_DATABASE;
  }
  return null;
}

async function ensureTableExists(d1: any) {
  try {
    await d1.prepare(`
      CREATE TABLE IF NOT EXISTS orders (
        order_number TEXT PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        shipping_address TEXT NOT NULL,
        country TEXT NOT NULL,
        state_region TEXT NOT NULL,
        notes TEXT,
        shipping_method TEXT NOT NULL,
        shipping_cost REAL NOT NULL,
        payment_method TEXT NOT NULL,
        payment_details TEXT,
        products TEXT NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `).run();
  } catch (err) {
    console.warn("D1: Error creating table (ignoring if already exists):", err);
  }
}

export async function createOrder(order: Order): Promise<boolean> {
  const d1 = getD1();
  if (d1) {
    await ensureTableExists(d1);
    try {
      await d1.prepare(`
        INSERT INTO orders (
          order_number, first_name, last_name, email, phone, 
          shipping_address, country, state_region, notes, 
          shipping_method, shipping_cost, payment_method, 
          payment_details, products, total_amount, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        order.order_number,
        order.first_name,
        order.last_name,
        order.email,
        order.phone,
        order.shipping_address,
        order.country,
        order.state_region,
        order.notes || "",
        order.shipping_method,
        order.shipping_cost,
        order.payment_method,
        order.payment_details || "",
        order.products,
        order.total_amount,
        order.status,
        order.created_at
      ).run();
      return true;
    } catch (err) {
      console.error("D1 creation error:", err);
      // Fallback is still captured
    }
  }

  // Local environment fallback
  if (globalThis && (globalThis as any).__ordersStore) {
    (globalThis as any).__ordersStore.unshift(order);
    return true;
  }
  return false;
}

export async function getOrders(): Promise<Order[]> {
  const d1 = getD1();
  if (d1) {
    await ensureTableExists(d1);
    try {
      const { results } = await d1.prepare(`SELECT * FROM orders ORDER BY created_at DESC`).all();
      return (results || []) as any[];
    } catch (err) {
      console.error("D1 select error:", err);
    }
  }

  // Fallback
  return (globalThis as any).__ordersStore || [];
}

export async function updateOrderStatus(orderNumber: string, status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled'): Promise<boolean> {
  const d1 = getD1();
  if (d1) {
    await ensureTableExists(d1);
    try {
      await d1.prepare(`UPDATE orders SET status = ? WHERE order_number = ?`).bind(status, orderNumber).run();
      return true;
    } catch (err) {
      console.error("D1 update status error:", err);
    }
  }

  // Fallback
  const store = (globalThis as any).__ordersStore || [];
  const order = store.find((o: Order) => o.order_number === orderNumber);
  if (order) {
    order.status = status;
    return true;
  }
  return false;
}
