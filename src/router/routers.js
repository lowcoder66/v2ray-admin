import AdminLayout from "@/layouts/Admin"
import BasicLayout from "@/layouts/Basic"
import Login from "@/views/auth/Login"
import Dashboard from "@/views/dashboard/Index"
import ForgotPassword from "@/views/auth/ForgotPassword"
import E404 from "@/views/error/404"
import E403 from "@/views/error/403"

const _authRoutes = [
  {
    path: "",
    redirect: "login",
    component: BasicLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
          title: "登录",
        },
      },
      {
        path: "/forgot-password",
        name: "forgotPassword",
        component: ForgotPassword,
        meta: {
          title: "忘记密码",
        },
      },
    ],
  },
  {
    path: "",
    name: "error",
    component: BasicLayout,
    children: [
      {
        path: "/404",
        name: "error404",
        component: E404,
      },
      {
        path: "/403",
        name: "error403",
        component: E403,
      },
    ],
  },
  {
    path: "*",
    name: "default",
    redirect: "/404",
  },
];

const _adminRoutes = [
  {
    path: "",
    component: AdminLayout,
    children: [
      {
        path: "/",
        name: "index",
        component: Dashboard,
        meta: {
          title: "仪表盘",
        },
      },
    ],
  },
  {
    path: '/management',
    name: 'management',
    meta: {
      title: 'Management'
    },
    component: AdminLayout,
    children: [
      {
        path: 'users',
        name: 'users',
        meta: {
          icon: 'md-hand',
          title: '用户管理',
        },
        component: () => import('@/views/management/users/List'),
      },
    ],
  },
]

export default [].concat(_adminRoutes).concat(_authRoutes)
