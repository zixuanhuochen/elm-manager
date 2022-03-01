<template>
  <div class="addShop">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5">
          
          <el-form :model="shopForm" ref="shopForm" :rules="rules" label-width="100px">
            <el-form-item label="店铺名称" prop="name" required>
              <el-input v-model="shopForm.name"></el-input>
            </el-form-item>
            <el-form-item label="餐馆地址" prop="address" required>
              <el-input v-model="shopForm.address"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone" required>
              <el-input v-model="shopForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="餐馆介绍" prop="description" required>
              <el-input v-model="shopForm.description"></el-input>
            </el-form-item>
            <el-form-item label="店铺标语" prop="promotion_info">
              <el-input v-model="shopForm.promotion_info"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类" prop="category">
                <el-cascader
                v-model="category"
                :options="categoryList"
                :props="{ expandTrigger: 'hover' }"
                ref="xuanzeqi"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="店铺特点" class="shopBoxInfo">
              <span>品牌保证</span
              ><el-switch v-model="shopForm.is_premium"></el-switch>
              <span>蜂鸟专送</span
              ><el-switch v-model="shopForm.delivery_mode"> </el-switch>
              <span>新开店铺</span
              ><el-switch v-model="shopForm.new"> </el-switch>
              <br>
              <span>外卖宝</span
              ><el-switch v-model="shopForm.bao"> </el-switch>
              <span>准时达</span
              ><el-switch v-model="shopForm.zhun"> </el-switch>
              <span>开发票</span
              ><el-switch v-model="shopForm.piao"> </el-switch>
            </el-form-item>
            <el-form-item label="配送费">
              <el-input-number
                v-model="shopForm.float_delivery_fee"
                :min="0"
                :max="100"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="起送价">
              <el-input-number
                v-model="shopForm.float_minimum_order_amount"
                :min="0"
                :max="100"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="营业时间" required>
              <el-time-select
                style="marginRight: 15px"
                placeholder="起始时间"
                v-model="shopForm.startTime"
                :picker-options="{
                  start: '05:30',
                  step: '00:15',
                  end: '18:30',
                }"
              >
              </el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="shopForm.endTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '22:30',
                  minTime: shopForm.startTime,
                }"
              >
              </el-time-select>
            </el-form-item>

            <el-form-item label="店铺头像">
              <el-upload
                ref="shopAvatar"
                class="avatar-uploader"
                action="https://elm.cangdu.org/v1/addimg/shop"
                :auto-upload="false"
                :on-change="changeshopAvatar"
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
            <el-form-item label="餐饮许可">
              <el-upload
                ref="shopCaterService"
                class="avatar-uploader"
                action="https://elm.cangdu.org/v1/addimg/shop"
                :auto-upload="false"
                :on-change="changeshopCaterService"
                :on-success="successCaterService"
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
            <el-form-item label="营业执照">
              <el-upload
                ref="shopBusinessService"
                class="avatar-uploader"
                action="https://elm.cangdu.org/v1/addimg/shop"
                :auto-upload="false"
                :on-change="changeshopBusinessService"
                :on-success="successBusinessService"
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
            <el-form-item label="优惠活动">
              <el-select
                v-model="activityValue"
                placeholder="请选择"
                @change="selectActivity"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-table
              :data="shopForm.activities"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              border
            >
              <el-table-column prop="icon_name" label="活动标题">
              </el-table-column>
              <el-table-column prop="name" label="活动名称"> </el-table-column>
              <el-table-column prop="description" label="活动详情">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <el-form-item style="marginTop: 15px">
              <el-button type="primary" @click="submitForm"
                >立即创建</el-button
              >
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getFoodCategory,addShopInfo } from "@/network/";
export default {
  name: "addShop",
  data() {
    return {
      Breadcrumb: ["添加数据", "添加商铺"],
      shopForm: {
        name: "", //餐馆名称 Y
        address: "", //餐馆地址 Y
        phone: "", //联系电话 Y
        latitude: "", //纬度 Y
        longitude: "", //经度 Y
        category: "", //食品分类Y
        image_path: "", //店铺图片地址Y
        float_delivery_fee: 0, //运费Y
        float_minimum_order_amount: 20, //起送价Y
        description: "", //餐馆介绍 N
        promotion_info: "", //店铺标语 N
        is_premium: false, //品牌商铺,默认false N
        delivery_mode: false, //支持蜂鸟专送，默认false N
        new: false, //新开店铺，默认false N
        bao: false, //支持保险，默认false N
        zhun: false, //准时达，默认false N
        piao: false, //开发票，默认false N
        startTime: "", //开始营业时间 N
        endTime: "", //停止营业时间 N
        business_license_image: "", //营业执照图片地址 N
        catering_service_license_image: "", //餐饮服务许可证图片地址 N
        activities: [], //商铺活动：示例：[{icon_name:'新', name:'新用户立减', description: ''}] N
      },
      options: [
        {
          value: "优惠大酬宾",
          label: "优惠大酬宾",
        },
        {
          value: "满减优惠",
          label: "满减优惠",
        },
        {
          value: "进店领券",
          label: "进店领券",
        },
        {
          value: "新用户立减",
          label: "新用户立减",
        },
      ],
      categoryList: [],
      category: "",
      activityValue: "",
      rules: {
        name: [{ required: true, message: "请输入店铺名称", trigger: "blur" }],
        phone: [
          { required: true, validator: this.validatorPhone, trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入餐馆地址", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入餐馆介绍", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择店铺分类", trigger: "blur" },
        ],
      },
      shopAvatarState: false,
      shopCaterServiceState: false,
      shopBusinessServiceState: false,
    };
  },
  mounted() {
    this.getFoodCategoryList();
  },

  methods: {
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
    submitForm() {
      this.$refs.shopForm.validate(async (valid) => {
        if (valid) {
          const addStatus = await addShopInfo(this.shopForm)
          console.log(addStatus);
          addStatus.data.status === 1 ? this.$message.success('添加成功') : this.$message.error(addStatus.data.message)
          console.log(this.shopForm);
        } else {
          this.$message.error('信息不完整请检查！')
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      // this.$refs.shopForm.resetFields();
      // this.shopForm.activities= []
      // this.activityValue= '',
      // this.shopAvatarState = false
      // this.shopCaterServiceState = false
      // this.shopBusinessServiceState = false
      this.shopForm = Object.assign(this.shopForm,this.$options.data().shopForm)
      // Object.assign(this.$data,this.$options.data())
      this.getFoodCategoryList();
      this.category = []
      this.activityValue=''
      
      console.log(this.shopForm);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    //定义手机校验
    validatorPhone(rule, value, callback) {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    },
    selectActivity() {
      this.$prompt("请输入活动详情", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (value == null) {
            this.$message({
              type: "info",
              message: "请输入活动详情",
            });
            return;
          }
          let newObj = {};
          switch (this.activityValue) {
            case "满减优惠":
              newObj = {
                icon_name: "减",
                name: "满减优惠",
                description: value,
              };
              break;
            case "优惠大酬宾":
              newObj = {
                icon_name: "特",
                name: "优惠大酬宾",
                description: value,
              };
              break;
            case "新用户立减":
              newObj = {
                icon_name: "新",
                name: "新用户立减",
                description: value,
              };
              break;
            case "进店领券":
              newObj = {
                icon_name: "领",
                name: "进店领券",
                description: value,
              };
              break;
          }
          this.shopForm.activities.push(newObj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleDelete(index) {
      this.shopForm.activities.splice(index, 1);
      console.log(this.shopForm.activities);
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
    changeshopAvatar(file) {
      this.shopAvatarState = this.changePic(file);
      if (this.shopAvatarState) {
        this.$refs.shopAvatar.submit();
      }
    },
    successAvatar(response, file, fileList) {
      if (response.status == 1) {
        this.shopForm.image_path = response.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    changeshopCaterService(file) {
      this.shopCaterServiceState = this.changePic(file);
      if (this.shopCaterServiceState) {
        this.$refs.shopCaterService.submit();
      }
    },
    successCaterService(response, file, fileList) {
      if (response.status == 1) {
        this.shopForm.catering_service_license_image = response.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    changeshopBusinessService(file) {
      this.shopBusinessServiceState = this.changePic(file);
      if (this.shopBusinessServiceState) {
        this.$refs.shopBusinessService.submit();
      }
    },
    successBusinessService(response, file, fileList) {
      if (response.status == 1) {
        this.shopForm.business_license_image = response.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
  },
  watch: {
    category:{
      handler:function(newValue){
      this.shopForm.category = newValue.join(",") ;
      }
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.shopBoxInfo span {
  margin-right: 10px;
}

.has-gutter tr th {
  color: black;
  font-weight: 400px;
}
</style>