import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { v4 as uuidv4 } from "uuid";

// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getDatabase,
  set,
  push,
  update,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// document.addEventListener('DOMContentLoaded', () => {

const firebaseConfig = {
  apiKey: "AIzaSyAcY9AbmunOKdOUjrTdxKnAnZ4IbWwG08I",
  authDomain: "cambrigde-9ded6.firebaseapp.com",
  databaseURL: "https://cambrigde-9ded6-default-rtdb.firebaseio.com",
  projectId: "cambrigde-9ded6",
  storageBucket: "cambrigde-9ded6.appspot.com",
  messagingSenderId: "643714636903",
  appId: "1:643714636903:web:496dfe41f59ffeddc0c8c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let addBtn = document.getElementById("add");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("newCustomerForm").style.display = "block";
});

let newCustomer = document.getElementById("addNewBtn");

newCustomer.addEventListener("click", (e) => {
  e.preventDefault();
  let fullName = document.getElementById("fullName").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let emailAddress = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let bmi = document.getElementById("bmi").value;
  let customerType = document.getElementById("customer").value;
  let location = document.getElementById("location").value;
  let camID = document.getElementById("camID").value;
  let products = JSON.parse(localStorage.getItem("products"));
  let dateInput = document.getElementById("pick-date").value;
  let date = Date.parse(document.getElementById("pick-date").value);
  let userID = uuid.v4();

  if (
    fullName == "" ||
    age == "" ||
    gender == "Gender" ||
    emailAddress == "" ||
    phone == "" ||
    weight == "" ||
    height == "" ||
    bmi == "" ||
    customerType == "Type" ||
    dateInput == ""
  ) {
    alert("Please, fill all fields to continue");
    return;
  }

  if (customerType == "consultant") {
    if (location == "" || camID == "") {
      alert(
        "You have selected Consultant, kindly fill the required fields to continue"
      );
      return;
    }
  }

  const db = getDatabase();

  const regDetails = {
    fullName: fullName,
    age,
    gender,
    email: emailAddress,
    phoneNumber: phone,
    weight,
    height,
    bmi,
    type: customerType,
  };

  const conDetails = {
    fullName: fullName,
    age,
    gender,
    email: emailAddress,
    phoneNumber: phone,
    weight,
    height,
    bmi,
    type: customerType,
    location,
    cambridgeID: camID,
  };

  if (customerType == "consultant") {
    set(ref(db, "consultant/" + `${userID}`), conDetails);
    set(ref(db, "products/" + `${userID}/${date}`), products);
  }
  if (customerType == "regular") {
    set(ref(db, "regular/" + `${userID}`), regDetails);
    set(ref(db, "products/" + `${userID}/${date}`), products);
  }
  //alert('ended here')
  localStorage.removeItem("products");
  alert("New Customer Information Saved");
  document.getElementById("fullName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("bmi").value = "";
  document.getElementById("newCustomerForm").style.display = "none";
});

const closeBtnThree = document.querySelector(".closeThree");

closeBtnThree.addEventListener("click", closeNewCustomerFormModal);

function closeNewCustomerFormModal() {
  document.getElementById("newCustomerForm").style.display = "none";
}

let customer = document.getElementById("customer");

customer.addEventListener("input", () => {
  let customerT = document.getElementById("customer").value;

  if (customerT == "consultant") {
    document.getElementById("consultantDetails").style.display = "flex";
  } else {
    document.getElementById("consultantDetails").style.display = "none";
  }
});

let updateBtn = document.getElementById("update");

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("customerPicker").style.display = "block";
});

const closeBtnFour = document.querySelector(".closeFour");

closeBtnFour.addEventListener("click", closeOldUpdateModal);

function closeOldUpdateModal() {
  document.getElementById("customerPicker").style.display = "none";
}

let pickCustomer = document.getElementById("pickCustomer");

