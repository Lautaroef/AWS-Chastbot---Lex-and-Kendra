import { Dispatch, SetStateAction, useState } from "react";
import {
  ColumnOrderState,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  // For row dnd
  Row,
  flexRender,
} from "@tanstack/react-table";
import fuzzyFilter from "./fuzzyFilter";

interface CreateTableT<Model> {
  data: Model[];
  columns: ColumnDef<Model, any>[];
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  setData?: Dispatch<SetStateAction<Model[]>>;
  enableMultiRowSelection?: boolean;
}

const UseReactTable = <Model,>({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  setData,
  enableMultiRowSelection = true,
}: CreateTableT<Model>) => {
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string) // must start out with populated columnOrder so we can splice
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [rowSelection, setRowSelection] = useState({});

  const defaultColumn: Partial<ColumnDef<Model>> = {
    minSize: 100,
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnOrder,
      globalFilter,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
    columnResizeMode: "onChange",
    enableMultiRowSelection,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    // Filters
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // End Filters
    meta: {
      updateData: (rowIndex: number, columnId: any, value: any) => {
        console.log("rowIndex:", rowIndex, "columnId:", columnId, "value:", value);
        setData!((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return { table };
};

export default UseReactTable;
