import { createRouter, createWebHistory } from 'vue-router';
import UsersView from '../views/UsersView.vue';
import PostsView from '../views/PostsView.vue';
import AlbumsView from '../views/AlbumsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UsersView
    },
    {
      path: '/user/:userId/posts',
      name: 'Posts',
      component: PostsView
    },
    {
      path: '/user/:userId/albums',
      name: 'Albums',
      component: AlbumsView
    }
  ]
});

export default router;
