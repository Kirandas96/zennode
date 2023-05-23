function calculateDiscountedPrice(quantity, price, discountRate) {
  const discountedPrice = quantity * price * (1 - discountRate);
  return discountedPrice;
}

function calculateShippingFee(totalQuantity, packageCapacity, shippingFeePerPackage) {
  const numPackages = Math.ceil(totalQuantity / packageCapacity);
  const shippingFee = numPackages * shippingFeePerPackage;
  return shippingFee;
}

function calculateGiftWrapFee(quantity, giftWrapFeePerUnit) {
  const giftWrapFee = quantity * giftWrapFeePerUnit;
  return giftWrapFee;
}

function applyDiscountRules(quantity, totalQuantity, totalAmount) {
  let discountName = "";
  let discountAmount = 0;

  if (totalAmount > 200) {
    discountName = "flat_10_discount";
    discountAmount = 10;
  } else if (quantity > 10) {
    discountName = "bulk_5_discount";
    discountAmount = 5;
  } else if (totalQuantity > 20) {
    discountName = "bulk_10_discount";
    discountAmount = totalAmount * 0.1;
  } else if (totalQuantity > 30 && quantity > 15) {
    discountName = "tiered_50_discount";
    discountAmount = (quantity - 15) * (totalAmount / totalQuantity) * 0.5;
  }

  return { discountName, discountAmount };
}

// Example usage
const products = [
  { name: "Product A", price: 20 },
  { name: "Product B", price: 40 },
  { name: "Product C", price: 50 }
];

const cart = [];
let totalAmount = 0;
let totalQuantity = 0;

for (const product of products) {
  const quantity = parseInt(prompt(`Enter the quantity for ${product.name}:`), 10);
  const isGiftWrapped = prompt(`Is ${product.name} wrapped as a gift? (yes/no):`) === "yes";

  const productTotalAmount = quantity * product.price;
  const discount = applyDiscountRules(quantity, totalQuantity, totalAmount);
  const discountedAmount = productTotalAmount - discount.discountAmount;
  const shippingFee = calculateShippingFee(totalQuantity + quantity, 10, 5);
  const giftWrapFee = isGiftWrapped ? quantity : 0;

  cart.push({
    name: product.name,
    quantity,
    totalAmount: productTotalAmount,
    discountedAmount,
    discountName: discount.discountName,
    discountAmount: discount.discountAmount,
    shippingFee,
    giftWrapFee
  });

  totalAmount += discountedAmount;
  totalQuantity += quantity;
}

console.log("Cart Details:");
for (const item of cart) {
  console.log("Product:", item.name);
  console.log("Quantity:", item.quantity);
  console.log("Total Amount:", item.totalAmount);
  console.log("Discounted Amount:", item.discountedAmount);
  console.log("Discount Applied:", item.discountName);
  console.log("Discount Amount:", item.discountAmount);
  console.log("Shipping Fee:", item.shippingFee);
  console.log("Gift Wrap Fee:", item.giftWrapFee);
  console.log("-------------------------------------");
}

console.log("Subtotal:", totalAmount);
