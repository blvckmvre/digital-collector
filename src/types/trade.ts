export interface IOffer {
  creator_name: string;
  creator_id: number;
  partner_name: string;
  partner_id: number;
  gives_title: string;
  gives_id: number;
  gets_title: string;
  gets_id: number;
}

export interface ITradeOffer extends IOffer {
  id: number;
  completed: boolean;
}

