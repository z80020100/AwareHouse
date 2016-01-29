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
  var sort_size = 10;
  var menu_raw = ret[0];  //THE WHOLE MENU ARRAY
  var order_info = ret[1], order_info_size = ret[1].length;

  console.log(menu_raw);
  console.log(order_info);

  for (var i = 0; i < order_info_size; i++) { //LOOP ALL THE ORDERS
    var item_array = order_info[i]['summary_array'];
    var item_array_size = item_array.length;
    for (var j = 0; j < item_array_size; j++) { //LOOP ALL ITEMS IN 1 ORDER
      var name = item_array[j]['name'];
      menu_raw[name]++;
    }
  }

  var menu = [];
  for (var key in menu_raw) {
    //console.log(key, menu_raw[key]);
    var tmp = {name: key, quantity: menu_raw[key]};
    menu.push(tmp);
  }

  //ascending order
  menu.sort(function(a, b) {
    if (a.quantity > b.quantity) return 1;
    else if (a.quantity < b.quantity) return -1;
    return 0;
  });
  var menu_size = menu.length;
  console.log(menu);

  var best_ten = [], best_ten_total = 0;
  var worst_ten = [], worst_ten_total = 0;
  var vacant = [];
  //for best 10
  for (var i = 0; i < sort_size; i++) {
    if (menu_size-1-i >= 0 && menu[menu_size-1-i].quantity)
      best_ten.push(menu[menu_size-1-i]);
  }
  for (var i = 0; i < best_ten.length; i++)
    best_ten_total += best_ten[i].quantity;
  console.log(best_ten, best_ten_total);

  //for worst 10
  for (var i = 0; i < sort_size; i++) {
    if (i < menu_size && menu[i].quantity)
      worst_ten.push(menu[i]);
  }
  for (var i = 0; i < worst_ten.length; i++)
    worst_ten_total += worst_ten[i].quantity;
  console.log(worst_ten, worst_ten_total);

  //for item whose quantity is 0
  for (var i = 0; i < menu_size && !menu[i].quantity; i++) {
    vacant.push(menu[i].name);
  }
  console.log(vacant);
  // var best_ten_raw = ret[0] ,best_ten_total = 0, best_ten = [];
  // var worst_ten_raw = ret[1], worst_ten_total = 0, worst_ten = [];
  // console.log(best_ten_raw);
  // console.log(best_ten_raw['台灣T']);
  // console.log(worst_ten_raw);

  // $.each(best_ten_raw, function(key, value) {
  //   best_ten_total += value;
  //   var tmp_object = {key:key, value:value};
  //   best_ten.push(tmp_object);
  // });
  // $.each(worst_ten_raw, function(key, value) {
  //   worst_ten_total += value;
  //   var tmp_object = {key:key, value:value};
  //   worst_ten.push(tmp_object)
  // });
  // console.log(best_ten_total);
  // console.log(worst_ten_total);
  // console.log(best_ten);
  // console.log(worst_ten);
  $('.chart').remove();

  var div_data_bind = d3.select("#report1").selectAll("div")
  .data(best_ten).enter().append("div").attr("class", "chart");
  div_data_bind.text(function(a,i) {
    return (i+1) + " / " + a.name;
  });
  div_data_bind.style("height", "20px");
  div_data_bind.style("background", "#ff8bb6");
  div_data_bind.style("margin", "5px");
  div_data_bind.style("width", function(d,i) {
    return (d.quantity / best_ten_total * 500)+"px";
  });

  var div_data_bind = d3.select("#report2").selectAll("div")
  .data(worst_ten).enter().append("div").attr("class", "chart");
  div_data_bind.text(function(a,i) {
    return (i+1) + " / " + a.name;
  });
  div_data_bind.style("height", "20px");
  div_data_bind.style("background", "#ff8bb6");
  div_data_bind.style("margin", "5px");
  div_data_bind.style("width", function(d,i) {
    return (d.quantity / worst_ten_total * 500)+"px";
  });

  for (var i = 0; i < vacant.length; i++)
    $('#report3').append('<span class="vacant">'+vacant[i]+'</span>');
}

function getOrdersReport(ret, t2) {
  console.log(ret);
  var count = [];
  var shift_start = 4, shift_end = 13, size = shift_end - shift_start + 1;
  for (var i = 0; i < size; i++) count[i] = 0;
  for (var i = 0; i < ret.length; i++) {
    count[ret[i] - shift_start]++;
  }
  console.log(count);

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
  console.log(ret);
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
      tmp += ret[i*row+j].name + ' ' + ret[i*row+j].quantity + "</div>";
      tmp_row += tmp;
    }
    tmp_row += "</div>";
    menu += tmp_row;
  }
  var tmp_row = "<div class='menu_row'>";
  for (var i = row*row_num; i < size; i++) {
    var tmp = "<div class='menu_item'>";
    tmp += ret[i].name + ' ' + ret[i].quantity + "</div>";
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
    var start_time = t2.start + ' 00:00:00';
    var end_time = t2.end + ' 23:59:59';
    // console.log(start_time);
    // console.log(end_time);
    req['time'] = [start_time, end_time];
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
    var start_time = t3.start + ' 00:00:00';
    var end_time = t3.end + ' 23:59:59';
    // console.log(start_time);
    // console.log(end_time);
    req['time'] = [start_time, end_time];
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
      getOrdersReport(ret, t2);
    }
    else if (type == "menu") {
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

