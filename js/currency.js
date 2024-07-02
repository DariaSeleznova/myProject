// exchangeRates.js
const exchangeRatesUrl = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`;

let exchangeRatesData = {};

async function loadCurrency() {
    try {
        const response = await fetch(exchangeRatesUrl);
        const data = await response.json();
        if (response.ok) {
            exchangeRatesData = data.reduce((acc, rate) => {
                if (rate.cc === 'USD' || rate.cc === 'EUR' || rate.cc === 'PLN') {
                    acc[rate.cc] = rate.rate.toFixed(2);
                }
                return acc;
            }, {});
            console.log(exchangeRatesData);
            displayCurrency(data);
        } else {
            document.getElementById('exchangeRates').innerHTML = data.message || "Error loading ";
        }
    } catch (error) {
        document.getElementById('exchangeRates').innerHTML = "Error fetching data";
    }
}

function displayCurrency(data) {
    const filteredData = data.filter(article => 
        article.cc === 'USD' || article.cc === 'EUR' || article.cc === 'PLN'
    );

    const exchangeRates = document.getElementById('exchangeConteiner');
    exchangeRates.innerHTML = filteredData.map(article => 
        `<div class="currency-article">
            <p>1 ${article.cc} = ${parseFloat(article.rate).toFixed(2)} UAH</p>
        </div>`
    ).join('');
}

function convertToUAH(amount, fromCurrency) {
    const rate = parseFloat(exchangeRatesData[fromCurrency]);
    return amount * rate;
}

document.getElementById('convertBtn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    if (!isNaN(amount)) {
        const convertedAmount = convertToUAH(amount, fromCurrency);
        document.getElementById('conversionResult').innerText = `= ${convertedAmount.toFixed(2)} UAH`;
    } else {
        document.getElementById('conversionResult').innerText = "Please enter a valid amount.";
    }
});

loadCurrency();
