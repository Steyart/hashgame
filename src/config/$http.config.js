
/*global $ returnCitySN require ClipboardJS wx err process*/
import axios from 'axios'

let $http = axios.create({
  data: {}
});
$http.defaults.baseURL = (process.env.NODE_ENV === 'production') ? 'https://hash-api.888bbm.com/api' : '/api'

export default $http;
