<template>
  <div class="home">
    <Search />
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a to="">
            <img src="" alt="" />
          </a>
        </div>
      </div>

      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>
<script>
import Search from "components/search";
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
import { mapActions } from "vuex";

import { GET_ADS } from "./store/types";
export default {
  name: "Home",
  components: {
    Search,
  },
  mounted() {
    this[GET_ADS]();
  },
  methods: {
    ...mapActions([GET_ADS]),
  },
};
</script>

<style lang="less" scoped>
</style>