import axios,{ AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResultData } from 'src/types';
import {getItem} from '@/utils/storage'
import { toastShow } from 'src/utils/toast';
 
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: baseUrl,
	// 设置超时时间（10s）
	timeout: 20000,
	// 跨域时候允许携带凭证
	// withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// const globalStore = GlobalStore();
				const token: string = getItem('token');
				return { ...config, headers: { ...config.headers, "Authorization": `Bearer ${token}` } } as any;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				// const globalStore = GlobalStore();
				// * 在请求结束后，并关闭请求 loading
				// * 登陆失效（code == 4001 4002）
				if ( [4001,4002].includes(data.code)) {
					toastShow(data.message)
					return Promise.reject(data);
				}

				if([4011,4010].includes(data.code)){
					// 无需警告
				}else if (data.code && data.code !== 0) {
					// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
					toastShow(data.message)
					return Promise.reject(data);
				}
				// * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data;
			},
			async (error: AxiosError) => {
				const { code,message } = error;
				console.log('error',error);
				toastShow(message)
				// 请求超时单独判断，因为请求超时没有 response
				if (error.message.indexOf("timeout") !== -1){
                    // 
                }
				// 根据响应的错误状态码，做不同的处理
				// if (code) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				return Promise.reject(error);
			}
		);
	}

	// * 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
	download(url: string, params?: object, _object = {}): Promise<BlobPart> {
		return this.service.post(url, params, _object);
	}
}

export default new RequestHttp(config);