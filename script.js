let currentYear = 2026;
let currentMonth = 10; // months start at 0, so 10 means November
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdaysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let selectedMonth = null;
let selectedDay = null;
const birthdays = JSON.parse(localStorage.getItem("birthdays")) || [];

function showMonth() {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  console.log(firstDay, daysInMonth);

  document.getElementById("daysGrid").textContent = "";

  document.getElementById("monthTitle").textContent =
    `${monthNames[currentMonth]} ${currentYear}`;

  for (let i = 0; i < firstDay; i++) {
    const item = document.createElement("div");
    item.textContent = "";
    document.getElementById("daysGrid").appendChild(item);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const item = document.createElement("div");
    item.textContent = i;

    const birthdayList = birthdays.filter(
      (birthday) => birthday.month === currentMonth && birthday.day === i,
    );

    item.addEventListener("click", () => {
      selectedMonth = currentMonth;
      selectedDay = i;
      document.getElementById("popupTitle").textContent =
        `Add Birthday - ${monthNames[currentMonth]} ${i}, ${currentYear}`;
      document.getElementById("popupOverlay").classList.remove("hidden");

      document.getElementById("birthdayList").textContent = "";
      for (const birthday of birthdayList) {
        const birthdayItem = document.createElement("div");
        birthdayItem.textContent = `${birthday.name} - ${birthday.time}`;
        document.getElementById("birthdayList").appendChild(birthdayItem);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        birthdayItem.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
          const index = birthdays.findIndex(
            (b) =>
              b.month === birthday.month &&
              b.day === birthday.day &&
              b.name === birthday.name &&
              b.time === birthday.time,
          );
          if (index !== -1) {
            birthdays.splice(index, 1);
            localStorage.setItem("birthdays", JSON.stringify(birthdays));
          }
          showMonth();
          document.getElementById("popupOverlay").classList.add("hidden");
        });
      }
    });

    for (const birthday of birthdayList) {
      const birthdayItem = document.createElement("div");
      birthdayItem.textContent = `${birthday.name} - ${birthday.time}`;
      item.appendChild(birthdayItem);
    }

    document.getElementById("daysGrid").appendChild(item);
  }
}
showMonth();

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  showMonth();
}

function prevMonth() {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  showMonth();
}

function showWeekdays() {
  for (const weekdays of weekdaysNames) {
    const item = document.createElement("div"); // make a new empty div
    item.textContent = weekdays; // put the weekday names in the div
    document.getElementById("weekdays").appendChild(item); // add the div to the page.
  }
}
showWeekdays();

const prevButton = document.getElementById("prevBtn");
prevButton.addEventListener("click", prevMonth);

const nextButton = document.getElementById("nextBtn");
nextButton.addEventListener("click", nextMonth);

const closeButton = document.getElementById("closeBtn");
closeButton.addEventListener("click", () => {
  document.getElementById("popupOverlay").classList.add("hidden");
});

const saveButton = document.getElementById("saveBtn");

saveButton.addEventListener("click", () => {
  const nameValue = document.getElementById("nameValue").value;
  const timeValue = document.getElementById("timeValue").value;

  if (nameValue && timeValue) {
    birthdays.push({
      month: selectedMonth,
      day: selectedDay,
      name: nameValue,
      time: timeValue,
    });

    localStorage.setItem("birthdays", JSON.stringify(birthdays));

    showMonth();

    console.log(birthdays);

    document.getElementById("popupOverlay").classList.add("hidden");
    document.getElementById("nameValue").value = "";
    document.getElementById("timeValue").value = "";
  }
});
