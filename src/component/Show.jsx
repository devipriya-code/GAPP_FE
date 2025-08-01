import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Show = () => {
  const {id } = useParams(); 
  const Nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    
  
      axios.get(`https://gapp-h0rb.onrender.com/product/getdatabyid/${id}`)
        .then((res) => {
          setProduct(res.data.Data);
          console.log("Fetched product:", res.data.Data); 
        })
        .catch((err) => alert(err.message));
    
  }, [id]);

  const Update = () => {
    axios.put(`https://gapp-h0rb.onrender.com/product/updatedata/${id}`, product)
      .then((res) => {
        alert(res.data.message);
        setEditModal(false);
      })
      .catch((err) => alert(err.message));
  };

  const Delete = () => {
    axios.delete(`https://gapp-h0rb.onrender.com/product/deletedata/${id}`)
      .then((res) => {
        alert(res.data.message);
        Nav("/home");
      })
      .catch((err) => alert(err.message));
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid gray"
  };

  const overlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <div style={{
        display: 'flex',
        width: '70%',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: '#fff',
        gap: '40px'
      }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/590/590678.png"
          alt={product.name}
          height="300px"
          width="300px"
          style={{ borderRadius: '10px' }}
        />
        <div style={{ fontSize: '20px', flex: 1 }}>
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{product.productname?.toUpperCase()}</h2>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
         
          <p><strong>Rating:</strong> ⭐ {product.rating}</p>
          <p><strong>Exp_date:</strong>{" "}
            {new Date(product.exp_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          </p>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setEditModal(true)}
              style={{
                padding: "10px 15px",
                marginRight: "10px",
                background: "green",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>
            <button
              onClick={Delete}
              style={{
                padding: "10px 15px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {editModal && (
        <div style={overlayStyle}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", width: "400px" }}>
            <h2>Edit Product</h2>
            <input
              type="text"
              value={product.productname}
              onChange={(e) => setProduct({ ...product, productname: e.target.value })}
              placeholder="Product Name"
              style={inputStyle}
            />
            <input
              type="text"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Description"
              style={inputStyle}
            />
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              placeholder="Price"
              style={inputStyle}
            />
            <input
              type="number"
              value={product.rating}
              onChange={(e) => setProduct({ ...product, rating: e.target.value })}
              placeholder="Rating"
              style={inputStyle}
            />
            <input
              type="date"
              value={product.exp_date?.substring(0, 10)}
              onChange={(e) => setProduct({ ...product, exp_date: e.target.value })}
              style={inputStyle}
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <button onClick={Update} style={{ padding: "10px 20px", marginRight: "10px", background: "blue", color: "#fff", border: "none", borderRadius: "5px" }}>
                Update
              </button>
              <button onClick={() => setEditModal(false)} style={{ padding: "10px 20px", background: "gray", color: "#fff", border: "none", borderRadius: "5px" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Show;
