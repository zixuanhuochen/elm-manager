import { Button, Message, MessageBox, Form, FormItem, Input, Row, Col, Menu, Submenu, MenuItemGroup, MenuItem, Breadcrumb, BreadcrumbItem, Dropdown, DropdownItem, DropdownMenu, Card, Table, TableColumn, Pagination, Dialog, Select, Option, Upload, DatePicker, Switch, TimePicker, InputNumber, TimeSelect, Cascader, } from "element-ui";
import Vue from "vue";


Vue.use(Cascader)
Vue.use(TimeSelect)
Vue.use(InputNumber)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
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
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Upload)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

