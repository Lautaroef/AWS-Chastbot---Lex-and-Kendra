import { useEffect } from "react";
import { Table } from "@tanstack/react-table";
import ColumnHeader from "./ColumnHeader";
import RowModel from "./RowModel";
// import IndeterminateCheckbox from "./indeterminateCheckbox";

interface CreateTableT<Model> {
  table: Table<Model>;
  data?: Model[];
  setData?: React.Dispatch<React.SetStateAction<Model[]>>;
  draggableRow?: boolean;
  className?: string;
}

function CreateTable<Model>({
  table,
  data,
  setData,
  draggableRow = false,
  className,
}: CreateTableT<Model>) {
  draggableRow && !data && alert("Must pass data to table if using draggableRow");

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    if (data && setData) {
      data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as Model);
      return setData([...data!]);
    }
    console.log("Must pass data and setData to table if using draggableRow");
  };

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className={`react-table ${className ?? ""}`}>
      <table
      // style={{
      //   width: table.getCenterTotalSize(),
      // }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <ColumnHeader key={header.id} header={header} table={table as Table<Model>} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <RowModel
              key={row.id}
              row={row}
              isDraggable={draggableRow}
              reorderRow={reorderRow}
            />
          ))}
        </tbody>
        <tfoot>
          {/* Toggle all selected columns */}
          {/* <tr>
            <td className="p-1">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllPageRowsSelected(),
                  indeterminate: table.getIsSomePageRowsSelected(),
                  onChange: table.getToggleAllPageRowsSelectedHandler(),
                }}
              />
            </td>
            <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
          </tr> */}
          {/* In case i want to display footer content for each row */}
          {/* {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))} */}
        </tfoot>
      </table>
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </div>
  );
}

export default CreateTable;
