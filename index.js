const tradingView = require("@mathieuc/tradingview");
const client = new tradingView.Client();
const chart = new client.Session.Chart();

// Set market
const market = "BINANCE:BTCUSDT";
chart.setMarket(market, {
    timeframe: "D",
});

// Load symbol
chart.onSymbolLoaded(() => {
    console.log(`Market "${chart.infos.description}" loaded !`);
    chart.setSeries("15");
});

let lastPrice, lastSecond;

// Wait for price changes
chart.onUpdate(() => {
    if (!chart.periods[0]) return;
    let today = new Date();
    if (
        lastPrice != chart.periods[0].close &&
        lastSecond != today.getSeconds()
    ) {
        const emoji = lastPrice < chart.periods[0].close ? "🟢" : "🔴";
        console.log(
            `${today.toLocaleDateString()} - ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} - [${
                chart.infos.description
            }]: ${chart.periods[0].close} ${
                chart.infos.currency_id
            } ${emoji}`
        );
    }
    lastSecond = today.getSeconds();
    lastPrice = chart.periods[0].close;
});
