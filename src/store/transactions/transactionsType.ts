export interface Transaction {
  id: number;
  user_id: number;
  transaction_date: Date;
  type: string;
  amount: number;
}
