import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import './EditUserproduct.css'; 

function EditUserproduct() {
  const { id } = useParams();  
  const [data, setData] = useState({
    productName: '',
    category: '',
    price: '',
    description: '',
    quantity: '',
    deliveryDate: '',
    sellerName: '',
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/UserProduct/findProductById/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productId', id);  // Use URL parameter for productId
    formData.append('productName', data.productName);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('quantity', data.quantity);
    formData.append('deliveryDate', data.deliveryDate);
    formData.append('sellerName', data.sellerName);
    if (image) formData.append('imageProduct', image);

    axios
      .post('http://localhost:8090/UserProduct/updateSellerProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('Product updated successfully');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product');
      });
  };

  return (
    <div>
      <div id="edit-product" className="d-flex w-100 vh-100 justify-content-center align-items-center">
        
        <div className="w-50 border p-5" style={{ color: 'white' }} id="edit-form">
          <form onSubmit={handleSubmit}>
            <h1>EDIT PRODUCT</h1>
            <div>
              <label htmlFor="productId">Product ID:</label>
              <input
                type="text"
                id="productId"
                name="productId"
                className="form-control"
                value={id}  // Display productId as read-only
                disabled  // Disable editing
              />
            </div>
            <div>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="form-control"
                value={data.productName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                value={data.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                className="form-control"
                value={data.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                value={data.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                className="form-control"
                value={data.quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="deliveryDate">Delivery Date:</label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                className="form-control"
                value={data.deliveryDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="sellerName">Seller Name:</label>
              <input
                type="text"
                id="sellerName"
                name="sellerName"
                className="form-control"
                value={data.sellerName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="imageProduct">Image:</label>
              <input
                type="file"
                id="imageProduct"
                name="imageProduct"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-info fst-italic" id="update">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUserproduct;
