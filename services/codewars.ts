import axios from "axios";

import { CODEWARS_ACCOUNT } from "@/common/constants/codewars";

const { user_id } = CODEWARS_ACCOUNT;

const CODEWARS_ENDPOINT = `https://www.codewars.com/api/v1/users/${user_id}`;

export const getCodewarsData = async () => {
  try {
    const response = await axios.get(CODEWARS_ENDPOINT);
    return { status: response.status, data: response.data };
  } catch (error: any) {
    console.error("Codewars API Error:", error?.response?.data || error?.message);
    return { status: error?.response?.status || 500, data: {} };
  }
};
