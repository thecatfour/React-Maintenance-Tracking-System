"use client";

import TableFilter from "@/components/generics/filters/TableFilter";
import IndeterminateCheckbox from "@/components/generics/input/IndeterminateCheckbox";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import dateFilter from "@/lib/filters/DateFilter";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, RowSelectionState, SortingState, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import { Dispatch, useEffect, useMemo, useState } from "react";

interface ComponentProps {
    equipmentArray: Equipment[];
    mRecordsArray: MaintenanceRecord[];
    setSelectedRows: Dispatch<RowSelectionState>;
}

const MaintenanceRecordTable: React.FC<ComponentProps> = ({ equipmentArray, mRecordsArray, setSelectedRows }) => {
    const [data, setData] = useState<MaintenanceRecord[]>(mRecordsArray);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    
    useEffect(() => {
        setSelectedRows(rowSelection);
    }, [rowSelection])

    useEffect(() => {
        setData(mRecordsArray);
    }, [mRecordsArray])

    const columns = useMemo<ColumnDef<MaintenanceRecord>[]>(() => [
        {
            id: "data",
            header: () => <div className="font-bold text-2xl">Maintenance Records</div>,
            columns: [
                {
                    id: "select",
                    size: 0,
                    header: ({ table }) => (
                        <IndeterminateCheckbox
                            indeterminate={table.getIsSomeRowsSelected()}
                            rest={{
                                checked: table.getIsAllRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler(),
                            }}
                        />
                    ),
                    cell: ({ row }) => (
                        <div className="flex justify-center">
                            <IndeterminateCheckbox
                                rest={{
                                    checked: row.getIsSelected(),
                                    disabled: !row.getCanSelect(),
                                    onChange: row.getToggleSelectedHandler(),
                                }}
                            />
                        </div>
                    ),
                },
                {
                    accessorKey: "id",
                    header: "Id",
                    size: 100,
                },
                {
                    accessorKey: "equipmentId",
                    header: "E Id",
                    size: 100,
                },
                {
                    id: "equipmentName",
                    header: "Equipment Name",
                    size: 250,
                    accessorFn: ( row )  => `${equipmentArray.find(equip => equip.id == row.equipmentId)?.name}`,
                },
                {
                    accessorKey: "type",
                    header: "Type",
                    size: 100,
                },
                {
                    accessorKey: "technician",
                    header: "Technician",
                    size: 150,
                },
                {
                    accessorKey: "hoursSpent",
                    header: "Hours Spent",
                    size: 150,
                },
                {
                    accessorKey: "description",
                    header: "Description",
                    size: 250,
                },
                {
                    accessorKey: "partsReplaced",
                    header: "Parts Replaced",
                    size: 175,
                    cell: ({ row }) => (
                        <>
                            {row.original.partsReplaced == null ? (
                                <>
                                    None.
                                </>
                            ) : (
                                <>
                                    {row.original.partsReplaced as string[]}
                                </>
                            )}
                        </>
                    ),
                },
                {
                    accessorKey: "priority",
                    header: "Priority",
                    size: 100,
                },
                {
                    accessorKey: "completionStatus",
                    header: "Status",
                    size: 150,
                },
                {
                    accessorKey: "date",
                    header: "Date",
                    size: 110,
                    filterFn: dateFilter,
                    cell: ({ row }) => {return <>{row.original.date.toISOString().substring(0, 10)}</>}
                },
            ],
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        enableRowSelection: true,
        getRowId: row => row.id,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        state: {
            rowSelection,
            sorting,
        },
    });

    function mRecordStatusBackground(recordStatus: string) {
            return clsx(
                {
                    "bg-green-900":     recordStatus == "Complete",
                    "bg-red-900":       recordStatus == "Incomplete",
                    "bg-yellow-800":    recordStatus == "Pending Parts",
                }
            );
        };

    return (
        <>
            <table style={{ minWidth: table.getCenterTotalSize(), width: "100%"}}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    data-testid={`m-record-table-header-${header.id}`}
                                    style={{
                                        width: header.getSize(),
                                        minWidth: header.getSize(),
                                    }}
                                >
                                    {header.isPlaceholder ? null : (
                                        <>
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : ''
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                    ? header.column.getNextSortingOrder() === "asc"
                                                        ? "Sort ascending"
                                                        : header.column.getNextSortingOrder() === "desc"
                                                            ? "Sort descending"
                                                            : "Clear sort"
                                                    : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: " 🔼",
                                                    desc: " 🔽",
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <TableFilter
                                                        column={header.column}
                                                        table={table}
                                                    />
                                                </div>
                                            ): null}
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            data-testid="m-record-row"
                            key={row.id}
                            className={mRecordStatusBackground(row.getValue("completionStatus"))}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    data-testid={cell.column.id}
                                    key={cell.id}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default MaintenanceRecordTable;
