import { brandColor, ChatInputCommand } from "#util";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { convertCurrency } from "#util";

export const currencyconverter: ChatInputCommand = {
    name: "convertcurrency",
    description: "Convert one currency into another",
    options: [
        {
            name: "base",
            description: "The currency to convert from. (Start typing to search a currency)",
            type: ApplicationCommandOptionType.String,
            autocomplete: true,
            required: true,
        },
        {
            name: "target",
            description: "The currency to convert to. (Start typing to search a currency)",
            type: ApplicationCommandOptionType.String,
            autocomplete: true,
            required: true,
        },
        {
            name: "amount",
            description: "The amount of money to convert",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
    restricted: false,
    autocomplete: async (interaction) => {
        const query = interaction.options.getFocused(true);

        if (!query?.value) {
            await interaction.respond([
                ...currencies.slice(0, 25).map((currency: Currency) => ({
                    name: currency.currencyName,
                    value: currency.id,
                })),
            ]);
        } else {
            const requestedCurrency = query.value.toString().toUpperCase();
            // I'm sorry
            await interaction.respond([
                ...currencies
                    .filter(
                        (curr) =>
                            curr.id.includes(requestedCurrency) ||
                            curr.currencyName.toUpperCase().includes(requestedCurrency),
                    )
                    .slice(0, 25)
                    .map((currency: Currency) => ({
                        name: currency.currencyName,
                        value: currency.id,
                    })),
            ]);
        }
    },
    run: async (interaction) => {
        const base = interaction.options.get("base").value as string;
        const target = interaction.options.get("target").value as string;
        const amount = interaction.options.get("amount").value as number;

        const result = await convertCurrency(base, target, amount);

        const embed = new EmbedBuilder({
            title: `${amount} ${await findName(base)} equals ${result.toFixed(2)} ${await findName(target)}`,
            footer: { text: "Data provided by exchangerate-api.com" },
            color: brandColor,
        });

        await interaction.reply({ embeds: [embed] });
    },
};

/**
 * Helper function that finds the name of a currency based on the short code
 * @param code
 * @returns
 */
const findName = async (code: string): Promise<string> => {
    for (let i = 0; i < currencies.length; i++) {
        if (currencies[i].id === code) {
            return currencies[i].currencyName;
        }
    }
    return "Unknown currency";
};

interface Currency {
    currencyName: string;
    id: string;
}

const currencies: Currency[] = [
    {
        currencyName: "Albanian Lek",
        id: "ALL",
    },
    {
        currencyName: "East Caribbean Dollar",
        id: "XCD",
    },
    {
        currencyName: "Euro",
        id: "EUR",
    },
    {
        currencyName: "Barbadian Dollar",
        id: "BBD",
    },
    {
        currencyName: "Bhutanese Ngultrum",
        id: "BTN",
    },
    {
        currencyName: "Brunei Dollar",
        id: "BND",
    },
    {
        currencyName: "Central African CFA Franc",
        id: "XAF",
    },
    {
        currencyName: "Cuban Peso",
        id: "CUP",
    },
    {
        currencyName: "United States Dollar",
        id: "USD",
    },
    {
        currencyName: "Falkland Islands Pound",
        id: "FKP",
    },
    {
        currencyName: "Gibraltar Pound",
        id: "GIP",
    },
    {
        currencyName: "Hungarian Forint",
        id: "HUF",
    },
    {
        currencyName: "Iranian Rial",
        id: "IRR",
    },
    {
        currencyName: "Jamaican Dollar",
        id: "JMD",
    },
    {
        currencyName: "Australian Dollar",
        id: "AUD",
    },
    {
        currencyName: "Lao Kip",
        id: "LAK",
    },
    {
        currencyName: "Libyan Dinar",
        id: "LYD",
    },
    {
        currencyName: "Macedonian Denar",
        id: "MKD",
    },
    {
        currencyName: "West African CFA Franc",
        id: "XOF",
    },
    {
        currencyName: "New Zealand Dollar",
        id: "NZD",
    },
    {
        currencyName: "Omani Rial",
        id: "OMR",
    },
    {
        currencyName: "Papua New Guinean Kina",
        id: "PGK",
    },
    {
        currencyName: "Rwandan Franc",
        id: "RWF",
    },
    {
        currencyName: "Samoan Tala",
        id: "WST",
    },
    {
        currencyName: "Serbian Dinar",
        id: "RSD",
    },
    {
        currencyName: "Swedish Krona",
        id: "SEK",
    },
    {
        currencyName: "Tanzanian Shilling",
        id: "TZS",
    },
    {
        currencyName: "Armenian Dram",
        id: "AMD",
    },
    {
        currencyName: "Bahamian Dollar",
        id: "BSD",
    },
    {
        currencyName: "Bosnia And Herzegovina Konvertibilna Marka",
        id: "BAM",
    },
    {
        currencyName: "Cape Verdean Escudo",
        id: "CVE",
    },
    {
        currencyName: "Chinese Yuan",
        id: "CNY",
    },
    {
        currencyName: "Costa Rican Colon",
        id: "CRC",
    },
    {
        currencyName: "Czech Koruna",
        id: "CZK",
    },
    {
        currencyName: "Eritrean Nakfa",
        id: "ERN",
    },
    {
        currencyName: "Georgian Lari",
        id: "GEL",
    },
    {
        currencyName: "Haitian Gourde",
        id: "HTG",
    },
    {
        currencyName: "Indian Rupee",
        id: "INR",
    },
    {
        currencyName: "Jordanian Dinar",
        id: "JOD",
    },
    {
        currencyName: "South Korean Won",
        id: "KRW",
    },
    {
        currencyName: "Lebanese Lira",
        id: "LBP",
    },
    {
        currencyName: "Malawian Kwacha",
        id: "MWK",
    },
    {
        currencyName: "Mauritanian Ouguiya",
        id: "MRO",
    },
    {
        currencyName: "Mozambican Metical",
        id: "MZN",
    },
    {
        currencyName: "Netherlands Antillean Gulden",
        id: "ANG",
    },
    {
        currencyName: "Peruvian Nuevo Sol",
        id: "PEN",
    },
    {
        currencyName: "Qatari Riyal",
        id: "QAR",
    },
    {
        currencyName: "Sao Tome And Principe Dobra",
        id: "STD",
    },
    {
        currencyName: "Sierra Leonean Leone",
        id: "SLL",
    },
    {
        currencyName: "Somali Shilling",
        id: "SOS",
    },
    {
        currencyName: "Sudanese Pound",
        id: "SDG",
    },
    {
        currencyName: "Syrian Pound",
        id: "SYP",
    },
    {
        currencyName: "Angolan Kwanza",
        id: "AOA",
    },
    {
        currencyName: "Aruban Florin",
        id: "AWG",
    },
    {
        currencyName: "Bahraini Dinar",
        id: "BHD",
    },
    {
        currencyName: "Belize Dollar",
        id: "BZD",
    },
    {
        currencyName: "Botswana Pula",
        id: "BWP",
    },
    {
        currencyName: "Burundi Franc",
        id: "BIF",
    },
    {
        currencyName: "Cayman Islands Dollar",
        id: "KYD",
    },
    {
        currencyName: "Colombian Peso",
        id: "COP",
    },
    {
        currencyName: "Danish Krone",
        id: "DKK",
    },
    {
        currencyName: "Guatemalan Quetzal",
        id: "GTQ",
    },
    {
        currencyName: "Honduran Lempira",
        id: "HNL",
    },
    {
        currencyName: "Indonesian Rupiah",
        id: "IDR",
    },
    {
        currencyName: "Israeli New Sheqel",
        id: "ILS",
    },
    {
        currencyName: "Kazakhstani Tenge",
        id: "KZT",
    },
    {
        currencyName: "Kuwaiti Dinar",
        id: "KWD",
    },
    {
        currencyName: "Lesotho Loti",
        id: "LSL",
    },
    {
        currencyName: "Malaysian Ringgit",
        id: "MYR",
    },
    {
        currencyName: "Mauritian Rupee",
        id: "MUR",
    },
    {
        currencyName: "Mongolian Tugrik",
        id: "MNT",
    },
    {
        currencyName: "Myanma Kyat",
        id: "MMK",
    },
    {
        currencyName: "Nigerian Naira",
        id: "NGN",
    },
    {
        currencyName: "Panamanian Balboa",
        id: "PAB",
    },
    {
        currencyName: "Philippine Peso",
        id: "PHP",
    },
    {
        currencyName: "Romanian Leu",
        id: "RON",
    },
    {
        currencyName: "Saudi Riyal",
        id: "SAR",
    },
    {
        currencyName: "Singapore Dollar",
        id: "SGD",
    },
    {
        currencyName: "South African Rand",
        id: "ZAR",
    },
    {
        currencyName: "Surinamese Dollar",
        id: "SRD",
    },
    {
        currencyName: "New Taiwan Dollar",
        id: "TWD",
    },
    {
        currencyName: "Paanga",
        id: "TOP",
    },
    {
        currencyName: "Venezuelan Bolivar",
        id: "VEF",
    },
    {
        currencyName: "Algerian Dinar",
        id: "DZD",
    },
    {
        currencyName: "Argentine Peso",
        id: "ARS",
    },
    {
        currencyName: "Azerbaijani Manat",
        id: "AZN",
    },
    {
        currencyName: "Belarusian Ruble",
        id: "BYR",
    },
    {
        currencyName: "Bolivian Boliviano",
        id: "BOB",
    },
    {
        currencyName: "Bulgarian Lev",
        id: "BGN",
    },
    {
        currencyName: "Canadian Dollar",
        id: "CAD",
    },
    {
        currencyName: "Chilean Peso",
        id: "CLP",
    },
    {
        currencyName: "Congolese Franc",
        id: "CDF",
    },
    {
        currencyName: "Dominican Peso",
        id: "DOP",
    },
    {
        currencyName: "Fijian Dollar",
        id: "FJD",
    },
    {
        currencyName: "Gambian Dalasi",
        id: "GMD",
    },
    {
        currencyName: "Guyanese Dollar",
        id: "GYD",
    },
    {
        currencyName: "Icelandic Króna",
        id: "ISK",
    },
    {
        currencyName: "Iraqi Dinar",
        id: "IQD",
    },
    {
        currencyName: "Japanese Yen",
        id: "JPY",
    },
    {
        currencyName: "North Korean Won",
        id: "KPW",
    },
    {
        currencyName: "Latvian Lats",
        id: "LVL",
    },
    {
        currencyName: "Swiss Franc",
        id: "CHF",
    },
    {
        currencyName: "Malagasy Ariary",
        id: "MGA",
    },
    {
        currencyName: "Moldovan Leu",
        id: "MDL",
    },
    {
        currencyName: "Moroccan Dirham",
        id: "MAD",
    },
    {
        currencyName: "Nepalese Rupee",
        id: "NPR",
    },
    {
        currencyName: "Nicaraguan Cordoba",
        id: "NIO",
    },
    {
        currencyName: "Pakistani Rupee",
        id: "PKR",
    },
    {
        currencyName: "Paraguayan Guarani",
        id: "PYG",
    },
    {
        currencyName: "Saint Helena Pound",
        id: "SHP",
    },
    {
        currencyName: "Seychellois Rupee",
        id: "SCR",
    },
    {
        currencyName: "Solomon Islands Dollar",
        id: "SBD",
    },
    {
        currencyName: "Sri Lankan Rupee",
        id: "LKR",
    },
    {
        currencyName: "Thai Baht",
        id: "THB",
    },
    {
        currencyName: "Turkish New Lira",
        id: "TRY",
    },
    {
        currencyName: "UAE Dirham",
        id: "AED",
    },
    {
        currencyName: "Vanuatu Vatu",
        id: "VUV",
    },
    {
        currencyName: "Yemeni Rial",
        id: "YER",
    },
    {
        currencyName: "Afghan Afghani",
        id: "AFN",
    },
    {
        currencyName: "Bangladeshi Taka",
        id: "BDT",
    },
    {
        currencyName: "Brazilian Real",
        id: "BRL",
    },
    {
        currencyName: "Cambodian Riel",
        id: "KHR",
    },
    {
        currencyName: "Comorian Franc",
        id: "KMF",
    },
    {
        currencyName: "Croatian Kuna",
        id: "HRK",
    },
    {
        currencyName: "Djiboutian Franc",
        id: "DJF",
    },
    {
        currencyName: "Egyptian Pound",
        id: "EGP",
    },
    {
        currencyName: "Ethiopian Birr",
        id: "ETB",
    },
    {
        currencyName: "CFP Franc",
        id: "XPF",
    },
    {
        currencyName: "Ghanaian Cedi",
        id: "GHS",
    },
    {
        currencyName: "Guinean Franc",
        id: "GNF",
    },
    {
        currencyName: "Hong Kong Dollar",
        id: "HKD",
    },
    {
        currencyName: "Special Drawing Rights",
        id: "XDR",
    },
    {
        currencyName: "Kenyan Shilling",
        id: "KES",
    },
    {
        currencyName: "Kyrgyzstani Som",
        id: "KGS",
    },
    {
        currencyName: "Liberian Dollar",
        id: "LRD",
    },
    {
        currencyName: "Macanese Pataca",
        id: "MOP",
    },
    {
        currencyName: "Maldivian Rufiyaa",
        id: "MVR",
    },
    {
        currencyName: "Mexican Peso",
        id: "MXN",
    },
    {
        currencyName: "Namibian Dollar",
        id: "NAD",
    },
    {
        currencyName: "Norwegian Krone",
        id: "NOK",
    },
    {
        currencyName: "Polish Zloty",
        id: "PLN",
    },
    {
        currencyName: "Russian Ruble",
        id: "RUB",
    },
    {
        currencyName: "Swazi Lilangeni",
        id: "SZL",
    },
    {
        currencyName: "Tajikistani Somoni",
        id: "TJS",
    },
    {
        currencyName: "Trinidad and Tobago Dollar",
        id: "TTD",
    },
    {
        currencyName: "Ugandan Shilling",
        id: "UGX",
    },
    {
        currencyName: "Uruguayan Peso",
        id: "UYU",
    },
    {
        currencyName: "Vietnamese Dong",
        id: "VND",
    },
    {
        currencyName: "Tunisian Dinar",
        id: "TND",
    },
    {
        currencyName: "Ukrainian Hryvnia",
        id: "UAH",
    },
    {
        currencyName: "Uzbekistani Som",
        id: "UZS",
    },
    {
        currencyName: "Turkmenistan Manat",
        id: "TMT",
    },
    {
        currencyName: "British Pound",
        id: "GBP",
    },
    {
        currencyName: "Zambian Kwacha",
        id: "ZMW",
    },
    {
        currencyName: "Bitcoin",
        id: "BTC",
    },
    {
        currencyName: "New Belarusian Ruble",
        id: "BYN",
    },
    {
        currencyName: "Bermudan Dollar",
        id: "BMD",
    },
    {
        currencyName: "Guernsey Pound",
        id: "GGP",
    },
    {
        currencyName: "Chilean Unit Of Account",
        id: "CLF",
    },
    {
        currencyName: "Cuban Convertible Peso",
        id: "CUC",
    },
    {
        currencyName: "Manx pound",
        id: "IMP",
    },
    {
        currencyName: "Jersey Pound",
        id: "JEP",
    },
    {
        currencyName: "Salvadoran Colón",
        id: "SVC",
    },
    {
        currencyName: "Old Zambian Kwacha",
        id: "ZMK",
    },
    {
        currencyName: "Silver (troy ounce)",
        id: "XAG",
    },
    {
        currencyName: "Zimbabwean Dollar",
        id: "ZWL",
    },
];
