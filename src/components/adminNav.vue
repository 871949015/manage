<template>
  <div class="nav">
    <el-menu :default-active="dindex" class="el-menu-vertical-demo" @select="handleTap">
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "adminNav",
  data() {
    return {
      dindex: "1"
    };
  },
  methods: {
    handleTap(e) {
      if (e == this.dindex) {
        this.$emit('v-reload')
      } else {
        this.dindex = e;
        if (e == 2) {
          this.$router.push({ name: "about" });
        } else if (e == 1) {
          this.$router.push({ name: "vmark" });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  width: 240px;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 98;
  overflow: hidden;
  background-color: #fff;
  border-right: 1px solid $borderColor;
  box-sizing: border-box;
}
</style>