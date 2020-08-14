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
                <p class="content">钢铁视图和炼成的</p>
              </TimelineItem>
            </Timeline>
          </Card>
        </TabPane>
      </Tabs>
    </Drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    value1: false,
    hasShadow: true,
    photoSrc: require("../assets/backiee-169407.jpg"),
  }),
  methods: {
    search(value) {
      if (this.$route.path == "/articleList") {
        this.$router.push({ name: "ArticleList", query: { search: value } });
        this.$router.go(0);
      }
      this.$router.push({ name: "ArticleList", query: { search: value } });
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