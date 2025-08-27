// Save search form data
function saveSearchData(event) {
  event.preventDefault();
  const form = event.target;

  const searchData = {
    from: form.from.value,
    to: form.to.value,
    departure: form.departure.value,
    return: form.return.value,
    passengers: form.passengers.value,
    classType: form.class.value,
  };

  localStorage.setItem("searchData", JSON.stringify(searchData));
  window.location.href = "flights.html"; // go to flights page
}

// Load flights dynamically
function loadFlights() {
  const flightsList = document.getElementById("flightsList");
  if (!flightsList) return;

  const searchData = JSON.parse(localStorage.getItem("searchData"));
  if (!searchData) return;

  // Dummy flights (replace with API later)
  const flights = [
    { id: 1, airline: "IndiGo", time: "08:00", price: 4500 },
    { id: 2, airline: "Air India", time: "12:30", price: 6000 },
    { id: 3, airline: "SpiceJet", time: "18:45", price: 5200 },
  ];

  flightsList.innerHTML = flights.map(f => `
    <div class="flight-card">
      <h3>${f.airline}</h3>
      <p>${searchData.from} → ${searchData.to}</p>
      <p>Departure: ${f.time}</p>
      <p>Price: ₹${f.price}</p>
      <button onclick="selectFlight(${f.id})" class="btn">Book</button>
    </div>
  `).join("");
}

// Save selected flight
function selectFlight(id) {
  const flights = [
    { id: 1, airline: "IndiGo", time: "08:00", price: 4500 },
    { id: 2, airline: "Air India", time: "12:30", price: 6000 },
    { id: 3, airline: "SpiceJet", time: "18:45", price: 5200 },
  ];
  const selected = flights.find(f => f.id === id);
  localStorage.setItem("selectedFlight", JSON.stringify(selected));
  window.location.href = "booking.html";
}

// Load booking summary
function loadBookingSummary() {
  const summary = document.getElementById("flightSummary");
  if (!summary) return;

  const flight = JSON.parse(localStorage.getItem("selectedFlight"));
  if (!flight) return;

  summary.innerHTML = `
    <h3>Flight Summary</h3>
    <p>Airline: ${flight.airline}</p>
    <p>Departure Time: ${flight.time}</p>
    <p>Price: ₹${flight.price}</p>
  `;
}

// Save passenger details
function savePassenger(event) {
  event.preventDefault();

  const passenger = {
    fullName: document.getElementById("fullName").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    passport: document.getElementById("passport").value,
  };

  localStorage.setItem("passenger", JSON.stringify(passenger));
  window.location.href = "payment.html";
}

// Load payment summary
function loadPaymentSummary() {
  const summary = document.getElementById("bookingSummary");
  if (!summary) return;

  const flight = JSON.parse(localStorage.getItem("selectedFlight"));
  const passenger = JSON.parse(localStorage.getItem("passenger"));

  summary.innerHTML = `
    <h3>Booking Summary</h3>
    <p>Passenger: ${passenger.fullName} (${passenger.age}, ${passenger.gender})</p>
    <p>Passport: ${passenger.passport}</p>
    <p>Flight: ${flight.airline}, ${flight.time}</p>
    <p>Total Price: ₹${flight.price}</p>
  `;
}

// Save payment & go to confirmation
function handlePayment(event) {
  event.preventDefault();

  const method = document.getElementById("method").value;
  localStorage.setItem("paymentMethod", method);

  window.location.href = "confirmation.html";
}

// Load confirmation
function loadConfirmation() {
  const summary = document.getElementById("confirmationSummary");
  if (!summary) return;

  const flight = JSON.parse(localStorage.getItem("selectedFlight"));
  const passenger = JSON.parse(localStorage.getItem("passenger"));
  const payment = localStorage.getItem("paymentMethod");

  summary.innerHTML = `
    <h3>Passenger: ${passenger.fullName}</h3>
    <p>Flight: ${flight.airline}, ${flight.time}</p>
    <p>Price: ₹${flight.price}</p>
    <p>Payment Method: ${payment}</p>
  `;
}

// =======================
// Attach events per page
// =======================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("searchForm")) {
    document.getElementById("searchForm").addEventListener("submit", saveSearchData);
  }
  if (document.getElementById("flightsList")) loadFlights();
  if (document.getElementById("flightSummary")) {
    loadBookingSummary();
    document.getElementById("passengerForm").addEventListener("submit", savePassenger);
  }
  if (document.getElementById("bookingSummary")) {
    loadPaymentSummary();
    document.getElementById("paymentForm").addEventListener("submit", handlePayment);
  }
  if (document.getElementById("confirmationSummary")) loadConfirmation();
});
