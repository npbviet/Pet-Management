"use strict";

//1.Select hàm
const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const namePetInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const table = document.querySelector(".table");
const petArr = getFromStorage("petArr");
const tableBodyEl = document.querySelector("tbody");
const petBreed = getFromStorage("breedList");

//2.Hàm bổ sung
//2.1.Hàm hiển thị danh sách thú
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const data = petArr[i];
    const row = document.createElement("tr");
    row.innerHTML = `<tr>
        <th scope="row">${data.id}</th>
        <td>${data.namePet}</td>
        <td>${data.age}</td>
        <td>${data.type}</td>
        <td>${data.weight} kg</td>
        <td>${data.length} cm</td>
        <td>${data.breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${data.color}"></i>
        </td>
        <td><i class="${
          data.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td><i class="${
          data.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td><i class="${
          data.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td>${new Date(data.date).toLocaleDateString("en-GB")}</td>
      </tr>`;
    tableBodyEl.appendChild(row);
  }
}

//2.2.Hàm unhidden table
const removeHidden = () => table.classList.remove("hidden");

//2.3.Hàm lưu dữ liệu
const storePet = () => saveToStorage("petArr", JSON.stringify(petArr));

//2.4.Hàm hiển thị Breed
function renderBreed(breedArr) {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  for (let i = 0; i < breedArr.length; i++) {
    breedInput.innerHTML += `<option value = "${petBreed[i].breed}">${petBreed[i].breed}</option>`;
  }
}

//2.5.Hàm xóa input
const clearInput = () => {
  idInput.value = "";
  namePetInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//3.Bắt đầu sự kiện
renderBreed(petBreed);

findBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    namePet: namePetInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  let petFind = petArr;

  petFind = petFind.filter((item) => item.id.includes(data.id));
  petFind = petFind.filter((item) => item.namePet.includes(data.namePet));
  if (data.type != "Select Type") {
    petFind = petFind.filter((item) => item.type.includes(data.type));
  }
  if (data.breed != "Select Breed") {
    petFind = petFind.filter((item) => item.breed.includes(data.breed));
  }
  if (data.vaccinated == true) {
    petFind = petFind.filter((item) => item.vaccinated == true);
  }
  if (data.dewormed == true) {
    petFind = petFind.filter((item) => item.dewormed == true);
  }
  if (data.sterilized == true) {
    petFind = petFind.filter((item) => item.sterilized == true);
  }

  renderTableData(petFind);
  removeHidden();
  clearInput();
});
