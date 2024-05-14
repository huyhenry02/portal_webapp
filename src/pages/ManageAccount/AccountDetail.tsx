import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ConfirmModal from '../../layouts/commons/confirmModal/ConfirmModel';
import {
  useDeleteUser,
  useFetchUserById,
  useUpdateUser,
} from '../../hooks/_userQuery';
import { toast } from 'react-toastify';
import { get, isEmpty } from 'lodash';
import {
  SEX_TITLE,
  STATUS_DEACTIVATE,
  STATUS_TITLE,
  STATUS_ACTIVE,
} from '../../constants/constant';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import { useTranslation } from 'react-i18next';

type IUserDetail = {
  avatar: string;
  fullName: string;
  employeeCode: string;
  status: string;
  username: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  sex: string;
  createdAt: string;
  workUnit: string;
  positionName: string;
};

const AccountDetail = () => {
  const [userDetail, setUserDetail] = useState<IUserDetail>({} as IUserDetail);
  const [isDeleted, setIsDeleted] = useState(false);
  const { id } = useParams();
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] =
    useState(false);
  const [isShowConfirmPauseModal, setIsShowConfirmPauseModal] = useState(false);
  const [isShowConfirmActiveModal, setIsShowConfirmActiveModal] =
    useState(false);
  const {
    isLoading: isLoadingUsers,
    isError: isErrorFetchUser,
    error: errorFetchUser,
    data: responseFetchUser,
    isSuccess: isSuccessFetchUser,
  } = useFetchUserById(id);

  const {
    mutate: updateUser,
    // isLoading: isLoadingUpdateUser,
    // isSuccess: isSuccessUpdateUser,
  } = useUpdateUser();

  const {
    mutate: deleteUser,
    // isLoading: isLoadingUpdateUser,
    isSuccess: isSuccessDeleteUser,
  } = useDeleteUser();

  if (isErrorFetchUser) {
    toast.error(get(errorFetchUser, 'message', 'Server Error'), { toastId: 1 });
  }

  const handleEditUser = () => {
    console.log(id);
  };
  const handlePauseUser = () => {
    if (id) {
      updateUser({
        user_id: id,
        status: STATUS_DEACTIVATE,
      });
    }
  };
  const handleActiveUser = () => {
    if (id) {
      updateUser({
        user_id: id,
        status: STATUS_ACTIVE,
      });
    }
  };

  const handleDeleteUser = () => {
    if (id) {
      deleteUser(id);
    }
  };

  useEffect(() => {
    if (isSuccessDeleteUser) {
      setUserDetail(prevState => ({
        ...prevState,
        status: STATUS_DEACTIVATE,
      }));
      setIsDeleted(true);
    }
  }, [isSuccessDeleteUser]);

  useEffect(() => {
    if (isSuccessFetchUser && responseFetchUser?.data?.data) {
      const user = responseFetchUser?.data?.data;
      setUserDetail({
        avatar: user.avatar,
        fullName: user.name,
        employeeCode: user.employee_code,
        status: user.status,
        username: user.username,
        email: user.email,
        phoneNumber: user.phone_number,
        birthday: user.dob,
        sex: user.gender,
        createdAt: user.created_at,
        workUnit: user.subsidiary,
        positionName: user.position,
      });
    }
  }, [isSuccessFetchUser]);
  let originalUrl = '/assets/media/avatars/no_avatar.png';
  if (!isEmpty(userDetail.avatar)) {
    originalUrl = userDetail.avatar;
  }
  const { t } = useTranslation();
  return (
    <div className="app-container">
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap">
            <div className="me-7 mb-4 mt-5">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img src={originalUrl} alt="image" />
                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <a
                      href="#"
                      className="text-gray-900 text-hover-primary fs-2 fw-bold me-1"
                    >
                      {userDetail.fullName}
                    </a>
                    <a href="#">
                      <i className="ki-outline ki-verify fs-1 text-primary"></i>
                    </a>
                  </div>

                  <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                    >
                      <i className="ki-outline ki-profile-circle fs-4 me-1"></i>
                      {t('employeeCode')}: {userDetail.employeeCode}
                    </a>
                  </div>
                  <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                    >
                      <i className="ki-outline ki-status fs-4 me-1"></i>
                      {get(STATUS_TITLE, `${userDetail.status}`, '')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">{t('myProfile')}</h3>
          </div>
          <div className="d-flex align-items-center">
            <a
              className="btn btn-sm btn-primary align-self-center me-2 disabled"
              onClick={handleEditUser}
            >
              {t('edit')}
            </a>
            {userDetail.status === 'active' ? (
              <a
                className={`btn btn-sm btn-warning align-self-center me-2 ${
                  isDeleted ? 'disabled' : ''
                }`}
                onClick={() =>
                  setIsShowConfirmPauseModal(prevState => !prevState)
                }
              >
                {t('pause')}
              </a>
            ) : (
              <a
                className={`btn btn-sm btn-warning align-self-center me-2 ${
                  isDeleted ? 'disabled' : ''
                }`}
                onClick={() =>
                  setIsShowConfirmActiveModal(prevState => !prevState)
                }
              >
                {t('active')}
              </a>
            )}
            <a
              className={`btn btn-sm btn-danger align-self-center ${
                isDeleted ? 'disabled' : ''
              }`}
              onClick={() =>
                setIsShowConfirmDeleteModal(prevState => !prevState)
              }
            >
              {t('delete')}
            </a>
          </div>
        </div>

        <div className="card-body p-9">
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              {t('account')}
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {userDetail?.username}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              {t('email')}
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {userDetail?.email}
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              {t('phoneNumber')}
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {userDetail?.phoneNumber}
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              {t('birthday')}
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {userDetail?.birthday}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              {t('gender')}
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {get(SEX_TITLE, `${userDetail.sex}`, '')}
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              {t('createdAt')}
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {userDetail.createdAt}
              </span>
            </div>
          </div>
          <hr className="text-gray-400" />

          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              {t('subsidiary')}
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {userDetail?.workUnit}
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              {t('jobTitle')}
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {userDetail?.positionName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isShowConfirmDeleteModal ? (
        <ConfirmModal
          show={isShowConfirmDeleteModal}
          onConfirm={handleDeleteUser}
          onClose={() => setIsShowConfirmDeleteModal(false)}
          title={t('deleteAccount')}
          action="delete"
          message="Bạn có chắc chắn muốn xóa tài khoản này không?"
          width="450"
        />
      ) : (
        <></>
      )}
      {isShowConfirmPauseModal ? (
        <ConfirmModal
          show={isShowConfirmPauseModal}
          onConfirm={handlePauseUser}
          onClose={() => setIsShowConfirmPauseModal(false)}
          title={t('pauseAccount')}
          action="pause"
          message="Bạn có chắc chắn muốn tạm dừng tài khoản này không?"
          width="450"
        />
      ) : (
        <></>
      )}
      {isShowConfirmActiveModal ? (
        <ConfirmModal
          show={isShowConfirmActiveModal}
          onConfirm={handleActiveUser}
          onClose={() => setIsShowConfirmActiveModal(false)}
          title="Kích hoạt tài khoản?"
          action="update"
          message="Bạn có chắc chắn muốn kích hoạt tài khoản này không?"
          width="450"
        />
      ) : (
        <></>
      )}
      <DefaultLoading isShow={isLoadingUsers} />
    </div>
  );
};

export default AccountDetail;
