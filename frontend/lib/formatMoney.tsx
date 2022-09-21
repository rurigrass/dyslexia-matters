export default function formatMoney(amount = 0) {
    const options = {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
    };

    //check if its a clean amount (no decimals)
    if (amount % 100 === 0) {
        options.minimumFractionDigits = 0;
    }

    const formatter = new Intl.NumberFormat('en-UK', options);

    return formatter.format(amount / 100)
}