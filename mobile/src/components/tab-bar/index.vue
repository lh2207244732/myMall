<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="home-o" to="/home"> 首页 </van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category"> 分类 </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" badge="20" to="/cart">
        购物车
      </van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/user">
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { CHANGE_TAB_BAR_ACTIVE } from "./store/types";
import { mapMutations } from "vuex";
export default {
  name: "TabBar",
  methods: {
    onChange(index) {
      this[CHANGE_TAB_BAR_ACTIVE](index);
    },
    ...mapMutations([CHANGE_TAB_BAR_ACTIVE]),
  },
  computed: {
    active: {
      get() {
        let active = 0;
        active =
          sessionStorage.getItem("tabBarActiveIndex") ||
          this.$store.state.tabBar.active;
        active = parseInt(active);
        return active;
      },
      set(index) {
        this[CHANGE_TAB_BAR_ACTIVE](index);
      },
    },
  },
};
</script>