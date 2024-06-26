// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        manageUser: 'Manage User',
        rolePermission: 'Role Permission',
        informationRolePermission: 'Information Role Permission',
        detailRolePermission: 'Detail',
        nameRolePermission: 'Name',
        electronicRecord: 'Electronic Record',
        manageAppointment: 'Manage Appointment',
        detailAppointment: 'Detail',
        idAppointment: 'ID',
        informationAppointment: 'Information ',
        appointmentInformation: 'Appointment Information',
        appointmentPerson: 'Appointment Person',
        manageAsset: 'Manage Asset',
        detailAsset: 'Detail',
        informationAsset: 'Information ',
        manageCompany: 'Manage Company',
        language: 'Language',
        english: 'English',
        vietnamese: 'Tiếng Việt',
        logout: 'Log out',
        myProfile: 'My Profile',
        myProject: 'My Project',
        accountSettings: 'Account Settings',
        manageElectronicRecord: ' Manage Electronic Record',
        all: 'All',
        active: 'Active',
        inactive: 'Inactive',
        activeAccount: 'Active Account?',
        pause: 'Pause',
        fullName: 'Full Name',
        email: 'Email',
        position: 'Position',
        status: 'Status',
        selectStatus: 'Select Status',
        createdAt: 'Created At',
        pending: 'Pending',
        approved: 'Approved',
        processing: 'Processing',
        completed: 'Completed',
        rejected: 'Rejected',
        rejectAppointment: 'Reject',
        refuse: 'Refuse',
        confirm: 'Confirm',
        startTime: 'Start Time',
        endTime: 'End Time',
        appointee: 'Appointee',
        stt: 'Sequence',
        code: 'Code',
        manageCode: 'Manage Code',
        manageUnit: 'Manage Unit',
        nameAsset: 'Name',
        role: 'Role',
        addRole: 'Add Role',
        nameRole: 'Name',
        nameUnit: 'Name',
        createdAtAccount: 'Account Created At',
        createdAtElectronicRecord: 'Created At',
        createdElectronicRecord: 'Created Electronic Record ',
        listAppointment: 'List Appointment',
        listAsset: 'List Asset',
        selectAsset: 'Select Asset',
        Hierarchy: 'Hierarchy',
        HierarchyDiagram: 'Hierarchy Diagram',
        curriculumVitae: 'Curriculum Vitae',
        contract: 'Contract',
        health: 'Health',
        nationality: 'Nationality',
        selectNationality: 'Select Nationality',
        phoneNumber: 'Phone Number',
        birthday: 'Birthday',
        gender: 'Gender',
        selectGender: 'Select Gender',
        homeTown: 'Home Town',
        maritalStatus: 'Marital Status',
        ethnic: 'Ethnic',
        religions: 'Religion',
        selectReligions: 'Select Religion',
        identification: 'Identification',
        placeOfIssue: 'Place Of Issue',
        dateOfIssue: 'Date Of Issue',
        identificationFront: 'Identification Front',
        identificationBack: 'Identification Back',
        faceImage: 'Face Image',
        fingerprint: 'Fingerprint',
        taxCode: 'Tax Code',
        onboardDate: 'Onboard Date',
        directManager: 'Direct Manager',
        subsidiary: 'Subsidiary',
        employeeCode: 'Employee Code',
        address: 'Address',
        bankAccountNumber: 'Bank Account Number',
        bankAccountName: 'Bank Account Name',
        bankName: 'Bank Name',
        bankBranch: 'Bank Branch',
        company: 'Company',
        startDate: 'Start Date',
        endDate: 'End Date',
        jobTitle: 'Job Title',
        selectJobTitle: 'Select Job Title',
        workingHistory: 'Working History',
        male: 'Male',
        female: 'Female',
        selectManager: ' Select Manager',
        married: 'Married',
        single: 'Single',
        createAsset: 'Create Asset',
        editAsset: 'Edit Asset',
        originalPrice: 'Original Price',
        residualPrice: 'Residual Price',
        insuranceContract: 'Insurance Contract',
        assetImages: 'Asset Images',
        selectSubsidiary: 'Select Subsidiary ',
        createNew: 'Create',
        addAsset: 'Add Asset',
        createRole: 'Create ',
        detailRole: 'Detail',
        createHierarchy: 'Create Hierarchy',
        edit: 'Edit',
        unitCode: 'Unit Code',
        establishmentDate: 'Establishment Date',
        registrationNumber: 'Registration Number',
        representative: 'Representative',
        save: 'Save',
        Department: 'Department',
        selectDepartment: 'Select Department',
        managers: 'Managers',
        mandates: 'Mandates',
        team: 'Team',
        home: 'Home',
        update: 'Update',
        delete: 'Delete',
        account: 'Account',
        describe: 'Describe',
        back: 'Back',
        history: 'History',
        pleaseWait: 'Please Wait',
        next: 'Next',
        reason: 'Reason',
        reasonReject: 'Reason Reject Appointment ',
        reasonRepair: 'Reason Repair',
        reasonDelivery: 'Reason Delivery',
        image: 'Image',
        assetCode: 'Asset Code',
        information: 'Information',
        delivery: 'Delivery',
        createNewDelivery: 'Create New Delivery',
        maintenance: 'Maintenance',
        createDelivery: 'Create Delivery',
        damageReport: 'Damage Report',
        ballotName: 'Ballot Name',
        ticketCreator: 'Ticket Creator',
        receiver: 'Receiver',
        creationTime: 'Creation Time',
        creationAt: 'Creation At',
        recipients: 'Recipients',
        deliveryUnit: 'Delivery Unit',
        attachments: 'Attachments',
        controlNumber: 'Control Number',
        lostDevice: 'Lost Device',
        describeFailure: 'Describe Failure',
        causeOfDamage: 'Cause Of Damage',
        propose: 'Propose',
        deviceEditHistory: 'Device Edit History',
        historyAppointment: 'History Appointment',
        deleteAccount: 'Delete Account ?',
        pauseAccount: 'Pause Account ?',
        bloodPressure: 'Blood Pressure',
        heartbeat: 'Heartbeat',
        height: 'Height',
        weight: 'Weight',
        bloodGroup: 'Blood Group',
        medicalNote: 'Medical Note',
        healthRecords: 'Health Records',
        codeRecords: 'Code Records',
        contractCode: 'Contract Code',
        contractType: 'Contract Type',
        selectContractType: 'Select Contract Type',
        contractFiles: 'Contract ',
        rank: 'Rank',
        skillCoefficient: 'Skill Coefficient',
        workplace: 'Work Place',
        selectWorkplace: ' Select Work Place',
        workingType: 'Working Type',
        selectWorkingType: 'Select Working Type',
        effectiveDate: 'Effective Date',
        signDate: 'Sign Date',
        signer: 'Signer',
        digitalSignature: 'Digital Signature',
        salaryAndAllowances: 'Salary And Allowances',
        note: 'Note',
        paymentType: 'Payment Type',
        selectPaymentType: 'Select Payment Type',
        salary: 'Salary',
        allowances: 'Allowances',
        workProcess: 'Work Process',
        transferFromDepartment: 'Transfer From Department',
        arriveDepartment: 'Arrive Department',
        evidenceOfJobTransfer: 'Evidence Of Job Transfer',
        insurance: 'Insurance',
        insuranceBookNumber: 'Insurance Book Number',
        bookStatus: 'Book Status',
        legalEntityClose: 'Legal Entity Close',
        numberCard: 'Number Card',
        provinceCodeReleased: 'Province Code Released',
        medicalRegister: 'Medical Register',
        insuranceCardReceiptDate: 'Insurance Card Receipt Date',
        insuranceCardReturnDate: 'Insurance Card Return Date',
        historyResolveInsurance: 'History Resolve Insurance',
        receiptDate: 'Receipt Date',
        paymentDate: 'Payment Date',
        completeDate: 'Complete Date',
        detailRecords: 'Detail Records',
        changePassword: 'Change Password',
        profile: 'Profile',
        newPassword: 'New Password',
        oldPassword: 'Old Password',
        confirmPassword: 'Confirm Password',
        weak: 'Weak',
        veryWeak: 'Very Weak',
        medium: 'Medium',
        veryGood: 'Very Good',
        regime: 'Regime',
        selectRegime: 'Select Regime',
        activate: 'Activate',
        inactivate: 'Inactivate',
        notDigitallySigned: 'Not Digitally Signed',
        action: 'Action',
        confirm_delete: 'Are you sure delete',
        EMPTY_PASSWORD: 'Password is required ',
        CREATE_NEW_UNIT_SUCCESS: 'Create unit successfully',
        CREATE_NEW_UNIT_FAIL: 'Create unit failed',
        UPDATE_UNIT_SUCCESS: 'Update unit successfully',
        UPDATE_UNIT_FAIL: 'Update unit failed',
        REMOVE_UNIT_SUCCESS: 'Delete unit successfully',
        REMOVE_UNIT_FAIL: 'Delete unit failed',
        LIST_EMPLOYEE_ONL_SUCCESS: 'Get list employees successfully',
        CREATE_ACCOUNT_SUCCESS: 'Create account successfully',
        LIST_ROLE_ONL_SUCCESS: 'Get list roles successfully',
        DELETE_ROLE_ONL_SUCCESS: 'Delete role successfully',
        DELETE_ROLE_ONL_FAILED: 'Delete role failed',
        UPLOAD_FILES_SUCCESS: 'Upload files successfully',
        UPLOAD_FILES_FAIL: 'Upload files failed',
        OLD_PASSWORD_INCORRECT: 'Old password invalid',
        LIST_APPOINTMENT_SUCCESS: 'Get data appointments successfully',
        UPDATE_STATUS_APPOINTMENT_SUCCESS:
          'Update status appointment successfully',
        USER_PROFILE_SUCCESS: 'Get detail profile successfully',
        CHANGE_PASSWORD_SUCCESS: 'Change password successfully',
        SEND_EMAIL_SUCCESS: 'Send Email successfully',
        LIST_ASSET_SUCCESS: 'Get list assets successfully',
        CREATE_ASSET_MAINTENANCE_SUCCESS:
          'Create asset maintenance successfully',
        CREATE_ASSET_DELIVERY_SUCCESS:
          'Create asset asset delivery successfully',
        CREATE_ASSET_SUCCESS: 'Create asset successfully',
        UPDATE_STATUS_ASSET_SUCCESS: 'Update asset status successfully',
        UPDATE_ASSET_SUCCESS: 'Update asset successfully',
        UPDATE_USER_SUCCESS: 'Update user successfully',
      },
    },
    vi: {
      translation: {
        manageUser: 'Quản lý người dùng',
        rolePermission: 'Nhóm Quyền',
        informationRolePermission: 'Thông tin nhóm quyền',
        nameRolePermission: 'Tên Nhóm Quyền',
        detailRolePermission: 'Chi tiết nhóm quyền',
        electronicRecord: 'Hồ sơ điện tử',
        manageAppointment: 'Quản lý lịch hẹn',
        detailAppointment: 'Chi tiết lịch hẹn',
        informationAppointment: 'Thông tin lịch hẹn',
        appointmentInformation: 'Thông tin người hẹn',
        idAppointment: 'ID lịch hẹn',
        appointmentPerson: 'Người được hẹn',
        manageAsset: 'Quản lý thiết bị',
        selectAsset: 'Chọn loại thiết bị',
        detailAsset: 'Chi tiết thiết bị',
        informationAsset: 'Thông tin thiết bị',
        manageCompany: 'Quản lý công ty',
        language: 'Ngôn ngữ',
        english: 'English',
        vietnamese: 'Tiếng Việt',
        logout: 'Đăng xuất',
        myProfile: 'Thông tin cá nhân',
        myProject: 'Dự án cá nhân',
        accountSettings: 'Cài đặt tài khoản',
        manageElectronicRecord: 'Quản lý hồ sơ điện tử',
        all: 'Tất cả',
        active: 'Hoạt động',
        inactive: 'Tạm dừng',
        activeAccount: 'Kích hoạt tài khoản ?',
        pause: 'Tạm dừng',
        fullName: 'Họ Tên',
        email: 'Email',
        position: 'Vị trí',
        status: 'Trạng thái',
        selectStatus: 'Chọn trạng thái',
        createdAt: 'Ngày tạo',
        pending: 'Chờ duyệt',
        approved: 'Đã duyệt',
        processing: 'Đang diễn ra',
        completed: 'Hoàn thành',
        rejected: 'Hủy',
        rejectAppointment: 'Hủy lịch hẹn',
        refuse: 'Từ chối',
        confirm: 'Xác nhận',
        startTime: 'Bắt đầu',
        endTime: 'Kết thúc',
        appointee: 'Người đặt lịch',
        stt: 'STT',
        code: 'Mã',
        manageCode: 'Mã quản lý',
        manageUnit: 'Đơn vị quản lý',
        nameAsset: 'Tên thiết bị',
        role: 'Phân quyền',
        addRole: 'Thêm quyền',
        nameRole: 'Tên phân quyền',
        createdAtAccount: 'Ngày tạo tài khoản',
        createdAtElectronicRecord: 'Ngày tạo HSDT',
        createdElectronicRecord: 'Tạo hồ sơ điện tử',
        listAppointment: 'Danh sách lịch hẹn',
        listAsset: 'Danh sách thiết bị',
        Hierarchy: 'Cơ cấu tổ chức ',
        HierarchyDiagram: 'Sơ đồ cơ cấu',
        curriculumVitae: 'Sơ yếu lý lịch',
        contract: 'Hợp đồng',
        health: 'Sức khỏe',
        nationality: ' Quốc tịch',
        selectNationality: 'Chọn quốc tịch',
        phoneNumber: 'Số điện thoại',
        birthday: 'Ngày sinh',
        gender: 'Giới Tính',
        selectGender: ' Chọn Giới tính',
        homeTown: 'Quê quán',
        maritalStatus: 'Tình trạng hôn nhân',
        ethnic: 'Dân tộc',
        religions: 'Tôn giáo',
        selectReligions: 'Chọn tôn giáo',
        identification: 'Số CCCD',
        placeOfIssue: 'Nơi cấp',
        dateOfIssue: 'Ngày cấp',
        identificationFront: 'Ảnh CCCD mặt trước',
        identificationBack: 'Ảnh CCCD mặt sau',
        faceImage: 'Ảnh khuôn mặt',
        fingerprint: 'Ảnh vân tay',
        taxCode: 'Mã số thuế',
        onboardDate: 'Ngày làm việc chính thức',
        directManager: 'Người quản lý trực tiếp',
        subsidiary: 'Đơn vị công tác',
        employeeCode: 'Mã nhân sự',
        address: 'Địa chỉ',
        bankAccountNumber: 'Số tài khoản',
        bankAccountName: 'Tên tài khoản',
        bankName: 'Ngân hàng',
        bankBranch: 'Chi nhánh',
        company: 'Công ty',
        startDate: 'Từ ngày',
        endDate: 'Đến ngày',
        jobTitle: 'Chức danh',
        selectJobTitle: 'Chọn chức danh',
        workingHistory: 'Lịch sử làm việc',
        male: 'Nam',
        female: 'Nữ',
        selectManager: 'Chọn người quản lý',
        married: 'Đã kết hôn',
        single: 'Độc thân',
        createAsset: 'Tạo thiết bị',
        editAsset: 'Sửa thông tin thiết bị',
        originalPrice: 'Giá thực tế',
        residualPrice: 'Giá dư',
        insuranceContract: 'Hợp đồng bảo hiểm',
        assetImages: 'Ảnh thiết bị',
        selectSubsidiary: 'Chọn đơn vị công tác',
        createNew: 'Tạo mới',
        addAsset: 'Thêm thiết bị',
        createRole: 'Tạo phân quyền',
        detailRole: 'Chi tiết quyền',
        createHierarchy: 'Tạo cơ cấu',
        edit: 'Chỉnh sửa ',
        nameUnit: 'Tên đơn vị',
        unitCode: 'Mã đơn vị',
        establishmentDate: 'Ngày thành lập',
        registrationNumber: 'Mã số DKKD',
        representative: 'Người đại diện pháp luật',
        save: 'Lưu',
        Department: 'Phòng ban',
        selectDepartment: 'Chọn phòng ban',
        managers: 'Người quản lý',
        mandates: 'Nhiệm vụ',
        team: 'Tổ đội',
        home: 'Trang chủ',
        update: 'Cập nhật',
        delete: 'Xóa',
        account: 'Tài khoản',
        describe: 'Mô tả nhóm quyền',
        back: 'Quay lại',
        history: 'Lịch sử',
        pleaseWait: 'Vui lòng đợi...',
        next: 'Tiếp theo',
        reason: 'Lý do đặt lịch hẹn',
        reasonReject: 'Lý do hủy lịch hẹn',
        reasonRepair: 'Lý do sửa chữa',
        reasonDelivery: 'Lý do giao nhận',
        image: 'Ảnh thiết bị',
        assetCode: 'Mã thiết bị',
        information: 'Thông tin',
        delivery: 'Lich sử giao nhận',
        maintenance: 'Lịch sử bảo trì',
        createDelivery: 'Thêm phiếu giao nhận',
        createNewDelivery: 'Tạo phiếu giao nhận',
        damageReport: 'Báo cáo thiệt hại',
        ballotName: 'Tên phiếu',
        ticketCreator: 'Người tạo phiếu',
        receiver: 'Người nhận',
        creationTime: 'Thời gian tạo',
        creationAt: 'Ngày tạo phiếu',
        recipients: 'Nơi nhận',
        deliveryUnit: 'Đơn vị giao',
        attachments: 'Tài liệu kèm theo',
        controlNumber: 'Số kiểm soát',
        lostDevice: 'Mất thiết bị',
        describeFailure: 'Mô tả hỏng hóc',
        causeOfDamage: 'Nguyên nhân gây hư hỏng',
        propose: 'Đề xuất xử lý',
        deviceEditHistory: 'Lịch sử chỉnh sửa thiết bị',
        historyAppointment: 'Lịch sử lịch hẹn',
        deleteAccount: 'Xóa tài khoản ?',
        pauseAccount: 'Tạm dừng tài khoản ?',
        bloodPressure: 'Huyết áp',
        heartbeat: 'Nhịp tim',
        height: 'Chiều cao',
        weight: 'Cân nặng',
        bloodGroup: 'Nhóm máu',
        medicalNote: 'Lưu ý y tế',
        healthRecords: 'Hồ sơ sức khỏe',
        codeRecords: 'Mã hồ sơ',
        contractCode: 'Mã hợp đồng',
        contractType: 'Loại hợp đồng',
        selectContractType: 'Chọn loại hợp đồng',
        contractFiles: 'Hợp đồng',
        rank: 'Cấp bậc',
        skillCoefficient: 'Hệ số tay nghề',
        workplace: 'Nơi làm việc',
        workingType: 'Hình thức làm việc',
        selectWorkingType: 'Chọn hình thức làm việc',
        effectiveDate: 'Ngày hiệu lực',
        signDate: 'Ngày ký',
        signer: 'Người ký',
        digitalSignature: 'Ký số',
        salaryAndAllowances: 'Lương và phụ cấp',
        note: 'Ghi chú',
        paymentType: 'Hình thức lương',
        selectPaymentType: 'Chọn hình thức lương',
        salary: 'Số tiền',
        allowances: 'Phụ cấp',
        workProcess: 'Qúa trình làm việc',
        transferFromDepartment: 'Chuyển từ phòng ban',
        arriveDepartment: 'Đến phòng ban',
        evidenceOfJobTransfer: 'Minh chứng điều chuyển việc',
        insurance: 'Bảo hiểm',
        insuranceBookNumber: 'Số sổ bảo hiểm',
        bookStatus: 'Trạng thái số',
        legalEntityClose: 'Pháp nhân đóng',
        numberCard: 'Số thể BHYT',
        provinceCodeReleased: 'Mã tỉnh cấp',
        medicalRegister: 'ĐK khám chữa bệnh',
        insuranceCardReceiptDate: 'Ngày nhận thẻ BHYT',
        insuranceCardReturnDate: 'Ngày trả thẻ BHYT',
        historyResolveInsurance: 'Lịch sử giải quyết chế độ bảo hiểm',
        receiptDate: 'Ngày nhận hồ sơ',
        paymentDate: 'Ngày nhận tiền BH trả',
        completeDate: 'Ngày hoàn thiện thủ tục',
        detailRecords: 'Hồ sơ chi tiết',
        changePassword: 'Đổi mật khẩu',
        profile: 'Hồ sơ cá nhân',
        newPassword: 'Mật khẩu mới',
        oldPasword: 'Mật khẩu hiện tại',
        confirmPassword: 'Xác nhận lại mật khẩu mới',
        weak: 'Yếu',
        veryWeak: 'Rất yếu',
        medium: 'Trung bình',
        veryGood: 'Rất tốt',
        regime: 'Loại chế độ',
        selectRegime: 'Chọn loại chế độ',
        activate: 'Kích hoạt',
        inactivate: 'Không kích hoạt',
        notDigitallySigned: 'Không ký số',
        action: 'Hành động',
        confirm_delete: 'Bạn có chắc chắn muốn xóa',
        EMPTY_PASSWORD: 'Mật khẩu không được để trống',
        CREATE_NEW_UNIT_SUCCESS: 'Tạo đơn vị thành công',
        CREATE_NEW_UNIT_FAIL: 'Tạo đơn vị thất bại',
        UPDATE_UNIT_SUCCESS: 'Cập nhật đơn vị thành công',
        UPDATE_UNIT_FAIL: 'Cập nhật đơn vị thất bại',
        REMOVE_UNIT_SUCCESS: 'Xóa đơn vị thành công',
        REMOVE_UNIT_FAIL: 'Xóa đơn vị thất bại',
        LIST_EMPLOYEE_ONL_SUCCESS: 'Tải danh sách hồ sơ điện tử thành công',
        CREATE_ACCOUNT_SUCCESS: 'Tạo tài khoản thành công',
        LIST_ROLE_ONL_SUCCESS: 'Tải danh sách nhóm quyền thành công',
        DELETE_ROLE_ONL_SUCCESS: 'Xóa nhóm quyền thành công',
        DELETE_ROLE_ONL_FAILED: 'Xóa nhóm quyền thất bại',
        UPLOAD_FILES_SUCCESS: 'Tải hình ảnh thành công',
        UPLOAD_FILES_FAIL: 'Tải hình ảnh thất bại',
        OLD_PASSWORD_INCORRECT: 'Mật khẩu cũ không đúng',
        LIST_APPOINTMENT_SUCCESS: 'Tải danh sách lịch hẹn thành công',
        UPDATE_STATUS_APPOINTMENT_SUCCESS:
          'Cập nhật trạng thái lịch hẹn thành công',
        USER_PROFILE_SUCCESS: 'Tải hồ sơ cá nhân thành công',
        CHANGE_PASSWORD_SUCCESS: 'Thay đổi mật khẩu thành công',
        SEND_EMAIL_SUCCESS: 'Gửi Email thành công',
        LIST_ASSET_SUCCESS: 'Tải danh sách thiết bị thành công',
        CREATE_ASSET_MAINTENANCE_SUCCESS: 'Tạo phiếu bảo trì thành công',
        CREATE_ASSET_DELIVERY_SUCCESS: 'Tạo phiếu bàn giao thành công',
        CREATE_ASSET_SUCCESS: 'Tạo thiết bị thành công',
        UPDATE_STATUS_ASSET_SUCCESS: 'Cập nhật trạng thái thiết bị thành công',
        UPDATE_ASSET_SUCCESS: 'Sửa thiết bị thành công',
        UPDATE_USER_SUCCESS: 'Cập nhật thông tin người dùng thành công',
      },
    },
  },
  lng: localStorage.getItem('language') || 'vi',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const translate = key => {
  return i18n.t(key);
};

export default i18n;
