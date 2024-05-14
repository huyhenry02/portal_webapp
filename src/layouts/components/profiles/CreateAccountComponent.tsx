import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import InfoAccountComponent from './InfoAccountComponent';
import InfoUserAccountComponent from './InfoUserAccountComponent';
import InfoRoleAccountComponent from './InfoRoleAccountComponent';
import { IAccount, IEmployeeDetail, IRoles } from '../../../stores/types';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { manageProfileActions } from '../../../stores/slices/manageProfile.slice';

type ICreateAccountComponent = {
  show?: boolean;
  roles?: IRoles[];
  employeeDetail?: IEmployeeDetail;
  employeeId: string;
  onClose?: (submitSuccess?: boolean) => void;
  createAccount: (payload: {
    username?: string;
    password: string;
    role: string;
    status: string;
    employeeId: string;
  }) => void;
  updateAccount: (payload: {
    userId: string;
    password: string;
    role: string;
    status: string;
  }) => void;
  isLoadingState: boolean;
  isErrorState: boolean;
  isUpdate: boolean;
  accountData: IAccount;
};

const CreateAccountComponent: React.FC<ICreateAccountComponent> = ({
  show = false,
  roles = [],
  employeeDetail,
  employeeId,
  isLoadingState,
  isErrorState,
  onClose,
  createAccount,
  updateAccount,
  isUpdate = false,
  accountData,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('0');
  const [status, setStatus] = useState('0');
  const [isSubmit, setIsSubmit] = useState(false);

  const resetState = () => {
    setIsLoading(false);
    setPassword('');
    setRole('0');
    setStatus('0');
    setIsSubmit(false);
  };

  const handleCloseModal = () => {
    setIsShow(false);
    onClose && onClose();
  };

  useEffect(() => {
    setIsShow(show);
    resetState();
  }, [show]);

  const handleCancelRequest = () => {
    handleCloseModal();
  };

  const checkSubmitValid = () => {
    let check = role && role !== '0' && status && status !== '0';
    if (!isUpdate) {
      check = check && password && password.length >= 6;
    }
    return check;
  };

  const handleSubmitRequest = () => {
    if (!checkSubmitValid()) {
      return;
    }
    setIsLoading(true);
    setIsSubmit(true);
    if (isUpdate && accountData) {
      updateAccount({
        userId: accountData.id,
        password,
        role,
        status,
      });
    } else {
      createAccount({
        username: employeeDetail?.employeeCode,
        password,
        role,
        status,
        employeeId,
      });
    }
  };

  useEffect(() => {
    setRole(accountData ? accountData.roleId : '0');
    setStatus(accountData ? accountData.status : '0');
  }, [accountData]);

  useEffect(() => {
    console.log(isLoadingState, isErrorState, isSubmit);
    if (!isLoadingState) {
      setIsLoading(isLoadingState);
      if (!isErrorState && isSubmit) {
        setIsShow(false);
        onClose && onClose(true);
      }
    }
  }, [isLoadingState, isErrorState]);

  return (
    <CommonModal isShow={isShow}>
      <div className="modal-content rounded">
        <div className="modal-header pb-0 border-0 justify-content-end">
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <i
              className="ki-outline ki-cross fs-1"
              onClick={handleCloseModal}
            ></i>
          </div>
        </div>

        <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <InfoAccountComponent
            roles={roles}
            employeeDetail={employeeDetail}
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
            accountData={accountData}
            isUpdate={isUpdate}
          />
          <InfoUserAccountComponent employeeDetail={employeeDetail} />
          <hr />
          <InfoRoleAccountComponent roleSelected={role} />
          <hr />
          <div className="text-end">
            <button
              type="reset"
              className="btn btn-bg-secondary me-3"
              onClick={handleCancelRequest}
            >
              Hủy bỏ
            </button>
            <button
              className="btn btn-bg-success me-3"
              disabled={isLoading || !checkSubmitValid()}
              onClick={handleSubmitRequest}
            >
              <span className="indicator-label">
                {!isLoading ? (
                  isUpdate ? (
                    'Cập nhật tài khoản'
                  ) : (
                    'Tạo tài khoản'
                  )
                ) : (
                  <>
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

const mapStateToProps = ({ manageProfile }) => ({
  isLoadingState: manageProfile.isLoading,
  isErrorState: manageProfile.isError,
});

const mapDispatchToProps = dispatch => {
  return {
    createAccount: payload =>
      dispatch({
        type: `${manageProfileActions.createAccountPending.type}_saga`,
        payload,
      }),
    updateAccount: payload =>
      dispatch({
        type: `${manageProfileActions.updateAccountPending.type}_saga`,
        payload,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountComponent);