pickCustomer.addEventListener("input", () => {
  let pickedCustomer = document.getElementById("pickCustomer").value;
  document.getElementById("searchForm").style.display = "block";
  const db = getDatabase();

  if (pickedCustomer == "consultant") {
    //  alert("consultant");
    const conRef = ref(db, "consultant");

    onValue(conRef, (snapshot) => {
      const consultantRef = snapshot.val();

      // console.log(consultantRef);
      let dataTb = document.getElementById("dataTb");
      dataTb.innerHTML = "";

      for (const key in consultantRef) {
        const consDB = consultantRef[key];
        // let dataTb = document.getElementById("dataTb");

        const {
          age,
          bmi,
          cambridgeID,
          email,
          fullName,
          gender,
          height,
          phoneNumber,
          type,
          weight,
        } = consDB;

        console.log(cambridgeID);
        console.log(bmi);

        let resultContent = `
           <tr>
           <td>${fullName}</td> 
           <td>${age}</td>
           <td>${gender}</td>
           <td>${email}</td>
           <td>${phoneNumber}</td>
           <td>${height}</td>
           <td>${weight}</td>
           <td>${bmi}</td>
           <td>${type}</td>
           <td>${cambridgeID}</td>
           <td>
           <button onclick="orderHistory('${key}')">Order History</button>
           </td>
           <td>
           <button onclick="editProfile('${key}','${type}')">Edit profile</button>
           </td>
           </tr> `;

        //  result.appendChild(resultContent);
        // result.innerHTML += resultContent;
        dataTb.innerHTML += resultContent;
      }
    });
  }

  if (pickedCustomer == "regular") {
    // alert("regular");
    const regRef = ref(db, "regular");

    onValue(regRef, (snapshot) => {
      const regularRef = snapshot.val();

      let dataTb = document.getElementById("dataTb");
      dataTb.innerHTML = "";
      for (const key in regularRef) {
        const regDB = regularRef[key];

        const {
          age,
          bmi,
          email,
          fullName,
          gender,
          height,
          phoneNumber,
          type,
          weight,
        } = regDB;

        // console.log(age);
        //console.log(bmi);

        let resultContent = `
           <tr>
           <td>${fullName}</td> 
           <td>${age}</td>
           <td>${gender}</td>
           <td>${email}</td>
           <td>${phoneNumber}</td>
           <td>${height}</td>
           <td>${weight}</td>
           <td>${bmi}</td>
           <td>${type}</td>    
           <td>-</td>  
           <td>
           <button onclick="orderHistory('${key}')">Order History</button>
           </td>
           <td>
           <button onclick="editProfile('${key}','${type}')">Edit profile</button>
           </td>
           </tr> `;

        dataTb.innerHTML += resultContent;
      }
    });
  }
});

window.orderHistory = (key) => {
  // document.getElementById("customerPicker").style.display = "none";
  window.present_key = key;
  const db = getDatabase();

  const orderRef = ref(db, "products/" + key);
  onValue(orderRef, (snapshot) => {
    const orderHistory = snapshot.val();
    var orderItems = document.getElementsByClassName("modal-body")[0];
    orderItems.innerHTML = "";
    for (const key in orderHistory) {
      const history = orderHistory[key];

      const date = parseInt(key);
      const dateOfPurchase = new Date(date);
      const purchaseDate = dateOfPurchase.toDateString();

      let purchaseheader = document.createElement("h4");
      purchaseheader.innerHTML = purchaseDate;
      orderItems.appendChild(purchaseheader);
      for (let i = 0; i < history.length; i++) {
        const element = history[i];
        var orderRow = document.createElement("div");
        var orderRowContents = `
                            <div>
                                 
                      <span class="cart-item-title">${element.productName}</span>
                      <span class="cart-quantity-input">${element.quantity}</span>
  </div>`;

        orderRow.innerHTML = orderRowContents;
        orderItems.appendChild(orderRow);
      }
    }
  });

  document.getElementsByClassName("orderDiv")[0].style.display = "block";
};

const closeBtnOne = document.querySelector(".closeOne");

closeBtnOne.addEventListener("click", closeHistoryModal);

function closeHistoryModal() {
  document.getElementsByClassName("orderDiv")[0].style.display = "none";
}

const newProBtn = document.getElementById("newPro");

