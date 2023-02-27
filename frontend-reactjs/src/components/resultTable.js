import { Paper,Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableContainer } from "@mui/material";
import * as React from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const columns = [
    { id:'_id',label:'_id',minWidth:170,align:'center'},
    { id: 'Date', label: 'Date', minWidth: 170 ,align: 'center'},
    
    { id: 'WarehouseID', label: 'Warehouse ID', minWidth: 100 ,align: 'right'},
    {
      id: 'ShippingPO',
      label: 'Shipping PO',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'ShipmentID',
      label: 'Shipment ID',
      minWidth: 120,
      align: 'right'
    },
    {
      id: 'BoxesRcvd',
      label: '# Boxes Received',
      minWidth: 120,
      align: 'right'
    },
  ];
  export const ResultTable = ({recordList}) =>{
    //record the number of page 
    const [page,setPage]=React.useState(0);
    const [rowsPerPage,setRowsPerPage]=React.useState(10);
  
    //a handler func helps to change the number of page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
  
    //change the number of rows on each page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
const handleExportPDF = () => {
        const input = document.getElementById("table-to-export");
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 10, 10, 180, 0);
          pdf.save("report.pdf");
        });
      };   
    return (
      <Paper sx={{ width: '150%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" id="table-to-export">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {recordList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        //"rows per page" select
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={recordList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <button onClick={handleExportPDF}>Export to PDF</button>
      </Paper>
      
    );
  };
  
