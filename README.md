# v2ray-admin
使用 [vuetify](https://github.com/vuetifyjs/vuetify) 组件完成的 [v2ray](https://github.com/v2fly/v2ray-core) 图形管理界面

## 主要功能描述
* 增加、删除用户
* 流量数据仪表
* 用户个人配置模板

## 存在问题
* 由于 `v2ray` 内部实现的原因，使用 `v2ctl` 命令删除的用户不会立即生效
* 流量限制实现：每隔一段时间通过 `v2ctl` 查询已使用流量，如果超过限制使用 `v2ctl` 删除用户；
所以之间会存在一定的延迟（可以考虑在用户修改后重启 `v2ray` 实例）

❗❗❗本项目以研究学习为目的，请勿用于他途❗❗❗