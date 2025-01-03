"use client";

import { Equipment, EquipmentDepartment, EquipmentStatus } from "@/lib/equipment/EquipmentInterface";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    RowData,
    RowSelectionState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState, useMemo, useEffect, Dispatch } from "react";
import IndeterminateCheckbox from "@/components/generics/input/IndeterminateCheckbox";
import TableFilter from "@/components/generics/filters/TableFilter";
import dateFilter from "@/lib/filters/DateFilter";


declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "date-range" | "number-range" | "select",
        selectOptions?: string[],
    }
}

interface ComponentProps {
    equipmentArray: Equipment[];
    setSelectedRows: Dispatch<RowSelectionState>;
}

const EquipmentTable: React.FC<ComponentProps> = ({ equipmentArray, setSelectedRows }) => {
    const [data, setData] = useState<Equipment[]>(equipmentArray);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);

    useEffect(() => {
        setSelectedRows(rowSelection);
    }, [rowSelection])

    useEffect(() => {
        setData(equipmentArray);
        setRowSelection({});
    }, [equipmentArray])

    const columns = useMemo<ColumnDef<Equipment>[]>(() => [
        {
            id: "data",
            header: () => <div className="font-bold text-2xl">Equipment</div>,
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
                },
                {
                    accessorKey: "name",
                    header: "Name",
                    size: 250,
                },
                {
                    accessorKey: "status",
                    header: "Status",
                    size: 100,
                    meta: {
                        filterVariant: "select",
                        selectOptions: EquipmentStatus,
                    }
                },
                {
                    accessorKey: "serialNumber",    
                    header: "Serial Number",
                    size: 175,
                },
                {
                    accessorKey: "model",
                    header: "Model",
                    size: 150,
                },
                {
                    accessorKey: "department",
                    header: "Department",
                    size: 150,
                    meta: {
                        filterVariant: "select",
                        selectOptions: EquipmentDepartment,
                    }
                },
                {
                    accessorKey: "location",
                    header: "Location",
                    size: 200,
                },
                {
                    accessorKey: "installDate",
                    header: "Installation Date",
                    size: 200,
                    filterFn: dateFilter,
                    meta: {
                        filterVariant: "date-range",
                    },
                    cell: ({ row }) => (<>{row.original.installDate.toUTCString()}</>)
                },
            ],
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        enableRowSelection: true,

        state: {
            rowSelection,
            sorting,
        },

        getRowId: row => row.id,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
    });

    function equipmentStatusBackground(equipStatus: string) {
        return clsx(
            {
                "bg-green-800":     equipStatus == "Operational",
                "bg-red-800":       equipStatus == "Down",
                "bg-yellow-700":    equipStatus == "Maintenance",
                "bg-gray-600":      equipStatus == "Retired",
            }
        );
    };

    return (
        <>
            <table style={{ minWidth: table.getCenterTotalSize(), width: "100%" }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th 
                                    key={header.id} 
                                    colSpan={header.colSpan}
                                    data-testid={`equipment-table-header-${header.id}`}
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
                                                    />
                                                </div>
                                            ) : null }
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
                            data-testid="equipment-row"
                            key={row.id}
                            className={equipmentStatusBackground(row.getValue("status"))}
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

export default EquipmentTable;
