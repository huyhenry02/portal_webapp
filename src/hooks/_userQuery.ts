import { useMutation, useQuery } from 'react-query';
import axiosInstance from '../services/axios.service';
import { STATUS_ACTIVE, STATUS_DEACTIVATE } from '../constants/constant';
import { toast } from 'react-toastify';
import { get } from 'lodash';

const fetchUsers = async (payload: {
  currentTab: number;
  currentPage: number;
}) => {
  const { currentTab, currentPage } = payload;
  let status: string | undefined;
  if (currentTab === 0) {
    status = STATUS_ACTIVE;
  } else if (currentTab === 1) {
    status = STATUS_DEACTIVATE;
  }
  return axiosInstance.get('api/auth/list', {
    params: {
      status,
      page: currentPage,
    },
  });
};

const fetchUserById = async (id?: string) => {
  return axiosInstance.get(`api/auth/get-user?user_id=${id}`);
};

export const useFetchUsers = (payload: {
  currentTab: number;
  currentPage: number;
}) => {
  return useQuery(['fetch_users', payload], () => fetchUsers(payload));
};

export const useFetchUserById = (id?: string) => {
  return useQuery(['fetch_user_detail', id], () => fetchUserById(id), {
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  return useMutation(
    async (payload: {
      user_id: string;
      password?: string;
      status?: string;
      role_id?: string;
    }) => {
      return axiosInstance.put('api/auth/update', payload);
    },
    {
      onSuccess: async () => {
        toast.success('Cập nhật tài khoản người dùng thành công');
      },
      onError: error => {
        toast.error(get(error, 'message'));
      },
    },
  );
};

export const useDeleteUser = () => {
  return useMutation(
    async (id: string) => {
      return axiosInstance.delete(`api/auth/delete`, {
        params: {
          user_id: id,
        },
      });
    },
    {
      onSuccess: async () => {
        toast.success('Xóa tài khoản người dùng thành công');
      },
      onError: error => {
        toast.error(get(error, 'message'));
      },
    },
  );
};
