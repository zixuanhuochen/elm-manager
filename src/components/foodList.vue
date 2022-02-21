<template>
  <div class="foodList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <el-card>
      <el-table :data="foodList" style="width: 100%" @expand-change="getInfo">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="食品 ID">
                <span>{{ props.row.item_id }}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="食品评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
              <el-form-item label="餐馆名称">
                <span>{{ props.row.foodMenu.restaurant_Name }}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="餐馆地址">
                <span>{{ props.row.foodMenu.restaurant_Adress }}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{ props.row.foodMenu.category_Name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="name"> </el-table-column>
        <el-table-column label="食品介绍" prop="description"> </el-table-column>
        <el-table-column label="评分" prop="rating"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              @click="editFoodInfo(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="removFoodInfo(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <paginationNav :total="total" @changePage="changePage"></paginationNav>
      <el-dialog title="修改视频信息" :visible.sync="isShowDialog">
        <el-form :model="foodForm">
          <el-form-item label="食品名称" label-width="80px">
            <el-input v-model="foodForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" label-width="80px">
            <el-input
              v-model="foodForm.description"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="食品分类" label-width="80px">
            <el-select v-model="foodForm.category_id" placeholder="请选择">
              <el-option
                v-for="item in shopCategoryList"
                :key="item.index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片" label-width="80px">
            <el-input
              v-model="foodForm.image_path"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowDialog = false">取 消</el-button>
          <el-button type="primary" @click="isShowDialog = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getFoodList,
  getFoodCount,
  getCategoryInfo,
  getRestaurantInfo,
  getShopCategory,
} from "@/network";
export default {
  name: "foodList",
  data() {
    return {
      Breadcrumb: ["数据管理", "食品列表"],
      foodList: [],
      foodMenu: {
        category_Name: null,
        restaurant_Name: null,
        restaurant_Adress: null,
      },
      total: 0,
      foodListSizes: {
        limit: 20,
        offset: 0,
      },
      isShowDialog: false,
      foodForm: {
        item_id: null,
        name: null,
        description: null,
        image_path: null,
        category_id: null,
        specfoods: [],
      },
      shopCategoryList: [],
    };
  },
  mounted() {
    this.getFoodLists();
  },
  methods: {
    async getFoodLists() {
      try {
        const { data: result } = await getFoodList(this.foodListSizes);
        this.foodList = this.getFoodInfo(result);
        const { data: count } = await getFoodCount();
        if (count.status === 1) {
          this.total = count.count;
        } else {
          this.$message.error("获取数据失败，请稍后重试");
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    changePage(val) {
      this.foodListSizes.offset = (val - 1) * 20;
      this.getFoodLists();
    },
    async getInfo(row, expandedRows) {
      let restaurant_id = row.restaurant_id;
      let category_id = row.category_id;
      if (expandedRows.length > 0) {
        const category = await getCategoryInfo(category_id);
        if (category.status === 200) {
          row.foodMenu.category_Name = category.data.name;
        }
        const restaurant = await getRestaurantInfo(restaurant_id);
        if (restaurant.status === 200) {
          row.foodMenu.restaurant_Name = restaurant.data.name;
          row.foodMenu.restaurant_Adress = restaurant.data.address;
        }
        //进行店铺id数据的获取
        //需要对数据源进行数据修改后在赋值
      }
    },
    async editFoodInfo(row) {
      this.isShowDialog = true;
      let restaurant_id = row.restaurant_id;
      // let category_id = row.category_id;
      const shopCategory = await getShopCategory(restaurant_id);
      if (shopCategory.status === 200) {
        this.shopCategoryList = shopCategory.data.category_list;
      } else {
        console.log(shopCategory);
      }
    },
  },
  computed: {
    getFoodInfo() {
      return function (foodList) {
        if (foodList.length > 0) {
          foodList.forEach((item) => {
            item.foodMenu = this.foodMenu;
          });
          return foodList;
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