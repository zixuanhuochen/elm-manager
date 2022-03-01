<template>
  <div class="addGoods">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
    <el-card>
      <el-row>
        <el-col :span="12" :offset="6">
          <h3 style="textalign: center">选择食品种类</h3>
          <el-form class="goodsStyle">
            <el-form-item label="食品种类" label-width="80px">
              <el-input></el-input>
            </el-form-item>
            <div :class="showAddCategory ? 'showEdit' : ''" class="isShow">
              <el-form-item label="食品种类" label-width="80px">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="种类描述" label-width="80px">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label-width="80px"
                ><el-button  type="primary">添加</el-button></el-form-item
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
    </el-card>
  </div>
</template>

<script>
export default {
  name: "addGoods",
  data() {
    return {
      Breadcrumb: ["添加数据", "添加商品"],
      showAddCategory: false,
    };
  },

  methods: {
    showEdit() {
      this.showAddCategory = !this.showAddCategory;
    },
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
</style>