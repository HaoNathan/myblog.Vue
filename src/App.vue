<template>
  <div>
    <router-link to="/"></router-link>
    <router-view></router-view>
    <aplayer :audio="audios" :lrcType="1" fixed />
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.getValues();
  },
  data() {
    return {
      audios: {
        name: "Flying Without Wings",
        artist: "Westlife",
        url:
          "http://other.player.rc01.sycdn.kuwo.cn/fbd610ca3e1703919fbfe1f9c51fbcae/5f3247ee/resource/n2/53/49/3762782629.mp3",
        cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M000000MuSYe0SFsbY.jpg', // prettier-ignore
        lrc: "",
      },
    };
  },
  methods: {
    getValues() {
      axios
        .get("m/api/lrc/yqb/id/c987cXqGQeaH41cIi_xq-Qxqx7Mm89brdAvTbF00iTxLJ5I")
        .then((res) => {
          this.audios.lrc = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
