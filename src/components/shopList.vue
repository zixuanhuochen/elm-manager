<template>
  <div class="shopList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
  </div>
</template>

<script>
export default {
name:'shopList',
data(){
  return {
    Breadcrumb:['数据管理', '商家列表']
  }
},

methods:{

}
}
</script>

<style>

</style>