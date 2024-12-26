import { Column, Table } from "@tanstack/react-table";

const inputClass = "bg-white text-black mb-2 w-full";

interface ComponentProps {
    column: Column<any, any>;
    table: Table<any>;
}

const TableFilter: React.FC<ComponentProps> = ({ column, table }) => {
    const checkValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    if (typeof checkValue == "string") {
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

    if (checkValue instanceof Date) {
        return (
            <div className="flex flex-row gap-10">
                <input
                    type="date"
                    onChange={(e) => column.setFilterValue((old: any) => [e.target.value, old?.[1]])}
                    className={inputClass}
                />
                to
                <input
                    type="date"
                    onChange={(e) => column.setFilterValue((old: any) => [old?.[0], e.target.value])}
                    className={inputClass}
                />
            </div>
        )
    }

    return (
        <>
            ?
        </>
    );
}

export default TableFilter;
