import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Typography,
  Stack,
  IconButton,
  Table as MUITable,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowUpward,
  ArrowDownward,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import colors from "../config/colors";

const Table = ({
  columns,
  emptyMessage = "No data available",
  data,
  pageSizeOptions = [10, 25, 50],
}) => {
  const [sorting, setSorting] = React.useState([]);

  const {
    getCanNextPage,
    getCanPreviousPage,
    getHeaderGroups,
    getPageCount,
    getRowModel,
    nextPage,
    options,
    previousPage,
    setPageSize,
  } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: { pageSize: pageSizeOptions[0] },
    },
    onSortingChange: setSorting,
  });

  const { pageSize, pageIndex } = options.state.pagination;

  const BodyTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(even)": {
      backgroundColor: colors.light,
    },
  }));

  return (
    <>
      <TableContainer>
        <MUITable size="small" stickyHeader>
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    align="center"
                    padding="none"
                    sx={{ cursor: "pointer" }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Typography>
                      {
                        {
                          asc: <ArrowUpward fontSize="small" />,
                          desc: <ArrowDownward fontSize="small" />,
                        }[header.column.getIsSorted() ?? null]
                      }
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {getRowModel().rows.length > 0 ? (
              getRowModel().rows.map((row) => (
                <BodyTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} align="center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </BodyTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{
                    bgcolor: colors.secondary + 30,
                    color: colors.medium,
                    paddingY: "8px",
                  }}
                >
                  <Typography variant="subtitle2">{emptyMessage}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MUITable>
      </TableContainer>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mt={2}
      >
        <div style={{ width: "20%" }} />
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="subtitle2" textAlign="center">
            Rows per page:
          </Typography>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Stack>

        {data.length > pageSize && (
          <Stack direction="row" justifyContent="center" alignItems="center">
            <IconButton
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage()}
              size="small"
              sx={{ color: colors.black }}
            >
              <KeyboardArrowLeft fontSize="small" />
            </IconButton>

            <Typography variant="subtitle2" marginX={1} textAlign="center">
              Page {pageIndex + 1} of {getPageCount()}
            </Typography>

            <IconButton
              onClick={() => nextPage()}
              disabled={!getCanNextPage()}
              size="small"
              sx={{ color: colors.black }}
            >
              <KeyboardArrowRight fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  emptyMessage: PropTypes.string,
  pageSizeOptions: PropTypes.array,
};

export default Table;
