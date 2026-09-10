import { initialBlocks } from "../data/blocks.js";

const savedData = localStorage.getItem("cadenceBlocks");

let blocks = savedData ? JSON.parse(savedData) : initialBlocks;

function saveBlockToStorage(blocksArray) {
  localStorage.setItem("cadenceBlocks", JSON.stringify(blocksArray));
}

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const blockForm = document.querySelector("#block-form");

blockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = capitalizeWords(document.querySelector("#task-title").value.trim());
  const day = document.querySelector("#task-day").value;
  const time = document.querySelector("#task-time").value.trim().toUpperCase();  

  const newBlock = {
    id: Date.now(),
    title,
    day,
    time,
    completed: false
  }

  blocks.push(newBlock);
  saveBlockToStorage(blocks);
  renderBlocks();
  closeModal(); 
});

// Converts "6:30 PM" or "10:00 AM" into total minutes from midnight for easy sorting
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;

  // Split string into time part and meridian (AM/PM)
  const parts = timeStr.trim().split(" ");
  if (parts.length < 2) return 0;

  const [time, modifier] = parts;
  let [hours, minutes] = time.split(":").map(Number);

  if (isNaN(hours)) hours = 0;
  if (isNaN(minutes)) minutes = 0;

  // Convert 12-hour format to 24-hour minutes
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

const plannerGrid = document.querySelector("#planner-grid");

plannerGrid.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const blockId = Number(event.target.dataset.id);
    blocks = blocks.filter((block) => block.id !== blockId);
    saveBlockToStorage(blocks);
    renderBlocks();
  }

if (event.target.classList.contains("complete-btn")) {
    const blockId = Number(event.target.dataset.id);
    
    blocks = blocks.map((block) => {
      if (block.id === blockId) {
        return { ...block, completed: !block.completed };
      }
      return block;
    });

    saveBlockToStorage(blocks);
    renderBlocks();
  }
});


function renderBlocks() { 
  const dayColumns = document.querySelectorAll(".day-column");

  // 1. Clear all containers first (same as before)
  dayColumns.forEach((column) => {
    const container = column.querySelector(".blocks-container");
    container.innerHTML = "";
  });

  // 2. Create a sorted copy of blocks before rendering
  const sortedBlocks = [...blocks].sort((a, b) => {
    return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
  });

  // 3. Loop through sortedBlocks instead of blocks
  sortedBlocks.forEach((block) => {
    dayColumns.forEach((column) => {
      const dayHeader = column.querySelector(".day-header").textContent;
      if (dayHeader === block.day) {
        const container = column.querySelector(".blocks-container");
        container.innerHTML += `
          <div class="block-container ${block.completed ? "completed" : ""}">
            <strong>${block.time}</strong>
            <p>${block.title}</p>
            <div class="block-actions">
              <button class="complete-btn" data-id="${block.id}">✓</button>
              <button class="delete-btn" data-id="${block.id}">delete</button>
            </div>
          </div>
        `;
      }
    });
  });
}



// 1. Select the modal and its control buttons
const modalOverlay = document.querySelector("#modal-overlay");
const openModalBtn = document.querySelector("#open-modal-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");

// 2. Helper functions to toggle visibility
function openModal() {
  modalOverlay.classList.remove("hidden");
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  blockForm.reset();
}

// 3. Listen for clicks to open and close
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

// 4. Close modal if user clicks outside the inner box
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// 1. Select the page containers
const landingPage = document.querySelector("#landing-page");
const appPage = document.querySelector("#app-page");

// 2. Select the navigation buttons
const heroGetStartedBtn = document.querySelector("#hero-get-started-btn");
const navGetStartedBtn = document.querySelector("#nav-get-started-btn");
const backToLandingBtn = document.querySelector("#back-to-landing-btn");

// 3. Navigation Functions
function showAppPage() {
  landingPage.classList.add("hidden");
  appPage.classList.remove("hidden");
}

function showLandingPage() {
  appPage.classList.add("hidden");
  landingPage.classList.remove("hidden");
}

// 4. Attach Click Event Listeners
heroGetStartedBtn.addEventListener("click", showAppPage);
navGetStartedBtn.addEventListener("click", showAppPage);
backToLandingBtn.addEventListener("click", showLandingPage);

renderBlocks();
