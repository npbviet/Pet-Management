"use strict";

//Lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//Lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key) ?? "[]");
}
