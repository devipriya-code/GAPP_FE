import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const GroceryHome = ({setCartItem,cartItem}) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);
  const  Nav=useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = () => {
    axios.get("https://gapp-h0rb.onrender.com/product/getalldata")
      .then((res) => setProducts(res.data.Data))
      .catch((err) => console.log(err));
  };

  const groceryData = (e) => {
    e.preventDefault();
    const newEntry = {
      productname: product,
      description: desc,
      price: price,
      rating: rating,
      exp_date: date,
    };

    axios.post("https://gapp-h0rb.onrender.com/product/post", newEntry)
      .then((res) => {
        alert(res.data.message);
        fetchProducts();
        setShowModal(false);
        setProduct(""); setPrice(""); setDesc(""); setQty(""); setRating(""); setDate("");
      })
      .catch(err => alert(err.message));
  };

  const handleAddtoCart=(product)=>{
    const exist=cartItem.find((e)=>{
      return e._id===product._id
    })
    if(!exist) setCartItem([...cartItem,product])
      else alert("alreay added!!!")
  }



  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Grocery Products</h2>

      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="Search groceries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>➕ Add Product</button>
      </div>

      <div style={styles.cardGrid}>
        {products
          .filter(p => p.productname.toLowerCase().includes(search.toLowerCase()))
          .map((product) => (
            <div key={product._id} style={styles.card} >
              
              <img
                src="https://cdn-icons-png.flaticon.com/512/590/590678.png"
                alt={product.productname}
                style={styles.image}
                onClick={()=>Nav(`/show/${product._id}`)}
              />
              <h3 style={{ marginBottom: 5 }}>{product.productname}</h3>
              <p style={styles.description}>{product.description}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Rating:</strong> ⭐ {product.ratings}</p>
              <button style={styles.cartBtn} onClick={() => handleAddtoCart(product)}>🛒 Add to Cart</button>
            </div>
          ))}
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={() => setShowModal(false)} style={styles.closeBtn}>×</button>
            <h3 style={{ marginBottom: '15px' }}>Add New Product</h3>
            <form style={styles.form} onSubmit={groceryData}>
              <input style={styles.input} type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product Name" required />
              <input style={styles.input} type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" required />
              <input style={styles.input} type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
              <input style={styles.input} type="text" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Quantity" required />
              <input style={styles.input} type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" required />
              <input style={styles.input} type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
             
              <button type="submit" style={styles.submitBtn}>Add Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    maxWidth: 400,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ccc',
  },
  addBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer',
  },
  cardGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  card: {
    width: 220,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    margin: '8px 0',
    minHeight: 40,
  },
  cartBtn: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: 400,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    background: 'transparent',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: 12,
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  submitBtn: {
    padding: 10,
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: 16,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default GroceryHome;
