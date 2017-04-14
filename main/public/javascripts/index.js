/**
 * Created by Chi.Hong on 4/14/17.
 */
var TableFormat = function () {};
    TableFormat.prototype = {
        student: function( d ){
            var tab = "";
            for(var i = 0; i< d.length; i++){
                tab += '<tr>' +
                    '<td><a class="label label-success" href="/book/'+d[i][0].ISBN+'/view">'+d[i][0].ISBN+'</a></td>'+
                    '<td>'+d[i][0].DueDate+'</td>'+
                    '<td>'+d[i][0].CheckOutDate+'</td>'+
                    '</tr>';
            }
            return '<table class="sub-table-book" cellpadding="5" cellspacing="0" border="0">'+
                '<thead><tr><th>ISBN</th><th>Due Date</th><th>Check Out Date</th></tr></thead>'+
                tab+
                '</table>';
        },
        book: function (d) {
            return '<table class="sub-table" cellpadding="5" cellspacing="0" border="0">'+
                '<tr>' +
                '<td>Publisher:</td>'+
                '<td>'+d.Publisher+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Date:</td>'+
                '<td>'+d.PublishedDate+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Description:</td>'+
                '<td>'+d.Description+'</td>'+
                '</tr>'+
                '</table>';
        }
    };
