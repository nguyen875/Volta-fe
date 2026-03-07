import { type AxiosResponse } from "axios";
import type { Address, RequestCreateAddressDto, UpdateProfileDto, UserProfile } from "./profile.interface";
import axiosInstance from "../../common/configs/axios.config";

const BASE_URL = "/profile";

export const getProfile = (): Promise<AxiosResponse<UserProfile>> => {
  return axiosInstance.get(BASE_URL);
};

export const updateProfile = (body: UpdateProfileDto): Promise<AxiosResponse<UserProfile>> => {
  return axiosInstance.put(BASE_URL, body);
}

export const getAllAddresses = (): Promise<AxiosResponse<Address[]>> => {
  return axiosInstance.get(`${BASE_URL}/addresses`);
};

export const createAddress = (body: RequestCreateAddressDto): Promise<AxiosResponse<Address>> => {
  return axiosInstance.post(`${BASE_URL}/addresses`, body);
}

export const updateAddress = (id: number, body: RequestCreateAddressDto): Promise<AxiosResponse<Address>> => {
  return axiosInstance.put(`${BASE_URL}/addresses/${id}`, body);
}

export const deleteAddress = (id: number): Promise<AxiosResponse<void>> => {
  return axiosInstance.delete(`${BASE_URL}/addresses/${id}`);
}