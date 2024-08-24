import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon
import { IconButton, TextField, Button, Box, Typography, Input } from '@mui/material';
import "./AddAdminproduct.css";
import AdminHeader from './AdminHeader';

function AddAdminProduct() {
    const [inputData, setInputData] = useState({
        productName: "",
        category: "",
        price: "",
        description: "",
        quantity: "",
        deliveryDate: "",
        sellerName: "",
        imageProduct: null
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validateValues(inputData);

        if (result === true) {
            const formData = new FormData();
            formData.append('productName', inputData.productName);
            formData.append('category', inputData.category);
            formData.append('price', inputData.price);
            formData.append('description', inputData.description);
            formData.append('quantity', inputData.quantity);
            formData.append('deliveryDate', inputData.deliveryDate);
            formData.append('sellerName', inputData.sellerName);
            if (inputData.imageProduct) {
                formData.append('imageProduct', inputData.imageProduct);
            }

            axios.post("http://localhost:8090/AdminProduct/insertSellerProduct", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                alert("Product added successfully");
                navigate("/viewproduct");
            })
            .catch((err) => console.log(err));
        } else {
            alert("Please enter valid inputs!");
        }
    };

    const validateValues = (inputData) => {
        if (inputData.productName.length === 0) {
            alert("Please enter Product Name!");
            return false;
        } else if (inputData.category.length === 0) {
            alert("Please enter the Product category!");
            return false;
        } else if (inputData.price.length === 0) {
            alert("Please enter the Price!");
            return false;
        } else if (inputData.description.length === 0) {
            alert("Please enter the Description!");
            return false;
        } else if (inputData.quantity.length === 0) {
            alert("Please enter the Quantity!");
            return false;
        } else if (inputData.deliveryDate.length === 0) {
            alert("Please enter the Delivery Date!");
            return false;
        } else if (inputData.sellerName.length === 0) {
            alert("Please enter the Seller Name!");
            return false;
        } else {
            return true;
        }
    };

    return (
        <Box className="add-admin-product-container" sx={styles.container}>
            <Box sx={styles.formContainer}>
                <Box sx={styles.headerContainer}>
                    <IconButton onClick={() => navigate('/viewproduct')} sx={styles.goBackButton}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" sx={styles.formTitle}>Add Product Details</Typography>
                </Box>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    <Box sx={styles.formGroup}>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end">
                                        <TextFieldsIcon />
                                    </IconButton>
                                )
                            }}
                            onChange={(e) => setInputData({ ...inputData, productName: e.target.value })}
                            fullWidth
                            sx={styles.textField}
                        />
                    </Box>

                    <Box sx={styles.formGroup}>
                        <TextField
                            label="Category"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end">
                                        <CategoryIcon />
                                    </IconButton>
                                )
                            }}
                            onChange={(e) => setInputData({ ...inputData, category: e.target.value })}
                            fullWidth
                            sx={styles.textField}
                        />
                    </Box>

                    <Box sx={styles.formGroup}>
                        <TextField
                            label="Price"
                            variant="outlined"
                            type="number"
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end">
                                        <AttachMoneyIcon />
                                    </IconButton>
                                )
                            }}
                            onChange={(e) => setInputData({ ...inputData, price: e.target.value })}
                            fullWidth
                            sx={styles.textField}
                        />
                    </Box>

                    <Box sx={styles.formGroup}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end">
                                        <DescriptionIcon />
                                    </IconButton>
                                )
                            }}
                            onChange={(e) => setInputData({ ...inputData, description: e.target.value })}
                            fullWidth
                            sx={styles.textField}
                        />
                    </Box>

                    <Box sx={styles.formGroup}>
                        <TextField
                            label="Available Quantity"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end">
                                        <ListAltIcon />
                                    </IconButton>
                                )
                            }}
                            onChange={(e) => setInputData({ ...inputData, quantity: e.target.value })}
                            fullWidth
                            sx={styles.textField}
                        />
                    </Box>

                    <Box sx={styles.formGroup}>
                        <TextField
                            label="Delivery Date"
                            variant="outlined"
                            type="date"
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end">
                                        <CalendarTodayIcon />
                                    </IconButton>
                                )
                            }}
                            onChange={(e) => setInputData({ ...inputData, deliveryDate: e.target.value })}
                            fullWidth
                            sx={styles.textField}
                        />
                    </Box>

                    <Box sx={styles.formGroup}>
                        <TextField
                            label="Stock Status"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end">
                                        <InventoryIcon />
                                    </IconButton>
                                )
                            }}
                            onChange={(e) => setInputData({ ...inputData, sellerName: e.target.value })}
                            fullWidth
                            sx={styles.textField}
                        />
                    </Box>

                    <Box sx={styles.formGroup}>
                        <Input
                            type="file"
                            name="imageProduct"
                            onChange={(e) => setInputData({ ...inputData, imageProduct: e.target.files[0] })}
                            fullWidth
                            sx={styles.fileInput}
                        />
                    </Box>

                    <Button type="submit" variant="contained" sx={styles.submitButton}>Submit</Button>
                </form>
            </Box>
        </Box>
    );
}

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: 'auto',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem', 
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    goBackButton: {
        marginRight: '1rem',
    },
    formTitle: {
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            '& fieldset': {
                borderColor: '#ddd',
            },
            '&:hover fieldset': {
                borderColor: '#007bff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#007bff',
            },
        },
    },
    fileInput: {
        borderRadius: '4px',
        border: '1px solid #ddd',
        padding: '0.5rem',
    },
    submitButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#0056b3',
        },
    },
};

export default AddAdminProduct;
