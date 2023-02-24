"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from "@roketid/windmill-react-ui";

import SkeletonTable from "@/shared/SkeletonTable";
import Layout from "./containers/Layout";
import { UserRequest, fetchUsersFn } from "@/services/users";

import { useStateContext } from "@/context/AuthContext";

const initialState = {
  queryPageIndex: 0,
  queryPageSize: 10,
  totalCount: 0,
};
// Don't need add to another folder because right now we just use one time in here
// https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster

const PAGE_CHANGED = "PAGE_CHANGED";
const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";
const TOTAL_COUNT_CHANGED = "TOTAL_COUNT_CHANGED";

type PageKind = "PAGE_CHANGED" | "PAGE_SIZE_CHANGED" | "TOTAL_COUNT_CHANGED";
type PageAction = {
  type: PageKind;
  payload: number;
};
type PageState = {
  queryPageIndex: number;
  queryPageSize: number;
  totalCount: number;
};

const reducer = (state: PageState, action: PageAction) => {
  const { type, payload } = action;
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export default function Dashboard() {
  const columns = React.useMemo<ColumnDef<UserRequest>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        maxSize:120,
        cell: (info) => info.getValue(),
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (info) => info.getValue(),
      },
      {
        header: "Phone",
        accessorKey: "phone",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  const stateContext = useStateContext();
  const router = useRouter();
  const [{ queryPageIndex, queryPageSize, totalCount }, dispatch] =
    React.useReducer(reducer, initialState);

  const { isLoading, data } = useQuery({
    queryKey: ["users", queryPageIndex, queryPageSize],
    queryFn: () =>
      fetchUsersFn({ page: queryPageIndex, pageSize: queryPageSize }),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  React.useEffect(() => {
    // checks if the user is authenticated
    if (!stateContext.state.authUser.authStatus) {
      router.push("/");
    }
  }, [stateContext.state.authUser.authStatus]);

  const table = useReactTable({
    data: data?.data || [],
    //@ts-ignore
    columns: columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });

  return (
    <Layout>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <TableContainer className="divide-y divide-gray-200">
          <Table>
            <TableHeader className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-gray-700 bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} className="px-6 py-5 text-left">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    className=" bg-gray-800 divide-gray-700 border-gray-800	text-gray-400 "
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} className="px-6 py-5 text-left">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <TableFooter className="border-t border-gray-800 flex justify-end items-center bg-gray-800">
            <Pagination
              totalResults={data?.total || 0}
              resultsPerPage={table.getState().pagination.pageSize}
              onChange={(e) => {
                const page = e ? Number(e) - 1 : 0;
                table.setPageIndex(Number(page));
                dispatch({
                  type: PAGE_CHANGED,
                  payload: page,
                });
              }}
              label="Table navigation"
            />
            <select
              value={table.getState().pagination.pageSize}
              className="border w-1/6 border-gray-300 m-l-2 text-sm rounded-lg block mt-4 mb-4 p-2.5 bg-gray-700 	 placeholder-gray-400 text-white"
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
                dispatch({
                  type: PAGE_SIZE_CHANGED,
                  payload: Number(e.target.value),
                });
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize} / page
                </option>
              ))}
            </select>
          </TableFooter>
        </TableContainer>
      )}
    </Layout>
  );
}
