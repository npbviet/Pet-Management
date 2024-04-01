"use strict";
//A. ASM1 + các bổ sung
//1.Select hàm
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.querySelector("tbody");
const showHealthyBtn = document.querySelector("#healthy-btn");
const showBMIBtn = document.querySelector("#BMI-btn");

const petBreed = getFromStorage("breedList");

const petArr = getFromStorage("petArr");
let healthyPetArr = [];

//2.Hàm bổ sung
//2.1.Hàm hiển thị danh sách thú (Phần 5)
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
        <td>${data.bmi}</td>
        <td>${new Date(data.date).toLocaleDateString("en-GB")}</td>
        <td>
          <button class="btn btn-danger editBtn" onclick="deletePet('${
            data.id
          }')">Delete</button>
        </td>
      </tr>`;
    tableBodyEl.appendChild(row);
  }
}
//2.2.Hàm xóa input 
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//2.3.Hàm check pet healthy (Phần 8)
function healthyCheck(pet) {
  if (
    pet.vaccinated == true &&
    pet.dewormed == true &&
    pet.sterilized == true
  ) {
    return true;
  }

  return false;
}

//2.4.Hàm tính BMI (Phần 9)
function calBMI() {
  let BMI;
  for (let i = 0; i < petArr.length; i++) {
    let data = petArr[i];
    if (data.type == "Dog") {
      BMI = Number((data.weight * 703) / data.length ** 2).toFixed(2);
      petArr[i].bmi = BMI;
    } else {
      BMI = Number((data.weight * 886) / data.length ** 2).toFixed(2);
      petArr[i].bmi = BMI;
    }
  }
  showHealthyBtn.textContent = "Show Healthy Pet";
  renderTableData(petArr);
}
//2.5.Hàm lưu dữ liệu
const storePet = () => saveToStorage("petArr", JSON.stringify(petArr));

//2.6.Hàm hiển thị Breed
function renderBreed(breedArr) {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedArr[i].breed}</option>`;
    breedInput.appendChild(option);
  }
}

//3.Bắt đầu sự kiện
submitBtn.addEventListener("click", function () {
  console.log("test");
  //3.1.Lấy thông tin (phần 2)
  const data = {
    id: idInput.value,
    namePet: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    bmi: "?",
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //3.2.Valid thông tin (Phần 3)
  let valid = true;
  const checkExist = petArr.some((p) => p.id === data.id);
  if (checkExist === true) {
    alert("ID must be unique!");
    valid = false;
    return;
  }

  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    valid = false;
    return;
  }

  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    valid = false;
    return;
  }

  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    valid = false;
    return;
  }

  if (data.type !== "Cat" && data.type !== "Dog") {
    alert("Please select Type!");
    valid = false;
    return;
  }

  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    valid = false;
    return;
  }

  //3.3.Add thông tin vào mảng (Phần 4)
  if (valid) {
    petArr.push(data);
    renderTableData(petArr);
    clearInput();
  }
  console.log(petArr);

  // Phần asm2
  storePet();
});

//4.Delete pet
const deletePet = (petId) => {
  if (confirm("Are you sure?")) {
    let index = petArr.findIndex((pet) => pet.id === petId);
    petArr.splice(index, 1);
    storePet();
    renderTableData(petArr);
  }
};

//5.Show Healthy Pet
showHealthyBtn.addEventListener("click", function () {
  console.log(showHealthyBtn.textContent);
  if (showHealthyBtn.textContent.trim() == "Show Healthy Pet") {
    showHealthyBtn.textContent = "Show All Pet";
    healthyPetArr = petArr.filter(healthyCheck);
    renderTableData(healthyPetArr);
  } else {
    showHealthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
});

//6.BMI
showBMIBtn.addEventListener("click", calBMI);

// ______________________________________________________________________________

//B.Các yêu cầu (ASM2)

//1.Quản lý Breed - Lọc breed
typeInput.addEventListener("change", function () {
  let optionPet = petBreed.filter(function (item) {
    return typeInput.value === item.type;
  });
  console.log(optionPet);
  renderBreed(optionPet);
});

//Hiện thông tin đã lưu
renderTableData(petArr);
