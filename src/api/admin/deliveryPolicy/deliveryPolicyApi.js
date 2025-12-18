import axios from "axios";
import { axiosInstance } from "../../user/axiosIntance";

const prefix = "/api/deliveryPolicies";

export const getDeliveryPolicies = async () => {
  const res = await axiosInstance.get(`${prefix}`);
  return res.data;
};
