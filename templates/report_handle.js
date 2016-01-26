$(function() {
  var daterangepickerNum = 3;
  for (i = 1; i <= daterangepickerNum; i++) {
    var datepicker = '#datepicker'+i;
    $(datepicker).daterangepicker({
      initialText : 'Select period...'
    }, {
      datepickerOptions: {numberOfMonths: 2}
    });
  }
});

$('#submitSales').on("click", getData);
$('#submitOrders').on("click", getData);
$('#submitMenu').on("click", getData);

function parse() {
  var ret = JSON.parse($('#datepicker1').val());
  alert(ret.start);
  alert(ret.end);
}

//REFRESH REPORT OF THE 10 BEST SALES AND 10 WORST SALES
function getSalesReport(ret, t1) {
  var birth_rate = ret[0];
  var death_rate = ret[1];
  $('.chart').remove();

  var div_data_bind = d3.select("#report1").selectAll("div")
  .data(birth_rate).enter().append("div").attr("class", "chart");
  div_data_bind.text(function(a,i) {
    return (i+1) + " / " + a[0];
  });
  div_data_bind.style("height", "20px");
  div_data_bind.style("background", "#ff8bb6");
  div_data_bind.style("margin", "5px");
  div_data_bind.style("width", function(d,i) {
    return (d[1] * 10)+"px";
  });

  var div_data_bind = d3.select("#report2").selectAll("div")
  .data(death_rate).enter().append("div").attr("class", "chart");
  div_data_bind.text(function(a,i) {
    return (i+1) + " / " + a[0];
  });
  div_data_bind.style("height", "20px");
  div_data_bind.style("background", "#ff8bb6");
  div_data_bind.style("margin", "5px");
  div_data_bind.style("width", function(d,i) {
    return (d[1] * 10)+"px";
  });
}

function getOrdersReport(ret, t2) {
  var count = [];
  var shift_start = 4, shift_end = 13, size = shift_end - shift_start + 1;
  for (var i = 0; i < size; i++) count[i] = 0;
  for (var i = 0; i < 30; i++) {
    count[ret[i] - shift_start]++;
  }
  // console.log(count);
  // console.log(ret);

  $('.bar').remove();
  $('.bar_name').remove();

  d3.select("#total_orders_report").selectAll("div")
  .data(count).enter().append("div").attr("class", "bar")
  .style("height", function (a) {
    var h = a * 20;
    return h + "px";
  }).text(function (a) {
    if (a != 0) return a;
    else return '';
  });

  for (i = 0; i <= shift_end - shift_start; i++) {
    var app = "<div class='bar_name'>" + (i+shift_start) + "~" + (i+shift_start+1) + "</div>";
    $('#orders_timestamp').append(app);
  }
}

function getMenuReport(ret, t3) {
  var size = ret.length;
  var row = 4;
  var row_num = Math.floor(size / row);
  console.log(size);
  console.log(row_num);
  var menu = "";
  for (var i = 0; i < row_num; i++) {
    var tmp_row = "<div class='menu_row'>";
    for (var j = 0; j < row; j++) {
      var tmp = "<div class='menu_item'>";
      tmp += ret[i*row+j] + "</div>";
      tmp_row += tmp;
    }
    tmp_row += "</div>";
    menu += tmp_row;
  }
  var tmp_row = "<div class='menu_row'>";
  for (var i = row*row_num; i < size; i++) {
    var tmp = "<div class='menu_item'>";
    tmp += ret[i] + "</div>";
    tmp_row += tmp;
  }
  tmp_row += "</div>";
  menu += tmp_row;

  $('#total_menu_report').append(menu);
}

function getData() {
  var req = {};
  var type = $(this).data('type');
  req['type'] = type;
  // alert(req['type']);

  //ERROR CHECKING FOR THE DATERANGEPICKER IS CHOSEN OR NOT
  if (type == "sales") {
    try {
      var t1 = JSON.parse($('#datepicker1').val());
    }
    catch(e) {
      var r1 = e instanceof SyntaxError;
    }

    if (r1) {
      alert("Please choose a range of time at Sales");
      return ;
    }
    var start_time = t1.start + ' 00:00:00';
    var end_time = t1.end + ' 23:59:59';
    // console.log(start_time);
    // console.log(end_time);
    req['time'] = [start_time, end_time];
  }
  else if (type == "orders") {
    try {
      var t2 = JSON.parse($('#datepicker2').val());
    }
    catch(e) {
      var r2 = e instanceof SyntaxError;
    }

    if (r2) {
      alert("Please choose a range of time at Orders");
      return ;
    }
  }
  else if (type == "menu") {
    try {
      var t3 = JSON.parse($('#datepicker3').val());
    }
    catch(e) {
      var r3 = e instanceof SyntaxError;
    }

    if (r3) {
      alert("Please choose a range of time at Menu");
      return ;
    }
  }
  else {
    alert("ERROR for types of ajax");
    return ;
  }

  $.ajax({
    url: "report_process.php",
    method: "POST",
    dataType:"JSON",
    data:{request:req}
  }).done(function(ret){
    // for (i = 0; i < ret.length; i++)
    //   alert(ret[i]);

    if (type == "sales") {
      getSalesReport(ret, t1);
    }
    else if (type == "orders") {
      try {
        var t2 = JSON.parse($('#datepicker2').val());
      }
      catch(e) {
        var r2 = e instanceof SyntaxError;
      }

      if (r2) {
        alert("Please choose a range of time at Orders");
        return ;
      }
      getOrdersReport(ret, t2);
    }
    else if (type == "menu") {
      try {
        var t3 = JSON.parse($('#datepicker3').val());
      }
      catch(e) {
        var r3 = e instanceof SyntaxError;
      }

      if (r3) {
        alert("Please choose a range of time at Menu");
        return ;
      }
      getMenuReport(ret, t3);
    }
    else alert("ERROR for types of ajax");

  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(textStatus, errorThrown);
    alert("fail");
  }).always(function(){
    // alert("always");
  });
}
//End func getSalesReport

