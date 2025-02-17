function calculateTicketPrice(age, showTime) {
    const standardPrice = 12;
    let discount = 0;

    let showHour = parseInt(showTime.split(":")[0]);
    let isMatinee = showHour < 17;

    if (age < 12) {
      discount = 0.40; 
    } else if (age > 60) {
      discount = 0.30; 
    } else if (isMatinee) {
      discount = 0.20;
    }

    let finalPrice = standardPrice - (standardPrice * discount);
    return finalPrice;
  }

  document.getElementById("ticket-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let age = parseInt(document.getElementById("age").value);
    let showTime = document.getElementById("showTime").value;

    if (isNaN(age) || age < 0 || showTime === "") {
      document.getElementById("result").innerText = "Please enter valid age and showtime.";
      return;
    }
  
    let ticketPrice = calculateTicketPrice(age, showTime);
    document.getElementById("result").innerText = `The ticket price is $${ticketPrice.toFixed(2)}`;
  });
  