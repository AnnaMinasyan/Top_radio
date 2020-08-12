import axios from 'axios';
import Keys from '../keys';

const authApi = axios.create({
	baseURL: Keys.API_URL,
	headers:
	 {'Content-Type': 'multipart/form-data' ,
	 'Authorization':'Basic YXBwbGljYXRpb246cG92c2RvSUhOODc2cXFhc2M='}
	//myHeaders.append("Authorization", "Basic YXBwbGljYXRpb246cG92c2RvSUhOODc2cXFhc2M=");

});
export default authApi;