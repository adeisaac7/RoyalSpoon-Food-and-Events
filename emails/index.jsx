const OrderConfirmationEmail = ({ order }) => {
  if (!order) {
    return '<div>No order details available.</div>';
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

  return `
    <div style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <h1 style="font-size: 24px; color: #16a34a; font-weight: bold; margin-bottom: 20px; text-align: center;">Order Confirmed!</h1>
      <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px; text-align: center;">
        Thank you for your order, <strong>${order.userName}</strong>!
      </p>
      <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px; text-align: center;">
        Your order from <strong>Royalspoon Food and Events</strong> has been placed successfully.
      </p>

      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="font-size: 20px; color: #1f2937; font-weight: 600; margin-bottom: 15px; text-align: center;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="background-color: #e5e7eb; padding: 10px; text-align: left; font-size: 16px; color: #374151;">Item</th>
              <th style="background-color: #e5e7eb; padding: 10px; text-align: left; font-size: 16px; color: #374151;">Quantity</th>
              <th style="background-color: #e5e7eb; padding: 10px; text-align: left; font-size: 16px; color: #374151;">Total Price</th>
            </tr>
          </thead>
          <tbody>
            ${groupedItemsArray
              .map(
                (item) => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 16px; color: #4b5563;">${item.productName}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 16px; color: #4b5563;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 16px; color: #4b5563;">₦${item.totalPrice.toFixed(2)}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
        <p style="font-size: 18px; color: #1f2937; font-weight: 600; text-align: center; margin-top: 20px;">
          <strong>Total Amount:</strong> ₦${order.totalAmount.toFixed(2)} (Including VAT)
          <br />(Delivery fee will be paid when your order arrives)
        </p>
      </div>

      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="font-size: 20px; color: #1f2937; font-weight: 600; margin-bottom: 15px; text-align: center;">Delivery Information</h2>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 10px;">
          <strong>Name:</strong> ${order.userName}
        </p>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 10px;">
          <strong>Phone:</strong> ${order.phone}
        </p>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 10px;">
          <strong>Address:</strong> ${order.address}, ${order.zipCode}
        </p>
      </div>

      <p style="font-size: 14px; color: #6b7280; margin-top: 20px; text-align: center;">
        If you have any questions, please contact us at
        <a href="mailto:royalspoonfoods4@gmail.com" style="color: #3b82f6; text-decoration: none;">
          royalspoonfoods4@gmail.com
        </a>.
      </p>
    </div>
  `;
};

export default OrderConfirmationEmail;