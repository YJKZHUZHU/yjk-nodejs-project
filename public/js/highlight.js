$(function(){
   var loca = encodeURI(location.href)
   var hht = loca.split('?')[0].split('/')[3]
   console.log(hht)
   if (hht === 'user-manager.html' || hht === 'search.html'){
       $('#user-highlight').css('color','red')
   } else if (hht === 'mobile-manager.html'){
       $('#phone-highlight').css('color','red')
   } else if (hht === 'brand-manager.html'){
       $('#brand-highlight').css('color','red')
   }
   console.log(hht)
})