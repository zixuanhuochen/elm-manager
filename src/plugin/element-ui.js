import {Button,Message,MessageBox,Form,FormItem,Input,Row,Col,Menu,Submenu,MenuItemGroup,MenuItem } from "element-ui";
import Vue from "vue";

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

