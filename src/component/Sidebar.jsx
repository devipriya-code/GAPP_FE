import { useEffect, useState } from "react";

export default function Sidebar({ setIsCartOpen, cartItem, setCartItem }) {
  const [total, setTotal] = useState(0);

  
  const grouped = cartItem.reduce((acc, item) => {
    const key = item._id;
    if (!acc[key]) acc[key] = { ...item, count: 0 };
    acc[key].count += 1;
    return acc;
  }, {});

  useEffect(() => {
    const newTotal = Object.values(grouped).reduce(
      (acc, item) => acc + item.count * Number(item.price),
      0
    );
    setTotal(newTotal);
  }, [cartItem]);

  const handleAdd = (item) => {
    setCartItem([...cartItem, item]); 
  };

  const handleRemove = (item) => {
    const index = cartItem.findIndex((i) => i._id === item._id);
    if (index !== -1) {
      const updated = [...cartItem];
      updated.splice(index, 1); 
      setCartItem(updated);
    }
  };
  const buyNow = () => {
        var options = {
            key: "rzp_test_xtkRHI1sGHBCGM",
            key_secret: "3nIQtwifGeUyqOvkRI689JSh",
            amount: total * 100,
            currency: "INR",
            name: "Product Delivery",
            description: "for testing purpose...",
            handler: function (response) {
                alert(response.razorpay_payment_id)
                window.location.reload();
            },
            profill: {
                name: 'Devi priya',
                email: 'devipriyas506@gmail.com',
                contact: '9363179399'
            },
            notes: {
                address: "Razorpay Corporate"
            },
            theme: {
                color: "#c5d3ccff"
            }
        }
        var pay=new window.Razorpay(options)
        pay.open();
    }

  return (
    <div style={overlayStyle}>
      <div style={sidebarStyle}>
        <button style={closeBtn} onClick={() => setIsCartOpen(false)}>X</button>
        <h2>🛒 Your Cart</h2>

        {Object.values(grouped).length > 0 ? (
          Object.values(grouped).map((item, index) => (
            <div key={index} style={itemCard}>
              <h4>{item.productname.toUpperCase()}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Rating: ⭐ {item.rating}</p>
              <p>Count: {item.count}</p>

              <div style={qtyContainer}>
                <button onClick={() => handleRemove(item)} style={qtyBtn}>-</button>
                <button onClick={() => handleAdd(item)} style={qtyBtn}>+</button>
              </div>

              <p>Subtotal: ₹{item.count * item.price}</p>
            </div>
          ))
        ) : (
          <p>No products in cart.</p>
        )}

        <h3>Total: ₹ {total}</h3>
        <button style={buyBtn}  onClick={buyNow} >Buy Now</button>

      </div>
    </div>
  );
}



const overlayStyle = {
  position: "fixed",
  top: 0, right: 0, bottom: 0, left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 1000
};

const sidebarStyle = {
  width: "300px",
  backgroundColor: "#fff",
  height: "100%",
  padding: "20px",
  boxShadow: "-2px 0px 8px rgba(0,0,0,0.2)",
  overflowY: "auto",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: 10,
  right: 10,
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  fontSize: "16px",
  cursor: "pointer",
};

const itemCard = {
  borderBottom: "1px solid #ccc",
  paddingBottom: "10px",
  marginBottom: "10px",
};

const qtyContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "5px",
};

const qtyBtn = {
  padding: "5px 10px",
  fontSize: "16px",
  backgroundColor: "#eee",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
};

const buyBtn = {
  marginTop: "20px",
  padding: "10px",
  width: "100%",
  backgroundColor: "green",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};
