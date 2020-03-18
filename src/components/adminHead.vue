<template>
  <div class="head">
    <div class="introduce">
      <div class="logo">
        <img class="logo-img" :src="require('Assets/images/logo.png')" />
      </div>
      <div class="text">
        <span>春之花幼稚园试验品</span>
      </div>
    </div>
    <div class="right-btn">
      <div>
        <el-tooltip class="item" effect="dark" content="点击将退出此账号" placement="bottom">
          <el-button type="danger" size="mini" icon="el-icon-switch-button" circle></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminHead",
  data() {
    return {
      name: "hhh"
    };
  },
  computed: {},
  watch: {},
  methods: {
    //退出登录
    logout() {}
  }
};
</script>
<style lang="scss" scoped>
.head {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 88;
  background-color: #ffffff;
  overflow: hidden;
  box-sizing: border-box;
  border-bottom: 1px solid $borderColor;
  .introduce {
    position: absolute;
    left: 0;
    top: 0;
    height: 60px;
    display: flex;
    box-sizing: border-box;
    .logo {
      height: 60px;
      width: 60px;
      .logo-img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      padding-left: 20px;
      height: 60px;
      line-height: 60px;
      color: #000;
    }
  }
  .right-btn {
    position: absolute;
    right: 0;
    top: 0;
    height: 60px;
    line-height: 60px;
    padding-right: 20px;
  }
}
</style>