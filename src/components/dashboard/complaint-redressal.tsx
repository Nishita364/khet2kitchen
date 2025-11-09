
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
import { MoreHorizontal, MessageSquare, User, Building, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialFeedback = [
  { id: 'FB001', userType: 'farmer', feedback: 'The AI price suggestion is consistently lower than the local market rate.', category: 'Feature Request', status: 'Open' },
  { id: 'FB002', userType: 'consumer', feedback: 'I wish there was an option to track the delivery in real-time.', category: 'Feature Request', status: 'In Progress' },
  { id: 'FB003', userType: 'company', feedback: 'The farmer data page is very helpful, but could we get a CSV export option?', category: 'Feature Request', status: 'Open' },
  { id: 'FB004', userType: 'farmer', feedback: 'I had trouble uploading a photo for the pest diagnosis feature.', category: 'Bug Report', status: 'Resolved' },
  { id: 'FB005', userType: 'consumer', feedback: 'My last order of tomatoes was not as fresh as expected.', category: 'General Comment', status: 'Closed' },
];

export function ComplaintRedressal() {
  const [feedback, setFeedback] = React.useState(initialFeedback);
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: string) => {
    setFeedback(feedback.map(f => f.id === id ? { ...f, status: newStatus } : f));
    toast({
        title: "Status Updated",
        description: `Feedback ${id} has been marked as ${newStatus}.`,
    });
  };

  const getUserIcon = (userType: string) => {
    switch (userType) {
        case 'farmer': return <User className="h-4 w-4 text-primary" />;
        case 'company': return <Building className="h-4 w-4 text-accent" />;
        case 'consumer': return <ShoppingCart className="h-4 w-4 text-secondary-foreground" />;
        default: return <MessageSquare className="h-4 w-4" />;
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Open':
        return 'destructive';
      case 'In Progress':
        return 'secondary';
       case 'Resolved':
        return 'default';
      case 'Closed':
          return 'outline'
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Feedback Inbox</CardTitle>
        <CardDescription>
          A unified view of all feedback received across the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedback.map((item) => (
              <TableRow key={item.id} className={item.status === 'Closed' || item.status === 'Resolved' ? 'opacity-60' : ''}>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {getUserIcon(item.userType)}
                        <span className="capitalize">{item.userType}</span>
                    </div>
                </TableCell>
                <TableCell className="max-w-sm">
                    <p className="truncate">{item.feedback}</p>
                </TableCell>
                <TableCell>
                    {item.category}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(item.status)} className={item.status === 'Resolved' ? 'bg-green-600/20 text-green-800' : ''}>
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
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Open')}>Mark as Open</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'In Progress')}>Mark as In Progress</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Resolved')}>Mark as Resolved</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Closed')}>Mark as Closed</DropdownMenuItem>
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
