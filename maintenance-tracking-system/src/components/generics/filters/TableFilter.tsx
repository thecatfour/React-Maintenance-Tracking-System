import { Column, Table } from "@tanstack/react-table";

const inputClass = "bg-white text-black mb-2 w-full";

interface ComponentProps {
    column: Column<any, any>;
}

const TableFilter: React.FC<ComponentProps> = ({ column }) => {
    const { filterVariant, selectOptions } = column.columnDef.meta ?? {};

    if (filterVariant === undefined || filterVariant === "text" ) {
        return (
            <input
                data-testid="string-1"
                type="text"
                value={(column.getFilterValue() ?? "") as string}
                onChange={(e) => column.setFilterValue(e.target.value)}
                placeholder="Search..."
                className={inputClass}
            />
        );
    } else if (filterVariant === "number-range") {
        return (
            <div className="flex flex-row gap-4">
                <input
                    data-testid="number-1"
                    type="number"
                    placeholder="Min"
                    min={0}
                    onChange={(e) => column.setFilterValue((old: any) => [e.target.value, old?.[1]])}
                    className={inputClass}
                />
                <input
                    data-testid="number-2"
                    type="number"
                    placeholder="Max"
                    min={(column.getFilterValue() as string[])?.[0] == '' ? 0 : (column.getFilterValue() as string[])?.[0]}
                    onChange={(e) => column.setFilterValue((old: any) => [old?.[0], e.target.value])}
                    className={inputClass}
                />
            </div>
        )
    } else if (filterVariant === "date-range") {
        return (
            <div className="flex flex-row gap-10">
                <input
                    data-testid="date-1"
                    type="date"
                    onChange={(e) => column.setFilterValue((old: any) => [e.target.value, old?.[1]])}
                    className={inputClass}
                />
                to
                <input
                    data-testid="date-2"
                    type="date"
                    onChange={(e) => column.setFilterValue((old: any) => [old?.[0], e.target.value])}
                    className={inputClass}
                />
            </div>
        )
    } else if (filterVariant === "select") {
        return (
            <select
                onChange={(e) => column.setFilterValue(e.target.value)}
                value={column.getFilterValue()?.toString()}
                className={`${inputClass} min-w-[125px]`}
                data-testid="select-1"
            >
                <option value="">All</option>

                {selectOptions?.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        )
    }

    return (
        <>
            ?
        </>
    );
}

export default TableFilter;
