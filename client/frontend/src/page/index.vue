<template>
  <div>
    <Header></Header>
    <ul>
      <li v-for="item in list" :key="item.id">
        <time v-text="$utils.goodTime(item.create_at)"></time>
        <router-link :to="'/content/' + item.id">
          {{item.title}}
        </router-link>
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
export default {
  components: { Header, Footer },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getDate()
  },
  methods: {
    getDate () {
      this.$api.get('topics', null, r => {
        console.log(r)
        this.list = r.data
      })
    }
  }
}
</script>
