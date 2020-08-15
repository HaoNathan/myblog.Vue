
<template>
  <div>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="userName">
        <strong>{{ row.userName }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <i-Switch v-model="row.isRemove" @on-change="change(index)" :style="{marginRight:'10px'}" />
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
      </template>
    </Table>
    <Page ref="pagelist" :total="totalCount" :current.sync="currentPage" @on-change="GetData"></Page>
  </div>
</template>
<script>
export default {
  async created() {
    await this.GetData();
  },
  data() {
    return {
      switch1: true,
      currentPage: 1,
      totalCount: 0,
      columns12: [
        {
          title: "用户名",
          slot: "userName",
        },
        {
          title: "评论",
          key: "message",
        },
        {
          title: "联系方式",
          key: "contact",
        },
        {
          title: "创建时间",
          key: "createTime",
        },
        {
          title: "Action",
          slot: "action",
          width: 200,
          align: "center",
        },
      ],
      data6: [],
    };
  },
  methods: {
    show(index) {
      this.$router.push({
        path: "/articleInfo",
        query: { id: this.data6[index].articleId },
      });
    },

    async GetData() {
      await axios
        .get("api/articleComments?pageNum=" + this.currentPage)
        .then((res) => {
          this.data6 = res.data;
          var obj = JSON.parse(res.headers.xpagenation);
          this.currentPage = obj.currentPage;
          this.totalCount = obj.totalCount;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    change(index) {
      const id = this.data6[index].id;
      axios
        .post(
          "api/article/" +
            this.data6[index].articleId +
            "/articleComment/UpdateArticleCommentStatus",
          { Id: id, IsRemove: !this.data6[index].IsRemove }
        )
        .then((res) => {
          if (res.status == 204) {
            this.$Message.info("修改成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>