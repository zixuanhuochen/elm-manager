import {Button,Message,MessageBox,Form,FormItem,Input,Row,Col,Menu,Submenu,MenuItemGroup,MenuItem,Breadcrumb,BreadcrumbItem,Dropdown,DropdownItem,DropdownMenu,Card,Table,TableColumn,Pagination} from "element-ui";
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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

