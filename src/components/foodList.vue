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
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="餐馆地址">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="name"> </el-table-column>
        <el-table-column label="食品介绍" prop="description"> </el-table-column>
        <el-table-column label="评分" prop="rating"> </el-table-column>
        <el-table-column label="操作" prop="desc"> </el-table-column>
      </el-table>
      <paginationNav :total="total" @changePage="changePage"></paginationNav>
    </el-card>
  </div>
</template>

<script>
import { getFoodList, getFoodCount, getCategoryInfo, getRestaurantInfo,  } from "@/network";
export default {
  name: "foodList",
  data() {
    return {
      Breadcrumb: ["数据管理", "食品列表"],
      foodList: [],
      foodInfo: {},
      total: 0,
      foodListSizes: {
        limit: 20,
        offset: 0,
      },
    };
  },
  mounted() {
    this.getFoodLists();
  },
  methods: {
    async getFoodLists() {
      try {
        const { data: result } = await getFoodList(this.foodListSizes);
        this.foodList = result;
        console.log(result);
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
      console.log(row);
      let restaurant_id = row.restaurant_id;
      let category_id = row.category_id;
      if (expandedRows.length > 0) {
        const result = await getCategoryInfo(category_id)
        console.log(result);
        //进行店铺id数据的获取
        //需要对数据源进行数据修改后在赋值
      }
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