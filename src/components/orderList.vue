<template>
  <div class="orderList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <el-card>
      <el-table
        :data="orderList"
        style="width: 100%"
        @expand-change="getOrderInfo"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
              style="backgroudcolor: #f5f5f5"
            >
              <el-form-item label="用户名">
                <span>{{ props.row.user_name }}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{ props.row.restaurant_name }}</span>
              </el-form-item>
              <el-form-item label="收货地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.restaurant_address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单 ID" prop="id"> </el-table-column>
        <el-table-column label="总价格" prop="total_amount"> </el-table-column>
        <el-table-column label="订单状态" prop="status"> </el-table-column>
      </el-table>
    </el-card>
    <paginationNav :total="total" @changePage="changePage"></paginationNav>
  </div>
</template>

<script>
import paginationNav from "./common/paginationNav.vue";
import {
  getOrderList,
  getOrderAddress,
  getOrderCount,
  getRestaurantInfo,
  getUserInfo,
} from "@/network";
export default {
  components: { paginationNav },
  name: "orderList",
  data() {
    return {
      Breadcrumb: ["数据管理", "订单列表"],
      orderList: [],
      total: 0,
      orderListSizes: {
        limit: 20,
        offset: 0,
      },
    };
  },
  mounted() {
    this.getOrderLists();
  },
  methods: {
    changePage(val) {
      this.orderListSizes.offset = (val - 1) * 20;
      this.getOrderLists();
    },
    async getOrderLists() {
      const result = await getOrderList(this.orderListSizes);
      const count = await getOrderCount();
      this.total = count.status === 200 ? count.data.count : 0;
      // if (result.status === 200) {
      //   this.orderList = this.orderListsPrice(result.data);
      // } else {
      //   this.$message.error("获取订单列表失败");
      // }
      this.orderList =
        result.status === 200
          ? this.orderListsPrice(result.data)
          : this.$message.error("获取订单列表失败");
      console.log(this.orderList);
    },
    async getOrderInfo(row, expandedRows) {
      if (expandedRows.length > 0) {
        let addressId = row.address_id;
        let restaurant_id = row.restaurant_id;
        let user_id = row.user_id;
        const address = await getOrderAddress(addressId);
        row.address =
          address.status === 200 ? address.data.address : console.log(address);
        const restaurant = await getRestaurantInfo(restaurant_id);
        row.restaurant_address =
          restaurant.status === 200
            ? restaurant.data.address
            : console.log(restaurant);
        const userInfo = await getUserInfo(user_id);
        row.user_name =
          userInfo.status === 200
            ? userInfo.data.username
            : console.log(userInfo);
      }
    },
  },
  computed: {
    orderListsPrice() {
      return function (orderList) {
        if (orderList.length > 0) {
          orderList.forEach((item) => {
            item.total_amount = item.total_amount.toFixed(2) + "元";
            item.status = item.status_bar.title;
            (item.address = ""), (item.restaurant_address = "");
            item.user_name = "";
          });
          return orderList;
        }
      };
    },
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
  margin-left: 55px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>