<template>
  <div class="addGoods">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <el-card>
      <el-row>
        <el-col :span="12" :offset="6">
          <h3 style="text-align: center">选择食品种类</h3>
          <el-form class="goodsStyle">
            <el-form-item label="食品种类" label-width="80px">
              <el-select
                v-model="addFoodForm.category_id"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div :class="showAddCategory ? 'showEdit' : ''" class="isShow">
              <el-form-item label="食品种类" label-width="80px">
                <el-input v-model="categoryInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="种类描述" label-width="80px">
                <el-input v-model="categoryInfo.description"></el-input>
              </el-form-item>
              <el-form-item label-width="80px"
                ><el-button type="primary" @click="addCategory"
                  >添加</el-button
                ></el-form-item
              >
            </div>
            <div class="add_category_button" @click="showEdit">
              <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
              <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
              <span>添加食品种类</span>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-col :span="12" :offset="6">
          <h3 style="text-align: center">添加食品</h3>
          <el-form label-width="80px">
            <el-form-item label="食品名称">
              <el-input v-model="addFoodForm.name"></el-input>
            </el-form-item>
            <el-form-item label="食品活动">
              <el-input v-model="addFoodForm.activity"></el-input>
            </el-form-item>
            <el-form-item label="食品详情">
              <el-input v-model="addFoodForm.description"></el-input>
            </el-form-item>
            <el-form-item label="食品详情">
              <el-upload
                ref="FoodAvatar"
                class="avatar-uploader"
                action="https://elm.cangdu.org/v1/addimg/food"
                :auto-upload="false"
                :on-change="changeFoodAvatar"
                :on-success="successAvatar"
                list-type="picture-card"
              >
                <i
                  class="el-icon-plus avatar-uploader-icon"
                  style="width: 100%; height: 100%"
                ></i>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过2M
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品特点">
              <el-select v-model="check_trait" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="食品特点" >
              <el-radio v-model="radio" label="1" @change="changeRadio">单规格</el-radio>
              <el-radio v-model="radio" label="2" @change="changeRadio">多规格</el-radio>
            </el-form-item>
            <div v-show="radio === '1'">
              <el-form-item label="包装费">
                <el-input-number
                  v-model="edit_specs.packing_fee"
                  :min="0"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="价格">
                <el-input-number
                  v-model="edit_specs.price"
                  :min="0"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
            </div>
            <div v-show="radio === '2'">
              <el-row style="overflow: auto; text-align: center">
                <el-button
                  type="primary"
                  @click="dialogFormVisible = true"
                  style="margin-bottom: 10px"
                  >添加规格</el-button
                >
                <el-table style="margin-bottom: 20px" :data="addFoodForm.specs">
                  <el-table-column prop="specs" label="规格"> </el-table-column>
                  <el-table-column prop="packing_fee" label="包装费">
                  </el-table-column>
                  <el-table-column prop="price" label="价格"> </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </div>
          </el-form>
          <el-button type="primary" @click="confirmFood"
            >确认添加食品</el-button
          >

          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item label="规格" label-width="80px">
                <el-input
                  v-model="edit_specs.specs"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="包装费" label-width="80px">
                <el-input-number
                  v-model="edit_specs.packing_fee"
                  :min="0"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="价格" label-width="80px">
                <el-input-number
                  v-model="edit_specs.price"
                  :min="0"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelEdit">取 消</el-button>
              <el-button type="primary" @click="addSpecs"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getShopCategory, addCategoryInfo,addFood } from "@/network";
