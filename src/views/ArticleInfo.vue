<template>
  <div>
    <child-Header></child-Header>

    <Row :style="{marginTop:'20px'}">
      <Col :md="{span:18,offset:2}" :xs="{span:20,offset:2}" :style="{paddingBottom:'20px'}">
        <Breadcrumb>
          <BreadcrumbItem to="/">主页</BreadcrumbItem>
          <BreadcrumbItem to="/articleList">文章列表</BreadcrumbItem>
          <BreadcrumbItem>{{title}}</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col :md="{span:3,offset:2}" :xs="0">
        <Affix :offset-top="50">
          <Card :style="{width:'100%'}" :shadow="hasShadow">
            <p slot="title">同类别文章</p>
            <CellGroup @on-click="GetArticle">
              <Cell v-for="item in articleList" :title="item.Title" :name="item.Id" />
            </CellGroup>
          </Card>

          <Card :style="{width:'100%',marginTop:'20px'}" :shadow="hasShadow">
            <p slot="title">快速导航</p>
            <Anchor :offset-top="60" show-ink>
              <AnchorLink href="#content" title="内容" />
              <AnchorLink href="#message" title="留言" />
            </Anchor>
          </Card>
        </Affix>
      </Col>
      <Col :md="{span:16,offset:1}" :xs="{span:22,offset:1}">
        <Row>
          <Col :md="{span:21}">
            <card style="100%">
              <div class="ql-container ql-snow">
                <div class="ql-editor" v-html="info" id="content"></div>
              </div>
            </card>
          </Col>
          <Col :md="{span:21}" :style="{marginTop:'20px'}" id="message">
            <Card>
              <p slot="title">给我留言</p>
              <Col :md="{span:5,offset:1}" :xs="{span:20,offset:2}">
                <Form
                  ref="formItem"
                  :model="formItem"
                  :rules="ruleValidate"
                  :label-width="85"
                  :style="{width:'280px'}"
                >
                  <FormItem label="昵称:" prop="name">
                    <Input
                      prefix="ios-contact"
                      style="width: auto"
                      :disabled="switch1"
                      placeholder="您的昵称"
                      v-model="formItem.name"
                    />
                  </FormItem>
                  <FormItem label="联系方式:" prop="contact">
                    <Input
                      prefix="ios-contact"
                      placeholder="您的联系方式"
                      style="width: auto"
                      :disabled="switch1"
                      v-model="formItem.contact"
                    />
                  </FormItem>
                  <FormItem label="评论:" prop="comment">
                    <Input
                      v-model="formItem.comment"
                      maxlength="100"
                      show-word-limit
                      autosize
                      type="textarea"
                      placeholder="请注意文明发言"
                      :style="{width:'100%'}"
                    />
                  </FormItem>
                  <FormItem label="匿名留言:">
                    <i-switch v-model="switch1" @on-change="change" />
                    <Button :style="{marginLeft:'30%'}" @click="handleSubmit('formItem')">提交</Button>
                  </FormItem>
                </Form>
              </Col>
              <Divider :style="{paddingTop:'20px'}">留言列表</Divider>
              <List>
                <ListItem>
                  <ListItemMeta title="暂无留言" description="快来给我留言吧" v-if="checkData" />
                </ListItem>
                <ListItem v-for="item in comments">
                  <ListItemMeta
                    :title="item.userName "
                    :description="timeHandler(item.createTime)"
                  />
                  <div :style="{width:'80%'}">{{ item.message }}</div>
                </ListItem>
              </List>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
    <BackTop></BackTop>
    <Footer></Footer>
  </div>
</template>
<script>
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import childHeader from "../components/ChildHeader";
import Footer from "@/components/Footer";
export default {
  components: {
    childHeader,
  },
  components: {
    Footer,
    childHeader,
  },
  async created() {
    await this.GetArticle();
    await this.GetSameArticle();
  },
  data: () => ({
    info: "",
    title: "",
    articleId: "",
    hasShadow: true,
    switch1: false,
    categoryId: "",
    articleList: "",
    formItem: {
      name: "",
      contact: "",
      comment: "",
    },
    comments: [],
    ruleValidate: {
      name: [
        {
          required: true,
          message: "请填写昵称",
          trigger: "blur",
        },
      ],
      contact: [{ required: true, message: "请填写联系方式", trigger: "blur" }],
      comment: [
        {
          required: true,
          message: "请填写评论内容",
          trigger: "blur",
        },
        {
          type: "string",
          max: 100,
          message: "评论不能超过100个字",
          trigger: "blur",
        },
      ],
    },
  }),
  computed: {
    checkData() {
      const res = this.comments.length == 0;
      return res;
    },
  },
  methods: {
    timeHandler(createTime) {
      const newTime = createTime.replace("T", " ");
      return newTime;
    },
    async GetArticle(name) {
      if (name != undefined) {
        this.articleId = name;
        console.log(name);
      } else {
        this.articleId = this.$route.query.id;
      }
      this.$Loading.start();
      this.$Spin.show();
      setTimeout(() => {
        this.$Spin.hide();
      }, 1000);
      await axios
        .get("api/articles/" + this.articleId)
        .then((res) => {
          this.info = res.data.content;
          this.title = res.data.title;
          this.categoryId = res.data.articleCategoryId;
        })
        .catch((err) => {
          console.log(err.response);
        });

      await axios
        .get("api/article/" + this.articleId + "/articleComment")
        .then((res) => {
          this.$Loading.finish();
          this.comments = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    async GetSameArticle() {
      await axios
        .get(
          "api/articles?Fields=id,title&isRemove=false&Id=" + this.categoryId
        )
        .then((res) => {
          this.articleList = res.data.values;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    change(status) {
      if (status == true) {
        this.ruleValidate.name[0].required = false;
        this.ruleValidate.contact[0].required = false;
        this.formItem.name = "";
        this.formItem.contact = "";
      } else {
        this.ruleValidate.name[0].required = true;
        this.ruleValidate.contact[0].required = true;
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formItem.name == "") {
            this.formItem.name = "游客" + new Date().getTime();
            this.formItem.contact = "未填写";
          }
          axios
            .post("api/article/" + this.articleId + "/articleComment", {
              UserName: this.formItem.name,
              Message: this.formItem.comment,
              Contact: this.formItem.contact,
            })
            .then((res) => {
              if (res.status == 201) {
                let comment = res.data;
                this.comments.unshift({
                  userName: comment.userName,
                  message: comment.message,
                  createTime: comment.createTime,
                });
                this.$Message.success("评论成功!");
              } else {
                this.$Message.error("您的数据有误!");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
  },
};
</script>
<style>
pre.ql-syntax {
  background-color: #23241f;
  border-radius: 3px;
  width: 100%;
  padding: 10px 10px;
  color: #f8f8f2;
}
.ql-container.ql-snow {
  border: none;
}
</style>