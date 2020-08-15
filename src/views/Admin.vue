<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%' ,backgroundColor:'white'}">
        <Menu mode="horizontal" theme="light" active-name="1">
          <div class="layout-nav" :style="{width:'55%'}">
            <MenuItem name="1">
              <Icon type="ios-keypad"></Icon>
              <router-link to="/articleTable">管理文章</router-link>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-navigate"></Icon>
              <router-link :to="{name:'AddArticle'}">添加文章</router-link>
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-paper"></Icon>
              <router-link :to="{name:'LeaveMessages'}">留言墙</router-link>
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              <router-link :to="{name:'ArticleComment'}">评论</router-link>
            </MenuItem>
            <MenuItem name="5">
              <Icon type="ios-analytics"></Icon>
              <router-link to="/">首页</router-link>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '88px 20px 0', height: '100%'}">
        <router-link to="/articleTable"></router-link>
        <router-view></router-view>
      </Content>
    </Layout>
    <Footer :style="{marginTop:'10%'}"></Footer>
  </div>
</template>
<script>
import Footer from "../components/Footer";
export default {
  components: {
    Footer,
  },
};
</script>



              
           