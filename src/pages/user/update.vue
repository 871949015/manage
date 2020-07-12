
<template>
	<div class="main">
		<div class="top-bar">
			<div class="button">
				<el-button type="text" @click="back">返回</el-button>
			</div>
		</div>
		<div class="form-data">
			<el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" v-loading="loading">
				<el-form-item label="用户姓名" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="用户学号" prop="num">
					<el-input type="text" v-model.number="form.num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年级专业">
					<el-input type="text" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "update",
		data() {
			var checkNum = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('不能为空或0'));
				}
				if (!Number.isInteger(value)) {
					callback(new Error('请输入数字值'));
				} else {
					callback();
				}
			};
			return {
				loading: false,
				id: this.$route.params.id,
				form: {
					name: '',
					num: '',
					desc: ''
				},
				rules: {
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
					],
					num: [{ required: true, validator: checkNum, trigger: 'blur' }
					],
				}			};
		},
		created() {
			if (this.id) {
				this.user_get();
			}
		},
		watch: {},
		mounted() { },
		methods: {
			back() {
				this.$router.go(-1)
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading = true;
						this.$api.user_update({
							id: this.id,
							name: this.form.name,
							number: this.form.num,
							desc: this.form.desc
						}).then((res) => {
							if (res.data.status == 1) {
								this.$message({
									message: "修改成功",
									type: "success",
									duration: 1000,
								})
								setTimeout(() => {
									this.$router.go(-1)
								}, 1000)
							} else {
								this.loading = false;
								this.$message({
									message: res.data.msg,
									type: "warning",
									duration: 1000,
								})
							}
						}).catch(() => {
							this.loading = false;
						})
					} else {
						return false;
					}
				});
			},
			async user_get() {
				const res = await this.$api.user_get({ params: { id: this.id } })
				if (res.data.status == 1) {
					let _data = res.data.data;
					console.log(_data)
					this.form.name = _data.student_name;
					this.form.num = _data.student_number;
					this.form.desc = _data.student_intro;
					console.log(this.form)
				} else {
					this.$message({
						message: res.data.msg,
						type: "error",
						duration: 1000,
					})
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	.main {
		height: calc(100vh - 60px);
		position: relative;
		box-sizing: border-box;
	}
	.top-bar {
		z-index: 9;
		background-color: #fff;
		position: absolute;
		top: 0;
		box-sizing: border-box;
		width: 100%;
		left: 0;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #e4e4e4;
		box-shadow: -2px 0 10px 0 rgba(0, 0, 0, 0.2);
		font-size: 0.75rem;
		display: flex;
		justify-content: space-between;
		padding: 0 15px;
	}
	.form-data {
		padding-top: 100px;
		max-width: 500px;
	}
</style>
