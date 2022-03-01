<template>
  <div class="shopList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <el-card>
      <el-table
        :data="restaurantList"
        style="width: 100%"
        size="mini"
        header-row-class-name="restaurantStyle"
        stripe
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand"
            >
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.rating_count }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="name"> </el-table-column>
        <el-table-column label="店铺地址" prop="address"> </el-table-column>
        <el-table-column label="店铺介绍" prop="description"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="editOpen(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="primary" @click="goAddGoods(scope.row)">添加食品</el-button>
            <el-button size="mini" type="danger" @click="removeShop(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination-nav
        :total="restaurantCount"
        @changePage="changePage"
      ></pagination-nav>
    </el-card>

    <el-dialog title="修改店铺信息" :visible.sync="editRestaurantVisible">
      <el-form :model="editForm">
        <el-form-item label="店铺名称" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-input v-model="editForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍" label-width="100px">
          <el-input
            v-model="editForm.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" label-width="100px">
          <el-cascader
            v-model="editForm.category"
            :options="categoryList"
            :props="{ expandTrigger: 'hover' }"
            ref="xuanzeqi"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商铺图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/shop"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            list-type="picture"
          >
            <img
              v-if="imageUrl"
              :src="'https://elm.cangdu.org/img/' + imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRestaurantsList,
  getRestaurantCount,
  getFoodCategory,
  updateShop,
  removeShop
} from "@/network";
import paginationNav from "./common/paginationNav.vue";
export default {
  components: { paginationNav },
  name: "shopList",
  data() {
    return {
      Breadcrumb: ["数据管理", "商家列表"],
      restaurantList: [],
      restaurantCount: 0,
      restaurantListSizes: {
        limit: 20,
        offset: 0,
        latitude: 121.4762,
        longitude: 31.22967,
      },
      editRestaurantVisible: false,
      editForm: {
        name: null,
        address: null,
        description: null,
        phone: null,
        category: null,
        image_path: null,
      },
      categoryList: [],
      imageUrl: "",
    };
  },
  mounted() {
    this.getRestaurantsLists();
  },
  methods: {
    changePage(val) {
      this.restaurantListSizes.offset = (val - 1) * 20;
      this.getRestaurantsLists();
    },
    async getRestaurantsLists() {
      const list = await getRestaurantsList(this.restaurantListSizes);
      const count = await getRestaurantCount();
      list.status === 200
        ? (this.restaurantList = list.data)
        : this.$message.error("获取商铺信息失败");
      count.status === 200
        ? (this.restaurantCount = count.data.count)
        : this.$message.error("发生错误");
      console.log(this.restaurantList);
    },
    editOpen(row) {
      this.editRestaurantVisible = true;
      this.editForm.name = row.name;
      this.editForm.address = row.address;
      this.editForm.description = row.description;
      this.editForm.phone = row.phone;
      this.editForm.category = row.category.split("/");
      this.imageUrl = row.image_path;
      this.editForm.image_path = row.image_path;
      console.log(row);
      this.getFoodCategoryList();
    },
    cancelForm() {
      Object.assign(this.editForm, this.$options.data().editForm);
      this.editRestaurantVisible = false;
    },
    async submitForm() {
      this.editForm.category = this.editForm.category.join(",");
      const update = await updateShop(this.editForm);
      if (update.data.status == 1) {
        this.$message.success("更改成功");
        this.editRestaurantVisible = false;
      } else {
        this.$message.error(update.data.message + "!更新失败");
        this.editRestaurantVisible = false;
      }
    },
    async getFoodCategoryList() {
      const result = await getFoodCategory();
      if (result.status === 200) {
        let info = result.data;
        info.forEach((item) => {
          const categoryItem = {
            value: "",
            label: "",
            children: [],
          };
          categoryItem.value = item.name;
          categoryItem.label = item.name;
          if (item.sub_categories.length > 0) {
            item.sub_categories = item.sub_categories.slice(1);
            item.sub_categories.forEach((child) => {
              const categoryChild = {
                value: "",
                label: "",
              };
              categoryChild.value = child.name;
              categoryChild.label = child.name;
              categoryItem.children.push(categoryChild);
            });
          }
          this.categoryList.push(categoryItem);
        });
      } else {
        this.$message.error("获取食品分类失败");
      }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.editForm.image_path = this.imageUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async removeShop(row){
     const status = await removeShop(row.id)
     if (status.data.status == 1) {
        this.$message.success("删除成功");
      } else {
        this.$message.error(status.data.message + "!删除失败");
      }
    },
    goAddGoods(row){
      this.$router.push({path:'addGoods',query:{restaurant_id : row.id}})
    }
  },
};
</script>

<style>
.restaurantStyle {
  color: black;
  background-color: #f5f5f5;
}
.demo-table-expand {
  font-size: 0;
  margin-left: 60px;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

</style>