"use client";

import TableFilter from "@/components/generics/filters/TableFilter";
import IndeterminateCheckbox from "@/components/generics/input/IndeterminateCheckbox";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import dateFilter from "@/lib/filters/DateFilter";
import { MaintenanceRecord, MaintenanceRecordPriority, MaintenanceRecordStatus, MaintenanceRecordType } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import { 
    ColumnDef, 
    flexRender, 
    getCoreRowModel, 
    getExpandedRowModel, 
    getFilteredRowModel, 
    getGroupedRowModel, 
    getSortedRowModel, 
    GroupingState, 
    RowData, 
    RowSelectionState, 
    SortingState, 
    useReactTable 
} from "@tanstack/react-table";
import clsx from "clsx";
import { Dispatch, useEffect, useMemo, useState } from "react";


declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "date-range" | "number-range" | "select",
        selectOptions?: string[],
    }
}

interface ComponentProps {
    equipmentArray: Equipment[];
    mRecordsArray: MaintenanceRecord[];
    setSelectedRows: Dispatch<RowSelectionState>;
}

const MaintenanceRecordTable: React.FC<ComponentProps> = ({ equipmentArray, mRecordsArray, setSelectedRows }) => {
    const [data, setData] = useState<MaintenanceRecord[]>(mRecordsArray);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [grouping, setGrouping] = useState<GroupingState>([]);
    
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
                        <IndeterminateCheckbox
                            rest={{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    ),
                },
                {
                    accessorKey: "id",
                    header: "Id",
                    size: 100,
                    aggregatedCell: "Records Id",
                },
                {
                    accessorKey: "equipmentId",
                    header: "E Id",
                    size: 125,
                    enableGrouping: true,
                    aggregatedCell: "Equipment Id"
                },
                {
                    id: "equipmentName",
                    header: "Equipment Name",
                    size: 250,
                    accessorFn: ( row )  => `${equipmentArray.find(equip => equip.id == row.equipmentId)?.name}`,
                    enableGrouping: true,
                    aggregatedCell: "Equipment Name",
                },
                {
                    accessorKey: "type",
                    header: "Type",
                    size: 100,
                    meta: {
                        filterVariant: "select",
                        selectOptions: MaintenanceRecordType,
                    },
                    aggregatedCell: "Type",
                },
                {
                    accessorKey: "technician",
                    header: "Technician",
                    size: 150,
                    aggregatedCell: "Technician",
                },
                {
                    accessorKey: "hoursSpent",
                    header: "Hours Spent",
                    size: 150,
                    meta: {
                        filterVariant: "number-range",
                    },
                    aggregationFn: "sum",
                },
                {
                    accessorKey: "description",
                    header: "Description",
                    size: 250,
                    aggregatedCell: "Description of maintenance."
                },
                {
                    accessorKey: "partsReplaced",
                    header: "Parts Replaced",
                    size: 200,
                    filterFn: "includesString",
                    cell: ({ row }) => (
                        <>
                            {row.original.partsReplaced == null ? (
                                <>
                                    None.
                                </>
                            ) : (
                                <>
                                    {(row.original.partsReplaced as string[]).map(part => (
                                        <li key={part}>
                                            {part}
                                        </li>
                                    ))}
                                </>
                            )}
                        </>
                    ),
                    aggregatedCell: "Parts replaced (if any)."
                },
                {
                    accessorKey: "priority",
                    header: "Priority",
                    size: 125,
                    meta: {
                        filterVariant: "select",
                        selectOptions: MaintenanceRecordPriority,
                    },
                    aggregatedCell: "Priority",
                },
                {
                    accessorKey: "completionStatus",
                    header: "Status",
                    size: 150,
                    meta: {
                        filterVariant: "select",
                        selectOptions: MaintenanceRecordStatus,
                    },
                    aggregatedCell: "Status",
                },
                {
                    accessorKey: "date",
                    header: "Date",
                    size: 110,
                    filterFn: dateFilter,
                    meta: {
                        filterVariant: "date-range",
                    },
                    cell: ({ row }) => (<>{row.original.date.toUTCString()}</>),
                    aggregatedCell: "Date of maintenance record.",
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
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGroupingChange: setGrouping,
        state: {
            rowSelection,
            sorting,
            grouping,
        },
        defaultColumn: {
            enableGrouping: false,
        }
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
                                    data-testid={`maintenance-record-table-header-${header.id}`}
                                    style={{
                                        width: header.getSize(),
                                        minWidth: header.getSize(),
                                    }}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div className="flex flex-col">
                                            <div className="flex justify-center">
                                                <div>
                                                    {header.column.getCanGroup() ? (
                                                        <button
                                                            {...{
                                                                onClick: header.column.getToggleGroupingHandler(),
                                                                style: {
                                                                    cursor: "pointer",
                                                                },
                                                            }}
                                                        >
                                                            {header.column.getIsGrouped()
                                                                ? '🛑'
                                                                : '📦'
                                                            }
                                                        </button>
                                                    ) : null}
                                                </div>
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
                                            </div>
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <TableFilter
                                                        column={header.column}
                                                    />
                                                </div>
                                            ): null}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            data-testid="maintenance-record-row"
                            key={row.id}
                            className={mRecordStatusBackground(row.getValue("completionStatus"))}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    data-testid={cell.column.id}
                                    key={cell.id}
                                >
                                    {cell.getIsGrouped() ? (
                                        <>
                                            <button
                                                {...{
                                                onClick: row.getToggleExpandedHandler(),
                                                style: {
                                                    cursor: row.getCanExpand()
                                                    ? 'pointer'
                                                    : 'normal',
                                                },
                                                }}
                                            >
                                                {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}{' '}
                                                ({row.subRows.length})
                                            </button>
                                        </>
                                    ) : cell.getIsAggregated() ? (
                                        flexRender(
                                            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    ) : cell.getIsPlaceholder() ? (
                                        null
                                    ) : (
                                        flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
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
