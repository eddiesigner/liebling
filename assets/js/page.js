(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1:function(e,t,n){"use strict";n.r(t),n.d(t,"isRTL",(function(){return a})),n.d(t,"isMobile",(function(){return o})),n.d(t,"isDarkMode",(function(){return r})),n.d(t,"formatDate",(function(){return c})),n.d(t,"getParameterByName",(function(){return i})),n.d(t,"adjustImageGallery",(function(){return u})),n.d(t,"managePostImages",(function(){return s})),n.d(t,"makeImagesZoomable",(function(){return l}));var a=function(){var e=document.querySelector("html");return["ar","he","fa"].includes(e.getAttribute("lang"))},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"768px";return window.matchMedia("(max-width: ".concat(e,")")).matches},r=function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");return e&&e.matches},c=function(e){return e?new Date(e).toLocaleDateString(document.documentElement.lang,{year:"numeric",month:"long",day:"numeric"}):""},i=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]".concat(e,"(=([^&#]*)|&|#|$)")).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null},u=function(){for(var e=document.querySelectorAll(".kg-gallery-image img"),t=0,n=e.length;t<n;t++){var a=e[t].closest(".kg-gallery-image"),o=e[t].attributes.width.value/e[t].attributes.height.value;a.style.flex="".concat(o," 1 0%")}},s=function(e){e(".js-post-content").find("img").each((function(){e(this).closest("figure").hasClass("kg-bookmark-card")||e(this).closest("figure").hasClass("kg-nft-card")||e(this).parent().is("a")||e(this).hasClass("kg-product-card-image")||e(this).addClass("js-zoomable")}))},l=function(e,t){t(".js-zoomable").on("opened",(function(){setTimeout((function(){var t=e(".medium-zoom-image--opened");t.length>1&&t.last().hide()}),10)}))}},25:function(e,t,n){e.exports=n(26)},26:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(4),c=n.n(r),i=n(5),u=n(1);o()((function(){c()(".js-post-content"),Object(u.adjustImageGallery)(),Object(u.managePostImages)(o.a),Object(u.makeImagesZoomable)(o.a,i.a)}))}},[[25,0,1]]]);