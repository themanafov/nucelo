import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function Config({
  type,
  name,
  value,
}: {
  type: string;
  name: string;
  value: string;
}) {
  return (
    <Table className="mt-2 border border-gray-3">
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{type}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{value}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
