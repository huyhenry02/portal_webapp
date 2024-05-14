import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CommonModal from '../../layouts/components/modals/CommonModal';
import 'react-datepicker/dist/react-datepicker.css';
// import '../../styles/datepickerCustom.css';
import { connect } from 'react-redux';
import { manageCompanyActions } from '../../stores/slices/manageCompany.slice';
import { isEmpty, isNumber, map } from 'lodash';
import ViewCompanyModal from '../../layouts/components/modals/ViewCompanyModal';
import { LevelCode } from '../../stores/types/manageCompany';
import ViewDepartmentModal from '../../layouts/components/modals/ViewDepartmentModal';
import CompanyStructureTree from '../../layouts/components/tree/TreeComponent';
import SweetAlertDelete from '../../layouts/components/sweet-alert/SweetAlertDelete';
import ViewTeamModal from '../../layouts/components/modals/ViewTeamModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TabComponent from '../../layouts/components/tabs/TabComponent';
import DiagramComponent from '../../layouts/components/tree/DiagramComponent';
import './ManagerCompany.css';
import { translate } from '../../translates/translate';
import { useTranslation } from 'react-i18next';

const ManageCompany = ({
  levelsState,
  unitsState,
  unitDetailState,
  createNewUnit,
  getListPosition,
  getListLevel,
  getListUnit,
  getUnitDetail,
  getUnitDetailEdit,
  updateUnit,
  deleteUnit,
  isLoading,
  isError,
  message,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isLoadDefault, setIsLoadDefault] = useState(false);

  const [x, setX] = useState<number | undefined>();
  const [y, setY] = useState<number | undefined>();
  const [unitTreeFocus, setUnitTreeFocus] = useState({});
  const [levelCurrent, setLevelCurrent] = useState<string>();

  const [isUpdateUnit, setIsUpdateUnit] = useState(false);
  const [isShowViewCompanyModal, setIsShowViewCompanyModal] = useState(false);
  const [isShowViewDepartmentModal, setIsShowViewDepartmentModal] =
    useState(false);
  const [isShowViewTeamModal, setIsShowViewTeamModal] = useState(false);
  const [sweetAlertInfo, setSweetAlertInfo] = useState<{
    isShow: boolean;
    action?: number;
    content?: string;
    data?: unknown;
  }>({ isShow: false });

  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { id: 1, label: translate('Hierarchy') },
    { id: 2, label: translate('HierarchyDiagram') },
  ];

  useEffect(() => {
    if (!isLoadDefault) {
      getListPosition();
      getListLevel();
      getListUnit();
      setIsLoadDefault(true);
    }
  }, []);

  const recursivelyReplaceKeys = childUnits => {
    return childUnits.map(item => ({
      value: item?.id,
      label: item.name,
      ...(item.child_units && {
        children: recursivelyReplaceKeys(item.child_units),
      }),
    }));
  };

  const buildTreeDataUnits = useMemo(() => {
    const result = unitsState.map(item => ({
      value: item?.id,
      label: item.name,
      ...(item.child_units && {
        children: recursivelyReplaceKeys(item.child_units),
      }),
      disabled: true,
    }));
    return result;
  }, [unitsState]);

  const handleClickUnitLevel = () => {
    setX(55);
    setY(0);
  };

  const handleRemoveDbClickItem = () => {
    setX(undefined);
    setY(undefined);
  };

  const switchModal = (code: string, isVisible: boolean) => {
    switch (code) {
      case LevelCode.COMPANY:
        setIsShowViewCompanyModal(isVisible);
        break;
      case LevelCode.DEPARTMENT:
        setIsShowViewDepartmentModal(isVisible);
        break;
      case LevelCode.TEAM:
        setIsShowViewTeamModal(isVisible);
        break;
      default:
        break;
    }
  };

  const showModalByLevel = code => {
    switchModal(code, true);
  };

  const closeModalByLevel = code => {
    switchModal(code, false);
  };

  const handleClickLevelItem = item => {
    handleRemoveDbClickItem();
    setLevelCurrent(item?.id);
    setIsUpdateUnit(false);
    showModalByLevel(item.code);
  };

  const handleGetUnitDetail = useCallback((id: string) => {
    getUnitDetail(id);
  }, []);

  const handleEditUnit = (id: string, code: LevelCode) => {
    getUnitDetailEdit(id);
    setIsUpdateUnit(true);
    showModalByLevel(code);
  };
  const handleUpdateUnitStatus = () => {};

  // start handle delete unit
  const handleDeleteUnit = (id: string, name: string) => {
    setSweetAlertInfo({ isShow: true, action: 1, content: name, data: id });
  };

  const handleCloseSweetAlert = () => {
    setSweetAlertInfo({ isShow: false });
  };

  const handleSubmitSweetAlert = async (id: string) => {
    deleteUnit(id);
    setSweetAlertInfo({ isShow: true, action: 2 });
  };

  // handle create new unit
  const handleCreateUnit = (data, level: LevelCode) => {
    createNewUnit({ ...data, level_id: levelCurrent });
    closeModalByLevel(level);
  };

  // handle update unit
  const handleUpdateUnit = (data, level: LevelCode) => {
    updateUnit(data);
    closeModalByLevel(level);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleRemoveDbClickItem();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (!isEmpty(unitDetailState)) setUnitTreeFocus(unitDetailState);

    if (isEmpty(unitDetailState) && !isEmpty(unitTreeFocus)) {
      getUnitDetail(unitTreeFocus['parent_id'] || unitsState[0]?.id);
    }
  }, [unitDetailState]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column flex-column-fluid">
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
                  onChangeCurrentTab={tab => setCurrentTab(tab)}
                />
              </div>
            </div>
            <div className="card-body tab-content">
              <div
                className={`hierarchy tab-pane fade ${
                  currentTab === 0 ? 'active show' : ''
                }`}
              >
                <div
                  className="position-relative d-inline-block mb-2"
                  ref={ref}
                >
                  <button
                    className="btn btn-primary fs-4 d-flex align-items-center"
                    onClick={handleClickUnitLevel}
                  >
                    <i className="fa fa-circle-plus fs-4"></i>
                    <span>{t('createHierarchy')}</span>
                  </button>

                  <div
                    className={`menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-250px ${
                      isNumber(x) && isNumber(y) ? 'show' : ''
                    }`}
                    data-kt-menu="true"
                    style={{
                      position: 'absolute',
                      inset: '0px 0px auto auto',
                      margin: '0px',
                      top: x,
                      left: y,
                    }}
                    data-popper-placement="bottom-end"
                  >
                    {map(levelsState, (item, idx) => (
                      <div key={idx}>
                        <div className="menu-item px-3">
                          <a
                            className="menu-link px-3"
                            onClick={() => handleClickLevelItem(item)}
                          >
                            {item.name}
                          </a>
                        </div>
                        <div className="separator opacity-75"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="layout">
                  <div className="row">
                    <div className="col col-sm-12 col-md-6 col-lg-4 mb-5">
                      <div className="card shadow-sm">
                        <div
                          className="card-header"
                          style={{ padding: '0px 1.25rem' }}
                        >
                          <h3 className="card-title fw-bold">
                            {t('Hierarchy')}
                          </h3>
                        </div>
                        <div
                          className="card-body"
                          style={{
                            height: '60vh',
                            overflowY: 'auto',
                            padding: '1rem 1rem',
                          }}
                        >
                          <CompanyStructureTree
                            unitsState={unitsState}
                            handleGetUnitDetail={handleGetUnitDetail}
                            unitTreeFocus={unitTreeFocus['id']}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-8 shadow-sm p-5 mb-5">
                      <div className="tab-content">
                        {isEmpty(unitDetailState) ? (
                          <></>
                        ) : (
                          <div>
                            <div className="d-flex justify-content-center align-items-center mb-4">
                              <span className="flex-grow-1 w-50 bd-highlight fw-bold fs-4 me-3">
                                {unitDetailState.name}
                              </span>
                              <span className="badge badge-light-primary d-flex me-6">
                                <i className="fa fa-circle fs-10 text-primary mr-2"></i>
                                &ensp;
                                {unitDetailState.status ? 'Hoạt động' : ''}
                              </span>
                              <span className="text-end">
                                <a
                                  // onClick={handleUpdateUnitStatus}
                                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1"
                                >
                                  <i className="ki-outline ki-switch fs-1 hover-scale"></i>
                                </a>

                                <a
                                  className="btn btn-icon btn-bg-light btn-color-warning btn-sm ms-1"
                                  onClick={() =>
                                    handleEditUnit(
                                      unitDetailState?.id,
                                      unitDetailState.unit_level.code,
                                    )
                                  }
                                >
                                  <i className="ki-outline ki-pencil fs-1 hover-scale"></i>
                                </a>

                                <a
                                  onClick={() =>
                                    handleDeleteUnit(
                                      unitDetailState?.id,
                                      unitDetailState.name,
                                    )
                                  }
                                  className="btn btn-icon btn-bg-light btn-color-danger btn-sm ms-1"
                                >
                                  <i className="ki-outline ki-trash fs-1 hover-scale"></i>
                                </a>
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                              <div>
                                <p>Mã đơn vị: {unitDetailState.unit_code}</p>
                                <p>
                                  Cấp tổ chức: {unitDetailState.unit_level.name}
                                </p>
                              </div>
                              <div>
                                <p>Mã số thuế: {unitDetailState.tax_code}</p>
                                <p>Ngày tạo: {unitDetailState.created_at}</p>
                              </div>
                              <div>
                                <p>
                                  Ngày thành lập:{' '}
                                  {unitDetailState.establishment_date}
                                </p>
                              </div>
                            </div>
                            <div>Địa chỉ: {unitDetailState.address}</div>
                            <div>
                              {unitDetailState.mandates
                                ? `Chức năng, nhiệm vụ: ${unitDetailState.mandates}`
                                : ''}
                            </div>
                            <div className="child-units table-responsive">
                              <table className="table table-hover table-rounded table-striped border gy-7 gs-7 mt-10">
                                <thead>
                                  <tr className="fw-semibold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                                    <th>Tên đơn vị</th>
                                    <th>Mã đơn vị</th>
                                    <th>Cấp đơn vị</th>
                                    <th>Trạng thái</th>
                                    <th className="text-end">Hành động</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {!isEmpty(unitDetailState.child_units) &&
                                    map(
                                      unitDetailState.child_units,
                                      (cuItem, idx) => (
                                        <tr key={idx}>
                                          <td>{cuItem.name}</td>
                                          <td>{cuItem.unit_code}</td>
                                          <td>{cuItem.unit_level.name}</td>
                                          <td>
                                            <span
                                              className={`badge badge-light-${
                                                cuItem.status
                                                  ? 'primary'
                                                  : 'danger'
                                              }`}
                                            >
                                              Hoạt động
                                            </span>
                                          </td>
                                          <td className="text-end">
                                            <a
                                              onClick={handleUpdateUnitStatus}
                                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                            >
                                              <i className="ki-outline ki-switch fs-2 hover-scale"></i>
                                            </a>

                                            <a
                                              className="btn btn-icon btn-bg-light btn-active-color-warning btn-sm me-1"
                                              onClick={() =>
                                                handleEditUnit(
                                                  cuItem?.id,
                                                  cuItem.unit_level.code,
                                                )
                                              }
                                            >
                                              <i className="ki-outline ki-pencil fs-2 hover-scale"></i>
                                            </a>

                                            <a
                                              onClick={() =>
                                                handleDeleteUnit(
                                                  cuItem?.id,
                                                  cuItem.name,
                                                )
                                              }
                                              className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
                                            >
                                              <i className="ki-outline ki-trash fs-2 hover-scale"></i>
                                            </a>
                                          </td>
                                        </tr>
                                      ),
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`diagram tab-pane fade bg-white pb-5 custom-tree-remove-root ${
                  currentTab === 1 ? 'active show' : ''
                }`}
              >
                {unitDetailState && (
                  <DiagramComponent data={[unitDetailState]} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isLoading && isShowViewCompanyModal && (
        <CommonModal isShow={isShowViewCompanyModal} maxWidth="mw-800px">
          <ViewCompanyModal
            isUpdate={isUpdateUnit}
            setIsShowModal={setIsShowViewCompanyModal}
            handleCreateUnit={handleCreateUnit}
            handleUpdateUnit={handleUpdateUnit}
          ></ViewCompanyModal>
        </CommonModal>
      )}
      {!isLoading && isShowViewDepartmentModal && (
        <CommonModal isShow={isShowViewDepartmentModal} maxWidth="mw-800px">
          <ViewDepartmentModal
            isUpdate={isUpdateUnit}
            setIsShowModal={setIsShowViewDepartmentModal}
            handleCreateUnit={handleCreateUnit}
            handleUpdateUnit={handleUpdateUnit}
            treeData={buildTreeDataUnits}
          ></ViewDepartmentModal>
        </CommonModal>
      )}
      {!isLoading && isShowViewTeamModal && (
        <CommonModal isShow={isShowViewTeamModal} maxWidth="mw-800px">
          <ViewTeamModal
            isUpdate={isUpdateUnit}
            setIsShowModal={setIsShowViewTeamModal}
            handleCreateUnit={handleCreateUnit}
            handleUpdateUnit={handleUpdateUnit}
            treeData={buildTreeDataUnits}
          ></ViewTeamModal>
        </CommonModal>
      )}
      <SweetAlertDelete
        dataInfo={sweetAlertInfo}
        handleCloseSweetAlert={handleCloseSweetAlert}
        handleSubmitSweetAlert={handleSubmitSweetAlert}
      />
    </div>
  );
};

const mapStateToProps = ({ manageCompany }) => ({
  unitsState: manageCompany.units,
  positionsState: manageCompany.positions,
  levelsState: manageCompany.levels,
  unitDetailState: manageCompany.unitDetail,
  unitDetailEditState: manageCompany.unitDetailEdit,
  isLoading: manageCompany.isLoading,
  isError: manageCompany.isError,
  message: manageCompany.message,
});

const mapDispatchToProps = dispatch => {
  return {
    createNewUnit: payload =>
      dispatch({
        type: `${manageCompanyActions.createNewUnitPending.type}_saga`,
        payload,
      }),
    getListPosition: payload =>
      dispatch({
        type: `${manageCompanyActions.getListPositionPending.type}_saga`,
        payload,
      }),
    getListLevel: payload =>
      dispatch({
        type: `${manageCompanyActions.getListLevelPending.type}_saga`,
        payload,
      }),
    getListUnit: payload =>
      dispatch({
        type: `${manageCompanyActions.getListUnitPending.type}_saga`,
        payload,
      }),
    getUnitDetail: payload =>
      dispatch({
        type: `${manageCompanyActions.getUnitDetailPending.type}_saga`,
        payload,
      }),
    getUnitDetailEdit: payload =>
      dispatch({
        type: `${manageCompanyActions.getUnitDetailEditPending.type}_saga`,
        payload,
      }),
    updateUnit: payload =>
      dispatch({
        type: `${manageCompanyActions.updateUnitPending.type}_saga`,
        payload,
      }),
    deleteUnit: payload =>
      dispatch({
        type: `${manageCompanyActions.deleteUnitPending.type}_saga`,
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCompany);
