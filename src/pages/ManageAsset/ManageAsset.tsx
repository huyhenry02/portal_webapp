import React, { useEffect, useState } from 'react';
import PageTitle from '../../layouts/commons/pageTilte/PageTitle';
import { IPageTitle } from '../../stores/types';
import AssetTableComponent from '../../layouts/components/asset/AssetTableComponent';
import TabComponent from '../../layouts/components/tabs/TabComponent';
import { DEFAULT_PER_PAGE } from '../../constants/constant';
import { useLocation } from 'react-router-dom';
import { IPaginateResponse } from '../../stores/slices/manageRole.slice';
import { manageAssetActions } from '../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import Paginate from '../../layouts/commons/paginate/Paginate';
import CreateAssetComponent from '../../layouts/components/asset/CreateAssetComponent';
import UpdateAssetComponent from '../../layouts/components/asset/UpdateAssetComponent';
import { translate } from '../../translates/translate';
import { useTranslation } from 'react-i18next';

const tabs = [
  { id: 'all', label: translate('all') },
  { id: 'active', label: translate('active') },
  { id: 'inactive', label: translate('pause') },
];
const ManageAsset = ({ assets, getListAsset, paginateState, isLoading }) => {
  const pageTitle: IPageTitle = {
    label: translate('manageAsset'),
    links: [
      {
        name: translate('home'),
        path: '/',
      },
    ],
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageParam = queryParams.get('page');
  const [paginate, setPaginate] = useState<IPaginateResponse | undefined>();
  const [isLoadDefault, setIsLoadDefault] = useState(false);
  const [isShowCreateAsset, setIsShowCreateAsset] = useState(false);
  const [isShowUpdateAsset, setIsShowUpdateAsset] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const handleTabClick = tabKey => {
    setCurrentTab(tabKey);
    getListAsset({
      perPage: DEFAULT_PER_PAGE,
      page: 1,
      status: tabs[tabKey]?.id === 'all' ? undefined : tabs[tabKey]?.id,
    });
  };
  const handleClickUpdateAsset = (assetId: string) => {
    setSelectedAssetId(assetId);
    setIsShowUpdateAsset(true);
  };
  const handleCreateAsset = () => {
    setIsShowCreateAsset(prev => !prev);
  };
  const handlerChangePage = page => {
    getListAsset({ perPage: DEFAULT_PER_PAGE, page: page + 1 });
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', page + 1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.history.replaceState(null, null, `?${queryParams.toString()}`);
  };
  const handleCloseModalCreateAsset = (submitSuccess?: boolean) => {
    setIsShowCreateAsset(false);
    if (submitSuccess) {
      getListAsset({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
        status:
          tabs[currentTab]?.id === 'all' ? undefined : tabs[currentTab]?.id,
      });
    }
  };
  const handleCloseModalUpdateAsset = (submitSuccess?: boolean) => {
    setIsShowUpdateAsset(false);
    setSelectedAssetId(null);
    if (submitSuccess) {
      getListAsset({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
        status:
          tabs[currentTab]?.id === 'all' ? undefined : tabs[currentTab]?.id,
      });
    }
  };
  useEffect(() => {
    setPaginate(paginateState);
    setCurrentPage(paginate?.current_page ?? 1);
    if (!isLoadDefault) {
      getListAsset({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
        status:
          tabs[currentTab]?.id === 'all' ? undefined : tabs[currentTab]?.id,
      });
      setIsLoadDefault(true);
    }
  }, [
    getListAsset,
    isLoadDefault,
    paginateState,
    currentPage,
    pageParam,
    paginate,
  ]);
  const { t } = useTranslation();
  return (
    <div className={'kt_app_content_asset'}>
      <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-fluid d-flex align-items-stretch"
        >
          <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
            <PageTitle pageTitle={pageTitle} />
            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <a
                href="#"
                className="btn btn-flex btn-primary h-40px fs-7 fw-bold"
                onClick={handleCreateAsset}
              >
                {t('addAsset')}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          <div className="card">
            <div className="card-header card-header-stretch">
              <div className="card-toolbar m-0">
                <TabComponent
                  tabs={tabs}
                  currentTab={currentTab}
                  onChangeCurrentTab={handleTabClick}
                />
              </div>
            </div>
            <div className="tab-content">
              <AssetTableComponent
                key={currentTab}
                data={assets}
                page={currentPage}
                onEditAsset={handleClickUpdateAsset}
              />
            </div>
            <div className={'paginate'}>
              <hr />
              <div id="container"></div>
              <Paginate
                itemsPerPage={DEFAULT_PER_PAGE}
                total={paginate?.total ?? 0}
                onClickItem={handlerChangePage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <CreateAssetComponent
        show={isShowCreateAsset}
        onClose={handleCloseModalCreateAsset}
      />
      {isShowUpdateAsset ? (
        <UpdateAssetComponent
          show={isShowUpdateAsset}
          onClose={handleCloseModalUpdateAsset}
          assetId={selectedAssetId}
        />
      ) : (
        <></>
      )}
      <DefaultLoading isShow={isLoading} />
    </div>
  );
};
const mapStateToProps = ({ manageAsset }) => ({
  assets: manageAsset.assets,
  paginateState: manageAsset.paginate,
  isLoading: manageAsset.isLoading,
  isError: manageAsset.isError,
  message: manageAsset.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getListAsset: payload =>
      dispatch({
        type: `${manageAssetActions.getListAssetPending.type}_saga`,
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAsset);
