(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1:function(e,t,n){"use strict";n.r(t),n.d(t,"isRTL",(function(){return o})),n.d(t,"isMobile",(function(){return a})),n.d(t,"isDarkMode",(function(){return r})),n.d(t,"formatDate",(function(){return i})),n.d(t,"getParameterByName",(function(){return s})),n.d(t,"adjustImageGallery",(function(){return c})),n.d(t,"managePostImages",(function(){return l})),n.d(t,"makeImagesZoomable",(function(){return d}));var o=function(){var e=document.querySelector("html");return["ar","he","fa"].includes(e.getAttribute("lang"))},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"768px";return window.matchMedia("(max-width: ".concat(e,")")).matches},r=function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");return e&&e.matches},i=function(e){return e?new Date(e).toLocaleDateString(document.documentElement.lang,{year:"numeric",month:"long",day:"numeric"}):""},s=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]".concat(e,"(=([^&#]*)|&|#|$)")).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null},c=function(){for(var e=document.querySelectorAll(".kg-gallery-image img"),t=0,n=e.length;t<n;t++){var o=e[t].closest(".kg-gallery-image"),a=e[t].attributes.width.value/e[t].attributes.height.value;o.style.flex="".concat(a," 1 0%")}},l=function(e){e(".js-post-content").find("img").each((function(){e(this).closest("figure").hasClass("kg-bookmark-card")||e(this).closest("figure").hasClass("kg-nft-card")||e(this).parent().is("a")||e(this).hasClass("kg-product-card-image")||e(this).addClass("js-zoomable")}))},d=function(e,t){t(".js-zoomable").on("opened",(function(){setTimeout((function(){var t=e(".medium-zoom-image--opened");t.length>1&&t.last().hide()}),10)}))}},23:function(e,t,n){e.exports=n(24)},24:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(5),i=n(4),s=n.n(i),c=n(3),l=n(2),d=n(1),u=null,m=null,h=window.pageYOffset,f=0,g=0,p=0,w=!1,b=function(){h=window.pageYOffset,v()},j=function(e){Object(d.isMobile)("1023px")?(a()("body").addClass("share-menu-displayed"),setTimeout((function(){u.removeAttr("data-aos")}),e)):a()("body").removeClass("share-menu-displayed")},y=function(){T(),j(100),setTimeout((function(){O(),v()}),200)},v=function(){w||requestAnimationFrame(k),w=!0},k=function(){var e=g-f,t=Math.ceil(h/e*100);t<=100&&x(t),w=!1},T=function(){f=window.innerHeight,g=a()(document).height()},O=function(){var e=m.parent().width(),t=e/2,n=Object(d.isMobile)()?2:3;m.parent().attr("viewBox","0 0 ".concat(e," ").concat(e)),m.attr("stroke-width",n),m.attr("r",t-(n-1)),m.attr("cx",t),m.attr("cy",t),p=2*t*Math.PI,m[0].style.strokeDasharray="".concat(p," ").concat(p),m[0].style.strokeDashoffset=p},x=function(e){if(e<=100){var t=p-e/100*p;m[0].style.strokeDashoffset=t}};a()((function(){u=a()(".js-aos-wrapper");var e=a()(".js-scrolltop"),t=a()(".js-recommended-slider");if(s()(".js-post-content"),Object(d.adjustImageGallery)(),j(1e3),t.length>0){var n=new l.d(".js-recommended-slider",{type:"slider",rewind:!1,perView:3,swipeThreshold:!1,dragThreshold:!1,gap:0,direction:Object(d.isRTL)()?"rtl":"ltr",breakpoints:{1023:{type:"carousel",perView:2,swipeThreshold:80,dragThreshold:120},720:{type:"carousel",perView:2,swipeThreshold:80,dragThreshold:120},568:{type:"carousel",perView:1,swipeThreshold:80,dragThreshold:120}}});n.on("mount.after",(function(){Object(c.a)(".js-article-card-title",100),Object(c.a)(".js-article-card-title-no-image",250)})),n.on("length.change",(function(e){1===e&&(n.update({type:"slider"}),t.find(".js-controls").remove())})),n.mount({Controls:l.b,Swipe:l.c,Breakpoints:l.a,Length:function(e,t,n){return{mount:function(){n.emit("length.change",t.Sizes.length)}}}})}Object(c.a)(".js-article-card-title",100),Object(c.a)(".js-article-card-title-no-image",250),e.on("click",(function(){a()("html, body").animate({scrollTop:0},500)})),Object(d.managePostImages)(a.a),Object(d.makeImagesZoomable)(a.a,r.a),window.addEventListener("scroll",b,{passive:!0}),window.addEventListener("resize",y,{passive:!0})})),a()(window).on("load",(function(){m=a()(".js-progress"),T(),O(),k(),setTimeout((function(){m.parent().css("opacity",1)}),300)}))}},[[23,0,1]]]);