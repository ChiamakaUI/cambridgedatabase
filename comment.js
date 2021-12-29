// for (const prop in consDB) {
        //   console.log(prop);
        //   // console.log(prop.fullName);
        // }

        // for (let i = 0; i < consDB.length; i++) {
        //   const element = consDB[i];
        //   console.log(element);
        //   console.log(consDB[i])
        //   let result = document.getElementsByClassName('result')[0]
        //   let resultItem = document.createElement('div')

        //   let resultContent = `
        // <div>
        // <h3>${element.fullName}</h3>
        // <p>${element.age}</p>
        // <p>${element.gender}</p>
        // <p>${element.email}</p>
        // <p>${element.phoneNumber}</p>
        // <p>${element.height}</p>
        // <p>${element.weight}</p>
        // <p>${element.bmi}</p>
        // <p>${element.type}</p>
        // </div>
        //   `

        //   resultItem.innerHTML = resultContent;
        //   result.appendChild(resultItem);
        // }


//         function saveProductToLocalStorage(e) {
//           e.preventDefault();
//           // alert('heyyy')
//           let productInput = document.getElementById("selectedProduct").value;
//           let quantityInput = document.getElementById("quantity").value;

//           if (productInput == "" || quantityInput == "") {
//             alert("please, fill fields to continue");
//             return;
//           }

//           const productDetails = {
//             productName: productInput,
//             quantity: quantityInput,
//           };

//           // const storageProducts = [];
//           // console.log(storageProducts);

//           const storedProduct = localStorage.getItem("products");
//           //console.log(storedProduct);

//           const storageProducts = storedProduct
//             ? JSON.parse(storedProduct)
//             : [];

//           storageProducts.push(productDetails);

//           localStorage.setItem("products", JSON.stringify(storageProducts));

//           const productsSoFar = JSON.parse(localStorage.getItem("products"));
//           console.log(productsSoFar);

//           for (const key in productsSoFar) {
//             // console.log(key)
//             // console.log(productsSoFar[key]);
//             const singleProduct = productsSoFar[key];
//             // console.log(singleProduct)

//             let productsSoF =
//               document.getElementsByClassName("productsSoFar")[0];

//             const { productName, quantity } = singleProduct;
//             // console.log(productName)
//             // console.log(quantity);
//             // document.getElementById("pN").innerText = productName;
//             // document.getElementById("qO").innerText = quantity;

//             let productsContent = `
//    <p>Product Name: ${productName}</p>
//    <p>Quantity Ordered: ${quantity}</p>
//     `;

//             productsSoF.innerHTML += productsContent;
//           }

//           // document.getElementById("productsSoFar").innerText = productsSoFar;
//           document.getElementById("selectedProduct").value = "";
//           document.getElementById("quantity").value = "";
//         }


// console.log(details)
  //  set(ref(db, "history/" + `${userId}/${orderId}`), historyCart);

  // push(ref(db, "consultant/" + `${userID}`), conDetails);

  //  set(ref(db, "consultant/" + `${camID}`), conDetails);

  // push(ref(db, "products/" + `${camID}`), products);

  // push(ref(db, "regular/"), regDetails);

   // push(ref(db, "products/"), products);


   // onclick = "orderHistory()";

// let orderHistory = document.getElementById("orderHistory");

// orderHistory.addEventListener('click', function () {
//   e.preventDefault()
//  console.log('heyy')
// })
// function orderHistory() {
//   // e.preventDefault();
//   console.log("heyy");
// }

// let orderHistory = document.getElementById("orderHistory");

// orderHistory.addEventListener('click', (e) => {
//   e.preventDefault()
//   console.log('heyy')
// })

// let updProBtn = document.getElementById("updProBtn");

// updProBtn.addEventListener('click', (e) => {
//   e.preventDefault()
//   alert('people')
//     let fullName = document.getElementById("fullName").value;
//     let age = document.getElementById("age").value;
//     let emailAddress = document.getElementById("email").value;
//     let phone = document.getElementById("phone").value;
//     let weight = document.getElementById("weight").value;
//     let height = document.getElementById("height").value;
//   let bmi = document.getElementById("bmi").value;
//   const details = {
//     fullName: fullName,
//     age,
//     email: emailAddress,
//     phoneNumber: phone,
//     weight,
//     height,
//     bmi,
//   };
//   const db = getDatabase();
//     // set(ref(db, "regular/" + `${userID}`), regDetails);
// })

//document
  //  .getElementById("updProBtn")
  //  .addEventListener("click", () => {
  //    updProfile(key, type);
  //  });

  // console.log(e.target)
  //  console.log(e.target.innerText);

  // let register = document.getElementById("register");

// register.addEventListener('click', (e) => {
//     e.preventDefault()
//     alert('hyi')

//      let fullName = document.getElementById("fName").value;
//      let customerEmail = document.getElementById("email").value;
//     let customerPassword = document.getElementById("password").value;

//     const auth = getAuth()
//     createUserWithEmailAndPassword(auth, customerEmail, customerPassword)
//         .then(() => {
//             const user = auth.currentUser;
//             console.log(user)

//             const user_data = {
//               fullName,
//               email: customerEmail,
//               last_login: Date.now(),
//             };
//             console.log(user_data);
//             const db = getDatabase();
//             set(ref(db, "users/" + user.uid), user_data);
//             alert('Account Created')
//         })
//         .catch((error) => {
//           var error_code = error.code;
//           var error_message = error.message;

//           console.log(error_message);
//           console.log(error_code);
//     })
// })

// let login = document.getElementById("loginBtn");

// login.addEventListener('click', (e) => {
//     e.preventDefault()
//     alert('hello')

//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;

//     const auth = getAuth();
//     signInWithEmailAndPassword(auth, email, password).then(() => {
//         let user = auth.currentUser;
//         console.log(user)
//            window.location.href = "main.html";
//     }).catch((error) => {
//          var error_code = error.code;
//          var error_message = error.message;

//          console.log(error_message);
//          alert(error_code);
//     })
// })

// console.log(uuid.v4())

// uuidv4();