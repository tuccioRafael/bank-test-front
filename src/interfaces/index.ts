
export interface TransfersDetailsResponse {
  id: number;
  originAccount: string;
  destinationAccount: string;
  transferValue: string;
  rate: number;
  transferDate: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface TransfersResponse {
  id: number;
  originAccount: string;
  destinationAccount: string;
  transferValue: string;
  rate: number;
  transferDate: string;
  createdAt: Date;
}

export interface TransfersRequest extends Omit<TransfersDetailsResponse, 'id' | 'rate' | 'createdAt' | 'updatedAt'> {}
