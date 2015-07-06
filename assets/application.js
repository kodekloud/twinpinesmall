/*Created 2015-01-15  by Andy*/
function renderLayoutHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);
        $.each( item_list , function( key, val ) {
            var open_time = new Date (val.open_time);
            var close_time = new Date (val.close_time);
            val.open_time = convert_hour(open_time);
            val.close_time = convert_hour(close_time);    
            val.h = val.open_time+ " - " + val.close_time;
            var rendered = Mustache.render(template_html,val);
            item_rendered.push(rendered);
        });
        $(container).html(item_rendered.join(''));
}

function convert_hour(d){
    var h = (d.getUTCHours());
    var m = addZero(d.getUTCMinutes());
    var s = addZero(d.getUTCSeconds());
    if (h >= 12) {
        if ( h != 12) {
            h = h - 12;    
        }
        
        i = "pm"
    } else {
        i = "am"
    }
    if (m <= 0){
        return h+i;
    }
    else{
        return h+":"+m+i;
    }
}


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}