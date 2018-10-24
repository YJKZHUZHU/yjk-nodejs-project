$(function(){
    var str = location.href;
        console.log(str)
        var page = str.split("=")[1]
        var tol = $('.list-p').length - 2;
        console.log(tol)
        if (page > tol) {
            $('table').css('display','none')
            $('.list-page').css('display','none')
        }
        $('#new-add-phone').click(function () {
            $('#phone-add').fadeIn()
        })
        $('#false').click(function () {
            $('#phone-add').fadeOut()
        })
        $('.rewrite').click(function(){
            $('#modifier').fadeIn()
            $('#phonenickname1').val($(this).parents('tr').children('.phonenickname').text().trim())
            $('#phonebrand1').val($(this).parents('tr').children('.phonebrand').text().trim())
            $('#phonenid1').val($(this).parents('tr').children('.tid').text().trim())
        })
        $('#false-modifier').click(function(){
            $('#modifier').fadeOut()
        })
        $("#left").click(function () {
            if (!page) {
                page = 1
            }
            page--
            if (page === 0) {
                page = 1
            }
            $(this).attr("href", `/mobile-manager.html?page=${page}`)
        })
        $('#rigth').click(function () {
            if (!page) {
                page = 1
            }
            page++;
            if (page > tol) {
                page = tol
            }
            $(this).attr("href", `/mobile-manager.html?page=${page}`)
        })

        //二手回收价不得高于官方价格
        $('#usedprice').change(function(){
            var ast =  $('#officialprice').val()
            if ($(this).val() > ast) {
                $('#remind').fadeIn()
                $('#ture').click(function (event) {
                    event.preventDefault();
                })
            }else {
                $('#remind').fadeOut()
                $('#true').click(function () {
                var formData = new FormData()
                var img_file = document.getElementById('phonephoto')
                var phonephoto1 = img_file.files[0]
                var phonenickname1 = $('#phonenickname').val()
                var phonebrand1 = $('#phonebrand option:selected').text()
                var officialprice1 = $('#officialprice').val()
                var usedprice1 = $('#usedprice').val()
                formData.append('phonephoto', phonephoto1)
                formData.append('phonenickname', phonenickname1)
                formData.append('phonebrand', phonebrand1)
                formData.append('officialprice', officialprice1)
                formData.append('usedprice', usedprice1)
                $.ajax({
                    url: '/mobile/add',
                    type: 'post',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        console.log(result)
                        if (result.code === 0) {
                            $('#phone-add').fadeOut()
                            location.reload()
                        } else {
                            alert(result.msg)
                        }
                    }
                }), 'json'
            })
            }
        })
        $.post('/mobile/addbrand',function(result) {
            console.log(result.data[0].brandname)
            var html = ''
            for(var i = 0 ; i < result.data.length;i++){
                html += `
                <option>${result.data[i].brandname}</option>
                `
            }
            $('#phonebrand').append(html)
        })
})