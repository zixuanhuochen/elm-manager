<template>
  <div class="adminList">
    <headerTop :Breadcrumb="Breadcrumb"></headerTop>
  </div>
</template>

<script>
export default {
name:'adminList',
data(){
  return {
    Breadcrumb:['数据管理', '管理员列表']
  }
},

methods:{

}
}
</script>

<style>

</style>