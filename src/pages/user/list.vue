
<template>
	<div class="main">
		<div class="top-bar">
			<div class="title">用户列表</div>
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
				<el-table-column label="用户微信名">
					<template slot-scope="scope">
						<div class="name">{{!!scope.row.other_data ? scope.row.other_data.nickname : 'unknow'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="用户学号">
					<template slot-scope="scope">
						<div class="name">{{!!scope.row.student_number ? scope.row.student_number : '未填写'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="用户姓名">
					<template slot-scope="scope">
						<div class="name">{{!!scope.row.student_name ? scope.row.student_name : '未填写'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="用户专业">
					<template slot-scope="scope">
						<div class="name">{{!!scope.row.student_intro ? scope.row.student_intro : '未填写'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="120">
					<template slot-scope="scope">
						<el-button @click="handleEdit(scope.row.id)" type="text" size="small">编辑</el-button>
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
			async get_list() {
				const res = await this.$api.user_list({ page: this.currentPage, per_page: 9 });
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
			handleEdit(val) {
				this.$router.push({ name: "user_update", params: { id: val } });
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
					text = '进行中';
				} else if (val == 0) {
					text = '已结束';
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
