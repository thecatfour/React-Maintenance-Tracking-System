import { Column, Table } from "@tanstack/react-table";

const inputClass = "bg-white text-black w-full mb-2";

interface ComponentProps {
    column: Column<any, any>;
    table: Table<any>;
}

const TableFilter: React.FC<ComponentProps> = ({ column, table }) => {
    const checkValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    if (typeof checkValue == 'string') {
        return (
            <input
                type="text"
                value={(column.getFilterValue() ?? "") as string}
                onChange={(e) => column.setFilterValue(e.target.value)}
                placeholder="Search..."
                className={inputClass}
            />
        );
    }

    return (
        <>
            ?
        </>
    );
}

export default TableFilter;
