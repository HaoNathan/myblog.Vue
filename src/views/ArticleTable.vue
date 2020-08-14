
<template>
  <Row>
    <Col>
      <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="title">
          <strong>{{ row.Title }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <i-Switch
            v-model="row.IsRemove"
            @on-change="change(index)"
            :style="{marginRight:'10px'}"
          />
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">update</Button>
        </template>
      </Table>
    </Col>
    <Col>
      <Page ref="pagelist" :total="totalCount" :current.sync="currentPage" @on-change="GetData"></Page>
    </Col>
  </Row>
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
          title: "Title",
          slot: "title",
        },
        {
          title: "description",
          key: "Description",
        },
        {
          title: "createTime",
          key: "CreateTime",
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
        path: "/addArticle",
        query: { id: this.data6[index].Id },
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    async GetData() {
      let a = sessionStorage.getItem("loginStatus");
      await axios
        .get(
          "api/articles?Fields=id,title,description,createTime,ArticleCategoryId,isRemove&pageSize=10&isRemove=true&pageNum=" +
            this.currentPage
        )
        .then((res) => {
          this.data6 = res.data.values;
          var obj = JSON.parse(res.headers.xpagenation);
          this.currentPage = obj.currentPage;
          this.totalCount = obj.totalCount;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    change(index) {
      const id = this.data6[index].Id;
      axios
        .post(
          "api/articleCategory/" +
            this.data6[index].ArticleCategoryId +
            "/article/" +
            id +
            "/updateStatus",
          { IsRemove: !this.data6[index].IsRemove }
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