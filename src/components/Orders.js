import React from "react";
import { useSelector } from "react-redux";
import { selectOrders } from "../features/orders";

// The Orders component displays the status of historical cart orders
const Orders = () => {
  // Get the orders from the Redux store
  const orders = useSelector(selectOrders);

  return (
    <div>
      {/* Map over the orders and display their status */}
      {orders.map((order) => (
        <div key={order.id}>
          <h4>Status: {order.status}</h4>
        </div>
      ))}
    </div>
  );
};

export default Orders;
