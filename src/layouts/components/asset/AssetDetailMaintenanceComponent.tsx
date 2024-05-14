import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { IPaginateResponse } from '../../../stores/slices/manageRole.slice';
import { DEFAULT_PER_PAGE } from '../../../constants/constant';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import Paginate from '../../commons/paginate/Paginate';
import { map } from 'lodash';
import MaintenanceDetailComponent from './MaintenanceDetailComponent';
import '../../../pages/ManageAsset/ManageAsset.css';
import { useTranslation } from 'react-i18next';
import { translate } from '../../../translates/translate';

const labels = [
  { id: 1, name: translate('stt'), className: 'min-w-50px text-left' },
  { id: 2, name: translate('ballotName'), className: 'min-w-60px text-center' },
  {
    id: 3,
    name: translate('ticketCreator'),
    className: 'min-w-125px text-center',
  },
  {
    id: 4,
    name: translate('reasonRepair'),
    className: 'min-w-125px text-center',
  },
  {
    id: 5,
    name: translate('creationTime'),
    className: 'min-w-125px text-center',
  },
];
const AssetDetailMaintenanceComponent = ({
  assetMaintenances,
  getListAssetMaintenance,
  paginateState,
}) => {
  const location = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageParam = queryParams.get('page');
  const [paginate, setPaginate] = useState<IPaginateResponse | undefined>();
  const [isLoadDefault, setIsLoadDefault] = useState(false);
  const [isShowMaintenanceDetail, setIsShowMaintenanceDetail] = useState(false);
  const [selectedAssetMaintenanceId, setSelectedAssetMaintenanceId] =
    useState(null);
  const [assetMaintenancesState, setAssetMaintenances] =
    useState(assetMaintenances);
  const handlerChangePage = page => {
    getListAssetMaintenance({
      perPage: DEFAULT_PER_PAGE,
      page: page + 1,
      status: 'active',
      asset_id: id,
    });
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', page + 1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.history.replaceState(null, null, `?${queryParams.toString()}`);
  };
  const handleIndex = (index, page) => {
    let currentPage = Number(page);
    if (currentPage < 2) currentPage = 1;
    return (currentPage - 1) * 10 + (index + 1);
  };
  useEffect(() => {
    setAssetMaintenances(assetMaintenances);
    setPaginate(paginateState);
    setCurrentPage(paginate?.current_page ?? 1);
    if (!isLoadDefault) {
      getListAssetMaintenance({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
        status: 'active',
        asset_id: id,
      });
      setIsLoadDefault(true);
    }
  }, [
    isLoadDefault,
    currentPage,
    pageParam,
    id,
    paginateState,
    assetMaintenances,
    paginate,
  ]);
  const { t } = useTranslation();
  return (
    <>
      {' '}
      <div
        className="tab-pane fade show active"
        id="kt_asset_maintenance"
        role="tab-panel"
      >
        <div className="d-flex flex-column gap-7 gap-lg-10">
          <div className="card card-flush py-4">
            <div
              className="card-header pe-5"
              id="kt_drawer_chat_messenger_header"
            >
              <div className="card-title">
                <div className="d-flex justify-content-center flex-column me-3">
                  <a
                    href="#"
                    className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1"
                  >
                    {t('maintenance')}
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body" id="kt_drawer_chat_messenger_body">
              <div className="table-responsive ">
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
                    {map(assetMaintenancesState, (assetMaintenance, index) => (
                      <tr
                        key={assetMaintenance?.id}
                        onClick={() => {
                          setIsShowMaintenanceDetail(true);
                          setSelectedAssetMaintenanceId(assetMaintenance.id);
                        }}
                      >
                        <td>{handleIndex(index, currentPage)}</td>
                        <td className="text-center">
                          Phiếu {assetMaintenance?.code}
                        </td>
                        <td className="text-center">
                          {assetMaintenance?.created_by}
                        </td>
                        <td className="text-center">
                          {assetMaintenance?.reason}
                        </td>
                        <td className="text-center">
                          {assetMaintenance?.created_date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
      </div>
      <MaintenanceDetailComponent
        show={isShowMaintenanceDetail}
        onClose={() => setIsShowMaintenanceDetail(prev => !prev)}
        assetMaintenanceId={selectedAssetMaintenanceId}
      />
    </>
  );
};
const mapStateToProps = ({ manageAsset }) => ({
  assetMaintenances: manageAsset.assetMaintenances,
  paginateState: manageAsset.paginate,
  isLoading: manageAsset.isLoading,
  isError: manageAsset.isError,
  message: manageAsset.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getListAssetMaintenance: payload =>
      dispatch({
        type: `${manageAssetActions.getListAssetMaintenancePending.type}_saga`,
        payload,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetailMaintenanceComponent);
