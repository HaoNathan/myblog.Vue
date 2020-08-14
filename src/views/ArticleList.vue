<template>
  <div>
    <child-header></child-header>
    <Row :style="{marginTop:'12px'}">
      <Col :md="{span:4,offset:3}" :xs="0">
        <Affix :offset-top="50">
          <Card :style="{width:'100%'}" :shadow="hasShadow">
            <p slot="title">分类</p>
            <CellGroup @on-click="selestArticle">
              <Cell v-for="item in categories" :title="item.categoryName" :name="item.categoryId" />
            </CellGroup>
          </Card>

          <Card :style="{width:'100%',marginTop:'20px'}" :shadow="hasShadow">
            <p slot="title">最近</p>
            <Timeline>
              <TimelineItem v-for="item in newsList">
                <p class="time">{{DateHanler(item.CreateTime)}}</p>
                <p class="content">
                  <router-link :to="{name:'ArticleInfo',query:{id:item.Id}}">{{item.Title}}</router-link>
                </p>
              </TimelineItem>
            </Timeline>
          </Card>
        </Affix>
      </Col>

      <Col :md="{span:13,offset:1}">
        <Card style="width:100%" :shadow="hasShadow">
          <List item-layout="vertical">
            <ListItem v-for="item in articlesData" :key="item.Id">
              <ListItemMeta
                :title="item.Title"
                :description="item.Description"
                :style="{marginTop:'5%'}"
              />
              <template slot="action">
                <li>
                  <Icon type="ios-time-outline" />
                  {{RemoveTFromTimes(item.CreateTime)}}
                </li>
                <li>
                  <Icon type="ios-chatbubbles-outline" />
                  {{item.CommentCount}}
                </li>
                <li>
                  <router-link
                    :to="{path:'/articleInfo',query:{id:item.Id}}"
                    :style="{color:'rgba(0,0,0,.45)'}"
                  >
                    <Icon type="ios-eye" />浏览
                  </router-link>
                </li>
              </template>
              <template slot="extra">
                <img :src="item.ImageUrl" style="width: 280px" />
              </template>
            </ListItem>
          </List>
          <Row>
            <Col span="1" offset="4">
              <Button type="text" :disabled="previousDisable" @click="PageData(1)">
                <Icon type="ios-arrow-back" />Prevous
              </Button>
            </Col>
            <Col span="1" offset="8">
              <Button type="text" :disabled="nextDisable" @click="PageData(2)">
                Next
                <Icon type="ios-arrow-forward" />
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Footer></Footer>
  </div>
</template>
<script>
import childHeader from "../components/ChildHeader";
import Footer from "../components/Footer";
import { mapActions } from "vuex";
export default {
  components: {
    childHeader,
    Footer,
  },
  async created() {
    await this.GetCategories();
    await this.GetArticles();
  },
  data: () => ({
    hasShadow: true,
    previousDisable: true,
    nextDisable: false,
    nextLink: "",
    prevousLink: "",
    articlesData: [],
    categories: [],
    newsList: "",
  }),
  methods: {
    ...mapActions(["QueryNewsArticle"]),
    DateHanler(oldtime) {
      return this.dateHandle(oldtime);
    },
    RemoveTFromTimes(times) {
      return this.removeTFromTime(times);
    },
    selestArticle(dd) {
      this.$router.push({ name: "ArticleList", query: { id: dd } });
      this.$router.go(0);
    },
    async GetCategories() {
      await axios
        .get("api/articleCategory?isRemove=false")
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async GetArticles() {
      const search = this.$route.query.search;
      const id = this.$route.query.id;
      const category = this.$route.query.category;
      let url = "";

      if (id != undefined) {
        console.log("searchId");
        url =
          "api/articles?Fields=id,title,description,imageUrl,commentCount,createTime&isRemove=false&pageSize=10&Id=" +
          id;
      } else if (search != undefined) {
        console.log("search");
        url =
          "api/articles?Fields=id,title,description,imageUrl,commentCount,createTime&isRemove=false&pageSize=10&search=" +
          search;
      } else if (category != undefined) {
        url =
          "api/articles?Fields=id,title,description,imageUrl,commentCount,createTime&isRemove=false&pageSize=10&categoryName=" +
          category;
      } else {
        url =
          "api/articles?Fields=id,title,description,imageUrl,commentCount,createTime&isRemove=false&pageSize=10";
      }
      this.$Loading.start();
      this.$Spin.show();
      setTimeout(() => {
        this.$Spin.hide();
      }, 1000);
      await axios
        .get(url)
        .then((res) => {
          this.articlesData = res.data.values;
          console.log(res.data.links);

          let links = res.data.links;

          if (links.length == 1) {
            this.previousDisable = true;
            this.nextDisable = true;
          } else {
            this.nextLink = links[1].href;
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
      this.newsList = await this.QueryNewsArticle();
      this.$Loading.finish();
    },
    PageData(flag) {
      let link = "";
      if (flag == 2) {
        const index = this.nextLink.indexOf("api");
        link = this.nextLink.toString().substring(index);
      } else {
        const preIndex = this.prevousLink.indexOf("api");
        link = this.prevousLink.toString().substring(preIndex);
      }
      console.log(link);
      axios
        .get(link)
        .then((res) => {
          this.articlesData = res.data.values;
          let links = res.data.links;

          if (links.length == 2 && links[1].rel == "previousPage") {
            this.previousDisable = false;
            this.nextDisable = true;
            this.prevousLink = links[1].href;
          } else if (links.length == 2 && links[1].rel == "nextPage") {
            this.previousDisable = true;
            this.nextDisable = false;
            this.nextLink = links[1].href;
          } else {
            this.previousDisable = false;
            this.nextDisable = false;
            this.prevousLink = links[1].href;
            this.nextLink = links[2].href;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>