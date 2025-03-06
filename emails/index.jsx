import React from 'react';

const OrderConfirmationEmail = ({ order }) => {
  if (!order) {
    return <div>No order details available.</div>;
  }

 
  const groupedItems = order.orderItems.reduce((acc, item) => {
    if (acc[item.productName]) {
      acc[item.productName].quantity += item.quantity || 1;
      acc[item.productName].totalPrice += item.price * (item.quantity || 1);
    } else {
      acc[item.productName] = {
        productName: item.productName,
        quantity: item.quantity || 1,
        price: item.price,
        totalPrice: item.price * (item.quantity || 1), 
      };
    }
    return acc;
  }, {});

  const groupedItemsArray = Object.values(groupedItems);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Order Confirmed!</h1>
      <p style={styles.text}>
        Thank you for your order, <strong>{order.userName}</strong>!
      </p>
      <p style={styles.text}>
        Your order from <strong>{order.restaurantName}</strong> has been placed successfully.
      </p>

      <div style={styles.detailsContainer}>
        <h2 style={styles.subHeader}>Order Details</h2>

        {/* Table for Order Items */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Item</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {groupedItemsArray.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{item.productName}</td>
                <td style={styles.tableCell}>{item.quantity}</td>
                <td style={styles.tableCell}>₦{item.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Amount */}
        <p style={styles.totalAmount}>
          <strong>Total Amount:</strong> ₦{order.totalAmount.toFixed(2)}
        </p>
      </div>

      {/* Delivery Information */}
      <div style={styles.deliveryInfo}>
        <h2 style={styles.subHeader}>Delivery Information</h2>
        <p style={styles.detailItem}>
          <strong>Name:</strong> {order.userName}
        </p>
        <p style={styles.detailItem}>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p style={styles.detailItem}>
          <strong>Address:</strong> {order.address}, {order.zipCode}
        </p>
      </div>

      <p style={styles.footerText}>
        If you have any questions, please contact us at{' '}
        <a href="mailto:royalspoonfoods4@gmail.com" style={styles.link}>
          royalspoonfoods4@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f3f4f6',  
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    fontSize: '24px',
    color: '#16a34a', 
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  text: {
    fontSize: '16px',
    color: '#4b5563', 
    marginBottom: '20px',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
  },
  subHeader: {
    fontSize: '20px',
    color: '#1f2937', 
    fontWeight: '600',
    marginBottom: '15px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#e5e7eb',
    padding: '10px',
    textAlign: 'left',
    fontSize: '16px',
    color: '#374151', 
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '16px',
    color: '#4b5563',
  },
  totalAmount: {
    fontSize: '18px',
    color: '#1f2937', 
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '20px',
  },
  deliveryInfo: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  detailItem: {
    fontSize: '16px',
    color: '#4b5563',
    marginBottom: '10px',
  },
  footerText: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '20px',
    textAlign: 'center',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
  },
};

export default OrderConfirmationEmail;