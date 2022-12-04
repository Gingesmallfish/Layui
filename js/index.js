layui.define(['jquery', 'element', 'carousel', 'laypage'], function (exports) {
  var $ = layui.jquery
    , element = layui.element
    , carousel = layui.carousel
    , laypage = layui.laypage;

  //轮播渲染
  carousel.render({
    elem: '#banner'
    , width: '100%'
    , height: '898px'
    , arrow: 'always'
  });

  //滚动监听
  $(window).scroll(function () {
    var scr = $(document).scrollTop();
    scr > 0 ? $(".nav").addClass('scroll') : $(".nav").removeClass('scroll');
  });

  //轮播文字
  $(function () {
    $('.banner').children('.title').addClass('active');
  })

  //导航切换
  var btn = $('.nav').find('.nav-list').children('button')
    , spa = btn.children('span')
    , ul = $('.nav').find('.nav-list').children('.layui-nav');
  btn.on('click', function () {
    if (!$(spa[0]).hasClass('spa1')) {
      spa[0].className = 'spa1';
      spa[1].style.display = 'none';
      spa[2].className = 'spa3';
      $('.nav')[0].style.height = 90 + ul[0].offsetHeight + 'px';
    } else {
      spa[0].className = '';
      spa[1].style.display = 'block';
      spa[2].className = '';
      $('.nav')[0].style.height = 80 + 'px';
    }
  });

  //关于内容
  $('.main-about').find('.aboutab').children('li').each(function (index) {
    $(this).on('click', function () {
      $(this).addClass('layui-this').siblings().removeClass('layui-this');
      $('.aboutab').siblings().fadeOut("fast");
      $('.aboutab').siblings().eq(index).fadeIn("");
    });
  });

  //动态分页
  laypage.render({
    elem: 'newsPage'
    , count: 50
    , theme: '#2db5a3'
    , layout: ['page', 'next']
  });


  //案例分页
  laypage.render({
    elem: 'casePage'
    , count: 50
    , theme: '#2db5a3'
    , layout: ['page', 'next']
  });

  //新闻字段截取
  $(function () {
    $(".main-news").find(".content").each(function () {
      var span = $(this).find(".detail").children("span"), spanTxt = span.html();
      if (document.body.clientWidth > 463) {
        span.html(spanTxt);
      } else {
        span.html(span.html().substring(0, 42) + '...')
      }
      $(window).resize(function () {
        if (document.body.clientWidth > 463) {

          span.html(spanTxt);
        } else {
          span.html(span.html().substring(0, 42) + '...')
        };
      });
    });
  });

  exports('firm', {});
});

//TODO: 图片懒加载
//打开页面 调用一次
start()
$(window).on('scroll', function() {
  start() //滚动页面时 调用一次
})
//加载函数
function start() {
  $('#banner img').not('[data-isLoaded]').each(function() {
    var $node = $(this)
    if (isShow($node)) {
      //设置一个定时器起到缓冲效果
      setTimeout(function() {
        loadIng($node)
      }, 1000)

    }
  })
}
// 页面逻辑
function isShow($node) {
  // 当一个元素出现在我们眼前（小于窗口高度）上窗口滚动的高度的时候就意味着到达目标点
  // 可以开始加载图片或者其他内容
  return $node.offset().top <= $(window).height() + $(window).scrollTop()
}
// 显示状态
function loadIng($img) {
  // 获取目标元素 并替换
  $img.attr('src', $img.attr('data-src'))
  //性能优化 进行判断 已经加载的不会再进行加载
  $img.attr('data-isLoaded', 1)
}
