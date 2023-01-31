// 1. Get the bill amount
const billInput = document.querySelector("#bill-input");
let bill;

billInput.addEventListener("input", function () {
    const billValue = parseFloat(this.value);
    // Don't allow to the user to load a negative number
    if (isNaN(billValue) || billValue < 0) {
        this.value = "";
    } else {
        bill = this.value;
        calcTotal();
    }
});

// 2. Get tip percentage
const tipBtn = document.querySelectorAll(".tipBtn");
const customTip = document.getElementById("custom-tip");
let percentage;

for (const btn of tipBtn) {
    btn.addEventListener("click", function () {
        percentage = this.value;
    });
}

customTip.addEventListener("input", function () {
    let percValue = parseFloat(this.value);
    if (isNaN(percValue) || percValue < 0) {
        this.value = "";
    } else {
        percentage = this.value;
        calcTotal();
    }
});

for (let i = 0; i < tipBtn.length; i++) {
    tipBtn[i].addEventListener("click", function () {
        for (let j = 0; j < tipBtn.length; j++) {
            tipBtn[j].classList.remove("selected");
        }
        this.classList.add("selected");
        customTip.value = "";
    });
}

customTip.addEventListener("click", function () {
    for (let i = 0; i < tipBtn.length; i++) {
        tipBtn[i].classList.remove("selected");
    }
});

// 3. Get the number of people
const numPeople = document.getElementById("num-people");
const errorMsg = document.getElementById("error-msg");
let amountPeople;

numPeople.addEventListener("input", function () {
    let numAmount = parseFloat(this.value);
    if (isNaN(numAmount) || numAmount === 0) {
        errorMsg.classList.remove("error");
        numPeople.classList.add("error-outline");
        this.value = "";
    } else {
        errorMsg.classList.add("error");
        numPeople.classList.remove("error-outline");
        amountPeople = this.value;
        calcTotal();
    }
});

// 4. Calculate tip and total
const totalAmount = document.getElementById("total");
const tipAmount = document.getElementById("tip-total");

function calculateTipAndTotal(amount, tipPercentage, numOfPeople) {
    let tipPerPerson = (amount * tipPercentage) / 100;
    let totalPlusTips =
        parseFloat(amount) + parseFloat(tipPerPerson * numOfPeople);

    return [tipPerPerson, totalPlusTips];
}

function calcTotal() {
    bill = parseFloat(bill);
    amountPeople = parseFloat(amountPeople);
    percentage = parseFloat(percentage);

    if (
        isNaN(bill) ||
        isNaN(amountPeople) ||
        isNaN(percentage) ||
        bill === 0 ||
        amountPeople === 0 ||
        percentage === 0
    ) {
        tipAmount.textContent = `$0.00`;
        totalAmount.textContent = `$0.00`;
    } else {
        let results = calculateTipAndTotal(bill, percentage, amountPeople);
        let tipPerPerson = results[0];
        let totalTips = results[1];

        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmount.textContent = `$${totalTips.toFixed(2)}`;

        resetBtn.classList.remove("disabled");
        resetBtn.disabled = false;
    }
}

// 5. Reset content
function reset() {
    billInput.value = "";
    customTip.value = "";
    numPeople.value = "";
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    resetBtn.disabled = true;
    bill = 0;
    amountPeople = 0;
    percentage = 0;
}

resetBtn.addEventListener("click", function () {
    reset();
    tipBtn.forEach(function (btn) {
        btn.classList.remove("selected");
    });
    resetBtn.classList.add("disabled");
});
