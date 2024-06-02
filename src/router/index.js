import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecipePage from "../views/RecipePage.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path:'/recipe', name: 'foodlist', component:RecipePage
    }
  ],
});
export default router;
