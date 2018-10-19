$(function(){
    $("#inputUser").change(function(){
       if(!/^\w{5,10}$/.test($(this).val())){
           $("#nonooo").html('用户名长度5-10位！').addClass('canont').fadeIn('fast')
           $('#register').attr('disabled','disabled')
       } else {
            $("#nonooo").html('用户名可用').removeClass('canont').addClass('canuse').fadeIn('fast')
            // $('#register').removeAttr('disabled')
            $('#register').attr('disabled','disabled')
       }
    })
    $('#inputPassword3').change(function () {
        if (!/^[a-z0-9_-]{6,18}$/.test($(this).val())){
            $("#nonooo1").html('请输入正确的密码格式6-18位').addClass('canont').fadeIn('fast')
            $('#reinputPassword4').attr('disabled','disabled')
            // $('#register').attr('disabled','disabled')
        } else {
            $("#nonooo1").html('密码格式正确').removeClass('canont').addClass('canuse').fadeIn('fast')
            $('#reinputPassword4').removeAttr('disabled')
            // $('#register').removeAttr('disabled')
        }
    })
    $('#reinputPassword4').change(function () {
        if (($(this).val() != $('#inputPassword3').val())){
            $("#nonooo2").html('密码不匹配').addClass('canont').fadeIn('fast')
            // $('#register').attr('disabled','disabled')
        } else {
            $("#nonooo2").html('密码正确').removeClass('canont').addClass('canuse').fadeIn('fast')
            $('#register').removeAttr('disabled')
        }
    })
    $("#inputNickname").change(function(){
        if(!/^\w{5,10}$/.test($(this).val())){
            $("#nonooo3").html('请输入正确的昵称5-10位！').addClass('canont').fadeIn('fast')
            $('#register').attr('disabled','disabled')
        } else {
            $("#nonooo3").html('昵称可用').removeClass('canont').addClass('canuse').fadeIn('fast')
            $('#register').removeAttr('disabled')
        }
     })
     $('#inputPhone').change(function(){
         if (!(/^1[34578]\d{9}$/).test($(this).val())) {
            $("#nonooo4").html('手机号格式不正确').addClass('canont').fadeIn('fast')
            $('#register').attr('disabled','disabled')
         } else {
            $("#nonooo4").html('手机号正确').removeClass('canont').addClass('canuse').fadeIn('fast')
            $('#register').removeAttr('disabled')
         }
     })
})