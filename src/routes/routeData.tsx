import React from 'react';
import ManageRole from '../pages/ManagerRole/ManageRole';
import Dashboard from '../pages/Dashboard/Dashboard';
import Test from '../pages/Test/Test';
import ManageProfile from '../pages/ManageProfile/ManageProfile';
import ManageUser from '../pages/ManageUser/ManageUser';
import CreateProfile from '../pages/ManageProfile/CreateProfile';

import ManageAppointment from '../pages/ManageAppointment/ManageAppointment';
import AppointmentDetailComponent from '../layouts/components/appointment/AppointmentDetailComponent';
import ManageCompany from '../pages/ManageCompany/ManageCompany';
import DiagramComponent from '../pages/ManageCompany/DiagramCompany';
import ManageAccounts from '../pages/ManageAccount/ManageAccounts';
import AccountDetail from '../pages/ManageAccount/AccountDetail';
import ManageAsset from '../pages/ManageAsset/ManageAsset';
import AssetDetailComponent from '../layouts/components/asset/AssetDetailComponent';
import EditProfile from '../pages/ManageProfile/EditProfile';
import RoleDetail from '../pages/ManagerRole/RoleDetail';
import { translate } from '../translates/translate';

const authorizedRoutes = [
  { path: '/', element: <Dashboard /> },
  { path: '/role-permission/role', element: <ManageRole /> },
  { path: '/role-permission/role/:id', element: <RoleDetail /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/manage_profile', element: <ManageProfile /> },
  { path: '/manage_user', element: <ManageUser /> },
  { path: '/manage_profile/create', element: <CreateProfile /> },
  { path: '/manage_profile/:id', element: <EditProfile /> },
  { path: '/appointment', element: <ManageAppointment /> },
  { path: '/appointment/detail/:id', element: <AppointmentDetailComponent /> },
  { path: '/test', element: <Test /> },
  { path: '/manage_company', element: <ManageCompany /> },
  { path: '/manage_company/diagram', element: <DiagramComponent /> },
  { path: '/accounts', element: <ManageAccounts /> },
  { path: '/accounts/detail/:id', element: <AccountDetail /> },
  { path: '/asset', element: <ManageAsset /> },
  { path: '/asset/detail/:id', element: <AssetDetailComponent /> },
];

const publicMenus = [
  { path: '/', name: 'Dashboard', icon: 'ki-element-11' },
  {
    path: '/accounts',
    name: translate('manageUser'),
    icon: 'ki-user',
    includes: ['/detail'],
  },
  {
    path: '/role-permission/role',
    name: translate('rolePermission'),
    icon: 'ki-pencil',
    // children: [{ path: '/role', name: translate('role') }],
  },
  {
    path: '/manage_profile',
    name: translate('electronicRecord'),
    icon: 'ki-element-plus',
    children: [
      {
        path: '',
        name: translate('manageElectronicRecord'),
        includes: ['/create'],
      },
    ],
  },
  {
    path: '/appointment',
    name: translate('manageAppointment'),
    icon: 'ki-calendar-8',
    // children: [{ path: '/', name: translate('listAppointment') }],
  },
  {
    path: '/asset',
    name: translate('manageAsset'),
    icon: 'ki-calendar-8',
    // children: [{ path: '/', name: translate('listAsset') }],
  },
  // { path: '/test', name: 'Test' },
  {
    path: '/manage_company',
    name: translate('manageCompany'),
    icon: 'ki-menu',
    children: [
      { path: '/', name: translate('Hierarchy') },
      // { path: '/diagram', name: translate('HierarchyDiagram') },
    ],
  },
];

export { publicMenus, authorizedRoutes };
