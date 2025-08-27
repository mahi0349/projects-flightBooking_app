function loadConfirmation() {
  const flight = JSON.parse(localStorage.getItem("selectedFlight"));
  const passenger = JSON.parse(localStorage.getItem("passengerDetails"));
  const payment = localStorage.getItem("paymentStatus");
  const summaryDiv = document.getElementById("confirmationSummary");

  if (!flight || !passenger || !payment) {
    summaryDiv.innerHTML = "<p>Booking data missing. Please try again.</p>";
    return;
  }

  summaryDiv.innerHTML = `
    <h3>Flight Details</h3>
    <p><strong>Airline:</strong> ${flight.airline}</p>
    <p><strong>Route:</strong> ${flight.from} → ${flight.to}</p>
    <p><strong>Time:</strong> ${flight.time}</p>
    <p><strong>Price:</strong> ₹${flight.price}</p>

    <h3>Passenger Details</h3>
    <p><strong>Name:</strong> ${passenger.name}</p>
    <p><strong>Age:</strong> ${passenger.age}</p>
    <p><strong>Gender:</strong> ${passenger.gender}</p>
    <p><strong>Passport:</strong> ${passenger.passport}</p>

    <h3>Payment</h3>
    <p><strong>Status:</strong> ✅ ${payment}</p>
  `;

  // Clear localStorage after booking is done
  localStorage.removeItem("selectedFlight");
  localStorage.removeItem("passengerDetails");
  localStorage.removeItem("paymentStatus");
}

// Run on page load
window.onload = loadConfirmation;
