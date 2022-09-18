$(function () {
    load();
    $('#td').on({
        click: function () {
            $(this).val('')
        },
        blur: function () {
            $(this).val('添加ToDo')
        },
        keydown: function (e) {
            if (e.key == 'Enter') {
                if ($(this).val() == null) {
                    return false;
                }
                var local = get();
                local.push({ title: $(this).val(), done: false });
                save(local);
                load();
                $(this).val('');
            }
        }
    })
    //存储数据
    function save(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    //获取数据
    function get() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            return JSON.parse(data);
        }
        else {
            return [];
        }
    }
    //渲染
    function load() {
        $('#first').empty();
        $('#second').empty();
        var data = get();
        var s = 0;
        var j = 0;
        $.each(data, function (i, n) {
            if (data[i].done == false) {
                s++;               
                $('#first').prepend('<li><input type="checkbox"><p>' + n.title + '</p><a index=' + i + ' href="javascript:;">' + ' 删除' + '</a></li>')
            }
            else {
                j++;  
                $('#second').prepend('<li><input type="checkbox" checked="checked"><p>' + n.title + '</p><a index=' + i + ' href="javascript:;">' + ' 删除' + '</a></li>')
            }
            $('div span').eq(0).text(s);
            $('div span').eq(1).text(j);
        })
    }
    //删除数据
    $('#first').on('click', 'a', function () {
        var index = $(this).attr('index');
        var data = get();
        data.splice(index, 1);
        save(data);
        load();
    })
    $('#second').on('click', 'a', function () {
        var index = $(this).attr('index');
        var data = get();
        data.splice(index, 1);
        save(data);
        load();
    })

    $('#first').on('click', 'input', function () {
        var index = $(this).siblings('a').attr('index');
        var local = get();
        local[index].done = true;
        save(local);
        load();
    })
    $('#second').on('click', 'input', function () {
        var index = $(this).siblings('a').attr('index');
        var local = get();
        local[index].done = false;
        save(local);
        load();
    })

})