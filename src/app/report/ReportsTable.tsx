"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import UseReactTable from "../components/UseReactTable";
import utteranceColumns from "../components/columns/utterances";
import GlobalDebouncedInput from "../components/DebouncedInput";
import CreateTable from "../components/CreateTable";
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
    </div>
  );
}

export default Reports;
