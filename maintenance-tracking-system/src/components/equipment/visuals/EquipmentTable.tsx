"use client";

import { Equipment } from '@/lib/equipment/EquipmentInterface';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';


const columnHelper = createColumnHelper<Equipment>();

const columns = [
    columnHelper.accessor('id', {
        header: 'Id',
    }),
    columnHelper.accessor('name', {
        header: 'Name',
    }),
    columnHelper.accessor('serialNumber', {
        header: 'Serial Number',
    }),
    columnHelper.accessor('model', {
        header: 'Model',
    }),
    columnHelper.accessor('department', {
        header: 'Department',
    }),
    columnHelper.accessor('location', {
        header: 'Location',
    }),
    columnHelper.accessor('installDate', {
        header: 'Installation Date',
    }),
    columnHelper.accessor('status', {
        header: 'Status',
    }),
]

interface ComponentProps {
    equipmentArray: Equipment[];
}

const EquipmentTable: React.FC<ComponentProps> = ({ equipmentArray }) => {
    const [data, setData] = useState<Equipment[]>(equipmentArray);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder 
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
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
        </>
    );
}

export default EquipmentTable;
