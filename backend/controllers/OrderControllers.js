import asyncHandler from "../middlewares/asyncHandler.js";

import Order from "../models/Order.js";
import Payment from "../models/payment.js";
import Product from "../models/Product.js";
import OrderProduct from "../models/OrderProduct.js";
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    userId,
    orderItems,
    orderDetails,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    email,
    cardNumber,
  } = req.body;

  // console.log(req.body);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order Items");
  }
  const payment = new Payment({
    email,
    cardNumber,
    amount: totalPrice,
    status: "Paid",
  });
  const createdPayment = await payment.save();

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      product: x.id,
      _id: undefined,
    })),
    user: userId,
    isPaid: true,
    paymentID: createdPayment._id,
    paidAt: Date.now(),
    orderDetails,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  const items = orderItems.map((x) => ({
    ...x,
    product: x.id,
    orderId: createdOrder._id,
    _id: undefined,
  }));

  await OrderProduct.insertMany(items);
  res.status(201).json(createdOrder);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   const { id, status, update_time, email_address } = req.body;

//   const payment = new Payment({ id, status, update_time, email_address });
//   const createdPayment = await payment.save();

//   if (order) {
//     order.isPaid = true;
//     order.paymentID = createdPayment._id;
//     order.paidAt = Date.now();
//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.status(200).json(orders);
});

// const getReadyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({
//     orderStatus: { $in: ["Ready", "Out for Delivery"] },
//   }).populate("customer");
//   res.status(200).json(orders);
// });

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isCompleted = true;
    order.completedOn = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
};
