import type { AggregatedUtterancesSummary } from "aws-sdk/clients/lexmodelsv2";
import { CellContext, ColumnDef, Row } from "@tanstack/react-table";
import IndeterminateCheckbox from "../IndeterminateCheckbox";
import parseDate from "@/app/utils/parseDate";

const utteranceColumns: ColumnDef<AggregatedUtterancesSummary, any>[] = [
  // {
  //   id: "select",
  //   size: 50,
  //   enableHiding: false,
  //   cell: ({ row }: { row: Row<AggregatedUtterancesSummary> }) => (
  //     <div className="px-1">
  //       <IndeterminateCheckbox
  //         {...{
  //           checked: row.getIsSelected(),
  //           indeterminate: row.getIsSomeSelected(),
  //           onChange: row.getToggleSelectedHandler(),
  //         }}
  //       />
  //     </div>
  //   ),
  // },
  // This first column is undraggable and unhideable
  {
    header: () => <span>Utterance</span>,
    accessorKey: "Utterance",
    accessorFn: (row: AggregatedUtterancesSummary) => row.utterance,
    cell: (info: CellContext<AggregatedUtterancesSummary, string>) => (
      <div className="utterance-cell">{info.getValue()}</div>
    ),
    id: "utterance",
    enableHiding: false,
    minSize: 380,
  },
  {
    header: () => <span className="answered-by-lex-header">Answered by Lex</span>,
    accessorKey: "Answered by Lex",
    accessorFn: (row: AggregatedUtterancesSummary) => row.hitCount,
    id: "answered-by-lex",
    cell: (info: CellContext<AggregatedUtterancesSummary, number>) => (
      <div className="answered-by-lex-cell">{info.getValue()}</div>
    ),
  },
  {
    header: () => <span className="answered-by-kendra-header">Answered by Kendra</span>,
    accessorKey: "Answered by Kendra",
    accessorFn: (row: AggregatedUtterancesSummary) => row.missedCount,
    id: "answered-by-kendra",
    cell: (info: CellContext<AggregatedUtterancesSummary, number>) => (
      <div className="answered-by-kendra-cell">{info.getValue()}</div>
    ),
  },
  {
    header: () => <span>Last date said</span>,
    accessorKey: "Last date said",
    accessorFn: (row: AggregatedUtterancesSummary) =>
      // parse in the format of 1 day ago, 2 days ago, etc.
      new Date(row.utteranceLastRecordedInAggregationDuration ?? "").toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
    // parseDate(new Date(row.utteranceLastRecordedInAggregationDuration ?? "")),

    id: "last-date-said",
  },
];

export default utteranceColumns;
