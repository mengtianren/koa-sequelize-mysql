  sequelize db:migrate                        运行挂起的迁移        =>运行迁移文件(migrations文件夹)生成数据表
  sequelize db:migrate:schema:timestamps:add  更新迁移表以具有时间戳
  sequelize db:migrate:status                 列出所有迁移的状态
  sequelize db:migrate:undo                   恢复迁移             => 撤回上一次迁移
  sequelize db:migrate:undo:all               恢复所有已运行的迁移
  sequelize db:seed:undo                      从数据库中删除数据
  sequelize db:seed:all                       运行 数据填充            => 执行填充（seeders）
  sequelize db:seed:undo:all                  从数据库中删除数据       =>撤销全部填充
  sequelize db:create                         创建配置指定的数据库  =>生成线上对应的库
  sequelize db:drop                           删除配置指定的数据库   =>删除库
  sequelize init                              初始化项目
  sequelize init:config                       初始化配置
  sequelize init:migrations                   初始化迁移
  sequelize init:models                       初始化模型
  sequelize init:seeders                      初始化种子程序
  sequelize migration:generate                生成新的迁移文件
  sequelize migration:create                  生成新的迁移文件   =>生成(migrations文件夹)
  sequelize model:generate                    生成模型及其迁移  =>  本地生成对应的表
  sequelize model:create                      生成模型及其迁移  => 本地生成对应的表  sequelize model:create --name user --attribute aa:string,
  sequelize seed:generate                     生成新的种子文件 => sequelize seed:create --name aa 生成数据填充（seeders文件夹
  sequelize seed:create                      生成新的种子文件    => sequelize seed:create --name aa 生成数据填充（seeders文件夹