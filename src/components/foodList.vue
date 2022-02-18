<template>
  <div class="foodList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
  </div>
</template>

<script>
export default {
name:'foodList',
data(){
  return {
    Breadcrumb:['数据管理', '食品列表']
  }
},

methods:{

}
}
</script>

<style>

</style>