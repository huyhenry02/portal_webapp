import React from 'react';
import { isEmpty, map } from 'lodash';
import { IAssetDetailResponse } from '../../../stores/types/manageAsset';
import { Link } from 'react-router-dom';
import '../../../pages/ManageAsset/ManageAsset.css';
import { translate } from '../../../translates/translate';

const labels = [
  { id: 1, name: translate('stt'), className: 'min-w-50px text-left' },
  { id: 2, name: translate('nameAsset'), className: 'min-w-60px text-left' },
  { id: 3, name: translate('code'), className: 'min-w-125px text-center' },
  {
    id: 4,
    name: translate('manageCode'),
    className: 'min-w-125px text-center',
  },
  {
    id: 5,
    name: translate('manageUnit'),
    className: 'min-w-125px text-center',
  },
  { id: 6, name: translate('status'), className: 'min-w-125px text-center' },
  { id: 7, name: translate('action'), className: 'min-w-125px text-center' },
];
type IAssetTableComponent = {
  data: IAssetDetailResponse[];
  page: number | string;
  onEditAsset: (id: string) => void;
};
const AssetTableComponent: React.FC<IAssetTableComponent> = ({
  data,
  page,
  onEditAsset,
}) => {
  const handleIndex = index => {
    let currentPage = Number(page);
    if (currentPage < 2) currentPage = 1;
    return (currentPage - 1) * 10 + (index + 1);
  };
  const getImageUrl = asset => {
    let originalUrl: undefined | string = '/assets/no_image.jpg';
    if (!isEmpty(asset?.asset_images)) {
      const assetImagesKeys = Object.keys(asset.asset_images);
      const lastKey = assetImagesKeys[assetImagesKeys.length - 1];
      if (asset.asset_images[lastKey]?.original_url) {
        originalUrl = asset.asset_images[lastKey].original_url;
      }
    }
    return originalUrl;
  };
  return (
    <>
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div
            id="kt_app_content_container"
            className="app-container container-fluid"
          >
            <div className="table-responsive">
              <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
                <thead className="border-gray-200 fs-5 fw-semibold bg-gray-200">
                  <tr>
                    {map(labels, label => (
                      <th
                        className={label.className ?? 'text-center'}
                        key={label.id}
                      >
                        {label.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="fs-6 fw-semibold text-gray-600">
                  {map(data, (asset, index) => (
                    <tr key={asset.id}>
                      <td>{handleIndex(index)}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <a href="#" className="symbol symbol-50px">
                            <img src={getImageUrl(asset)} alt="" />
                          </a>
                          <div className="ms-5">
                            <Link
                              to={`/asset/detail/${asset.id}`}
                              className="text-gray-800 text-hover-primary fs-5 fw-bold"
                            >
                              {asset.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/asset/detail/${asset.id}`}
                          className="text-gray-800 text-hover-primary fs-5 fw-bold"
                        >
                          {asset.code}
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/asset/detail/${asset.id}`}
                          className="text-gray-800 text-hover-primary fs-5 fw-bold"
                        >
                          {asset.management_code}
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/asset/detail/${asset.id}`}
                          className="text-gray-800 text-hover-primary fs-5 fw-bold"
                        >
                          {asset.management_unit}
                        </Link>
                      </td>
                      <td className={`text-center ${asset.status}`}>
                        <Link
                          to={`/asset/detail/${asset.id}`}
                          className="text-gray-800 text-hover-primary fs-5 fw-bold"
                        >
                          {translate(asset.status) ?? asset.status}
                        </Link>
                      </td>
                      <td className="text-center">
                        <a
                          type="button"
                          className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                          onClick={() => onEditAsset(asset.id)}
                        >
                          <i className="ki-outline ki-wrench fs-2x"></i>
                        </a>
                        <Link
                          to={`/asset/detail/${asset.id}`}
                          className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                        >
                          <i className="fas fa-eye fs-2"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AssetTableComponent;
