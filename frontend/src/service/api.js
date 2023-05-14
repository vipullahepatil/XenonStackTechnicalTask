import axios from "axios";

const BASE_URL="http://localhost:8080/";

export async function register(data){
    console.log(data);
    return axios.post(BASE_URL+"register",data);
}