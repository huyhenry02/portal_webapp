// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        managementUser: 'Management User',
        rolePermission: 'Role Permission',
        electronicRecord: 'Electronic Record',
        managementAppointment: 'Management Appointment',
        managementAsset: 'Management Asset',
        managementCompany: 'Management Company',
        language: 'Language',
        english: 'English',
        vietnamese: 'Tiếng Việt',
        logout: 'Log out',
        myProfile: 'My Profile',
        myProject: 'My Project',
        accountSettings: 'Account Settings',
      },
    },
    vi: {
      translation: {
        managementUser: 'Quản lý người dùng',
        rolePermission: 'Nhóm Quyền',
        electronicRecord: 'Hồ sơ điện tử',
        managementAppointment: 'Quản lý lịch hẹn',
        managementAsset: 'Quản lý thiết bị',
        managementCompany: 'Quản lý công ty',
        language: 'Ngôn ngữ',
        english: 'English',
        vietnamese: 'Tiếng Việt',
        logout: 'Đăng xuất',
        myProfile: 'Thông tin cá nhân',
        myProject: 'Dự án cá nhân',
        accountSettings: 'Cài đặt tài khoản',
      },
    },
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const translate = key => {
  return i18n.t(key);
};

export default i18n;