newProBtn.addEventListener("click", openNewProductModal);

function openNewProductModal(e) {
  e.preventDefault();
  document.getElementById("newProContainer").style.display = "block";

  closeHistoryModal();
}

const closeBtnTwo = document.querySelector(".closeTwo");

closeBtnTwo.addEventListener("click", closeNewProductModal);

function closeNewProductModal() {
  document.getElementById("newProContainer").style.display = "none";
}

window.editProfile = (key, type) => {
  // document.getElementById("customerPicker").style.display = "none";

  window.present_profile = {
    key,
    type,
  };

  const db = getDatabase();
  if (type == "regular") {
    const editReg = ref(db, `${type}/${key}`);

    onValue(editReg, (snapshot) => {
      const editRegProfile = snapshot.val();

      const {
        age,
        bmi,
        email,
        fullName,
        gender,
        height,
        phoneNumber,
        type,
        weight,
      } = editRegProfile;

      console.log(gender);
      console.log(type);
      document.getElementById("fullNameEdit").value = fullName;
      document.getElementById("ageEdit").value = age;
      document.getElementById("emailEdit").value = email;
      document.getElementById("phoneEdit").value = phoneNumber;
      document.getElementById("weightEdit").value = weight;
      document.getElementById("heightEdit").value = height;
      document.getElementById("bmiEdit").value = bmi;
    });
  }
  if (type == "consultant") {
    const editCon = ref(db, `${type}/${key}`);
    // set(ref(db, "consultant/" + `${userID}`), conDetails);
    onValue(editCon, (snapshot) => {
      const editConProfile = snapshot.val();

      const {
        age,
        bmi,
        cambridgeID,
        email,
        fullName,
        gender,
        height,
        location,
        phoneNumber,
        type,
        weight,
      } = editConProfile;

      console.log(gender);
      console.log(type);
      console.log(cambridgeID);
      console.log(location);
      document.getElementById("fullNameEdit").value = fullName;
      document.getElementById("ageEdit").value = age;
      document.getElementById("emailEdit").value = email;
      document.getElementById("phoneEdit").value = phoneNumber;
      document.getElementById("weightEdit").value = weight;
      document.getElementById("heightEdit").value = height;
      document.getElementById("bmiEdit").value = bmi;
      document.getElementById('camIDCon').style.display = 'block'
      document.getElementById('camEdit').value = cambridgeID
    });
  } 
  else{
    document.getElementById('camIDCon').style.display = 'none'
  }

  document.getElementById("updateContainer").style.display = "block";
};

// function updProBtn() {

// }

let updProBtn = document.getElementById("updProBtn");

const updProfile = (e) => {
  e.preventDefault();
  const { key, type } = window.present_profile;
  let fullName = document.getElementById("fullNameEdit").value;
  let age = document.getElementById("ageEdit").value;
  let emailAddress = document.getElementById("emailEdit").value;
  let phone = document.getElementById("phoneEdit").value;
  let weight = document.getElementById("weightEdit").value;
  let height = document.getElementById("heightEdit").value;
  let bmi = document.getElementById("bmiEdit").value;
  let camID = document.getElementById('camEdit').value

  let details = {
    fullName: fullName,
    age,
    email: emailAddress,
    phoneNumber: phone,
    weight,
    height,
    bmi,
  }

  if(camID !== ''){
    details = {
      ...details,
      cambridgeID: camID
    }
  }

  const db = getDatabase();
  update(ref(db, `${type}/${key}`), details);
  document.getElementById("updateContainer").style.display = "none";
  // set(ref(db, "history/" + `${userId}/${orderId}`), historyCart);
  // alert('ended')
};

updProBtn.addEventListener("click", updProfile);

const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", closeModal);

function closeModal() {
  document.getElementById("updateContainer").style.display = "none";
}

