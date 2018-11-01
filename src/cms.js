export default function () {
    let $scrollableElement;
	if($(document.body).hasClass('s-sticky-container')){
		$scrollableElement = $('s-page');
	}else{
		$scrollableElement = $(window);
	}

    $scrollableElement.on("scroll",function() {
        var stickyHeight = $('.s-sticky').height() * ($('.s-sticky').length -1);
        var scrollTop = $scrollableElement.scrollTop();
        var scrollTopTrigger = scrollTop >= stickyHeight;
        var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

        if(scrollTopTrigger){
            $("body.s-sticky-aside s-content").addClass("s-sticked");
            $("body.s-sticky-aside s-aside").addClass("s-sticked");

        }else {
            $("body.s-sticky-aside s-aside").removeClass("s-sticked");
            $("body.s-sticky-aside s-content").removeClass("s-sticked");
        }

        if (isFirefox) {
            if(scrollTopTrigger){
                $("body.s-sticky-aside s-aside.s-fixed-right").addClass("s-move");
            }else {
                $("body.s-sticky-aside s-aside.s-fixed-right").removeClass("s-move");
            }
        }
    });
}