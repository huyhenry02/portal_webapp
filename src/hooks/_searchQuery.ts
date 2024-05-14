import { useQuery } from 'react-query';
import axiosInstance from '../services/axios.service';

const searchQuery = async (payload: {
  keyword: string;
  currentPage: number;
  perPage: number;
}) => {
  const { currentPage, keyword, perPage } = payload;
  return axiosInstance.get('/api/search', {
    params: {
      keyword,
      page: currentPage,
      perPage: perPage,
    },
  });
};

export const useSearchQuery = (payload: {
  perPage: number;
  keyword: string;
  currentPage: number;
}) => {
  return useQuery(['search_query', payload], () => searchQuery(payload), {
    enabled: payload.keyword.length > 0,
  });
};
