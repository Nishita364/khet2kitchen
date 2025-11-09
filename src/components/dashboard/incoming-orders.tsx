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
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const orders = [
  { id: 'ORD001', company: 'Global Foods Inc.', item: 'Organic Corn', quantity: '2,000 tons', date: '2024-07-28', status: 'Pending' },
  { id: 'ORD002', company: 'Fresh Produce Co.', item: 'Heirloom Tomatoes', quantity: '500 kg', date: '2024-07-27', status: 'Accepted' },
  { id: 'ORD003', company: 'Nature\'s Best', item: 'Winter Wheat', quantity: '5,000 tons', date: '2024-07-26', status: 'Pending' },
  { id: 'ORD004', company: 'AgriCorp', item: 'Soybeans', quantity: '10,000 tons', date: '2024-07-25', status: 'Completed' },
  { id: 'ORD005', company: 'SuperMart', item: 'Barley', quantity: '1,500 tons', date: '2024-07-24', status: 'Rejected' },
];

export function IncomingOrders() {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Accepted':
        return 'default';
      case 'Completed':
        return 'outline';
       case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Incoming Orders</CardTitle>
        <CardDescription>
          Review and manage orders placed by companies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.company}</TableCell>
                <TableCell>{order.item}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(order.status)} className={
                    order.status === 'Accepted' ? 'bg-green-600/20 text-green-800' : ''
                  }>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {order.status === 'Pending' ? (
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Check className="h-4 w-4" />
                      </Button>
                       <Button variant="destructive" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>View</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
