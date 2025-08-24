// Show booking summary
function loadBookingSummary() {
  const flight = JSON.parse(localStorage.getItem("selectedFlight"));
  const passenger = JSON.parse(localStorage.getItem("passengerDetails"));
  const summaryDiv = document.getElementById("bookingSummary");

  if (!flight || !passenger) {
    summaryDiv.innerHTML = "<p>Booking details missing. Please go back.</p>";
    return;
  }

  summaryDiv.innerHTML = `
    <h3>${flight.airline}</h3>
    <p><strong>Route:</strong> ${flight.from} → ${flight.to}</p>
    <p><strong>Time:</strong> ${flight.time}</p>
    <p><strong>Price:</strong> ₹${flight.price}</p>
    <hr>
    <p><strong>Passenger:</strong> ${passenger.name}, ${passenger.age}, ${passenger.gender}</p>
    <p><strong>Passport:</strong> ${passenger.passport}</p>
  `;
}

// Toggle payment method fields
document.getElementById("method").addEventListener("change", function () {
  const cardSection = document.getElementById("cardDetails");
  const upiSection = document.getElementById("upiDetails");

  cardSection.classList.add("hidden");
  upiSection.classList.add("hidden");

  if (this.value === "Card") {
    cardSection.classList.remove("hidden");
  } else if (this.value === "UPI") {
    upiSection.classList.remove("hidden");
  }
});

// Handle payment form
document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const method = document.getElementById("method").value;

  if (method === "Card") {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill all card details!");
      return;
    }
  }

  if (method === "UPI") {
    const upiId = document.getElementById("upiId").value;
    if (!upiId) {
      alert("Please enter your UPI ID!");
      return;
    }
  }

  // Save payment status
  localStorage.setItem("paymentStatus", "Success");

  // Redirect to confirmation page
  window.location.href = "confirmation.html";
});

// Load summary on page load
window.onload = loadBookingSummary;
