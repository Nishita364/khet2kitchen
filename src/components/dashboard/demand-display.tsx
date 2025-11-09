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

const demands = [
  { crop: 'Organic Wheat', quantity: '5,000 kg', location: 'California, USA', status: 'Urgent' },
  { crop: 'Non-GMO Corn', quantity: '10,000 kg', location: 'Iowa, USA', status: 'High' },
  { crop: 'Soybeans', quantity: '8,000 kg', location: 'Illinois, USA', status: 'Medium' },
  { crop: 'Barley', quantity: '2,500 kg', location: 'Montana, USA', status: 'Low' },
  { crop: 'Tomatoes', quantity: '20,000 kg', location: 'Florida, USA', status: 'Urgent' },
];

export function DemandDisplay() {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Urgent':
        return 'destructive';
      case 'High':
        return 'default';
      case 'Medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Current Market Demand</CardTitle>
        <CardDescription>
          A list of crops currently in demand by companies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop Type</TableHead>
              <TableHead>Quantity Needed</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demands.map((demand) => (
              <TableRow key={demand.crop}>
                <TableCell className="font-medium">{demand.crop}</TableCell>
                <TableCell>{demand.quantity}</TableCell>
                <TableCell>{demand.location}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(demand.status)}>
                    {demand.status}
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
