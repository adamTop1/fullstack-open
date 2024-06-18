import axios from "axios";
const baseUrl = "/api/login";

//root salainen

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
}


export default { login };