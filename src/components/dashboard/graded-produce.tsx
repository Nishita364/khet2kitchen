
"use client";

import * as React from "react";
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
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialGradedProduce = [
  { id: 1, name: 'Heirloom Tomatoes', grade: 'A', quantity: '500 kg', status: 'Available', cost: '$2.50/kg' },
  { id: 2, name: 'Red Lentils', grade: 'B', quantity: '1200 kg', status: 'Available', cost: '$1.80/kg' },
  { id: 3, name: 'Russet Potatoes', grade: 'A', quantity: '2500 kg', status: 'Low Stock', cost: '$0.90/kg' },
  { id: 4, name: 'Bell Peppers', grade: 'C', quantity: '300 kg', status: 'Available', cost: '$1.20/kg' },
  { id: 5, name: 'Spinach', grade: 'A', quantity: '450 kg', status: 'Sold Out', cost: '$3.00/kg' },
];

export function GradedProduce() {
  const [gradedProduce, setGradedProduce] = React.useState(initialGradedProduce);
  const { toast } = useToast();

  const handleStatusChange = (id: number, newStatus: string) => {
    setGradedProduce(gradedProduce.map(p => p.id === id ? { ...p, status: newStatus } : p));
    toast({
        title: "Status Updated",
        description: `The status has been changed to ${newStatus}.`,
    });
  };


  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Available':
        return 'default';
      case 'Low Stock':
        return 'secondary';
       case 'Sold Out':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-600/20 text-green-800 border-green-600/20';
      case 'B':
        return 'bg-yellow-600/20 text-yellow-800 border-yellow-600/20';
      case 'C':
        return 'bg-orange-600/20 text-orange-800 border-orange-600/20';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">My Graded Produce</CardTitle>
        <CardDescription>
          An overview of your produce that has been graded and is ready for market.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produce</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Available Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradedProduce.map((item) => (
              <TableRow key={item.id} className={item.status === 'Sold Out' ? 'opacity-50' : ''}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge className={getGradeBadgeClass(item.grade)}>
                    Grade {item.grade}
                  </Badge>
                </TableCell>
                <TableCell>{item.cost}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(item.status)} className={item.status === 'Available' ? 'bg-green-600/20 text-green-800' : ''}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Available')}>Mark as Available</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Low Stock')}>Mark as Low Stock</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Sold Out')}>Mark as Sold Out</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
