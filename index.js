import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-8e280-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");
const fromListInDB = ref(database, "fromList");
const toListInDB = ref(database, "toList");

const endorsementBoxEl = document.querySelector("#endorsement-box");
const fromBoxEl = document.querySelector("#from-box");
const toBoxEl = document.querySelector("#to-box");
const publishBtnEl = document.querySelector("#publish-btn");
const endorsementListEl = document.querySelector("#endorsement-list");
const errorDiv = document.querySelector("#error-div");
const testDiv = document.querySelector("#test");

const ListObj = {
  endorsement: "",
  from: "",
  to: "",
};

const endorsementObj = Object.create(ListObj);

publishBtnEl.addEventListener("click", function () {
  let endorsementValue = endorsementBoxEl.value;
  let fromValue = fromBoxEl.value;
  let toValue = toBoxEl.value;
  errorDiv.innerHTML = "";
  if (
    endorsementValue == null ||
    endorsementValue == "" ||
    fromValue == null ||
    fromValue == "" ||
    toValue == null ||
    toValue == ""
  ) {
    let testEl = document.createElement("h4");
    testEl.textContent = "One or more fields are empty";
    errorDiv.append(testEl);
  } else {
    endorsementObj.endorsement = endorsementValue;
    endorsementObj.from = fromValue;
    endorsementObj.to = toValue;

    //console.log(endorsementObj);
    push(endorsementListInDB, endorsementObj);
    clearAllInputs();
  }
});

/*onValue(database, function (snapshot) {
  console.log("Hello");
}); */

onValue(endorsementListInDB, function (snapshot) {
  if (snapshot.exists()) {
    clearList();
    let itemArray = Object.values(snapshot.val());
    // console.log(itemArray[0]);

    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i];
      endorsementObj.endorsement = itemArray[i].endorsement;
      endorsementObj.from = itemArray[i].from;
      endorsementObj.to = itemArray[i].to;
      console.log(itemArray[i].endorsement);
      console.log(itemArray[i].from);
      console.log(itemArray[i].to);

      appendToEndorsements(endorsementObj);
      console.log(endorsementObj);
    }
  }
});

function clearAllInputs() {
  endorsementBoxEl.value = "";
  fromBoxEl.value = "";
  toBoxEl.value = "";
}

function clearList() {
  test.innerHTML = "";
}

function appendToEndorsements(value) {
  let personFrom = value.from;
  let personTo = value.to;
  let personEndorsement = value.endorsement;

  let newEl = document.createElement("ul");

  newEl.innerHTML = `<li class="bold">To ${personTo}</li> 
  <li>${personEndorsement}<li>
  <li class="bold">From ${personFrom}<li>`;

  test.append(newEl);
}
