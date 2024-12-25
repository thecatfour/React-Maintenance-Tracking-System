"use client";

import { Equipment, EquipmentStatus } from '@/lib/equipment/EquipmentInterface';
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    RowSelectionState,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState, useMemo } from 'react';
import IndeterminateCheckbox from '@/components/generics/input/IndeterminateCheckbox';
import TableFilter from '@/components/generics/input/TableFilter';


interface ComponentProps {
    equipmentArray: Equipment[];
}

const EquipmentTable: React.FC<ComponentProps> = ({ equipmentArray }) => {
    const [data, setData] = useState<Equipment[]>(equipmentArray);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns = useMemo<ColumnDef<Equipment>[]> (() => [
        {
            id: 'select',
            minSize: 0,
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
                <div className='flex justify-center'>
                   <IndeterminateCheckbox
                        indeterminate={row.getIsSomeSelected()}
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
            id: 'data',
            header: "Equipment",
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Id',
                    size: 100,
                },
                {
                    accessorKey: 'name',
                    header: 'Name',
                    size: 200,
                },
                {
                    accessorKey: 'status',
                    header: 'Status',
                    size: 100,
                },
                {
                    accessorKey: 'serialNumber',    
                    header: 'Serial Number',
                    size: 150,
                },
                {
                    accessorKey: 'model',
                    header: 'Model',
                    size: 150,
                },
                {
                    accessorKey: 'department',
                    header: 'Department',
                    size: 100,
                },
                {
                    accessorKey: 'location',
                    header: 'Location',
                    size: 200,
                },
                {
                    accessorKey: 'installDate',
                    header: 'Installation Date',
                    size: 600,
                },
            ],
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        enableRowSelection: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
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
            <table style={{ minWidth: table.getCenterTotalSize(), width: '100%' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th 
                                    key={header.id} 
                                    colSpan={header.colSpan}
                                    style={{ 
                                        width: header.getSize(),
                                    }}
                                >
                                    {header.isPlaceholder ? null : (
                                        <>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <TableFilter 
                                                        column={header.column}
                                                        table={table}
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
                            key={row.id}
                            className={EquipmentStatusBackground(row.getValue('status'))}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td 
                                    key={cell.id}
                                    style={{
                                        width: cell.column.getSize(),
                                    }}
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
            <div>
                {JSON.stringify(table.getState().rowSelection, null, 2)}
            </div>
        </>
    );
}

export default EquipmentTable;
