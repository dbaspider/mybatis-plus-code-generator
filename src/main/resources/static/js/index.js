
layui.use(function() {
    var layer = layui.layer
        ,form = layui.form
        ,laypage = layui.laypage
        ,element = layui.element
        ,laydate = layui.laydate
        ,util = layui.util
        ,jQuery = layui.jquery;


    let author = getAuthor();
    let dbAddress = getDbAddress();
    let dbUsername = getDbUsername();
    let dbPassword = getDbPassword();
    let outputDir = getOutputDir();

    if (isEmpty(author)) {
        author = '<a href="https://fengwenyi.com">Erwin Feng</a>';
    }

    jQuery("#author").val(author);
    jQuery("#dbAddress").val(dbAddress);
    jQuery("#dbUsername").val(dbUsername);
    jQuery("#dbPassword").val(dbPassword);
    jQuery("#outputDir").val(outputDir);

    console.log("--- extra init begin here ---");
    //jQuery("#swaggerSupport").prop("checked", true);
    //jQuery("#fieldAnnotation").prop("checked", true);
    //jQuery("#baseResultMap").prop("checked", true);
    //jQuery("#baseColumnList").prop("checked", true);
    console.log("--- extra init end here ---");

    //监听提交
    form.on('submit(formCodeGenerator)', function(data){
        handleFormSubmit(data);
        return false;
    });

    // 处理form提交请求
    function handleFormSubmit(data) {
        let url = "/code-generator";
        let param = JSON.stringify(data.field);
        ajaxPost(jQuery, layer, url, param, function (response) {
            console.info(response);
            if (response.success) {
                handleCache(data.field);
                alertSuccess(layer, "恭喜你，生成操作成功！");
            } else {
                layer.alert(response.msg,{ icon: 5 });//失败的表情
                alertFail(layer, "生成操作失败，请检查！");
            }
        });
    }

    // 缓存
    function handleCache(formData) {
        setDbAddress(formData.host);
        setDbUsername(formData.username)
        setDbPassword(formData.password)
        setAuthor(formData.author)
        setOutputDir(formData.outDir)
    }

});