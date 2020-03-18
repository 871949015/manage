
<template>
  <div class="main">
    <adminHead></adminHead>
    <adminNav v-on:v-reload="reload"></adminNav>
    <section class="container">
      <transition name="fade">
        <router-view v-if="isRouterAlive"></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
import adminHead from "Component/adminHead";
import adminNav from "Component/adminNav";
export default {
  name: "vmain",
  data() {
    return {
      isRouterAlive: true
    };
  },
  components: {
    adminHead,
    adminNav
  },
  created() {
    console.log("组件", adminHead);
    this.$router.push({ name: "vmark" });
  },
  watch: {},
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  padding-top: 60px;
  padding-left: 260px;
  padding-right: 10px;
  padding-bottom: 10px;
  transition: 0.3s all;
}
</style>
