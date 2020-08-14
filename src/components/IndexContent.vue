<template>
  <div :style="{marginTop:'20px',overflow:'hidden'}">
    <Divider>
      <strong>Start</strong>
    </Divider>
    <Row :gutter="16">
      <Col :md="{span:15,offset:2,push:5}">
        <Divider orientation="right">
          <p :style="{fontSize:'14px',fontFamily:'PingFang SC'}">置顶</p>
        </Divider>
        <Row :gutter="16" :style="{margin:'20px 0px'}">
          <Col :md="{span:0}" :xs="{span:22,offset:1}">
            <Carousel autoplay v-model="carouselValue" loop dots="outside">
              <CarouselItem>
                <router-link :to="{name:'ArticleList',query:{category:'CSharp'}}">
                  <div style="text-align:center">
                    <img src="../assets/backiee-48641.jpg" width="100%" />
                    <p>资料</p>
                  </div>
                </router-link>
              </CarouselItem>

              <CarouselItem>
                <div style="text-align:center">
                  <img src="../assets/backiee-48641.jpg" width="100%" />
                  <p>资料</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div style="text-align:center">
                  <img src="../assets/backiee-48641.jpg" width="100%" />
                  <p>资料</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div style="text-align:center">
                  <img src="../assets/backiee-48641.jpg" width="100%" />
                  <p>资料</p>
                </div>
              </CarouselItem>
            </Carousel>
          </Col>

          <Col :md="{span:6}" :xs="0">
            <Card style="100%" :bordered="!hasShadow">
              <div style="text-align:center">
                <img src="../assets/backiee-48641.jpg" width="100%" />
                <p>资料</p>
              </div>
            </Card>
          </Col>

          <Col :md="{span:6}" :xs="0">
            <Card style="100%" :bordered="!hasShadow">
              <div style="text-align:center">
                <img src="../assets/backiee-48641.jpg" width="100%" />
                <p>生活</p>
              </div>
            </Card>
          </Col>
          <Col :md="{span:6}" :xs="0">
            <Card style="100%" :bordered="!hasShadow">
              <div style="text-align:center">
                <img src="../assets/backiee-48641.jpg" width="100%" />
                <p>快乐源泉</p>
              </div>
            </Card>
          </Col>
          <Col :md="{span:6}" :xs="0">
            <Card style="100%" :bordered="!hasShadow">
              <div style="text-align:center">
                <img src="../assets/backiee-48641.jpg" width="100%" />
                <p>其它</p>
              </div>
            </Card>
          </Col>
        </Row>

        <Col span="24">
          <Divider orientation="right">
            <p :style="{fontSize:'14px',fontFamily:'PingFang SC'}">列表</p>
          </Divider>
          <Card style="width:100%" :shadow="hasShadow">
            <List item-layout="vertical">
              <ListItem v-for="item in data">
                <ListItemMeta
                  :title="item.Title"
                  :description="item.Description"
                  :style="{paddingTop:'5%'}"
                />
                <template slot="action">
                  <li>
                    <Icon type="ios-thumbs-up-outline" />
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
                <Button type="text" ref="left" :disabled="previousDisable" @click="PageData(1)">
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
      </Col>
      <Col :md="{span:5,pull:15}" :xs="0">
        <Card style="width:100%">
          <div style="text-align:center">
            <Avatar :src="photoSrc" size="70" />
            <p :style="{marginTop:'20px',fontSize:'14px',color:'gray'}">愿你眼里有光，心里有爱</p>
          </div>

          <CellGroup :style="{backgroundColor:'white'}">
            <Cell
              title="联系我"
              to="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2467912496&website=www.oicqzone.com"
            />
            <Cell title="风景墙" label="有颜色的图片" to="/components/blogs" />

            <Cell title="留言板" to="/leaveMessage">
              <Badge :count="10" type="primary" slot="extra" />
            </Cell>
            <Cell title="文章" to="/components/blogs">
              <Badge :count="10" type="primary" slot="extra" />
            </Cell>
          </CellGroup>
        </Card>
        <Card :style="{width:'100%',marginTop:'20px'}" :shadow="hasShadow">
          <p slot="title">最近</p>
          <Timeline>
            <TimelineItem v-for="item in newsList">
              <p class="time">{{DateHanler(item.CreateTime)}}</p>
              <router-link :to="{name:'ArticleInfo',query:{id:item.Id}}">
                <p class="content">{{item.Title}}</p>
              </router-link>
            </TimelineItem>
          </Timeline>
        </Card>
      </Col>
    </Row>
    <Divider>
      <strong>End</strong>
    </Divider>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    carouselValue: 1,
    hasShadow: true,
    previousDisable: true,
    nextDisable: false,
    newsList: "",
    nextLink: "",
    prevousLink: "",
    data: [],
    categories: [
      {
        name: "C#",
        articleList: [
          {
            id: 12,
            title: "标题一",
          },
          {
            id: 11,
            title: "标题二",
          },
        ],
      },
      {
        name: ".Net",
        articleList: [
          {
            id: 12,
            title: ".net标题一",
          },
          {
            id: 11,
            title: ".net标题二",
          },
        ],
      },
    ],
    time2: new Date().getTime() - 86400 * 3 * 1000,
    photoSrc: require("../assets/backiee-169407.jpg"),
  }),
  async created() {
    await this.getData();
  },

  methods: {
    ...mapActions(["QueryNewsArticle"]),
    DateHanler(oldtime) {
      return this.dateHandle(oldtime);
    },
    RemoveTFromTimes(times) {
      return this.removeTFromTime(times);
    },
    async getData() {
      await axios
        .get(
          "api/articles?Fields=id,title,description,imageUrl,commentCount,createTime&isRemove=false"
        )
        .then((res) => {
          console.log(res.data.links);
          this.data = res.data.values;
          let links = res.data.links;
          this.nextLink = links[1].href;
        })
        .catch((err) => {
          console.log(err);
        });

      this.newsList = await this.QueryNewsArticle();
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
      axios
        .get(link)
        .then((res) => {
          this.data = res.data.values;
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
