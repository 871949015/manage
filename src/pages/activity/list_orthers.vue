
<template>
	<div class="main">
		<div class="top-bar">
			<div class="button">
				<el-button type="text" @click="back">返回</el-button>
			</div>
		</div>
		<div class="list-box">
			<el-table
				:data="list"
				v-loading="loading"
				style="width: 100%"
				:header-cell-style="{'text-align':'center'}"
				:cell-style="{'text-align':'center'}"
				max-height="700"
			>
				<el-table-column prop="id" label="id" width="100"></el-table-column>
				<el-table-column label="用户ID" width="100">
					<template slot-scope="scope">
						<div class="name">{{scope.row.user_id}}</div>
					</template>
				</el-table-column>
				<el-table-column label="用户微信名" width="300">
					<template slot-scope="scope">
						<div class="name">{{!!scope.row.user.other_data ? scope.row.user.other_data.nickname : 'unknow'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="用户学号" width="300">
					<template slot-scope="scope">
						<div class="name">{{!!scope.row.user.student_number ? scope.row.user.student_number : '未填写'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="用户姓名" width="300">
					<template slot-scope="scope">
						<div class="name">{{!!scope.row.user.student_name ? scope.row.user.student_name : '未填写'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="活动状态">
					<template slot-scope="scope">
						<div>{{statusText(scope.row.activity_status)}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="120">
					<template slot-scope="scope">
						<el-button
							@click="handleCheck(scope.row.id,scope.$index)"
							type="text"
							size="small"
							v-if="scope.row.activity_status == 0"
						>已参与</el-button>
						<div v-else>已参与</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination
				layout="prev, pager, next, jumper"
				:page-count="totalPage"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
			></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: "list",
		data() {
			return {
				id: this.$route.params.id,
				loading: true,
				totalPage: 1,
				list: [],
				currentPage: 1
			};
		},
		created() {
			this.get_list()
		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			async get_list() {
				const res = await this.$api.activity_orthers({ id: this.id, page: this.currentPage, per_page: 9 });
				if (res.status == 200) {
					if (res.data.status == 1) {
						if (res.data.total_page != this.totalPage) {
							this.totalPage = res.data.total_page
						}
						this.list = res.data.data
						this.loading = false
					}
				}
			},
			async handleCheck(val, key) {
				const loading = this.$loading();
				const res = await this.$api.activity_orthers_update({ id: val, status: 1 }).catch(res => {
					loading.close();
				});
				if (res.status == 200) {
					if (res.data.status == 1) {
						this.$message({
							message: "修改成功",
							type: "success",
							duration: 1000,
						})
						this.list[key].activity_status = 1;
					}

				}
				loading.close();
			},
			handleCurrentChange(val) {
				if (!this.loading) {
					this.loading = true
					this.get_list()
				}
			},
			statusText(val) {
				let text = '';
				if (val == 1) {
					text = '已参与';
				} else if (val == 0) {
					text = '未参与';
				}
				return text
			}
		},
		computed: {

		},
	};
</script>
<style lang="scss" scoped>
	.main {
		height: calc(100vh - 60px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
	.list-box {
		padding-top: 50px;
	}
	.pagination {
		text-align: center;
		padding: 10px 0;
		margin-bottom: 20px;
	}
	.name {
		overflow: hidden;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		white-space: nowrap;
	}
	.time {
		display: flex;
		flex-direction: column;
		font-size: 0.5rem;
		position: relative;
		.float {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 0.1rem;
		}
	}
</style>
