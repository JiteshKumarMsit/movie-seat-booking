const seatContainer = document.getElementById('seat-container');
const movieSelect = document.getElementById('movie');
const timeSelect = document.getElementById('time');
const count = document.getElementById('count');
const total = document.getElementById('total');
const payBtn = document.getElementById('payBtn');
const dateDisplay = document.getElementById('date');

// Display current date
const today = new Date().toLocaleDateString();
dateDisplay.innerText = `Today: ${today}`;

let ticketPrice = +movieSelect.value;

// Setup 6 rows × 8 seats = 48 seats with labels A1–F8
const rows = 6;
const cols = 8;
const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

for (let row = 0; row < rows; row++) {
  for (let col = 1; col <= cols; col++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');

    const seatNumber = rowLabels[row] + col;
    seat.setAttribute('data-seat', seatNumber);
    seat.innerText = seatNumber;

    if (Math.random() < 0.2) {
      seat.classList.add('occupied');
    }

    seatContainer.appendChild(seat);
  }
}

// Initial total
count.innerText = 0;
total.innerText = 0;

// Update seat count & total
function updateSelectedCount() {
  const selectedSeats = seatContainer.querySelectorAll('.seat.selected');
  const selectedCount = selectedSeats.length;

  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}

// Seat selection
seatContainer.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Movie change
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Fake payment
payBtn.addEventListener('click', () => {
  const selectedSeats = seatContainer.querySelectorAll('.seat.selected');
  const seatCount = selectedSeats.length;
  const selectedTime = timeSelect.value;
  const selectedMovie = movieSelect.options[movieSelect.selectedIndex].text;
  const seatNumbers = Array.from(selectedSeats).map(seat => seat.getAttribute('data-seat')).join(', ');
  const amount = seatCount * ticketPrice;

  if (seatCount === 0) {
    alert("Please select at least one seat.");
    return;
  }

  const confirmPay = confirm(
    `Movie: ${selectedMovie}\nTime: ${selectedTime}\nSeats: ${seatNumbers}\nTotal: ₹${amount}\n\nProceed with payment?`
  );

  if (confirmPay) {
    alert(`✅ Payment Successful!\n🎟️ Seats Booked: ${seatNumbers} at ${selectedTime}`);
    selectedSeats.forEach(seat => {
      seat.classList.remove('selected');
      seat.classList.add('occupied');
    });
    updateSelectedCount();
  }
});
