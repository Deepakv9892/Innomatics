function calculateFinalAmount(orderAmount) {
    let discount = 0;
    let shipping = 0;

    if (orderAmount > 1000) {
      discount = 0.20;
    } else if (orderAmount >= 500) {
      discount = 0.10; 
    } else {
      discount = 0;
    }

    let discountAmount = orderAmount * discount;

    if (orderAmount > 50) {
      shipping = 0; 
    } else {
      shipping = 10; 
    }

    let finalAmount = orderAmount - discountAmount + shipping;

    return {
      finalAmount: finalAmount,
      discountAmount: discountAmount,
      shipping: shipping
    };
  }

  document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let orderAmount = parseFloat(document.getElementById("orderAmount").value);

    if (isNaN(orderAmount) || orderAmount <= 0) {
      document.getElementById("result").innerText = "Please enter a valid order amount.";
      return;
    }

    let result = calculateFinalAmount(orderAmount);

    document.getElementById("result").innerText = `
      Order Amount: $${orderAmount.toFixed(2)}\n
      Discount: $${result.discountAmount.toFixed(2)}\n
      Shipping: $${result.shipping}\n
      Final Payable Amount: $${result.finalAmount.toFixed(2)}
    `;
  });
  