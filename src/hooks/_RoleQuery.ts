import { useQuery } from 'react-query';
import axiosInstance from '../services/axios.service';

const fetchRoleById = async (id?: string) => {
  return axiosInstance.get(`api/role/get?role_id=${id}`);
};
const fetchPermissionByRoleId = async (id?: string) => {
  return axiosInstance.get(`api/module/index?role_id=${id}`);
};

export const useFetchRoleById = (id?: string) => {
  return useQuery(['fetch_role_detail', id], () => fetchRoleById(id), {
    enabled: !!id,
  });
};
export const useFetchPermissionByRoleId = (id?: string) => {
  return useQuery(
    ['fetch_permissions', id],
    () => fetchPermissionByRoleId(id),
    {
      enabled: !!id,
    },
  );
};
