import fetch from "node-fetch";

export const convertCurrency = async (base: string, target: string, amount: number): Promise<number> => {
    const url = `https://open.er-api.com/v6/latest/${base}`;
    const res = await fetch(url);
    const data = await res.json();
    const rate = data["rates"][target];
    return rate * amount;
};
