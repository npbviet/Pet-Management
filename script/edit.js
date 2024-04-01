"use strict";

//A.Setting
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

const main = document.getElementById("main");
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
        <td>
          <button class="btn btn-warning" onclick="startEditPet('${
            data.id
          }')">Edit</button>
        </td>
      </tr>`;
    tableBodyEl.appendChild(row);
  }
}

//2.2.Hàm hidden/unhidden main
const toggleHidden = () => main.classList.toggle("hidden");

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

//2.6.Hàm lấy giữ liệu thú cưng muốn chỉnh sửa (Lỗi edit breed)
function startEditPet(petId) {
  let index = petArr.findIndex((pet) => pet.id === petId);
  let optionPet = petBreed.filter(function (item) {
    if (typeInput.value === "Dog") return item.type === "Dog";
    if (typeInput.value === "Cat") return item.type === "Cat";
    else return [];
  });
  renderBreed(optionPet);

  idInput.value = petArr[index].id;
  nameInput.value = petArr[index].namePet;
  ageInput.value = petArr[index].age;
  typeInput.value = petArr[index].type;
  weightInput.value = petArr[index].weight;
  lengthInput.value = petArr[index].length;
  colorInput.value = petArr[index].color;
  vaccinatedInput.checked = petArr[index].vaccinated;
  dewormedInput.checked = petArr[index].dewormed;
  sterilizedInput.checked = petArr[index].sterilized;

  breedInput.value = petArr[index].breed;

  toggleHidden();
}

//B.Bắt đầu sự kiện
//1.Khởi động trang web
toggleHidden();
renderTableData(petArr);

//2.Quản lý Breed - Lọc breed
typeInput.addEventListener("change", function () {
  let optionPet = petBreed.filter(function (item) {
    if (typeInput.value === "Dog") return item.type === "Dog";
    if (typeInput.value === "Cat") return item.type === "Cat";
    else return [];
  });
  renderBreed(optionPet);
});

//3.Bắt đầu sự kiện
submitBtn.addEventListener("click", function () {
  //3.1.Lấy thông tin
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
    const index = petArr.findIndex((pet) => pet.id === data.id);
    petArr[index] = data;
    renderTableData(petArr);
    clearInput();
  }
  console.log(petArr);
  toggleHidden();
  storePet();
});
