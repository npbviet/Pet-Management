"use strict";

//1. Gọi hàm
const importBtn = document.querySelector("#import-btn");
const exportBtn = document.querySelector("#export-btn");
const petArr = getFromStorage("petArr");

//2. Hàm export + event export
function saveStaticDataToFile(petArr) {
  const blob = new Blob([JSON.stringify(petArr)], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, "pets.txt");
}

exportBtn.addEventListener("click", () => {
  saveStaticDataToFile(petArr);
});

//3. Event import
importBtn.addEventListener("click", () => {
  const file = document.getElementById("input-file").files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      saveToStorage(keyPetArray, evt.target.result);
      alert("Pet data has been imported");
    };
    reader.onerror = function (evt) {
      alert("error reading file");
    };
  } else {
    alert("Input empty");
  }
});
