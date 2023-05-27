import axios from "axios";
import Global from "../../global/Global";

const Client = axios.create({
    baseURL: Global.URL,
})

Client.defaults.timeout = Global.TIMEOUT;

export default Client