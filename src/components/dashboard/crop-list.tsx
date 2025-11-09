
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/context/language-provider";
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
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "../ui/datepicker";
import { useToast } from "@/hooks/use-toast";

const initialCrops = [
  { name: 'Winter Wheat', planted: '2023-10-15', yield: '8,000 kg', status: 'Growing' },
  { name: 'Corn', planted: '2024-04-20', yield: '12,000 kg', status: 'Growing' },
  { name: 'Soybeans', planted: '2024-05-01', yield: '10,000 kg', status: 'Planting' },
  { name: 'Barley', planted: '2023-09-30', yield: '6,500 kg', status: 'Harvested' },
  { name: 'Canola', planted: '2024-04-25', yield: '7,200 kg', status: 'Planting' },
];

type Crop = typeof initialCrops[0];

const cropSchema = z.object({
  name: z.string().min(1, "Crop name is required."),
  planted: z.date({ required_error: "Planted date is required."}),
  yield: z.coerce.number().min(0, "Yield must be a positive number."),
  status: z.enum(["Growing", "Planting", "Harvested"]),
});


export function CropList() {
  const { t } = useLanguage();
  const [crops, setCrops] = useState(initialCrops);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof cropSchema>>({
    resolver: zodResolver(cropSchema),
    defaultValues: {
        name: "",
        yield: 0,
        status: "Planting",
    }
  });

  const handleOpenDialog = (crop: Crop | null) => {
    setEditingCrop(crop);
    if (crop) {
        form.reset({
            name: crop.name,
            planted: new Date(crop.planted),
            yield: parseFloat(crop.yield.replace(/[^0-9.]/g, '')),
            status: crop.status as "Growing" | "Planting" | "Harvested",
        });
    } else {
        form.reset({
            name: "",
            yield: 0,
            status: "Planting",
        });
    }
    setIsDialogOpen(true);
  }

  const onSubmit = (values: z.infer<typeof cropSchema>) => {
    const newCropData = {
        ...values,
        planted: values.planted.toISOString().split('T')[0],
        yield: `${values.yield.toLocaleString()} kg`,
    };

    if(editingCrop) {
        setCrops(crops.map(c => c.name === editingCrop.name ? newCropData : c));
        toast({
            title: t.farmer.cropUpdated,
            description: `${values.name} ${t.farmer.cropUpdatedDesc}`,
        });
    } else {
        setCrops([newCropData, ...crops]);
        toast({
            title: t.farmer.cropAdded,
            description: `${values.name} ${t.farmer.cropAddedDesc}`,
        });
    }
    
    form.reset();
    setEditingCrop(null);
    setIsDialogOpen(false);
  }

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Growing':
        return 'default';
      case 'Planting':
        return 'secondary';
      case 'Harvested':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">{t.farmer.myCrops}</CardTitle>
          <CardDescription>
            {t.farmer.cropsOverview}
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => handleOpenDialog(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t.farmer.addCrop}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCrop ? t.farmer.editCrop : t.farmer.addNewCrop}</DialogTitle>
              <DialogDescription>
                {editingCrop ? t.farmer.updateCropDetails : t.farmer.cropDetails}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>{t.farmer.cropName}</FormLabel><FormControl><Input placeholder={t.farmer.cropNamePlaceholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="planted" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel>{t.farmer.plantedDate}</FormLabel><DatePicker date={field.value} setDate={field.onChange} /><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="yield" render={({ field }) => (
                        <FormItem><FormLabel>{t.farmer.expectedYield}</FormLabel><FormControl><Input type="number" placeholder={t.farmer.yieldPlaceholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="status" render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t.farmer.status}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={t.farmer.selectStatus} />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Planting">{t.farmer.planting}</SelectItem>
                                <SelectItem value="Growing">{t.farmer.growing}</SelectItem>
                                <SelectItem value="Harvested">{t.farmer.harvested}</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>{t.common.cancel}</Button>
                        </DialogClose>
                        <Button type="submit">{t.common.saveChanges}</Button>
                    </DialogFooter>
                </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.table.cropName}</TableHead>
              <TableHead>{t.table.plantedDate}</TableHead>
              <TableHead>{t.table.expectedYield}</TableHead>
              <TableHead>{t.table.status}</TableHead>
              <TableHead className="text-right">{t.table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {crops.map((crop) => (
              <TableRow key={crop.name}>
                <TableCell className="font-medium">{crop.name}</TableCell>
                <TableCell>{crop.planted}</TableCell>
                <TableCell>{crop.yield}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(crop.status)} className={
                    crop.status === 'Harvested' ? 'bg-green-600/20 text-green-800' : ''
                  }>
                    {crop.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(crop)}>{t.common.edit}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
