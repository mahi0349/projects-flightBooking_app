// Simulated flight database (for demo)
const flightData = [
  { airline: "Air India", from: "Delhi", to: "Mumbai", time: "10:00 AM", price: 5000 },
  { airline: "IndiGo", from: "Delhi", to: "Mumbai", time: "02:30 PM", price: 4500 },
  { airline: "Vistara", from: "Delhi", to: "Mumbai", time: "06:45 PM", price: 5500 },
  { airline: "SpiceJet", from: "Delhi", to: "Mumbai", time: "09:00 PM", price: 4000 },
  { airline: "Air India", from: "Mumbai", to: "Goa", time: "11:15 AM", price: 3500 },
];

// Function to get URL parameters
function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split("&");

  for (let pair of pairs) {
    let [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value.replace(/\+/g, " "));
  }
  return params;
}

// Display flights based on search
function displayFlights() {
  const { from, to } = getQueryParams();
  const flightsList = document.getElementById("flightsList");

  const results = flightData.filter(
    (flight) =>
      flight.from.toLowerCase() === from.toLowerCase() &&
      flight.to.toLowerCase() === to.toLowerCase()
  );

  if (results.length === 0) {
    flightsList.innerHTML = `<p>No flights found for ${from} → ${to}</p>`;
    return;
  }

  results.forEach((flight, index) => {
    const flightCard = document.createElement("div");
    flightCard.classList.add("flight-card");
    flightCard.innerHTML = `
      <h3>${flight.airline}</h3>
      <p><strong>Route:</strong> ${flight.from} → ${flight.to}</p>
      <p><strong>Time:</strong> ${flight.time}</p>
      <p><strong>Price:</strong> ₹${flight.price}</p>
      <button class="btn" onclick="bookFlight(${index})">Book Now</button>
    `;
    flightsList.appendChild(flightCard);
  });
}

// Save selected flight and redirect
function bookFlight(index) {
  localStorage.setItem("selectedFlight", JSON.stringify(flightData[index]));
  window.location.href = "booking.html";
}

// Run function on page load
window.onload = displayFlights;
