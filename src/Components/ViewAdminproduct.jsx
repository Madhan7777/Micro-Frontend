import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";
import AdminHeader from "./AdminHeader";

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

// Component
function ViewAdminProduct() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/AdminProduct/findAllProduct")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (productId) => {
    const conf = window.confirm("Do you want to delete?");
    if (conf) {
      axios
        .delete(`http://localhost:8090/AdminProduct/deleteProduct/${productId}`)
        .then((res) => {
          alert("Record has been deleted");
          setRecords(records.filter((record) => record.productId !== productId));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div id="view-admin-product" style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <AdminHeader />
      <div className="container" style={{ maxWidth: '1200px', margin: 'auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Food & Beverages Product Details
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            component={Link}
            to="/add"
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            sx={{ textTransform: 'none' }}
          >
            Add Product
          </Button>
        </Box>
        <TableContainerStyled component={Paper}>
          <Table>
            <TableHeader>
              <TableRow>
                <StyledTableCell>Product ID</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Image Name</StyledTableCell>
                <StyledTableCell>Image Type</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((d) => (
                <StyledTableRow key={d.productId}>
                  <TableCell align="center">{d.productId}</TableCell>
                  <TableCell align="center">
                    {d.imageName ? (
                      <img
                        src={`http://localhost:8090/AdminProduct/findProdImage/${d.productId}`}
                        alt={d.imageName}
                        style={{ width: '100px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </TableCell>
                  <TableCell align="center">{d.imageName}</TableCell>
                  <TableCell align="center">{d.imageType}</TableCell>
                  <TableCell align="center">{d.category}</TableCell>
                  <TableCell align="center">{d.productName}</TableCell>
                  <TableCell align="center">{d.description}</TableCell>
                  <TableCell align="center">{d.quantity}</TableCell>
                  <TableCell align="center">₹{d.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      to={`/editadminproduct/${d.productId}`}
                      color="success"
                      style={{ marginRight: '10px' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(d.productId)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerStyled>
      </div>
    </div>
  );
}

export default ViewAdminProduct;
