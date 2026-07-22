// ===============================
// Medical Certificate Generator
// Version 2.0
// ===============================

// Input Fields

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const dateInput = document.getElementById("date");

const bpInput = document.getElementById("bp");
const pulseInput = document.getElementById("pulse");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const remarksInput = document.getElementById("remarks");


// Preview Fields

const previewName = document.getElementById("previewName");
const previewAge = document.getElementById("previewAge");
const previewGender = document.getElementById("previewGender");
const previewDate = document.getElementById("previewDate");

const previewBP = document.getElementById("previewBP");
const previewPulse = document.getElementById("previewPulse");
const previewHeight = document.getElementById("previewHeight");
const previewWeight = document.getElementById("previewWeight");

const previewRemarks = document.getElementById("previewRemarks");


// Buttons

const previewBtn = document.getElementById("previewBtn");
const pdfBtn = document.getElementById("pdfBtn");
const printBtn = document.getElementById("printBtn");
const resetBtn = document.getElementById("resetBtn");

const statusText = document.getElementById("statusText");
const toast = document.getElementById("toast");


// ===============================
// Auto Date
// ===============================

window.onload = function () {

    const today = new Date();

    dateInput.value = today.toISOString().split("T")[0];

    updatePreview();

};


// ===============================
// Live Preview
// ===============================

function updatePreview() {

    previewName.textContent = nameInput.value;

    previewAge.textContent =
        ageInput.value ? ageInput.value + " Yrs" : "";

    previewGender.textContent = genderInput.value;

    previewDate.textContent = dateInput.value;

    previewBP.textContent =
        bpInput.value ? bpInput.value + " mmHg" : "";

    previewPulse.textContent =
        pulseInput.value ? pulseInput.value + " bpm" : "";

    previewHeight.textContent =
        heightInput.value ? heightInput.value + " cm" : "";

    previewWeight.textContent =
        weightInput.value ? weightInput.value + " kg" : "";

    previewRemarks.textContent = remarksInput.value;

}
// ===============================
// Live Typing Preview
// ===============================

nameInput.addEventListener("input", updatePreview);
ageInput.addEventListener("input", updatePreview);
genderInput.addEventListener("change", updatePreview);
dateInput.addEventListener("change", updatePreview);

bpInput.addEventListener("input", updatePreview);
pulseInput.addEventListener("input", updatePreview);
heightInput.addEventListener("input", updatePreview);
weightInput.addEventListener("input", updatePreview);

remarksInput.addEventListener("input", updatePreview);


// ===============================
// Preview Button
// ===============================

previewBtn.addEventListener("click", function () {

    updatePreview();

    statusText.textContent = "Preview Updated";

    showToast("Preview Updated Successfully");

});


// ===============================
// Reset Button
// ===============================

resetBtn.addEventListener("click", function () {

    if (!confirm("Do you want to reset all fields?")) {
        return;
    }

    nameInput.value = "";
    ageInput.value = "";
    genderInput.value = "";
    bpInput.value = "";
    pulseInput.value = "";
    heightInput.value = "";
    weightInput.value = "";
    remarksInput.value = "";

    // Today's Date
    const today = new Date();
    dateInput.value = today.toISOString().split("T")[0];

    updatePreview();

    statusText.textContent = "Form Reset";

    showToast("Form Reset Successfully");

});


// ===============================
// Validation
// ===============================

function validateForm() {

    if (nameInput.value.trim() === "") {

        alert("Please enter Patient Name.");

        nameInput.focus();

        return false;

    }

    return true;

}


// ===============================
// Toast Message
// ===============================

function showToast(message) {

    toast.innerHTML = message;

    toast.style.display = "block";

    setTimeout(function () {

        toast.style.display = "none";

    }, 2500);

}
// ===============================
// Print
// ===============================

printBtn.addEventListener("click", function () {

    if (!validateForm()) return;

    updatePreview();

    statusText.textContent = "Printing...";

    showToast("Preparing Print");

    setTimeout(function () {
        window.print();
    }, 500);

});


// ===============================
// Download PDF
// ===============================

pdfBtn.addEventListener("click", async function () {

    if (!validateForm()) return;

    updatePreview();

    statusText.textContent = "Generating PDF...";

    showToast("Generating PDF");

    const certificate = document.getElementById("certificate");

    const canvas = await html2canvas(certificate, {

        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff"

    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;

    const pdfHeight = canvas.height * pdfWidth / canvas.width;

    pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdfWidth,
        pdfHeight
    );

    pdf.save("Medical_Certificate.pdf");

    statusText.textContent = "PDF Downloaded";

    showToast("PDF Download Successful");

});


// ===============================
// Keyboard Shortcuts
// ===============================

document.addEventListener("keydown", function (e) {

    // Ctrl + P
    if (e.ctrlKey && e.key === "p") {

        e.preventDefault();

        printBtn.click();

    }

    // Ctrl + S
    if (e.ctrlKey && e.key === "s") {

        e.preventDefault();

        pdfBtn.click();

    }

});


// ===============================
// Initial Preview
// ===============================

updatePreview();

statusText.textContent = "Ready";

console.log("Medical Certificate Generator Pro v2 Loaded");
