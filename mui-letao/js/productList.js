/**
 * Created by sunjianxu on 2017/11/28.
 */
/*mui区域滚动*/
window.page = 1;
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});


/*(下拉刷新，上拉加载)后台数据交互*/
mui.init({
    pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: false,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                //预先清空
                $('.yt_runingWrapper').html('');
                /*zepto的ajax请求（模拟）*/
                $.ajax({
                    type:"get",
                    url: "/product/queryProduct",//接口
                    data: {
                        page:1,
                        pageSize:10
                    },
                    dataType:"json",
                    success: function (data) { //成功的回调函数
                        setTimeout(function () {
                            /*拼接要渲染的html代码*/
                            /*模板*/
                            /*
                             <div class="yt_runingWrapper">
                             <a href="#">
                             <div class="yt_runing">
                             <img src="img/woman-product1.jpg" alt="">
                             <p class="name">adidas阿迪达斯 男式 场下休闲篮球鞋S83700 </p>
                             <p class="price_wrapper">
                             <span class="now_price">￥560</span>
                             <span class="old_price">￥990</span>
                             <span class="discount">6.5折</span>
                             </p>
                             <div class="btn_wrapper">
                             <span class="sales_volume">销量86</span>
                             <button type="button" class="mui-btn mui-btn-primary btn_buy">立即购买</button>
                             <div class="cart_wrapper">
                             <span class="fa fa-shopping-cart icon_cart"></span>
                             </div>
                             </div>
                             </div>
                             </a>
                             </div>
                            *
                            * */
                            var html = "";
                            $.each(data.data,function (index,val) {
                                /*拼接要渲染的html代码*/
                                /*拼接要渲染的html代码*/
                                html += ' <div class="yt_runingWrapper">';
                                html += '<a href="product.html?productId='+val.id+'">';
                                html += '<div class="yt_runing">';
                                html += '<img src="'+val.pic[0].picAddr+'" alt="'+val.productName+'" />';
                                html += '<p class="name">'+val.productName+'</p>';
                                html += '<p class="price_wrapper">';
                                html += ' <span class="now_price">￥'+val.nowProce+'</span><span class="old_price">￥'+val.oldProce+'</span> <span class="discount">'+val.discount+'</span>';
                                html += '</p>';
                                html += '<div class="btn_wrapper">';
                                html += '<span class="sales_volume">销量'+val.salesVolume+'</span>';
                                html += ' <button type="button" class="mui-btn mui-btn-primary btn_buy">立即购买</button>';
                                html += ' <div class="cart_wrapper">';
                                html += '<span class="fa fa-shopping-cart icon_cart"></span>';
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                                html +='</a>';
                                html +='</div>';
                            });
                            $('.yt_prefecture').html(html);

                        },1000);
                        //成功后停止刷新状态
                        //mui('#refreshContainer').pullRefresh().endPulldown();
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                        //重置上拉加载
                        mui('#refreshContainer').pullRefresh().refresh(true);
                    }
                });
            }
        },
        up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:false,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function () {
                $.ajax({
                    type:"get",
                    url: "/product/queryProduct",//接口
                    data: {
                        page:window.page++, //页码
                        pageSize:10 //每页的条数
                    },
                    dataType:"json",
                    success: function (data) { //成功的回调函数
                        setTimeout(function () {
                            /*拼接要渲染的html代码*/
                            /*模板*/
                            /*
                             <div class="yt_runingWrapper">
                             <a href="#">
                             <div class="yt_runing">
                             <img src="img/woman-product1.jpg" alt="">
                             <p class="name">adidas阿迪达斯 男式 场下休闲篮球鞋S83700 </p>
                             <p class="price_wrapper">
                             <span class="now_price">￥560</span>
                             <span class="old_price">￥990</span>
                             <span class="discount">6.5折</span>
                             </p>
                             <div class="btn_wrapper">
                             <span class="sales_volume">销量86</span>
                             <button type="button" class="mui-btn mui-btn-primary btn_buy">立即购买</button>
                             <div class="cart_wrapper">
                             <span class="fa fa-shopping-cart icon_cart"></span>
                             </div>
                             </div>
                             </div>
                             </a>
                             </div>
                             *
                             * */
                        /*有数据时加载*/
                            if(data.data && data.data.length > 0 ) {
                            //    有数据
                                var html = "";
                                $.each(data.data,function (index,val) {
                                    /*拼接要渲染的html代码*/
                                    /*拼接要渲染的html代码*/
                                    html +='<div class="yt_runingWrapper">';
                                    html += '<a href="product.html?productId='+val.id+'">';
                                    html += '<div class="yt_runing">';
                                    html += '<img src="'+val.pic[0].picAddr+'" alt="'+val.productName+'" />';
                                    html += '<p class="name">'+val.productName+'</p>';
                                    html += '<p class="price_wrapper">';
                                    html += ' <span class="now_price">￥'+val.nowProce+'</span><span class="old_price">￥'+val.oldProce+'</span> <span class="discount">'+val.discount+'</span>';
                                    html += '</p>';
                                    html += '<div class="btn_wrapper">';
                                    html += '<span class="sales_volume">销量'+val.salesVolume+'</span>';
                                    html += ' <button type="button" class="mui-btn mui-btn-primary btn_buy">立即购买</button>';
                                    html += ' <div class="cart_wrapper">';
                                    html += '<span class="fa fa-shopping-cart icon_cart"></span>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html +='</a>';
                                    html +='</div>'
                                });
                                $('.yt_prefecture').append(html);
                                mui('#refreshContainer').endPullupToRefresh(false);
                            }else {
                            //    没有数据了
                            //    停止刷新
                                mui('#pullrefresh').pullRefresh().pullupLoading();
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            }
                        },1000);

                    }
                });
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
    }
});