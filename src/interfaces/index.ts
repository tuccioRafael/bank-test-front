
export interface TransfersDetailsResponse {
  id: number;
  originAccount: string;
  destinationAccount: string;
  transferValue: number;
  rate: number;
  transferDate: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface TransfersResponse {
  id: number;
  originAccount: string;
  destinationAccount: string;
  transferValue: number;
  rate: number;
  transferDate: string;
  createdAt: Date;
}

// export interface TransfersResponse extends Omit<TransfersDetailsResponse, 'updatedAt'> {}

export interface TransfersRequest extends Omit<TransfersDetailsResponse, 'id' | 'rate' | 'createdAt' | 'updatedAt'> {}

export interface TransfersUpdateRequest extends Omit<TransfersDetailsResponse, 'rate' | 'createdAt' | 'updatedAt'> {}