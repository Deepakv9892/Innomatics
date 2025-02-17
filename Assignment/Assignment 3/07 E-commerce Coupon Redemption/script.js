function applyCoupon(orderAmount, couponCode) {
    let finalPrice = orderAmount;
  
    if (couponCode === "DISCOUNT10" && orderAmount > 500) {
      finalPrice = orderAmount - (orderAmount * 0.10);
    } else if (couponCode === "FREESHIP" && orderAmount > 200) {
      finalPrice = orderAmount;
    } else if (couponCode === "DISCOUNT10" && orderAmount <= 500) {
      return "DISCOUNT10 is applicable for orders above $500.";
    } else if (couponCode === "FREESHIP" && orderAmount <= 200) {
      return "FREESHIP is applicable for orders above $200.";
    } else {
      return "Invalid coupon code or conditions not met.";
    }
  
    return finalPrice;
  }
  
  document.getElementById("coupon-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    let orderAmount = parseFloat(document.getElementById("orderAmount").value);
    let couponCode = document.getElementById("couponCode").value.trim().toUpperCase();
  
    if (isNaN(orderAmount) || orderAmount <= 0 || couponCode === "") {
      document.getElementById("result").innerText = "Please enter valid details.";
      return;
    }
  
    let result = applyCoupon(orderAmount, couponCode);
  
    if (typeof result === "number") {
      document.getElementById("result").innerText = `The final price is $${result.toFixed(2)}`;
    } else {
      document.getElementById("result").innerText = result;
    }
  });
  