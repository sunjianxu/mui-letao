/*解决tabs点击页面不能跳转的问题*/
mui('body').on('click','a',function () {
    document.location.href = this.href;
})
mui('body').on('tap','a',function() {
    document.location.href = this.href;
});
