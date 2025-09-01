import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/components/ReusableComponents/LayoutComponents/PageHeader";
import { Menu, Target, Webcam } from "lucide-react";
import React from "react";

const leadData = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    tags: ["VIP", "New"],
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    tags: ["Returning"],
  },
];

const page = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        leftIcon={<Webcam className="w-3 h-3" />}
        mainIcon={<Target className="w-12 h-12" />}
        rightIcon={<Menu className="w-3 h-3" />}
        heading="The Home to all of your customers"
        placeholder="Search Customers..."
        
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-sm text-muted-foreground">
              Name
            </TableHead>
            <TableHead className="text-sm text-muted-foreground">
              Email
            </TableHead>
            <TableHead className="text-sm text-muted-foreground">
              Phone
            </TableHead>
            <TableHead className="text-right text-sm text-muted-foreground">
              Tags
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leadData?.map((lead, idx) => (
            <TableRow key={idx} className="border-0">
              <TableCell className="font-medium">{lead?.name}</TableCell>
              <TableCell>{lead?.email}</TableCell>
              <TableCell>{lead?.phone}</TableCell>
              <TableCell className="text-right">
                {lead?.tags?.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
