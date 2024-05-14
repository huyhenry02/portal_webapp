import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import { useLocation } from 'react-router-dom';
import { IPaginateResponse } from '../../../stores/slices/manageRole.slice';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import { DEFAULT_PER_PAGE } from '../../../constants/constant';
import { useParams } from 'react-router';
import Paginate from '../../commons/paginate/Paginate';
import DeliveryDetailComponent from './DeliveryDetailComponent';
import '../../../pages/ManageAsset/ManageAsset.css';
import { translate } from '../../../translates/translate';
import { useTranslation } from 'react-i18next';

const labels = [
  { id: 1, name: translate('stt'), className: 'min-w-50px text-left' },
  { id: 2, name: translate('ballotName'), className: 'min-w-60px text-left' },
  {
    id: 3,
    name: translate('ticketCreator'),
    className: 'min-w-125px text-center',
  },
  { id: 4, name: translate('receiver'), className: 'min-w-125px text-center' },
  {
    id: 5,
    name: translate('creationTime'),
    className: 'min-w-125px text-center',
  },
];

const AssetDetailDeliveryComponent = ({
  assetDeliveries,
  getListAssetDelivery,
  paginateState,
  isLoading,
}) => {
  const location = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageParam = queryParams.get('page');
  const [paginate, setPaginate] = useState<IPaginateResponse | undefined>();
  const [isLoadDefault, setIsLoadDefault] = useState(false);
  const [isShowDeliveryDetail, setIsShowDeliveryDetail] = useState(false);
  const [selectedAssetDeliveryId, setSelectedAssetDeliveryId] = useState(null);
  const [assetDeliveriesState, setAssetDeliveries] = useState(assetDeliveries);
  const handlerChangePage = page => {
    getListAssetDelivery({
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
    setAssetDeliveries(assetDeliveries);
    setPaginate(paginateState);
    setCurrentPage(paginate?.current_page ?? 1);
    if (!isLoadDefault) {
      getListAssetDelivery({
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
    isLoading,
    paginateState,
    assetDeliveries,
    paginate,
  ]);
  const { t } = useTranslation();
  return (
    <>
      <div className="tab-pane fade show active">
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
                    {t('delivery')}
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body" id="kt_drawer_chat_messenger_body">
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
                    {map(assetDeliveriesState, (assetDelivery, index) => (
                      <tr
                        key={assetDelivery?.id}
                        onClick={() => {
                          setIsShowDeliveryDetail(true);
                          setSelectedAssetDeliveryId(assetDelivery?.id);
                        }}
                      >
                        <td>{handleIndex(index, currentPage)}</td>
                        <td className="text-left">
                          Phiếu {assetDelivery?.code}
                        </td>
                        <td className="text-center">
                          {assetDelivery?.deliver}
                        </td>
                        <td className="text-center">
                          {assetDelivery?.receiver}
                        </td>
                        <td className="text-center">
                          {assetDelivery?.created_date}
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
      <DeliveryDetailComponent
        show={isShowDeliveryDetail}
        onClose={() => setIsShowDeliveryDetail(prev => !prev)}
        assetDeliveryId={selectedAssetDeliveryId}
      />
    </>
  );
};
const mapStateToProps = ({ manageAsset }) => ({
  assetDeliveries: manageAsset.assetDeliveries,
  paginateState: manageAsset.paginate,
  isLoading: manageAsset.isLoading,
  isError: manageAsset.isError,
  message: manageAsset.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getListAssetDelivery: payload =>
      dispatch({
        type: `${manageAssetActions.getListAssetDeliveryPending.type}_saga`,
        payload,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetDetailDeliveryComponent);
