import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    async QueryNewsArticle(state) {
      let data = "";
      await axios.get("api/articles?Fields=id,title,createTime&isRemove=false&pageSize=7&isOrder=true").then((res) => {
        data = res.data.values;
      }).catch((err) => {
        console.log(err);
      })
      return data;
    }
  },
  modules: {

  }

})
