<template>
  <div class="search">
      <van-search 
        v-model="value" 
        placeholder="请输入搜索关键词" 
        @focus="onFocus"
      />
  </div>
</template>

<script>
  export default {
    name: "Search",
    data(){
      return{
        value:''
      }
    },
    methods:{
      onFocus(){
        this.$router.push('/search')
      }
    }
  };
</script>