function calculateFlightFare(classType, luggageWeight, isStudent, isSenior) {
    const baseFare = 300;
    let totalFare = baseFare;

    if (classType === "business") {
      totalFare += 200;
    } else if (classType === "first") {
      totalFare += 500;
    }
  
    if (luggageWeight > 20) {
      const extraWeight = luggageWeight - 20;
      totalFare += Math.ceil(extraWeight / 10) * 50; 
    }

    if (isStudent) {
      totalFare *= 0.85; 
    }
  
    if (isSenior) {
      totalFare *= 0.90; 
    }
  
    return totalFare.toFixed(2); 
  }
  
  document.getElementById("ticket-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const classType = document.getElementById("classType").value;
    const luggageWeight = parseFloat(document.getElementById("luggageWeight").value);
    const isStudent = document.getElementById("isStudent").checked;
    const isSenior = document.getElementById("isSenior").checked;
  
    if (isNaN(luggageWeight) || luggageWeight < 0) {
      document.getElementById("result").innerText = "Please enter a valid luggage weight.";
      return;
    }
  
    let result = calculateFlightFare(classType, luggageWeight, isStudent, isSenior);
    document.getElementById("result").innerText = `Your total fare is $${result}`;
  });
  