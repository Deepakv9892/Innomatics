function calculateElectricityBill(units, timeOfDay) {
    let rate = 0;
  
    if (timeOfDay >= 8 && timeOfDay < 20) {
      if (units < 100) {
        rate = 5;
      } else if (units >= 100 && units <= 300) {
        rate = 4;
      } else {
        rate = 3;
      }
    } else { 
      if (units < 100) {
        rate = 5;
      } else if (units >= 100 && units <= 300) {
        rate = 4;
      } else {
        rate = 3;
      }
      rate *= 1.1; 
    }
  
    let totalBill = units * rate;
    return totalBill.toFixed(2); 
  }
  
  document.getElementById("bill-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    let units = parseFloat(document.getElementById("units").value);
    let timeOfDay = parseInt(document.getElementById("timeOfDay").value);
  
    if (isNaN(units) || units <= 0 || isNaN(timeOfDay) || timeOfDay < 0 || timeOfDay > 23) {
      document.getElementById("result").innerText = "Please enter valid details.";
      return;
    }
  
    let result = calculateElectricityBill(units, timeOfDay);
    document.getElementById("result").innerText = `Your total bill is $${result}`;
  });
  