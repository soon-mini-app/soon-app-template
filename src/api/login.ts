import http from "@/api";
import type { AxiosError } from 'axios';
import { createMutation, createQuery } from "react-query-kit";
import qs from "qs";

export const loginApi = (params:any) => {
	return http.get<any>(`api/v1/account/login?${qs.stringify(params)}`);
};

interface Response {};
type VariablesVoid = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them
interface Variables {}

export const getList = createQuery<Response, VariablesVoid, AxiosError>({
  queryKey: ['menu/getList'],
  fetcher: () => {
    return http.get<any>(`api/v1/menu/getList`).then((response) => response.data);
  },
});

export const accountApi = createQuery<Response, Variables, AxiosError>({
    queryKey: ['account/login'],
    fetcher: (variables) => {
        console.log('variables');
        
      return http.get<any>(`api/v1/account/login?${qs.stringify(variables)}`).then((response) => response.data);
    },
});

export const useAddPost = createMutation<Response, Variables, AxiosError>({
    mutationFn: async (variables) => http.post( `api/v1/account/updateInfo`, variables).then((response) => response.data as Response) 
});