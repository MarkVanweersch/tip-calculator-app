window.onload = () => {

  const billAmountElement = document.querySelector(".number-input.bill");
  const tipButtons = document.querySelectorAll("button[class=tip-button]");
  const tipCustom = document.querySelector(".tip-button.custom");
  const peopleNumberElement = document.querySelector(".number-input.people");
  const peopleMessage = document.querySelector(".people-amount-message");

  const tipAmountElement = document.querySelector(".total-amount.tip");
  const tipTotalElement = document.querySelector(".total-amount.person");

  let bill = 0;
  let tip = 0;
  let people;
  
  billAmountElement.addEventListener("keyup", () => {
    bill = parseInt(billAmountElement.value);
  })
  billAmountElement.addEventListener("keyup", calculateValues);

  tipButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      tipButtons.forEach((button) => {
        button.classList.remove("active");
      });
      tipCustom.value = "";
      tip = parseInt(event.currentTarget.dataset.tip);
      event.currentTarget.classList.add("active");
    })
  })
  tipButtons.forEach((button) => {
    button.addEventListener("click", calculateValues);
  })

  tipCustom.addEventListener("keyup", () => {
    tipButtons.forEach((button) => {
      button.classList.remove("active");
    });
    tip = parseInt(tipCustom.value);
  })
  tipCustom.addEventListener("keyup", calculateValues);
  
  peopleNumberElement.addEventListener("keyup", () => {
    people = parseInt(peopleNumberElement.value);
  })
  peopleNumberElement.addEventListener("keyup", calculateValues);

  function calculateValues() {
    if (people === 0) {
      peopleMessage.style.visibility = "visible";
      peopleNumberElement.style.outline = "2px solid red";
    }
    if (people !== 0 && people !== NaN && people !== undefined) {
      tipAmountElement.innerText = "$" + ((bill * (tip / 100)) / people).toFixed(2);
      tipTotalElement.innerText = "$" + ((bill * (tip / 100 + 1)) / people).toFixed(2);
      peopleMessage.style.visibility = "hidden";
      peopleNumberElement.style.outline = "none";
    }
    if (tipAmountElement.innerText === "$NaN") {
      tipAmountElement.innerText = "$0.00";
    }
    if (tipTotalElement.innerText === "$NaN") {
      tipTotalElement.innerText = "$0.00";
    }
  }

  document.querySelector(".reset-button").addEventListener("click", () => {
    billAmountElement.value = "";
    tipButtons.forEach((button) => {
      button.classList.remove("active");
    });
    tipCustom.value = "";
    peopleNumberElement.value = "";
    tipAmountElement.innerText = "$0.00";
    tipTotalElement.innerText = "$0.00";
    bill = undefined;
    tip = undefined;
    people = undefined;
  })
}