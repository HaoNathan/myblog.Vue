<template>
  <div>
    <Row :style="{marginTop:'10%'}">
      <Col :md="{span:6,offset:9}">
        <Card>
          <p slot="title">Login</p>

          <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          axios
            .post("/api/admin", {
              name: this.formInline.user,
              password: this.formInline.password,
            })
            .then((res) => {
              if (res.status == 200) {
                const jsonValue = JSON.stringify({ Status: true });
                sessionStorage.setItem("loginStatus", jsonValue);
                // const c = sessionStorage.getItem("loginStatus");
                // console.log(JSON.parse(c));
                this.$router.push("/admin");
                this.$Message.success("欢迎回来!");
              }
            })
            .catch((err) => {
              console.log(err.response);
            });
        } else {
          this.$Message.error("数据错误!");
        }
      });
    },
  },
};
</script>