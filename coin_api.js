let apiKey = {
  key: "c896f104-91e7-4344-8a78-5da6a6dfeeaa",
};

request(
  "GET",
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=" +
    apiKey.key
)
  .then((r1) => {
    console.log(r1);
    let x1 = JSON.parse(r1.target.responseText);
    console.log(x1.data[6].symbol);
    console.log(x1.data[6].quote.USD.price);
    console.log(x1.data[6].quote.USD.percent_change_90d);
  })
  .catch();

function request(method, url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send();
  });
}
