<template>
  <div class="banner" :style="divStyle">
    <Row
      type="flex"
      :style="{textAlign:'center',
    fontSize:'15px', padding:'10px 10px',backgroundColor:'transparent',boxShadow: '0 1px 1px 1px rgb(0,0,0,0.1)'}"
      align="middle"
    >
      <Col :md="{span:2,offset:3}" :xs="{span:0}">
        <router-link to="/">主页</router-link>
      </Col>
      <Col :md="2" :xs="{span:0}">
        <router-link to="/articleList">博客</router-link>
      </Col>
      <Col :md="2" :xs="{span:0}">
        <router-link to="/about">关于我</router-link>
      </Col>
      <Col :md="2" :xs="{span:0}">
        <router-link to="/about">留言</router-link>
      </Col>

      <Col :md="{span:8, offset:5}" :xs="24">
        <Col :md="{span:4,offset:7}" :xs="{span:4,offset:0}">
          <a href="https://github.com/HaoNathan" target="black">
            <i class="fa fa-github fa-lg" aria-hidden="true"></i>
          </a>
        </Col>
        <Col :md="0" :xs="{span:2,offset:16}">
          <Icon @click="value1=true" :style="{color:'black'}" type="md-menu" size="26"></Icon>
        </Col>
      </Col>

      <Drawer title="Menu" :closable="true" v-model="value1">
        <Tabs size="small">
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
            <Card :style="{width:'100%',marginTop:'20px'}" :shadow="hasShadow">
              <p slot="title">分类</p>
              <Collapse simple :accordion="hasShadow">
                <Panel name="1">
                  C#
                  <div slot="content">
                    <List size="small">
                      <ListItem>
                        <router-link to="/about">This is a piece of text.</router-link>
                      </ListItem>
                      <ListItem>This is a piece of text.</ListItem>
                      <ListItem>This is a piece of text.</ListItem>
                    </List>
                  </div>
                </Panel>
                <Panel name="2">
                  .Net
                  <div slot="content">
                    <List size="small">
                      <ListItem>This is a piece of text.</ListItem>
                      <ListItem>This is a piece of text.</ListItem>
                      <ListItem>This is a piece of text.</ListItem>
                    </List>
                  </div>
                </Panel>
                <Panel name="3">
                  .NetCore
                  <div slot="content">
                    <List size="small">
                      <ListItem>This is a piece of text.</ListItem>
                      <ListItem>This is a piece of text.</ListItem>
                      <ListItem>This is a piece of text.</ListItem>
                    </List>
                  </div>
                </Panel>
                <Panel name="4">
                  Web前端
                  <div slot="content">
                    <List size="small">
                      <ListItem>This is a piece of text.</ListItem>
                      <ListItem>This is a piece of text.</ListItem>
                      <ListItem>This is a piece of text.</ListItem>
                    </List>
                  </div>
                </Panel>
              </Collapse>
            </Card>
          </TabPane>
          <TabPane label="最近">
            <Card style="width:100%" dis-hover>
              <Timeline>
                <TimelineItem>
                  <p class="time">1976年</p>
                  <p class="content">Apple I 问世</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">1984年</p>
                  <p class="content">发布 Macintosh</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2007年</p>
                  <p class="content">发布 iPhone</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2010年</p>
                  <p class="content">发布 iPad</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2011年10月5日</p>
                  <p class="content">史蒂夫·乔布斯去世</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2007年</p>
                  <p class="content">发布 iPhone</p>
                </TimelineItem>
                <TimelineItem>
                  <Time :time="time2" type="datetime" />
                  <p class="content">钢铁视图和炼成的</p>
                </TimelineItem>
              </Timeline>
            </Card>
          </TabPane>
        </Tabs>
      </Drawer>
    </Row>

    <Row :style="{margin:'4% 0 16% 0'}">
      <Col
        :md="{span:20,offset:2}"
        :xs="{span:24}"
        :style="{fontSize:'120px',textAlign:'center', color:'white'}"
      >
        <p class="banner-hello">Hello World</p>
      </Col>
    </Row>
    <Affix @on-change="navChange" :style="{paddingTop:'10px'}">
      <Row
        type="flex"
        :style="{textAlign:'center',
        fontSize:'15px', padding:'10px 10px', boxShadow: '0 1px 1px 3px rgb(0,0,0,0.1)'}"
        align="middle"
        :class="{'navScrolling':styleFlag}"
        v-show="styleFlag"
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
            <Input search size="small" placeholder="Enter something..." />
          </Col>

          <Col :md="0" :xs="{span:1,offset:10}">
            <Icon @click="value1=true" :style="{color:'black'}" type="md-menu" size="26"></Icon>
          </Col>
        </Col>
      </Row>
    </Affix>
  </div>
</template>

<script>
export default {
  data: () => ({
    value1: false,
    styleFlag: false,
    hasShadow: true,
    time2: new Date().getTime() - 86400 * 3 * 1000,
    photoSrc: require("../assets/backiee-169407.jpg"),
    divStyle: {
      backgroundImage: "url(" + require("../assets/backiee-169407.jpg") + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "0px -150px",
      backgroundAttachment: "fixed",
    },
  }),

  methods: {
    navChange(status) {
      if (status == true) {
        this.styleFlag = true;
      } else {
        this.styleFlag = false;
      }
    },
  },
};
</script>

<style scoped>
a {
  color: rgb(129, 170, 194);
  font-family: "PingFang SC";
  font-weight: 200;
}

a:hover {
  color: white;
}
.navScrolling {
  background-color: white;
}
.navScrolling a {
  color: black;
}
@media screen and (max-width: 576px) {
  .banner {
    height: 350px;
    background-position: -182px -160px !important;
  }
  .banner-hello {
    font-size: 88px;
    text-align: left;
    margin: 3% 30px;
  }
}
</style>
