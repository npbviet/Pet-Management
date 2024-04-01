"use strict";

//1.Gọi hàm
const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const breedArr = getFromStorage("breedList");
const tableBodyBreed = document.querySelector("tbody");
//2.Hàm bổ sung
//2.1.Hàm hiển thị danh sách
function renderTableData(breedArr) {
  tableBodyBreed.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const data = breedArr[i];
    const row = document.createElement("tr");
    row.innerHTML = `<tr>
            <th scope="row">${breedArr.indexOf(data) + 1}</th>
            <td>${data.breed}</td>
            <td>${data.type}</td>
            <td>
              <button type="button" class="btn btn-danger" onclick="deleteItem(${i})">Delete</button>
            </td>
          </tr>`;
    tableBodyBreed.appendChild(row);
  }
}

//2.2. Hàm xóa input
const clearInput = () => {
  breedInput.value = "";
  typeInput.value = "Select Type";
};
//2.3. Hàm valid
const validData = (data) => {
  if (data.breed === "") {
    alert("Please select Breed!");
    return false;
  } else if (data.type !== "Cat" && data.type !== "Dog") {
    alert("Please select Type!");
    return false;
  } else return true;
};
//2.4. Hàm lưu dữ liệu
const storeBreed = () => saveToStorage("breedList", JSON.stringify(breedArr));

//3. Bắt đầu sự kiện
submitBtn.addEventListener("click", function () {
  //3.1. Lấy thông tin
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  //3.2. Valid thông tin
  const valid = validData(data);

  //3.3.Add thông tin vào mảng
  if (valid) {
    breedArr.push(data);
    storeBreed();
    renderTableData(breedArr);
    clearInput();
  }
  console.log(breedArr);
});

const deleteItem = (index) => {
  if (confirm("Are you sure?")) {
    breedArr.splice(index, 1);
    storeBreed();
    renderTableData(breedArr);
  }
};

//Hiện thông tin đã lưu
renderTableData(breedArr);
