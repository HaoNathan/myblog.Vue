<template>
  <div>
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Content from "../components/IndexContent.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Header,
    Content,
    Footer,
  },
};
</script>
