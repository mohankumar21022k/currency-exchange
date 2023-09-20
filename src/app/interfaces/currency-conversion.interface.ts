interface Query {
    from: string;
    to: string;
    amount: number;
}

interface Info {
    timestamp: number;
    quote: number;
}

export interface CurrencyConversionData {
    success: boolean;
    query: Query;
    info: Info;
    result: number;
}
