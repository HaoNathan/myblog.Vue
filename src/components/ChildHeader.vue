<template>
  <div>
    <Affix>
      <Row
        type="flex"
        :style="{textAlign:'center',
        fontSize:'15px', padding:'10px 10px',backgroundColor:'white',  boxShadow: '0 1px 1px 3px rgb(0,0,0,0.1)'}"
        align="middle"
      >
        <Col :md="{span:2,offset:3}" :xs="{span:0}">
          <router-link to="/">主页</router-link>
        </Col>
        <Col :md="2" :xs="{span:0}">
          <router-link to="/">页面一</router-link>
        </Col>
        <Col :md="2" :xs="{span:0}">
          <router-link to="/">页面二</router-link>
        </Col>
        <Col :md="2" :xs="{span:0}">
          <router-link to="/about">关于我</router-link>
        </Col>

        <Col :md="{span:8, offset:5}" :xs="24">
          <Col :md="{span:5, offset:4}" :xs="{span:8,offset:2}">
            <Input search size="small" placeholder="Enter something..." @on-search="search" />
          </Col>

          <Col :md="0" :xs="{span:1,offset:10}">
            <Icon @click="value1=true" :style="{color:'black'}" type="md-menu" size="26"></Icon>
          </Col>
        </Col>
      </Row>
    </Affix>
    <Drawer title="Menu" :closable="true" v-model="value1">
      <Tabs size="small" @on-click="tabChange">
        <TabPane label="About Me">
          <Card style="width:100%">
            <div style="text-align:center">
              <Avatar :src="photoSrc" size="70" />
              <p :style="{marginTop:'20px',fontSize:'14px',color:'gray'}">愿你眼里有光，心里有爱</p>
            </div>
          </Card>
          <Card title="Options" :padding="0" style="width: 100%;">
            <CellGroup>
              <Cell title="Only show titles" />
              <Cell title="照片墙" label="有颜色的图片" />
              <Cell title="Link" extra="details" />
              <Cell title="所有" to="/components/blogs">
                <Badge :count="10" type="primary" slot="extra" />
              </Cell>
            </CellGroup>
          </Card>
        </TabPane>
        <TabPane label="分类">
          <Card :style="{width:'100%'}" :shadow="hasShadow">
            <p slot="title">分类</p>
            <CellGroup @on-click="selestArticle">
              <Cell v-for="item in categories" :title="item.categoryName" :name="item.categoryId" />
            </CellGroup>
          </Card>
        </TabPane>
        <TabPane label="最近">
          <Card :style="{width:'100%',marginTop:'20px'}" :shadow="hasShadow">
            <p slot="title">最近</p>
            <Timeline>
              <TimelineItem v-for="item in newsList">
                <p class="time">
                  <Time :time="item.CreateTime" />
                </p>
                <p class="content" @click="getArticle(item.Id)">{{item.Title}}</p>
              </TimelineItem>
            </Timeline>
          </Card>
        </TabPane>
      </Tabs>
    </Drawer>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    value1: false,
    hasShadow: true,
    categories: "",
    newsList: "",
    photoSrc: require("../assets/backiee-169407.jpg"),
  }),
  methods: {
    ...mapActions(["QueryNewsArticle", "GetCategories"]),
    search(value) {
      if (this.$route.path == "/articleList") {
        this.$router.push({ name: "ArticleList", query: { search: value } });
        this.$router.go(0);
      }
      this.$router.push({ name: "ArticleList", query: { search: value } });
    },
    async tabChange(name) {
      if (name == 1) {
        this.categories = await this.GetCategories();
      } else if (name == 2) {
        this.newsList = await this.QueryNewsArticle();
      }
    },
    selestArticle(name) {
      this.$router.push({ name: "ArticleList", query: { id: name } });
      this.$router.go(0);
    },
    getArticle(id) {
      this.$router.push({ name: "ArticleInfo", query: { id } });
      this.$router.go(0);
    },
  },
};
</script>
<style scoped>
a {
  color: black;
  font-family: "PingFang SC";
  font-weight: 200;
}
</style>