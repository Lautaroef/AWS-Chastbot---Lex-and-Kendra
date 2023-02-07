import type { Column, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import DebouncedInput from "./DebouncedInput";

function FilterColumnInput<Model>({
  table,
  column,
  id,
  placeholder,
}: {
  table: Table<any>;
  column: Column<Model, unknown>;
  id?: string;
  placeholder?: string;
}) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <>
      <div className="flex space-x-2">
        <DebouncedInput
          id={id ? id : ""}
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value: string | number) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          id={id ? id : ""}
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value: string | number) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
    </>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        id={id ? id : ""}
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value: string | number) => column.setFilterValue(value)}
        placeholder={`${placeholder ? placeholder : "Buscar..."} (${
          column.getFacetedUniqueValues().size
        })`}
        className="filter-single-column"
        list={column.id + "list"}
      />
    </>
  );
}

export default FilterColumnInput;