export default {
  name: "addGoods",
  data() {
    return {
      Breadcrumb: ["添加数据", "添加商品"],
      restaurant_id: null,
      showAddCategory: false,
      categoryList: [],
      categoryInfo: {
        name: null,
        description: null,
        restaurant_id: null,
      },
      addFoodForm: {
        restaurant_id: null, //餐馆ID
        category_id: null, //分类ID
        name: null, //食品名称
        image_path: null, //图片地址
        specs: [], //规格： [{specs: '默认',packing_fee: 0,price: 20,}]
        description: null, //描述
        activity: null, //活动
        attributes: [], //特点：[{value: '新',label: '新品'}]
      },
      foodPicStatus: false,
      options: [
        {
          value: "新品",
          label: "新品",
        },
        {
          value: "招牌",
          label: "招牌",
        },
      ],
      check_trait: [],
      edit_specs: {
        specs: "默认",
        packing_fee: null,
        price: null,
      },
      form: [],
      radio: "1",

      num: 0,
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      this.addFoodForm.restaurant_id = this.$route.query.restaurant_id;
      const result = await getShopCategory(this.addFoodForm.restaurant_id);
      if (result.data.status === 1) {
        let list = result.data.category_list;
        list.forEach((item) => {
          let listItem = {
            value: "",
            label: "",
            id: "",
          };
          listItem.value = item.name;
          listItem.label = item.name;
          listItem.id = item.id;
          this.categoryList.push(listItem);
        });
      }
    },
    showEdit() {
      this.showAddCategory = !this.showAddCategory;
    },
    changePic(file) {
      const isRightType =
        file.raw.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (isRightType && isLt2M) {
        return true;
      } else {
        return false;
      }
    },
    changeFoodAvatar(file) {
      this.foodPicStatus = this.changePic(file);
      if (this.foodPicStatus) {
        this.$refs.FoodAvatar.submit();
      }
    },
    successAvatar(response, file, fileList) {
      if (response.status == 1) {
        this.addFoodForm.image_path = response.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    async addCategory() {
      this.categoryInfo.restaurant_id = this.addFoodForm.restaurant_id;
      const addInfo = await addCategoryInfo(this.categoryInfo);
      addInfo.status === 200
        ? this.$message.success("添加成功")
        : this.$message.error("添加失败");
    },
    editTrait() {
      this.check_trait.forEach((item) => {
        let trait = {
          value: null,
          label: null,
        };
        trait.value = item;
        trait.label = item;
        this.addFoodForm.attributes.push(trait);
      });
    },
    async confirmFood() {
      this.editTrait();
      if (this.radio === "1") {
        this.addFoodForm.specs.push(this.edit_specs);
      }
      const result = await addFood(this.addFoodForm)
      if(result.status === 200){
        this.$message.success('添加成功')
        Object.assign(this.addFoodForm,this.$options.data().addFoodForm)
      }else {
        this.$message.error(result.data.message)
      }
    },
    changeRadio(){
      this.addFoodForm.specs = []
      console.log('触发更改，重置数据',this.addFoodForm.specs);
      
    },
    cancelEdit(){
      this.dialogFormVisible = false
      this.edit_specs= {
        specs: "默认",
        packing_fee: null,
        price: null,
      }
    },
    addSpecs(){
      this.addFoodForm.specs.push(this.edit_specs),
      this.edit_specs= {
        specs: "默认",
        packing_fee: null,
        price: null,
      }
      this.dialogFormVisible = false
    },
    handleDelete(index){
      this.addFoodForm.specs.splice(index,1)
    }
  },
};
</script>

<style lang="less" scope>
.el-form-item {
  margin: 10px 0;
}
.goodsStyle {
  border: 1px solid #f4f4f4;
  border-radius: 6px;
  margin-top: 15px;

  .add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-top: none;
    transition: all 400ms;
    &:hover {
      background: #f9fafc;
      span,
      .edit_icon {
        color: #20a0ff;
      }
    }
    span {
      font-size: 14px;
      transition: all 400ms;
    }
    .edit_icon {
      color: #ccc;
      transition: all 400ms;
    }
  }
  .isShow {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
  }
  .showEdit {
    height: 185px;
    transition: all 400ms;
    background: #f9fafc;
  }
}
.el-tag.el-tag--info {
  background-color: #ecf5ff;
  color: #409eff;
}
.el-select .el-tag__close.el-icon-close::before {
  background-color: #ecf5ff;
  color: #409eff;
}
</style>