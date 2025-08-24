// Show selected flight summary
function loadFlightSummary() {
  const flight = JSON.parse(localStorage.getItem("selectedFlight"));
  const summaryDiv = document.getElementById("flightSummary");

  if (!flight) {
    summaryDiv.innerHTML = "<p>No flight selected. Please go back and choose a flight.</p>";
    return;
  }

  summaryDiv.innerHTML = `
    <h3>${flight.airline}</h3>
    <p><strong>Route:</strong> ${flight.from} → ${flight.to}</p>
    <p><strong>Time:</strong> ${flight.time}</p>
    <p><strong>Price:</strong> ₹${flight.price}</p>
  `;
}

// Handle passenger form
document.getElementById("passengerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const passenger = {
    name: document.getElementById("fullName").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    passport: document.getElementById("passport").value,
  };

  // Save passenger details
  localStorage.setItem("passengerDetails", JSON.stringify(passenger));

  // Redirect to payment
  window.location.href = "payment.html";
});

// Load summary on page load
window.onload = loadFlightSummary;
