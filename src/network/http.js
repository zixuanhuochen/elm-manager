import axios from 'axios'

const http = axios.create({
  baseURL:'https://elm.cangdu.org',
  timeout:5000,

})
export default http