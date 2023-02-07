import { flexRender, Row } from "@tanstack/react-table";

interface Props<Model> {
  row: Row<Model>;
  isDraggable: boolean;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
} //

function RowModel<Model>({ row, isDraggable, reorderRow }: Props<Model>) {
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          style={{
            width: cell.column.getSize(),
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}

export default RowModel;
