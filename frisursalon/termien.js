
const times = [
  "10:00", "10:30", "11:00",
  "11:30", "12:00", "12:30",
  "13:00", "13:30"
];

let selectedTime = null;
let selectedDate = null;

const timesContainer = document.getElementById("times");
const result = document.getElementById("result");
const dateInput = document.getElementById("date");

// Daten laden
function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || {};
}

// Daten speichern
function saveBookings(data) {
  localStorage.setItem("bookings", JSON.stringify(data));
}

function renderTimes() {
  timesContainer.innerHTML = "";

  const bookings = getBookings();
  const bookedTimes = bookings[selectedDate] || [];

  times.forEach(time => {
    const btn = document.createElement("button");
    btn.innerText = time;

    // wenn gebucht
    if (bookedTimes.includes(time)) {
      btn.classList.add("disabled");
      btn.innerText = time + " (gebucht)";
      btn.disabled = true;
    }

    btn.onclick = () => {
      selectedTime = time;

      document.querySelectorAll("#times button").forEach(b => {
        b.classList.remove("selected");
      });

      btn.classList.add("selected");
      result.innerText = "Gewählt: " + selectedDate + " um " + selectedTime;
    };

    timesContainer.appendChild(btn);
  });
}

// Termin speichern
function bookAppointment() {
  if (!selectedDate || !selectedTime) {
    alert("Bitte Datum und Uhrzeit wählen");
    return;
  }

  const bookings = getBookings();

  if (!bookings[selectedDate]) {
    bookings[selectedDate] = [];
  }

  bookings[selectedDate].push(selectedTime);

  saveBookings(bookings);

  alert("Termin gebucht!");
  renderTimes();
}

// Datum ändern
dateInput.addEventListener("change", (e) => {
  selectedDate = e.target.value;
  selectedTime = null;
  result.innerText = "";
  renderTimes();
});



const today = new Date().toISOString().split("T")[0];
dateInput.value = today;
selectedDate = today;
renderTimes();


const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const email = document.getElementById("email").value;
const service = document.getElementById("service").value;

const gender = document.querySelector('input[name="gender"]:checked')?.value;


emailjs.init("DEIN_PUBLIC_KEY");
