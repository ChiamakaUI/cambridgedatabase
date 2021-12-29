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
  alert('New Customer Information Saved')
  document.getElementById("fullName").value = '';
  document.getElementById("age").value = '';
  document.getElementById("email").value = '';
  document.getElementById("phone").value = '';
  document.getElementById("weight").value = '';
  document.getElementById("height").value = '';
  document.getElementById("bmi").value = '';
  document.getElementById("newCustomerForm").style.display = "none";
});

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

      console.log(consultantRef);

      for (const key in consultantRef) {
        console.log(key);
        const consDB = consultantRef[key];
        console.log(consDB);
        let result = document.getElementsByClassName("result")[0];

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
        } = consDB;

        console.log(age);
        console.log(bmi);

        let resultContent = `
           <div class='content'>
           <h3>${fullName}</h3> 
           <p>${age}</p>
           <p>${gender}</p>
           <p>${email}</p>
           <p>${phoneNumber}</p>
           <p>${height}</p>
           <p>${weight}</p>
           <p>${bmi}</p>
           <p>${type}</p>
           <button onclick="orderHistory('${key}')">Order History</button>
           <button onclick="editProfile('${key}','${type}')">Edit profile</button>
           </div> `;

        //  result.appendChild(resultContent);
        result.innerHTML += resultContent;
      }
    });
  }

  if (pickedCustomer == "regular") {
   // alert("regular");
    const regRef = ref(db, "regular");

    onValue(regRef, (snapshot) => {
      const regularRef = snapshot.val();

      console.log(regularRef);
      for (const key in regularRef) {
        console.log(key);
        const regDB = regularRef[key];
        console.log(regDB);
        let result = document.getElementsByClassName("result")[0];

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
           <div class='content'>
           <h3>${fullName}</h3> 
           <p>${age}</p>
           <p>${gender}</p>
           <p>${email}</p>
           <p>${phoneNumber}</p>
           <p>${height}</p>
           <p>${weight}</p>
           <p>${bmi}</p>
           <p>${type}</p>    
           <button onclick="orderHistory('${key}')">Order History</button>
           <button onclick="editProfile('${key}','${type}')">Edit profile</button>
           </div> `;

        //  result.appendChild(resultContent);
        result.innerHTML += resultContent;
      }
    });
  }
});

window.orderHistory = (key) => {
  //e.preventDefault();
  console.log("heyy");
  console.log(key);
  window.present_key = key
  const db = getDatabase();

  const orderRef = ref(db, "products/" + key);
  console.log(orderRef);
  onValue(orderRef, (snapshot) => {
    const orderHistory = snapshot.val();
    console.log(orderHistory);
    //localStorage.setItem("Address", customerAddress);
    for (const key in orderHistory) {
      const history = orderHistory[key];
      console.log(key);
      //  console.log(key.toDateString());
      for (let i = 0; i < history.length; i++) {
        const element = history[i];
        console.log(element);
        // var orderItems = document.getElementsByClassName("orderDiv")[0];
        var orderItems = document.getElementsByClassName("modal-body")[0];
        var orderRow = document.createElement("div");
        var orderRowContents = `
                            <div>
                                 <h4>${key}</h4>
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

newProBtn.addEventListener('click', openNewProductModal)

function openNewProductModal(e) {
  e.preventDefault()
  document.getElementById("newProContainer").style.display = 'block';

  closeHistoryModal();
}

const closeBtnTwo = document.querySelector(".closeTwo");

closeBtnTwo.addEventListener('click', closeNewProductModal)

function closeNewProductModal() {
  document.getElementById("newProContainer").style.display = 'none';
}

window.editProfile = (key, type) => {
  console.log("heyyyo");
  console.log(key);
  console.log(type);
  window.present_profile = {
    key,
    type
  }

  const db = getDatabase();
  if (type == "regular") {
    // alert('type is' + type)
    const editReg = ref(db, `${type}/${key}`);
    console.log(editReg);
    // set(ref(db, "consultant/" + `${userID}`), conDetails);
    onValue(editReg, (snapshot) => {
      const editRegProfile = snapshot.val();
      console.log(editRegProfile);

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
    // alert('type is' + type)
    const editCon = ref(db, `${type}/${key}`);
    console.log(editCon);
    // set(ref(db, "consultant/" + `${userID}`), conDetails);
    onValue(editCon, (snapshot) => {
      const editConProfile = snapshot.val();
      console.log(editConProfile);

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
    });
  }

  document.getElementById("updateContainer").style.display = "block";
  
};

// function updProBtn() {

// }

let updProBtn = document.getElementById("updProBtn");



const updProfile = (e) => {
   e.preventDefault();
  const { key, type } = window.present_profile;
  console.log(key, type);
  // e.preventDefault();
 // alert("people");
  let fullName = document.getElementById("fullNameEdit").value;
  let age = document.getElementById("ageEdit").value;
  let emailAddress = document.getElementById("emailEdit").value;
  let phone = document.getElementById("phoneEdit").value;
  let weight = document.getElementById("weightEdit").value;
  let height = document.getElementById("heightEdit").value;
  let bmi = document.getElementById("bmiEdit").value;
 // console.log(fullName, age, emailAddress)

  const details = {
    fullName: fullName,
    age,
    email: emailAddress,
    phoneNumber: phone,
    weight,
    height,
    bmi,
  };
  const db = getDatabase();
  update(ref(db, `${type}/${key}`), details);
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
 // console.log("hey there");
  let searchInput = document.getElementById("searchInput").value;
  console.log(searchInput);

  let content = document.getElementsByClassName("content");
  console.log(content);

  for (let j = 0; j < content.length; j++) {
    console.log("hi");
    const contentName = content[j].getElementsByTagName("h3");
    console.log(contentName);

    for (let k = 0; k < contentName.length; k++) {
      console.log("hey");
      const element = contentName[k];

      let para = "Cannot find this name, please modify your search";

      let textValue = element.textContent || contentName.innerText;
      console.log(textValue);

      if (textValue.indexOf(searchInput) > -1) {
        document
          .getElementById("searchResult")
          .appendChild(element.parentElement);
        // document
        //   .getElementById("searchResult").innerHTML = element.parentElement;
      }
      // else {
      //   //  document
      //   //    .getElementById("searchResult")
      //   //    .appendChild(para);
      //   document.getElementById("searchResult").innerHTML += para;
      // }
    }
  }
});

let productItems = document.getElementsByTagName("li");

//console.log(productItems)

// productItems.forEach(element => {
//   element.addEventListener('click', openQualityModal)
// });

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

newSaveBtn.addEventListener('click', (e) => {
  e.preventDefault()
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

})

let addNewProductsBtn = document.getElementById("addNewProductsBtn");

addNewProductsBtn.addEventListener('click', (e) => {
  e.preventDefault()
  // alert("ada");
   const db = getDatabase();
  alert(window.present_key);
   let products = JSON.parse(localStorage.getItem("newProducts"));
  let date = Date.parse(document.getElementById("input").value);
  console.log(date)

  set(ref(db, "products/" + `${window.present_key}/${date}`), products);

  alert('Successfully Saved')

  localStorage.removeItem("newProducts");
  closeNewProductModal();
})




// }) THIS IS FOR THE DOMLOADED EVENT LISTENER
