import React, { useEffect, useState } from 'react';
import { IPageTitle } from '../../../stores/types';
import PageTitle from '../../commons/pageTilte/PageTitle';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { get, isEmpty, last } from 'lodash';
import QRCode from 'qrcode.react';
import AssetDetailInfoComponent from './AssetDetailInfoComponent';
import AssetDetailDeliveryComponent from './AssetDetailDeliveryComponent';
import AssetDetailMaintenanceComponent from './AssetDetailMaintenanceComponent';
import CreateMaintenanceComponent from './CreateMaintenanceComponent';
import CreateDeliveryComponent from './CreateDeliveryComponent';
import '../../../pages/ManageAsset/ManageAsset.css';
import Log from '../../commons/log/Log';
import { logTitleType } from '../../../stores/types/manageLog';
import { logAsset } from '../../../stores/types/manageLog';
import { translate } from '../../../translates/translate';
import { useTranslation } from 'react-i18next';

const INFORMATION_TAB = 1;
const DELIVERY_TAB = 2;
const MAINTENANCE_TAB = 3;

const tabs = [
  { id: INFORMATION_TAB, label: translate('information') },
  { id: DELIVERY_TAB, label: translate('delivery') },
  { id: MAINTENANCE_TAB, label: translate('maintenance') },
];
const AssetDetailComponent = ({ assetDetail, getAssetDetail }) => {
  const pageTitle: IPageTitle = {
    label: translate('detailAsset'),
    links: [
      {
        name: translate('home'),
        path: '/',
      },
      {
        name: translate('manageAsset'),
        path: '/asset',
      },
    ],
  };
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(1);
  const [isShowCreateMaintenance, setIsShowCreateMaintenance] = useState(false);
  const [isShowCreateDelivery, setIsShowCreateDelivery] = useState(false);
  const [isShowLogAsset, setIsShowLogAsset] = useState(false);
  const handleTabChange = tabId => {
    setCurrentTab(tabId);
  };
  useEffect(() => {
    getAssetDetail(id);
  }, []);
  const getImageUrl = assetDetail => {
    let originalUrl: string | undefined = '/assets/no_image.jpg';

    if (
      !isEmpty(assetDetail?.asset_images) &&
      assetDetail?.asset_images?.length > 0
    ) {
      originalUrl = get(last(assetDetail?.asset_images), 'originalURL');
    }

    return originalUrl;
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
        <div className="d-flex flex-column flex-column-fluid">
          <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
            <div
              id="kt_app_toolbar_container"
              className="app-container container-fluid d-flex align-items-stretch"
            >
              <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                <PageTitle pageTitle={pageTitle} />
                <div className="d-flex align-items-center gap-2 gap-lg-3">
                  <button
                    className="btn btn-flex btn-outline btn-color-gray-700 btn-active-color-primary bg-body h-40px fs-7 fw-bold"
                    onClick={() => {
                      setIsShowCreateDelivery(true);
                    }}
                  >
                    {t('createDelivery')}
                  </button>
                  <button
                    className="btn btn-flex btn-primary h-40px fs-7 fw-bold "
                    onClick={() => {
                      setIsShowCreateMaintenance(true);
                    }}
                  >
                    {t('damageReport')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light-primary me-3"
                    onClick={() => {
                      setIsShowLogAsset(true);
                    }}
                  >
                    <i className="ki-duotone ki-time fs-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>{' '}
                    {t('history')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            id="kt_app_content kt_app_content_custom"
            className="app-content flex-column-fluid"
          >
            <div
              id="kt_app_content_container"
              className="app-container container-fluid"
            >
              <div
                id="kt_ecommerce_add_product_form"
                className="form d-flex flex-column flex-lg-row"
                data-kt-redirect="../../demo38/dist/apps/ecommerce/catalog/products.html"
              >
                <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
                  <div className="card card-flush py-4">
                    <div className="card-body text-center pt-0">
                      <div
                        className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                        data-kt-image-input="true"
                      >
                        <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                          <img src={getImageUrl(assetDetail)} alt="image" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card card-flush py-4">
                    <div className="card-body text-center pt-0">
                      <div
                        className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                        data-kt-image-input="true"
                      >
                        <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                          <QRCode
                            id="qrcode"
                            value={`{"asset":{"id":"${id}"}}`}
                            size={200}
                            level={'H'}
                            includeMargin={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                  <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2">
                    {tabs.map(tab => (
                      <li
                        className="nav-item"
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                      >
                        <a
                          type="button"
                          className={`nav-link ${
                            currentTab === tab.id ? 'active' : ''
                          }`}
                        >
                          {tab.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content">
                    {currentTab === INFORMATION_TAB && (
                      <AssetDetailInfoComponent assetDetail={assetDetail} />
                    )}
                    {currentTab === DELIVERY_TAB && (
                      <AssetDetailDeliveryComponent />
                    )}
                    {currentTab === MAINTENANCE_TAB && (
                      <AssetDetailMaintenanceComponent />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateMaintenanceComponent
          show={isShowCreateMaintenance}
          onClose={() => setIsShowCreateMaintenance(prev => !prev)}
        />
        <CreateDeliveryComponent
          show={isShowCreateDelivery}
          onClose={() => setIsShowCreateDelivery(prev => !prev)}
        />
      </div>
      <Log
        show={isShowLogAsset}
        onClose={() => setIsShowLogAsset(prev => !prev)}
        logKey={logTitleType.ASSET}
        logId={id}
        logTitle={logAsset}
      />
    </>
  );
};
const mapStateToProps = ({ manageAsset }) => ({
  assetDetail: manageAsset.assetDetail,
  isLoading: manageAsset.isLoading,
  isError: manageAsset.isError,
  message: manageAsset.message,
});

const mapDispatchToProps = dispatch => ({
  getAssetDetail: id =>
    dispatch({
      type: `${manageAssetActions.getAssetDetailPending.type}_saga`,
      payload: { id },
    }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetailComponent);
