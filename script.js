// const BASE_URL =
//     "https://v6.exchangerate-api.com/v6/cc9c0fef19393f3876470a6e/latest/USD";
// // const BASE_URL =
// //     "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for (let select of dropdowns) {
//     for (currCode in countryList) {
//         let newOption = document.createElement("option");
//         newOption.innerText = currCode;
//         newOption.value = currCode;
//         if (select.name === "from" && currCode === "USD") {
//             newOption.selected = "selected";
//         } else if (select.name === "to" && currCode === "INR") {
//             newOption.selected = "selected";
//         }
//         select.append(newOption);
//     }

//     select.addEventListener("change", (evt) => {
//         updateFlag(evt.target);
//     });
// }

// const updateExchangeRate = async () => {
//     let amount = document.querySelector(".inPut");
//     console.log(amount)
//     let amtVal = amount.value;  
//     if (amtVal === "" || amtVal < 1) {
//         amtVal = 1;
//         amount.value = "1";
//     }
//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = data[toCurr.value.toLowerCase()];

//     let finalAmount = amtVal * rate;
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
//     msg.innerText="hello";
// };

// const updateFlag = (element) => {
//     let currCode = element.value;
//     let countryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newSrc;
// };

// btn.addEventListener("click", (evt) => {
//     evt.preventDefault();
//     updateExchangeRate(); 
// });

// window.addEventListener("load", () => {
//     updateExchangeRate();    
// });













const BASE_URL = "https://v6.exchangerate-api.com/v6/cc9c0fef19393f3876470a6e/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

if (fromCurr && toCurr) {
    for (let select of dropdowns) {
        for (let currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if (select.name === "from" && currCode === "USD") {
                newOption.selected = "selected";
            } else if (select.name === "to" && currCode === "INR") {
                newOption.selected = "selected";
            }
            select.append(newOption);
        }

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }

    const updateExchangeRate = async () => {
        let amount = document.querySelector(".inPut");
        let amtVal = amount.value;
        if (amtVal === "" || amtVal < 1) {
            amtVal = 1;
            amount.value = "1";
        }

        try {
            const URL = BASE_URL;
            let response = await fetch(URL);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            let data = await response.json();
            let rate = data.conversion_rates[toCurr.value];

            let finalAmount = amtVal * rate;
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
        } catch (error) {
            msg.innerText = `Error: ${error.message}`;
        }
    };

    const updateFlag = (element) => {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    };

    btn.addEventListener("click", (evt) => {
        evt.preventDefault();
        updateExchangeRate();
    });

    window.addEventListener("load", () => {
        updateExchangeRate();
    });
} else {
    console.error("Currency select elements not found");
}








