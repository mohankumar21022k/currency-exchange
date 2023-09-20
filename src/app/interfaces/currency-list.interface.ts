interface Currency {
    [code: string]: string;
}

export interface CurrencyData {
    success: boolean;
    currencies: Currency;
}

export interface Currencies {
    code: string; 
    name: string
}
