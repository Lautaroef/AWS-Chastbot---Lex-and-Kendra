"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import UseReactTable from "../components/table/UseReactTable";
import utteranceColumns from "../components/table/columns/utterances";
import GlobalDebouncedInput from "../components/table/DebouncedInput";
import CreateTable from "../components/table/CreateTable";
import type {
  AggregatedUtterancesSummary,
  AggregatedUtterancesSummaryList,
} from "aws-sdk/clients/lexmodelsv2";

type Props = {
  data: AggregatedUtterancesSummaryList;
};

function Reports({ data }: Props) {
  const [globalFilter, setGlobalFilter] = useState("");

  const { table } = UseReactTable<AggregatedUtterancesSummary>({
    data,
    columns: utteranceColumns,
    globalFilter,
    setGlobalFilter,
  });

  console.log(data);

  return (
    <div className="report-page">
      <DndProvider backend={HTML5Backend}>
        <h1>Reports</h1>

        <CreateTable table={table} />
      </DndProvider>
      <p
        style={{
          marginTop: "2.25rem",
          fontSize: "0.95rem",
        }}
      >
        Here a pagination can be implemented, by adding a button that fetches the next set of
        results from the AWS.LexV2Runtime service. The nextToken property in each response will
        be used to retrieve the following page.
      </p>
      <small>
        So yes, a little more work to do. Time flies so fast, I'm sure I'll find the time
        somehow. :)
      </small>
    </div>
  );
}

export default Reports;
