<!-- 登录 -->
<template>
	<div class="login" @keyup.enter="login">
		<img src="Assets/images/loginbg.jpg" alt />
		<div class="box">
			<div class="form" id="form">
				<div class="login-title">
					<span>Login</span>
				</div>
				<div class="submit clearfix">
					<el-popover
						placement="top"
						trigger="manual"
						width="300"
						content="账号只能由英文数字和_组成"
						v-model="verifyTip"
						class="popover"
					></el-popover>
					<el-input v-model="username" placeholder="请输入用户名" class="login-controls"></el-input>
					<el-input v-model="password" type="password" placeholder="请输入密码" class="login-controls"></el-input>
					<el-button
						type="primary"
						class="login-button"
						@click="login"
						:disabled="verifyAccount"
						:loading="loginLoading"
						:autofocus="loginLoading"
					>登录</el-button>
					<div class="register-btn">
						<el-button type="text" @click="regist">
							没有账号？
							立即注册
						</el-button>
					</div>
				</div>
			</div>
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
				loginLoading: false,
				verifyAccount: true,
			};
		},
		created() {
		},
		methods: {
			async login() {
				if (this.username === "" || this.password === "") {
					this.$message({
						message: "请输入账号或密码",
						type: "warning"
					});
					return false;
				}
				if (true) {
					this.loginLoading = true;
					const res_key = await this.$api.get_key({ params: { date: "2020" } }).catch(() => {
						this.loginLoading = false;
					});
					if (res_key.status == 200) {
						let public_key = res_key.data.data;
						let account = this.$util.encryptedData(this.username, public_key)
						let password = this.$util.encryptedData(this.password, public_key)
						const res = await this.$api.login({
							account: account,
							password: password,
						});
						if (res.status == 200) {
							this.loginLoading = false;
							let _data = res.data;
							if (_data.status == 1) {
								this.$util.setCookie('token', _data.data.access_token, 28800);
								this.$util.setCookie('username', _data.data.nick_name, 28800);
								this.$util.setCookie('userid', _data.data.id, 28800);
								this.$message({
									message: "登陆成功",
									type: "success",
								});
								this.$store.dispatch('userInfo', {
									token: _data.data.access_token,
									username: _data.data.nick_name,
									userid: _data.data.id
								}).then(() => {
									this.$router.replace({ name: "vmain" });
								})
							}
						}
					}
				}
			},
			regist() {
				this.$message({
					message: "不好意思，注册没做",
					type: "warning"
				});
				console.log(this.$util.getCookie('token'))
			}
		},
		computed: {
			verifyTip: {
				get() {
					return this.$util.validate({ type: 'user', value: this.username }) ? true : false;;
				},
				set() {
					this.verifyAccount = this.$util.validate({ type: 'user', value: this.username }) ? true : false;;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.login {
		width: 100vw;
		height: 100vh;
		background: url("../assets/images/loginbg.jpg");

		.box {
			width: 400px;
			height: 500px;
			position: absolute;
			top: 40%;
			left: calc(50% - 200px);
			z-index: 4;
			background-color: rgba(255, 255, 255, 0.95);
			box-sizing: border-box;
			box-shadow: -2px 0 10px 0 rgba(0, 0, 0, 0.2);
			transform: translate(0, -40%);
			border-radius: 10px;

			.form {
				position: relative;
				top: 70%;
				left: 50%;
				transform: translate(-50%, -70%);
				padding: 30px;
			}
			.login-title {
				position: absolute;
				top: -20%;
				left: 50%;
				transform: translate(-50%, 20%);
				font-weight: bold;
				font-size: 1.5rem;
				font-style: unit($number: 1);
			}
			.popover {
				position: absolute;
				top: -15%;
			}
			.login-controls {
				margin-bottom: 20px;
			}
			.login-button {
				margin-top: 30px;
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
				margin-top: 30px;
				text-align: center;
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
