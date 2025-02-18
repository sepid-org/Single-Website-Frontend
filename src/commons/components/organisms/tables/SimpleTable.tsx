import React, { FC } from 'react';
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

type SimpleTablePropsType = {
  headers: {
    label: string;
    name: string;
  }[];
  rows: any[];
  count?: number;
  itemsPerPage?: number;
  page?: number;
  setPage?: (page: number) => void;
  hideRowNumbersColumn?: boolean;
  reverseRowNumber?: boolean;
}

const SimpleTable: FC<SimpleTablePropsType> = ({
  headers,
  rows,
  count,
  itemsPerPage,
  page,
  setPage,
  hideRowNumbersColumn,
  reverseRowNumber = false,
}) => {
  // Calculate the starting row number based on current page
  const startingRowIndex = page ? (page - 1) * itemsPerPage : 0;

  return (
    <Stack spacing={2}>
      {page && (
        <Pagination
          sx={{ alignSelf: 'center' }}
          count={Math.ceil(count / itemsPerPage) || 1}
          page={page}
          onChange={(event, value) => setPage && setPage(value)}
          defaultPage={1}
          color="primary"
          showFirstButton
          showLastButton
        />
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {!hideRowNumbersColumn && (
                <TableCell align='center'>ردیف</TableCell>
              )}
              {headers.map((header) => (
                <TableCell key={header.name} align='center'>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={row.id || index}>
                {!hideRowNumbersColumn && (
                  <TableCell align='center'>
                    {reverseRowNumber ? count - startingRowIndex - index : startingRowIndex + index + 1}
                  </TableCell>
                )}
                {headers.map((header) => (
                  <TableCell key={header.name} align='center'>
                    {row[header.name] ?? '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default SimpleTable;