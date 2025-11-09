
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

const revenueData = [
  { produce: 'Winter Wheat', quantitySold: '95,000 kg', avgPrice: '$0.28/kg', totalRevenue: '$26,600' },
  { produce: 'Organic Corn', quantitySold: '48,000 kg', avgPrice: '$0.25/kg', totalRevenue: '$12,000' },
  { produce: 'Soybeans', quantitySold: '75,000 kg', avgPrice: '$0.45/kg', totalRevenue: '$33,750' },
  { produce: 'Heirloom Tomatoes', quantitySold: '4,800 kg', avgPrice: '$2.50/kg', totalRevenue: '$12,000' },
  { produce: 'Red Lentils', quantitySold: '14,000 kg', avgPrice: '$2.00/kg', totalRevenue: '$28,000' },
];

export function RevenueBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Revenue Details</CardTitle>
        <CardDescription>
          Detailed revenue from produce sourced in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produce</TableHead>
              <TableHead>Quantity Sold</TableHead>
              <TableHead>Avg. Selling Price</TableHead>
              <TableHead>Total Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueData.map((item) => (
              <TableRow key={item.produce}>
                <TableCell className="font-medium">{item.produce}</TableCell>
                <TableCell>{item.quantitySold}</TableCell>
                <TableCell>{item.avgPrice}</TableCell>
                <TableCell className="font-semibold">{item.totalRevenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
