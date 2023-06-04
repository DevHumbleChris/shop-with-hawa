import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/SigninView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/",
      name: "main-view",
      component: () => import("../views/MainView.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "/checkout",
          name: "checkout",
          component: () => import("../views/CheckoutView.vue"),
        },
        {
          path: "/orders",
          name: "orders",
          component: () => import("../views/OrdersView.vue"),
        },
        {
          path: "/electronics",
          name: "electronics",
          component: () => import("../views/ElectronicsView.vue"),
        },
        {
          path: "/jewellery",
          name: "jewellery",
          component: () => import("../views/JewelleryView.vue"),
        },
        {
          path: "/womens-clothing",
          name: "womens-clothing",
          component: () => import("../views/WomensClothingView.vue"),
        },
        {
          path: "/mens-clothing",
          name: "mens-clothing",
          component: () => import("../views/MensClothingView.vue"),
        },
      ],
    },
    {
      name: 'admin',
      path: "/admin",
      component: () => import('../views/admin/AdminView.vue'),
      children: [
        {
            path: '',
            name: 'admin-not-founnd',
            component: () => import('../views/NotFound.vue')
          },
        {
          path: 'login',
          name: 'admin-login',
          component: () => import('../views/admin/LoginView.vue')
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../views/admin/account/AccountView.vue'),
          children: [
            {
              path: 'dashboard',
              name: 'admin-account',
              component: () => import('../views/admin/account/DashboardView.vue')
            },
            {
              path: 'add-product',
              name: 'add-product',
              component: () => import('../views/admin/account/ProductAdd.vue')
            },
            {
              path: 'orders',
              name: 'users-orders',
              component: () => import('../views/admin/account/OrdersView.vue')
            },
            {
              path: 'settings',
              name: 'settings',
              component: () => import('../views/admin/account/SettingsView.vue')
            }
          ]
        }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
  ],
});

export default router;
