(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1:function(e,t,n){"use strict";n.r(t),n.d(t,"isRTL",(function(){return o})),n.d(t,"isMobile",(function(){return a})),n.d(t,"formatDate",(function(){return i})),n.d(t,"getParameterByName",(function(){return r})),n.d(t,"adjustImageGallery",(function(){return s})),n.d(t,"managePostImages",(function(){return c})),n.d(t,"makeImagesZoomable",(function(){return l}));var o=function(){var e=document.querySelector("html");return["ar","he","fa"].includes(e.getAttribute("lang"))},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"768px";return window.matchMedia("(max-width: ".concat(e,")")).matches},i=function(e){return e?new Date(e).toLocaleDateString(document.documentElement.lang,{year:"numeric",month:"long",day:"numeric"}):""},r=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]".concat(e,"(=([^&#]*)|&|#|$)")).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null},s=function(){for(var e=document.querySelectorAll(".kg-gallery-image img"),t=0,n=e.length;t<n;t++){var o=e[t].closest(".kg-gallery-image"),a=e[t].attributes.width.value/e[t].attributes.height.value;o.style.flex="".concat(a," 1 0%")}},c=function(e){e(".js-post-content").find("img").each((function(){e(this).closest("figure").hasClass("kg-bookmark-card")||e(this).closest("figure").hasClass("kg-nft-card")||e(this).parent().is("a")||e(this).hasClass("kg-product-card-image")||e(this).hasClass("kg-audio-thumbnail")||e(this).addClass("js-zoomable")}))},l=function(e,t){t(".js-zoomable").on("opened",(function(){setTimeout((function(){var t=e(".medium-zoom-image--opened");t.length>1&&t.last().hide()}),10)}))}},24:function(e,t,n){e.exports=n(25)},25:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),i=n(5),r=n(4),s=n.n(r),c=n(2),l=n(3),u=n(1),d=null,m=window.pageYOffset,f=0,g=0,h=0,p=!1,w=function(){m=window.pageYOffset,j()},b=function(){Object(u.isMobile)("1023px")?a()("body").addClass("share-menu-displayed"):a()("body").removeClass("share-menu-displayed")},v=function(){k(),b(),setTimeout((function(){x(),j()}),200)},j=function(){p||requestAnimationFrame(y),p=!0},y=function(){var e=g-f,t=Math.ceil(m/e*100);t<=100&&O(t),p=!1},k=function(){f=window.innerHeight,g=a()(document).height()},x=function(){var e=d.parent().width(),t=e/2,n=Object(u.isMobile)()?2:3;d.parent().attr("viewBox","0 0 ".concat(e," ").concat(e)),d.attr("stroke-width",n),d.attr("r",t-(n-1)),d.attr("cx",t),d.attr("cy",t),h=2*t*Math.PI,d[0].style.strokeDasharray="".concat(h," ").concat(h),d[0].style.strokeDashoffset=h},O=function(e){if(e<=100){var t=h-e/100*h;d[0].style.strokeDashoffset=t}};a()((function(){var e=a()(".js-scrolltop"),t=a()(".js-recommended-slider");if(s()(".js-post-content"),Object(u.adjustImageGallery)(),b(),t.length>0)new l.d(".js-recommended-slider",{modules:[l.c,l.a],navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},slidesPerView:1,allowTouchMove:!0,loop:!0,a11y:!0,breakpoints:{720:{slidesPerView:2,allowTouchMove:!0,loop:!0},1024:{slidesPerView:3,allowTouchMove:!1,loop:!1}},on:{init:function(){Object(c.a)(".js-article-card-title",100),Object(c.a)(".js-article-card-title-no-image",250)}}});Object(c.a)(".js-article-card-title",100),Object(c.a)(".js-article-card-title-no-image",250),e.on("click",(function(){a()("html, body").animate({scrollTop:0},500)})),Object(u.managePostImages)(a.a),Object(u.makeImagesZoomable)(a.a,i.a),window.addEventListener("scroll",w,{passive:!0}),window.addEventListener("resize",v,{passive:!0})})),a()(window).on("load",(function(){d=a()(".js-progress"),k(),x(),y(),setTimeout((function(){d.parent().css("opacity",1)}),300)}))}},[[24,0,1]]]);