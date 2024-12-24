"use client";

import { Equipment, EquipmentStatus } from '@/lib/equipment/EquipmentInterface';
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    RowSelectionState,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState, useMemo } from 'react';
import IndeterminateCheckbox from '@/components/generics/input/IndeterminateCheckbox';


interface ComponentProps {
    equipmentArray: Equipment[];
}

const EquipmentTable: React.FC<ComponentProps> = ({ equipmentArray }) => {
    const [data, setData] = useState<Equipment[]>(equipmentArray);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns = useMemo<ColumnDef<Equipment>[]> (() => [
        {
            id: 'select',
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
                    indeterminate={row.getIsSomeSelected()}
                    rest={{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            ),
        },
        {
            id: 'data',
            header: "Equipment",
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Id',
                },
                {
                    accessorKey: 'name',
                    header: 'Name',
                },
                {
                    accessorKey: 'serialNumber',
                    header: 'Serial Number',
                },
                {
                    accessorKey: 'model',
                    header: 'Model',
                },
                {
                    accessorKey: 'department',
                    header: 'Department',
                },
                {
                    accessorKey: 'location',
                    header: 'Location',
                },
                {
                    accessorKey: 'installDate',
                    header: 'Installation Date',
                },
                {
                    accessorKey: 'status',
                    header: 'Status',
                },
            ],
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        enableRowSelection: true,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    const EquipmentStatusBackground = ( equipStatus: EquipmentStatus ) => {
        return clsx(
            {
                'bg-green-800':     equipStatus == EquipmentStatus.Operational,
                'bg-red-800':       equipStatus == EquipmentStatus.Down,
                'bg-yellow-700':    equipStatus == EquipmentStatus.Maintenance,
                'bg-gray-600':      equipStatus == EquipmentStatus.Retired,
            }
        );
    };

    return (
        <>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr 
                            key={row.id}
                            className={EquipmentStatusBackground(row.getValue('status'))}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
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
            <div>
                {JSON.stringify(table.getState().rowSelection, null, 2)}
            </div>
        </>
    );
}

export default EquipmentTable;
