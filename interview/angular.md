## angular8
#### NgModule
[study](https://cloud.tencent.com/developer/section/1489521)
>
    declarations（可声明对象表） —— 那些属于本 NgModule 的组件、指令、管道。
    exports（导出表） —— 那些能在其它模块的组件模板中使用的可声明对象的子集。
    imports（导入表） —— 那些导出了本模块中的组件模板所需的类的其它模块。
    providers —— 本模块向全局服务中贡献的那些服务的创建器。 这些服务能被本应用中的任何部分使用。（你也可以在组件级别指定服务提供商，这通常是首选方式。）
    bootstrap —— 应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。
>