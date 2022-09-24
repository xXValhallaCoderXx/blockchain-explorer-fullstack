export interface IExternalApiResponse {
  address: string;
  updated_at: string;
  next_update_at: string;
  quote_currency: string;
  chain_id: number;
  items: ITxItem[];
  pagination: {
    has_more: boolean;
    page_number: number;
    page_size: number;
    total_count: null | number;
  };
  error: boolean;
  error_message: any;
  error_code: any;
}

export interface ITxItem {
  block_signed_at: string;
  block_height: number;
  tx_hash: string;
  successful: true;
  from_address: string;
  to_address: string;

  value: string;
}


export interface IApiResponse {
    dateTime: string;
    amount: number;
    direction: "recieve" | "send"
}