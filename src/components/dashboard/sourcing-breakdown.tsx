
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

const sourcingData = [
  { produce: 'Winter Wheat', farmer: 'John D.', quantity: '100,000 kg', date: '2024-07-20', grade: 'A' },
  { produce: 'Organic Corn', farmer: 'Maria G.', quantity: '50,000 kg', date: '2024-07-18', grade: 'A' },
  { produce: 'Soybeans', farmer: 'Chen W.', quantity: '80,000 kg', date: '2024-07-15', grade: 'B' },
  { produce: 'Heirloom Tomatoes', farmer: 'Maria G.', quantity: '5,000 kg', date: '2024-07-12', grade: 'A' },
  { produce: 'Red Lentils', farmer: 'Aisha K.', quantity: '15,000 kg', date: '2024-07-10', grade: 'B' },
];

export function SourcingBreakdown() {
  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'B':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'C':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Sourced Produce Details</CardTitle>
        <CardDescription>
          Detailed list of all produce sourced in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produce</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Sourcing Date</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sourcingData.map((item) => (
              <TableRow key={item.produce + item.farmer}>
                <TableCell className="font-medium">{item.produce}</TableCell>
                <TableCell>{item.farmer}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                    <Badge className={getGradeBadgeClass(item.grade)}>
                        Grade {item.grade}
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
