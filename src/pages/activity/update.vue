
<template>
	<div class="main">
		<div class="top-bar">
			<div class="button">
				<el-button type="text" @click="back">返回</el-button>
			</div>
		</div>
		<div class="form-data">
			<el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" v-loading="loading">
				<el-form-item label="活动名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="活动时间" prop="date1">
					<el-col :span="11">
						<el-date-picker
							v-model="form.date1"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="yyyy-MM-dd HH:mm:ss"
							:disabled="formDisabled"
						></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="报名时间" prop="date2">
					<el-col :span="11">
						<el-date-picker
							v-model="form.date2"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="yyyy-MM-dd HH:mm:ss"
							:disabled="formDisabled"
						></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="参与人数" prop="num">
					<el-input type="text" v-model.number="form.num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动类型" prop="type">
					<el-radio-group v-model="form.type">
						<el-radio label="1">讲座</el-radio>
						<el-radio label="2">其他</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="活动描述">
					<el-input type="textarea" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" v-if="formDisabled">立即修改</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')" v-else>立即创建</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "about",
		data() {
			var checkNum = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('参与人数不能为空或0'));
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
				formDisabled: false,
				form: {
					name: '',
					date1: [],
					date2: [],
					num: '',
					type: '',
					desc: ''
				},
				rules: {
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
					],
					date1: [
						{ required: true, message: '请选择日期', trigger: 'change' }
					],
					date2: [
						{ required: true, message: '请选择时间', trigger: 'change' }
					],
					num: [{ validator: checkNum, trigger: 'blur' }
					],
					type: [
						{ required: true, message: '请选择活动类型', trigger: 'change' }
					],
					desc: [
						{ required: true, message: '请填写活动描述', trigger: 'blur' }
					]
				}			};
		},
		created() {
			if (this.id) {
				this.activity_get();
				this.formDisabled = true
			}
		},
		watch: {},
		mounted() { },
		methods: {
			back() {
				this.$router.go(-1)
			},
			submitForm(formName) {
				if (this.formDisabled) {
					this.$refs[formName].validate((valid) => {
						if (valid) {
							this.loading = true;
							this.$api.activity_update({
								id: this.id,
								name: this.form.name,
								join_number: this.form.num,
								type: this.form.type,
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
								}
							}).catch(() => {
								this.loading = false;
							})
						} else {
							return false;
						}
					});
				} else {
					this.$refs[formName].validate((valid) => {
						if (valid) {
							this.loading = true;
							this.$api.activity_add({
								name: this.form.name,
								type: this.form.type,
								desc: this.form.desc,
								join_number: this.form.num,
								date_begin: this.form.date1[0],
								date_end: this.form.date1[1],
								time_join_begin: this.form.date2[0],
								time_join_end: this.form.date2[1],
								auth_id: this.$getUser.userid
							}).then((res) => {
								if (res.data.status == 1) {
									this.$message({
										message: "创建成功",
										type: "success",
										duration: 1000,
									})
									setTimeout(() => {
										this.$router.go(-1)
									}, 1000)
								} else {
									this.$message({
										message: res.data.msg,
										type: "error",
										duration: 1000,
									})
									this.loading = false;
								}
							}).catch(() => {
								this.loading = false;
							});
						} else {
							return false;
						}
					});
				}
			},
			async activity_get() {
				const res = await this.$api.activity_get({ params: { id: this.id } })
				if (res.data.status == 1) {
					let _data = res.data.data;
					console.log(_data)
					this.form.name = _data.name;
					this.form.type = _data.type;
					this.form.desc = _data.desc;
					this.form.num = _data.join_number;
					this.form.date1[0] = new Date(_data.date_begin);
					this.form.date1[1] = new Date(_data.date_end);
					this.form.date2[0] = new Date(_data.time_join_begin);
					this.form.date2[1] = new Date(_data.time_join_end);
					console.log(this.form)
				} else {
					this.$message({
						message: res.data.msg,
						type: "error",
						duration: 1000,
					})
				}
			}
		},
		computed: {
			...mapState({
				$getUser: state => state.user,
			})
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
