document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt("enter Your desired new text..");
    console.log(userInput);
    axios
      .post("/update-item", {
        text: userInput,
      })
      .then(function () {
        // do something interesting here in the next video....
      })
      .catch(function () {
        console.log("Please try again later...");
      });
    // alert("You click the edit button....")
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-me")) {
    confirm("Are You sure? You want to delete this item...");
  }
});
