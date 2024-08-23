import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
     databaseURL: "https://realtime-database-68c12-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEL = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListInDB, function(snapshot) {

      if(snapshot.exists()) {
          let itemListForShopping = Object.entries(snapshot.val())
          clearShoppingListItem()
          for(let i = 0; i < itemListForShopping.length; i++) {
               let currentList = itemListForShopping[i]
          
               let currentItemID = currentList[0]
               let currentItemValue = currentList[1]
          
               addItemToShoppingListEl(currentList)
              }
     }
     else{
          shoppingListEl.innerHTML = "No items list..."
     }

})


addButtonEl.addEventListener("click", function() {

     let inputValue = inputFieldEL.value

     if(inputValue === ""){

          window.alert("Empty value!")

     }
     else{
          
          push(shoppingListInDB, inputValue)
          clearInputFieldEl();
          
          console.log(`${inputValue} added to database!`)
     }


})

function clearShoppingListItem() {

     shoppingListEl.innerHTML = ""

}

function clearInputFieldEl() {

     inputFieldEL.value = ""

}

function addItemToShoppingListEl(item) {
     //shoppingListEl.innerHTML += `<li>${inputItem}</li>`;
     let itemID = item[0]
     let itemValue = item[1]

     let newEL = document.createElement("li")

     newEL.textContent = itemValue

     newEL.addEventListener("click", function() {
          let exactLocationOfShoppingListInDB = ref(database, `shoppingList/${itemID}`)
          remove(exactLocationOfShoppingListInDB)

          console.log(`${itemValue} deleted from database`)
     })

     shoppingListEl.append(newEL)

}
