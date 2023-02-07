import type { AggregatedUtterancesSummaryList } from "aws-sdk/clients/lexmodelsv2";
import { Table, Header, Column, flexRender } from "@tanstack/react-table";
import { useDrag, useDrop } from "react-dnd";
import reorderColumn from "./reorderColumnFn";

function ColumnHeader<Model>({
  header,
  table,
}: {
  header: Header<Model, unknown>;
  table: Table<Model>;
}) {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn: Column<AggregatedUtterancesSummaryList>) => {
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <th
      ref={dropRef}
      className={`${!header.column.getCanResize() ? "border-right-hidden" : ""}`}
      colSpan={header.colSpan}
      key={header.id}
      style={{
        width: header.getSize(),
      }}
    >
      <div ref={previewRef}>
        <div
          ref={dragRef}
          onClick={header.column.getToggleSortingHandler()}
          className={`header-title ${
            header.column.getCanSort() ? "enabled-sorting" : "disabled-sorting"
          }`}
          style={{
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: " 🔼",
            desc: " 🔽",
          }[header.column.getIsSorted() as string] ?? null}
        </div>
        {/* Show if user asks */}
        {/* {header.column.getCanFilter() ? (
          <FilterColumnInput column={header.column} table={table} />
        ) : null} */}
      </div>
      <div
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        className={`resizer ${!header.column.getCanResize() ? "disabled-resizing " : ""} ${
          header.column.getIsResizing() ? "is-resizing" : ""
        }`}
      />
    </th>
  );
}

export default ColumnHeader;
