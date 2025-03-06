const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api`;

export const login = async (loginObj) => {
    const response = await axios.post(`${BASE_URL}/user`, loginObj);
    return response.data;
};