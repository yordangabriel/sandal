import { getOrders } from '@/lib/db';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminPage() {
  const orders = getOrders();

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Order Submissions</h1>
      
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {format(new Date(order.created_at), 'MMM d, yyyy HH:mm')}
                </TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell className="max-w-xs truncate">{order.address}</TableCell>
                <TableCell>{order.product_name}</TableCell>
                <TableCell className="text-right">
                TzS {order.product_price.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}