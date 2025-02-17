function atmWithdrawal(balance, amount, pin, enteredPin) {
    if (enteredPin !== pin) {
      return "Incorrect PIN";
    }

    if (amount > balance) {
      return "Insufficient Funds";
    }

    if (amount % 100 !== 0) {
      return "Enter amount in multiples of 100";
    }
    balance -= amount;
    return `Withdrawal successful! New balance: ₹${balance}`;
  }

  let balance = 6000;
  let pin = 5678;
  
  document.getElementById("atm-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let enteredPin = parseInt(document.getElementById("pin").value);
    let amount = parseInt(document.getElementById("amount").value);
    let result = atmWithdrawal(balance, amount, pin, enteredPin);
    document.getElementById("result").innerText = result;
  });
  