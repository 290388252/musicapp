import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import Rank from '../components/rank/rank.vue';
import Recommend from '../components/recommend/recommend.vue';
import Search from '../components/search/search.vue';
import Singer from '../components/singer/singer.vue';
import SingerDetail from '../components/singer-detail/singer-detail.vue';
import Disc from '../components/disc/disc.vue';
import '../common/stylus/index.styl';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':mid',
          component: SingerDetail
        }
      ]
    }
  ]
});
