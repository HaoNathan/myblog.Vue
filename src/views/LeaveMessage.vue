<template>
  <div>
    <childHeader />
    <Row type="flex" justify="center" :style="{marginTop:'2%'}">
      <Col :md="{span:14,offse:5}" :xs="{span:20,offset:0}">
        <Card>
          <Form ref="formItem" inline :model="formItem" :rules="ruleValidate" :label-width="85">
            <FormItem label="昵称:" prop="name">
              <Input
                prefix="ios-contact"
                style="width: auto"
                :disabled="inputDisable"
                placeholder="您的昵称"
                v-model="formItem.name"
              />
            </FormItem>
            <FormItem label="联系方式:" prop="contact">
              <Input
                prefix="ios-contact"
                placeholder="您的联系方式"
                style="width: auto"
                :disabled="inputDisable"
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
            </FormItem>
            <FormItem label="点击提交:">
              <Button @click="handleSubmit('formItem')">提交</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
      <Col :md="{span:22,offset:1}" :xs="{span:24}">
        <Row type="flex" justify="center" align="middle">
          <Col
            :md="{span:5,offset:0}"
            :xs="{span:20,offset:2}"
            v-for="item in messages"
            :style="{padding:'20px 40px 20px 0px'}"
          >
            <Card :style="{width:'100%',fontFamily:'PingFang SC'}">
              <p :style="{fontSize:'16px',fontFamily:'等线',fontWeight:'bold'}">{{item.UserName}}</p>
              <p :style="{color:'gray',fontSize:'14px'}">{{item.Message}}</p>
              <p :style="{color:'lightGray',fontSize:'13px'}">{{removeT(item.CreateTime)}}</p>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import childHeader from "@/components/ChildHeader";
export default {
  components: { childHeader },
  data: () => ({
    switch1: false,
    inputDisable: false,
    user: "",
    formItem: {
      name: "",
      contact: "",
      comment: "",
    },
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
    messages: [],
  }),
  async created() {
    await this.GetLeaveMeassage();
    this.GetUser();
  },
  methods: {
    GetUser() {
      if (localStorage.getItem("user")) {
        const sessionObj = localStorage.getItem("user");
        this.user = JSON.parse(sessionObj);
        this.formItem.name = this.user.name;
        this.formItem.contact = this.user.contact;
        this.ruleValidate.name[0].required = false;
        this.ruleValidate.contact[0].required = false;
        this.inputDisable = true;
      }
    },
    async GetLeaveMeassage() {
      await axios
        .get("api/leaveMessage?isAll=true")
        .then((res) => {
          this.messages = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    change(status) {
      if (status == true) {
        this.ruleValidate.name[0].required = false;
        this.ruleValidate.contact[0].required = false;
        this.formItem.name = "";
        this.formItem.contact = "";
        this.inputDisable = true;
      } else {
        this.ruleValidate.name[0].required = true;
        this.ruleValidate.contact[0].required = true;

        this.inputDisable = false;
      }
    },
    //86400
    removeT(time) {
      return this.removeTFromTime(time);
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formItem.name == "") {
            this.formItem.name = "游客" + new Date().getTime();
            this.formItem.contact = "未填写";
            if (localStorage.getItem("user")) {
              localStorage.removeItem("user");
            }
          }
          if (localStorage.getItem("user")) {
            const localObj = localStorage.getItem("user");
            const user = JSON.parse(localObj);
            if (user.commentNum == 0) {
              this.$Message.success("每天仅可留言3次!");
              return;
            }
            user.commentNum = user.commentNum - 1;
            const jsonUser = JSON.stringify(user);
            localStorage.setItem("user", jsonUser);
          } else {
            const jsonValue = JSON.stringify({
              name: this.formItem.name,
              contact: this.formItem.contact,
              commentNum: 2,
            });
            localStorage.setItem("user", jsonValue);
          }

          axios
            .post("api/leaveMessage", {
              UserName: this.formItem.name,
              Message: this.formItem.comment,
              Contact: this.formItem.contact,
            })
            .then((res) => {
              if (res.status == 201) {
                let comment = res.data;
                const time = this.removeTFromTime(
                  res.data.createTime
                ).substring(0, 19);
                this.messages.unshift({
                  UserName: comment.userName,
                  Message: comment.message,
                  CreateTime: time,
                });
                this.$Message.success("评论成功!");

                // this.$refs[name].resetFields();
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
