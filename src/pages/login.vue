<!-- 登录 -->
<template>
  <div class="login" @keyup.enter="login">
    <div class="box">
      <div class="form" id="form">
        <span class="title">登录商户管理系统</span>
        <div class="submit clearfix">
          <el-input
            v-model="username"
            placeholder="请输入用户名"
            class="login-controls"
            prefix-icon="el-icon-mobile-phone"
          ></el-input>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            class="login-controls"
            prefix-icon="el-icon-edit-outline"
          ></el-input>
          <div id="geetest-box" class="geetest-box"></div>
          <el-button
            type="primary"
            class="login-controls"
            @click="login"
            :disabled="loginSuccess"
          >登录</el-button>
          <div class="register-btn">
            <el-button type="text" @click="regist">
              没有账号？
              立即注册
            </el-button>
            <!-- <el-button type="text" @click.stop="$router.push({name: 'register'})">
              没有账号？
              立即注册
            </el-button>-->
          </div>
        </div>
      </div>
      <span class="text">
        <p>Copyright &copy; 春之花幼稚园版权所有</p>
        <p></p>
      </span>
    </div>
  </div>
</template>
<script>
const FORM_WIDTH = "335px";

export default {
  data() {
    return {
      username: "",
      password: "",
      geeLoading: true,
      loginLoading: false,
      loginSuccess: false, // 是否登录成功
      geeInstance: null, // 极验对象
      geeValidationParam: null // 极验参数
    };
  },
  created() {
    // this.initGeeInstance();
  },
  methods: {
    // 极验证实例
    // async initGeeInstance() {
    //     // 后台必须要传phone参数
    //     const _geeTestInit = await this.$api.geeTestInit({phone: ''});
    //     const _geeTestConfig = JSON.parse(_geeTestInit.data.data);

    //     initGeetest({
    //         gt: _geeTestConfig.gt,
    //         challenge: _geeTestConfig.challenge,
    //         offline: !_geeTestConfig.success,
    //         new_captcha: true,
    //         width: FORM_WIDTH,
    //         product: 'bind',
    //         https: true
    //     }, (geeInstance) => {
    //         this.geeInstance = geeInstance;
    //         geeInstance.bindForm('#form');
    //         geeInstance.onReady(() => {
    //             this.geeLoading = false;
    //         }).onSuccess(async () => {
    //             this.loginLoading = true;
    //             this.loginSuccess = true;
    //             const result = this.geeInstance.getValidate();

    //             const postParam = {
    //                 geetest_challenge: result.geetest_challenge,
    //                 geetest_validate: result.geetest_validate,
    //                 geetest_seccode: result.geetest_seccode,
    //                 username: this.username,
    //                 password: this.password
    //             };
    //             const loginResponse = await this.$api.login(postParam);

    //             if (loginResponse.data.statusCode === 200) {
    //                 this.$util.setCookie('utoken', loginResponse.data.data.token, 7200);
    //                 this.$util.setCookie('ui', loginResponse.data.data.info.id, 7200);
    //                 localStorage.setItem('un', loginResponse.data.data.info.username);
    //                 localStorage.setItem('utime', new Date().toLocaleString());
    //                 this.loginLoading = false;
    //                 this.$message({
    //                     message: '登录成功',
    //                     type: 'success'
    //                 });
    //                 this.$store.dispatch('userInfo', {
    //                     token: loginResponse.data.data.token,
    //                     username: loginResponse.data.data.info.username,
    //                     userid: loginResponse.data.data.info.id
    //                 }).then(() => {
    //                     this.$router.push({name: 'merchantsList'});
    //                 });
    //             } else {
    //                 this.loginLoading = false;
    //                 this.loginSuccess = false;
    //                 this.geeValidationParam = null;
    //                 this.geeInstance.reset();
    //             }
    //         }).onError(function () {
    //             this.$message.error('智能验证失败，请联系管理员');
    //         })
    //     });

    // },

    login() {
      if (this.username === "" || this.password === "") {
        this.$message({
          message: "请输入账号或密码",
          type: "warning"
        });
        return false;
      } else {
        this.$router.replace({name: 'vmain'});
      }
      // if (!this.geeLoading) {
      //     this.geeInstance.verify();
      // } else {
      //     this.$message.warning('智能验证插件加载中，请稍后');
      // }
    },
    regist() {
      this.$message({
        message: "不好意思，注册也没做",
        type: "success"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  //   background: url("../../assets/images/login-bg3.jpg");

  .form {
    position: absolute;
    min-width: 325px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
  }

  .box {
    width: 35%;
    height: 100%;
    position: absolute;
    right: 0;
    z-index: 4;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 15px 0 0;
    box-sizing: border-box;
    // box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    box-shadow: -2px 0 10px 0 rgba(0, 0, 0, 0.2);
    // transform: translate(-50%, -50%);

    .title {
      display: block;
      color: #333;
      margin-bottom: 15px;
      border-bottom: 1px solid #ececec;
      padding: 0 0px 10px;
      font-size: 18px;
    }

    .login-controls {
      margin-bottom: 20px;
    }

    .vlidate-img {
      cursor: pointer;
      max-width: none;
    }

    .el-button--primary {
      // background-color: #1b1b1b;
      // border-color: #1b1b1b;
      width: 100%;
      margin-bottom: 0;
      transition: all 0.3s;
      // &:hover {
      //     background-color: #0e0e0e;
      //     border-color: #0e0e0e;
      // }
    }

    .register-btn {
      margin-bottom: 10px;
      margin-left: 0;
      text-align: right;
    }

    .el-checkbox {
      color: #fff;
      float: left;
      margin-top: 8px;
    }
  }
  .text {
    width: 100%;
    position: absolute;
    bottom: 20px;
    text-align: center;
    color: #9a9a9a;
  }
  .state {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 100px;
    color: #fff;
    line-height: 40px;
    font-size: 17px;
    transform: translate(0, -50%);
    h1 {
      margin-bottom: 20px;
      font-weight: normal;
    }
    .contact-btn {
      border: 1px solid #ccc;
      margin-left: 20px;
    }
    .state-p {
      margin-top: 20px;
    }
    .logo-img {
      width: 35px;
      position: relative;
      top: 6px;
      right: 2px;
    }
    p {
      letter-spacing: 5px;
    }
  }
}
</style>
