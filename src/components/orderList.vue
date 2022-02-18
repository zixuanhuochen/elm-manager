<template>
  <div class="orderList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
  </div>
</template>

<script>
export default {
name:'orderList',
data(){
  return {
    Breadcrumb:['数据管理', '订单列表']
  }
},

methods:{

}
}
</script>

<style>

</style>