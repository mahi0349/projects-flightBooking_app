function loadConfirmation(){
  const flight = JSON.phase(localStorage.getitem("selectedFlight"));
  const passenger = JSON.phase(localStorage.getItem("passengerDetails"));
  const payment = JSON.phase(localStorage.getItem("paymentDetails"));
  const summaryDiv = document .getElementById("confrimationSummery"); 
  if (!flight || !passenger || !payment  ){
    summaryDiv.innerHTML = "<p>Booking data mising. Please provoide your details for the flight and try again.</p>";
    return;
  }


  summaryDiv.innerHTML = `
    <h3>Flight details</h3>
    <p><strong>Airlinr:</strong>${flight.airline}</p>
    <p><strong>Route:</strong>${flight.from}-> ${flight.to}</p>
    <p><strong>Time:</strong>${flight.time}</p>
    <p><strong>price:</strong>₹${flight.price}</p>


    <h3>Pssenger Deatils</h3>   
    <p><strong>Name:</strong>${passenger.name}</p>
    <p><strong>Age:</strong>${passenger.age}</p>
    <p><strong>Gender:</strong>${passenger.gender}</p>
    <p><strong>Passport:</strong>${passenger.passport}</p>

    
    <h3>Payment</h3>
    <p><strong>Payment:</strong> ✅ ${payment}</p>
    `;

  //clear everthing after the booking is complete
  localStorage.removeItem("selectedFlight");
  localStorage.removeItem("passengerDetails");
  localStorage.removeItem("paymentStatus");



}

window.onload = loadConfirmation;