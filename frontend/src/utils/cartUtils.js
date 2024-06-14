export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  //shipping price
  let shippingPrice;
  if (state.method === "Delivery") {
    shippingPrice = 10;
    state.shippingPrice = addDecimals(shippingPrice);
  } else {
    shippingPrice = 0;
    state.shippingPrice = addDecimals(shippingPrice);
  }
  // tax price
  const taxPrice = 0.1 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
