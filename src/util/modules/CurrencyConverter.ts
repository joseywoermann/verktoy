import fetch from "node-fetch";

export class CurrencyConverter {
    private key: string;

    constructor() {
        this.key = process.env.CC_KEY ?? "No token provided";
    }

    convert = async (base: string, target: string, amount: number): Promise<number> => {
        const url = `https://free.currconv.com/api/v7/convert?q=${base}_${target}&compact=ultra&apiKey=${this.key}`;
        const res = await fetch(url);
        const data = await res.json();
        const rate = data[`${base}_${target}`];

        return amount * rate;
    };
}
