import { FilterFn, Row } from "@tanstack/react-table";

const dateFilter: FilterFn<any> = (row: Row<any>, columnId: string, filterValue: any) => {
    const emptyStartDate: boolean = (filterValue[0] == '' || filterValue[0] == null);
    const emptyEndDate:   boolean = (filterValue[1] == '' || filterValue[1] == null);

    if (emptyStartDate && emptyEndDate) {
        return true;
    }

    const columnDate: string = (row.getValue(columnId) as Date).toISOString().substring(0,10);

    if (!emptyStartDate && emptyEndDate) {
        return filterValue[0] <= columnDate;
    }

    if (emptyStartDate && !emptyEndDate) {
        return columnDate <= filterValue[1];
    }

    return (filterValue[0] <= columnDate) && (columnDate <= filterValue[1]);
}

export default dateFilter;
