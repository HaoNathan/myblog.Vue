<template>
  <Row>
    <Col span="24">
      <Row>
        <Col span="20">
          <Form ref="formInline" :model="formCustom" :rules="ruleInline" inline>
            <FormItem prop="title">
              <Input type="text" v-model="formCustom.title" placeholder="标题">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="description">
              <Input type="textarea" v-model="formCustom.description" placeholder="描述">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="uploadImageUrl">
              <Input type="text" v-model="formCustom.uploadImageUrl" disabled placeholder="图片路径">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="categoryId">
              <Select v-model="formCustom.categoryId">
                <Option v-for="item in categoryList" :value="item.categoryId">{{item.categoryName}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" v-if="btnShow" @click="handleSubmit('formInline')">添加</Button>
              <Button type="primary" v-if="!btnShow" @click="handleUpdateSubmit('formInline')">修改</Button>
            </FormItem>
          </Form>
          <Upload :on-success="handleSuccess" action="/api/Upload/UploadArticleImage">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </Col>
        <Col span="4">
          <img :src="formCustom.uploadImageUrl" alt width="65%" />
        </Col>
      </Row>
    </Col>
    <Col span="24">
      <div class="demo-split" :style="{overflow:'scroll'}">
        <Split v-model="split1">
          <div slot="left" class="demo-split-pane">
            <quill-editor ref="myQuillEditor" v-model="formCustom.editData" :options="editorOption"></quill-editor>
          </div>
          <div slot="right" class="demo-split-pane">
            <div class="ql-container ql-snow">
              <div class="ql-editor" v-html="formCustom.editData"></div>
            </div>
          </div>
        </Split>
      </div>
    </Col>
  </Row>
</template>

//事件
// 
// @focus="onEditorFocus($event)"
// @ready="onEditorReady($event)"

<script>
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import Quill from "quill";
import Axios from "axios";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
export default {
  data() {
    return {
      split1: 0.5,
      btnShow: true,
      articleId: "",
      formCustom: {
        editData: "",
        description: "",
        uploadImageUrl: "",
        title: "",
        categoryId: "",
      },
      categoryList: "",
      ruleInline: {
        title: [
          {
            required: true,
            message: "请输入标题.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
        uploadImageUrl: [
          {
            required: true,
            message: "请上传图片.",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请添加描述.",
            trigger: "blur",
          },
        ],
        categoryId: [
          {
            required: true,
            message: "请选择类别.",
            trigger: "blur",
          },
        ],
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ["clean", "link", "image", "video"], // remove formatting button
          ],
          syntax: {
            highlight: (text) => {
              return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
            },
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
        theme: "snow",
      },
    };
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  async created() {
    await this.GetCategories();
    await this.GetArticle();
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", this.editData);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      this.content = html;
    },
    handleSuccess(response) {
      this.formCustom.uploadImageUrl =
        "https://localhost:5001/" + response.newFileName;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(valid);
          this.CreateArticle();
        } else {
          this.$Message.error("数据有误!");
        }
      });
    },
    handleUpdateSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(valid);
          this.UpdateArticle();
        } else {
          this.$Message.error("数据有误!");
        }
      });
    },
    CreateArticle() {
      axios
        .post(
          "api/articleCategory/" + this.formCustom.categoryId + "/article",
          {
            title: this.formCustom.title,
            imageUrl: this.formCustom.uploadImageUrl,
            content: this.formCustom.editData,
            description: this.formCustom.description,
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$Message.success("添加成功!");
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    UpdateArticle() {
      axios
        .post("api/articles/" + this.articleId + "/updateArticle", {
          title: this.formCustom.title,
          imageUrl: this.formCustom.uploadImageUrl,
          content: this.formCustom.editData,
          description: this.formCustom.description,
          articleCategoryId: this.formCustom.categoryId,
        })
        .then((res) => {
          if (res.status == 204) {
            this.$Message.success("修改成功!");
            this.$router.push("/articleTable");
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    async GetCategories() {
      await axios
        .get("api/articleCategory")
        .then((res) => {
          this.categoryList = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    async GetArticle() {
      const id = this.$route.query.id;
      if (id != undefined) {
        this.btnShow = false;
        await axios
          .get("api/articles/" + id)
          .then((res) => {
            this.articleId = res.data.id;

            this.formCustom.editData = res.data.content;
            this.formCustom.description = res.data.description;
            this.formCustom.title = res.data.title;
            this.formCustom.uploadImageUrl = res.data.imageUrl;
            this.formCustom.categoryId = res.data.articleCategoryId;
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
      return;
    },
  },
};
</script>
<style >
.demo-split {
  height: 800px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.quill-editor {
  height: 750px;
}
pre.ql-syntax {
  background-color: #23241f;
  border-radius: 3px;
  width: 60%;
  padding: 10px 10px;
  color: #f8f8f2;
}
</style>