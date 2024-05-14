import { IFileInfo } from './commons';
import { IFileResponse } from './manageProfile';

export type IAssetDetail = {
  id: string;
  name: string;
  code: string;
  management_code: string;
  management_unit: string;
  insurance_contract: string;
  status: string;
  original_price: number;
  residual_price: number;
  asset_images: IFileInfo[];
};
export type IAssetDetailResponse = {
  id: string;
  name: string;
  code: string;
  management_code: string;
  management_unit: string;
  insurance_contract: string;
  status: string;
  original_price: number;
  residual_price: number;
  asset_images: IFileResponse;
};
export type IAssetDelivery = {
  id: string;
  created_date: string;
  receiver: string;
  deliver: string;
  reason: string;
  place_of_use: string;
  attachments: string;
  code: string;
  status: string;
};
export type IAssetMaintenance = {
  id: string;
  created_date: string;
  created_by: string;
  reason: string;
  description: string;
  proposal: string;
  code: string;
  causal: string;
  status: string;
};
export type IInfoAssetUpdate = {
  id?: string;
  name?: string;
  code?: string;
  management_code?: string;
  management_unit?: string;
  insurance_contract?: string;
  status?: string;
  original_price?: number;
  residual_price?: number;
  asset_images?: IFileInfo[];
  media?: IAssetMediaUpdate;
};
export type IAssetMediaUpdate = {
  new?: {
    asset_images?: string;
  };
  delete?: {
    asset_images?: string[];
  };
};
