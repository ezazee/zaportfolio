import axios from "axios";

import { MONKEYTYPE_ACCOUNT } from "@/common/constants/monkeytype";

const { username, api_key } = MONKEYTYPE_ACCOUNT;

const USER_ENDPOINT = `https://api.monkeytype.com/users/${username}/profile`;

export const getMonkeytypeData = async () => {
  try {
    const response = await axios.get(USER_ENDPOINT, {
      headers: {
        Authorization: `ApeKey ${api_key}`,
      },
    });

    return { status: response.status, data: response.data?.data ?? {} };
  } catch (error: any) {
    console.error("Monkeytype API Error:", error?.response?.data || error?.message);
    return { status: error?.response?.status || 500, data: {} };
  }
};
