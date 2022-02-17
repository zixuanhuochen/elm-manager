import {Button,Message,MessageBox,Form,FormItem,Input,Row,Col } from "element-ui";
import Vue from "vue";

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