let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInput = document.getElementById("searchInput").value;
  let searchValue = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
  // console.log(searchInput);
  // console.log(searchValue)

  let content = document.getElementsByTagName('tr');

  for (let j = 0; j < content.length; j++) {
    const contentName = content[j].getElementsByTagName("td");

    for (let k = 0; k < contentName.length; k++) {
      const element = contentName[k];

      let para = "Cannot find this name, please modify your search";

      let textValue = element.textContent || contentName.innerText;

      // if (textValue.indexOf(searchInput) > -1) {

      if (
        textValue.indexOf(searchValue) > -1 ||
        textValue.includes(searchInput)
      ) {
        document
          .getElementById("searchResult")
          .appendChild(element.parentElement);
      }
    }
  }
});

let productItems = document.getElementsByTagName("li");

for (let index = 0; index < productItems.length; index++) {
  const element = productItems[index];

  element.addEventListener("click", openQualityModal);
}

function openQualityModal(e) {
  document.getElementById("productQuantity").style.display = "block";
  document.getElementById("productQuantityOne").style.display = "block";
  document.getElementById("selectedProduct").value = e.target.innerText;
  document.getElementById("selectedProductOne").value = e.target.innerText;
}

let saveBtn = document.getElementById("saveProduct");

saveBtn.addEventListener("click", saveProductToLocalStorage);

function saveProductToLocalStorage(e) {
  e.preventDefault();
  let productInput = document.getElementById("selectedProduct").value;
  let quantityInput = document.getElementById("quantity").value;

  if (productInput == "" || quantityInput == "") {
    alert("please, fill fields to continue");
    return;
  }

  const productDetails = {
    productName: productInput,
    quantity: quantityInput,
  };

  const storedProduct = localStorage.getItem("products");

  const storageProducts = storedProduct ? JSON.parse(storedProduct) : [];

  storageProducts.push(productDetails);

  localStorage.setItem("products", JSON.stringify(storageProducts));

  const productsSoFar = JSON.parse(localStorage.getItem("products"));
  // console.log(productsSoFar);

  for (const key in productsSoFar) {
    const singleProduct = productsSoFar[key];

    let productsSoF = document.getElementsByClassName("productsSoFar")[0];

    const { productName, quantity } = singleProduct;

    let productsContent = `
   <p>Product Name: ${productName}</p>
   <p>Quantity Ordered: ${quantity}</p>
    `;

    productsSoF.innerHTML += productsContent;
  }
  document.getElementById("selectedProduct").value = "";
  document.getElementById("quantity").value = "";
}

let newSaveBtn = document.getElementById("saveNewProduct");

newSaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let productInput = document.getElementById("selectedProductOne").value;
  let quantityInput = document.getElementById("quantityOne").value;

  if (productInput == "" || quantityInput == "") {
    alert("please, fill fields to continue");
    return;
  }

  const newProductDetails = {
    productName: productInput,
    quantity: quantityInput,
  };

  const storedProduct = localStorage.getItem("newProducts");

  const storageProducts = storedProduct ? JSON.parse(storedProduct) : [];

  storageProducts.push(newProductDetails);

  localStorage.setItem("newProducts", JSON.stringify(storageProducts));

  const productsSoFar = JSON.parse(localStorage.getItem("newProducts"));
  // console.log(productsSoFar);

  for (const key in productsSoFar) {
    const singleProduct = productsSoFar[key];

    let productsSoF = document.getElementsByClassName("productsSoFar")[1];

    const { productName, quantity } = singleProduct;

    let productsContent = `
   <p>Product Name: ${productName}</p>
   <p>Quantity Ordered: ${quantity}</p>
    `;

    productsSoF.innerHTML += productsContent;
  }
  document.getElementById("selectedProductOne").value = "";
  document.getElementById("quantityOne").value = "";
});

let addNewProductsBtn = document.getElementById("addNewProductsBtn");

addNewProductsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // alert("ada");
  const db = getDatabase();
  // alert(window.present_key);
  let products = JSON.parse(localStorage.getItem("newProducts"));
  let date = Date.parse(document.getElementById("input").value);
  // console.log(date);

  set(ref(db, "products/" + `${window.present_key}/${date}`), products);

  alert("Successfully Saved");

  localStorage.removeItem("newProducts");
  closeNewProductModal();
});

// }) THIS IS FOR THE DOMLOADED EVENT LISTENER
