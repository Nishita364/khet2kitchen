"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  { id: 'ORD001', farmer: 'John D.', item: 'Organic Corn', quantity: '2,000 tons', date: '2024-07-28', status: 'Shipped' },
  { id: 'ORD002', farmer: 'Maria G.', item: 'Heirloom Tomatoes', quantity: '500 kg', date: '2024-07-27', status: 'Delivered' },
  { id: 'ORD003', farmer: 'Chen W.', item: 'Winter Wheat', quantity: '5,000 tons', date: '2024-07-26', status: 'Processing' },
  { id: 'ORD004', farmer: 'David S.', item: 'Soybeans', quantity: '10,000 tons', date: '2024-07-25', status: 'Delivered' },
  { id: 'ORD005', farmer: 'Emily R.', item: 'Barley', quantity: '1,500 tons', date: '2024-07-24', status: 'Cancelled' },
];

export function OrderHistory() {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'secondary';
      case 'Shipped':
        return 'default';
      case 'Delivered':
        return 'outline';
       case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Order History</CardTitle>
        <CardDescription>
          A log of all your past and current produce orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.farmer}</TableCell>
                <TableCell>{order.item}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(order.status)} className={
                    order.status === 'Delivered' ? 'bg-green-600/20 text-green-800' : ''
                  }>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
