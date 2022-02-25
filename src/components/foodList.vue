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
      <el-dialog
        title="修改食品信息"
        :visible.sync="isShowDialog"
        :before-close="cancelFile"
      >
        <el-form :model="foodForm" :rules="FoodRules" ref="foodForm">
          <el-form-item label="食品名称" label-width="80px" prop="name">
            <el-input v-model="foodForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" label-width="80px" prop="description">
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
            <el-upload
              ref="upload"
              action="https://elm.cangdu.org/v1/addimg/food"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="beforeAvatarUpload"
              :on-success="picUpload"
              :auto-upload="false"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
            <i style="fontsize: 10px; color: red">只允许上传jepg格式图片</i>
          </el-form-item>
        </el-form>
        <el-row style="overflow: auto; text-align: center">
          <el-table :data="foodForm.specfoods" border style="width: 100%" class="specStyle">
            <el-table-column prop="specs" label="规格"> </el-table-column>
            <el-table-column prop="packing_fee" label="包装费">
            </el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteSpecs(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelFile">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
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
        restaurant_id: null,
        specfoods: [],
      },
      shopCategoryList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      picType: true,
      isLt2M: true,
      FoodRules: {
        name: [
          { required: true, message: "请输入食品名称", trigger: "change" },
        ],
        description: [
          { required: true, message: "请输入食品描述", trigger: "change" },
        ],
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
      this.foodForm.item_id = row.item_id;
      this.foodForm.restaurant_id = row.restaurant_id;
      // let category_id = row.category_id;
      const shopCategory = await getShopCategory(restaurant_id);
      if (shopCategory.status === 200) {
        this.shopCategoryList = shopCategory.data.category_list;
      } else {
        console.log(shopCategory);
      }
    },
    beforeAvatarUpload(file, fileList) {
      console.log(file);
      this.picType = file.raw.type === "image/jpeg" ? true : false;
      this.isLt2M = file.size / 1024 / 1024 < 2;
      if (!this.picType) {
        this.$message.error("上传头像图片只能是 JPEG 格式!");
        return false;
      }
      if (!this.isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    picUpload(response, file, fileList) {
      if (response.status === 1) {
        this.foodForm.image_path =
          "https://elm.cangdu.org/img/" + response.image_path;
      } else {
        this.$message.error("图片上传失败");
      }
    },
    submitUpload() {
      if (this.picType && this.isLt2M) {
        this.$refs.foodForm.validate((valid) => {
          if (valid) {
            this.$refs.upload.submit();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$message.error("图片上传格式不正确");
      }
    },
    cancelFile() {
      this.$refs.foodForm.resetFields();
      this.$refs.upload.clearFiles();
      (this.shopCategoryList = []), (this.dialogVisible = false);
      this.dialogImageUrl = "";
      (this.foodForm = {
        item_id: null,
        name: null,
        description: null,
        image_path: null,
        category_id: null,
        restaurant_id: null,
        specfoods: [],
      }),
        (this.isShowDialog = false);
    },
    deleteSpecs(row) {},
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
.specStyle th .cell{
  color: black;
}

</style>