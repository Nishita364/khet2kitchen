
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

const commodities = [
  { name: 'Winter Wheat', procurementPrice: '$240/ton', sellingPrice: '$280/ton' },
  { name: 'Organic Corn', procurementPrice: '$210/ton', sellingPrice: '$250/ton' },
  { name: 'Soybeans', procurementPrice: '$400/ton', sellingPrice: '$450/ton' },
  { name: 'Heirloom Tomatoes', procurementPrice: '$1.80/kg', sellingPrice: '$2.50/kg' },
  { name: 'Red Lentils', procurementPrice: '$1.40/kg', sellingPrice: '$2.00/kg' },
];

export function CommodityPricing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Commodity Pricing</CardTitle>
        <CardDescription>
          Average procurement and selling prices for key commodities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commodity</TableHead>
              <TableHead>Avg. Procurement Price</TableHead>
              <TableHead>Avg. Selling Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commodities.map((commodity) => (
              <TableRow key={commodity.name}>
                <TableCell className="font-medium">{commodity.name}</TableCell>
                <TableCell>{commodity.procurementPrice}</TableCell>
                <TableCell>{commodity.sellingPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
