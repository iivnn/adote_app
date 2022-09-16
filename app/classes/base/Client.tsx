import axios from "axios";
import Global from "../../global/Global";

const Client = axios.create({
    baseURL: Global.URL
})

export default Client