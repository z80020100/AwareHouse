//LOAD THE DATE RANGE PICKER
$(function() {
  var daterangepickerNum = 3;
  for (i = 1; i <= daterangepickerNum; i++) {
    var datepicker = '#datepicker'+i;
    $(datepicker).daterangepicker({
      initialText : '選擇時段...'
    }, {
      datepickerOptions: {numberOfMonths: 2}
    }, {
      presetRanges: [{
        text: '今天',
        dateStart: function() {return moment()},
        dateEnd: function() {return moment()}
      }, {
        text: '昨天',
        dateStart: function() {return moment().add('day', -1)},
        dateEnd: function() {return moment().add('day', -1)}
      }, {
        text: '上星期',
        dateStart: function() {return moment().add('week', -1).startOf('week')},
        dateEnd: function() {return moment().add('week', -1).endOf('week')}
      } , {
        text: '這個月',
        dateStart: function() {return moment().startOf('month')},
        dateEnd: function() {return moment().endOf('month')}
      } , {
        text: '上個月',
        dateStart: function() {return moment().add('month', -1).startOf('month')},
        dateEnd: function() {return moment().add('month', -1).endOf('month')}
      } , {
        text: '今年',
        dateStart: function() {return moment().startOf('year')},
        dateEnd: function() {return moment().endOf('year')}
      } , {
        text: '去年',
        dateStart: function() {return moment().add('year', -1).startOf('year')},
        dateEnd: function() {return moment().add('year', -1).endOf('year')}
      }]
    } , {
      applyButtonText: '選取',
      clearButtonText: '清除',
      cancelButtonText: '取消'
    }, {
      monthNamesShort: [ "Janeiro", "Fevereiro", "Março", "Abril",
                   "Maio", "Junho", "Julho", "Agosto", "Setembro",
                   "Outubro", "Novembro", "Dezembro" ]
    });
  }
});
//End -- LOAD THE DATE RANGE PICKER


$('#submitSales').on("click", getData);
$('#submitOrders').on("click", getData);
$('#submitMenu').on("click", getData);

$('#graph').css("display", "none"); // sunburst graph
$('#piechart').css("display", "none"); // piechart graph

function parse() {
  var ret = JSON.parse($('#datepicker1').val());
  alert(ret.start);
  alert(ret.end);
}


//REFRESH REPORT OF THE 10 BEST SALES AND 10 WORST SALES ALSO THE GRAPH OF MENU
function getSalesReport(ret, t1) {
  var sort_size = 10;
  var menu_raw = {};
  var order_info = ret[1], order_info_size = ret[1].length;
  var all_series = ret[2], all_series_size = ret[2].length;
  var graph_json = {"name": "價錢", "children": []};

  console.log(order_info);
  console.log(all_series);

  // CONSTRUCT menu_raw
  for (var i = 0; i < all_series_size; i++) {
    var main_of_series = all_series[i].main, main_of_series_size = all_series[i].main.length;
    // console.log(series, main_of_series, main_of_series_size);

    for (var j = 0; j < main_of_series_size; j++) {
      // initialize all the menu item quantity and price into zero
      menu_raw[main_of_series[j].name] = {};
      menu_raw[main_of_series[j].name]["quantity"] = 0;
      menu_raw[main_of_series[j].name]["price"] = 0;
    }
  }

  // CALCULATE THE quantity AND price OF ALL ITEM IN menu_raw
  for (var i = 0; i < order_info_size; i++) { //LOOP ALL THE ORDERS
    var item_array = order_info[i]['summary_array'];
    var item_array_size = item_array.length;
    for (var j = 0; j < item_array_size; j++) { //LOOP ALL ITEMS IN 1 ORDER
      var name = item_array[j]['name'];
      menu_raw[name]["quantity"] += parseInt(item_array[j]["quantity"]);

      menu_raw[name]["price"] += parseInt(item_array[j]["main_price"]);
      var ro = item_array[j]["RO_array"], ro_size = ro.length;
      var ai = item_array[j]["AI_array"], ai_size = ai.length;
      for (var k = 0; k < ro_size; k++) menu_raw[name]["price"] += parseInt(ro[k]["price"]);
      for (var k = 0; k < ai_size; k++) menu_raw[name]["price"] += parseInt(ai[k]["price"]);
    }
  }

  // UPDATE graph_json
  for (var i = 0; i < all_series_size; i++) {
    var series = {"name": all_series[i].name, "children": []};
    var main_of_series = all_series[i].main, main_of_series_size = all_series[i].main.length;

    var check = 0; // check if there's thing in series

    for (var j = 0; j < main_of_series_size; j++) {
      //update the data in json
      var name = main_of_series[j].name;

      var tmp = {};
      tmp["name"] = name;
      tmp["quantity"] = menu_raw[name]["quantity"];
      tmp["price"] = menu_raw[name]["price"];
      if (tmp["quantity"] == 0) continue;

      series["children"].push(tmp);   //push into the series array
      check = 1;
    }
    if (check == 0) continue;
    graph_json["children"].push(series);  //push into the json array
  }

  if (graph_json["children"].length == 0) {
    var tmp = {};
    tmp["name"] = ' ';
    tmp["quantity"] = 0;
    tmp["price"] = 0;

    graph_json["children"].push(tmp);
  }

  console.log(graph_json);
  console.log(menu_raw);

  var menu = [];
  for (var key in menu_raw) {
    //console.log(key, menu_raw[key]);
    var tmp = {name: key, quantity: menu_raw[key]["quantity"]};
    menu.push(tmp);
  }

  console.log(menu);

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

  // for (var i = 0; i < vacant.length; i++)
  //   $('#report3').append('<span class="vacant">'+vacant[i]+'</span>');

  $('#graph svg').remove();
  $('#graph').css("display", "block");
  console.log(graph_json);

  var countOrSize = 1;    //default: 1(price)
  d3.select("#g_form").selectAll("input").on("click", function change() {
    if (this.value == "quantity") {
      countOrSize = 0;   // 0: quantity
      graph_json["name"] = "數量";
    }
    else {
      countOrSize = 1;     //1: price
      graph_json["name"] = "價錢";
    }

    $('#graph svg').remove();
    instantChange(countOrSize);
  });
  instantChange(countOrSize);

  function instantChange(set) {
    //alert(set);
    var width = 960,
        height = 700,
        radius = (Math.min(width, height) / 2) - 10

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, radius]);

    var color = d3.scale.category20c();

    var svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    console.log(graph_json);

    var partition = d3.layout.partition()
        .sort(null)
        .value(function(d) {
          if (set == 0) return d.quantity;
          else return d.price;
        });

    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    // Keep track of the node that is currently being displayed as the root.
    var node;

    var g = svg.selectAll("g")
              .data(partition.nodes(graph_json))
              .enter().append("g");

    var path = g.append("path")
              .attr("d", arc)
              .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
              .style("stroke", "#fff")
              .style("fill-rule", "evenodd")
              .on("click", click);

    var text = g.append("text")
              .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
              .attr("x", function(d) { return y(d.y); })
              .attr("dx", "6") // margin
              .attr("dy", ".35em") // vertical-align
              .text(function(d) { return d.name; });

    function click(d) {
      // fade out all text elements
      text.transition().attr("opacity", 0);

      path.transition()
          .duration(750)
          .attrTween("d", arcTweenZoom(d))
          .each("end", function(e, i) {
          // check if the animated element's data e lies within the visible angle span given in d
            if (e.x >= d.x && e.x < (d.x + d.dx)) {
            // get a selection of the associated text element
              var arcText = d3.select(this.parentNode).select("text");
              // fade in the text element and recalculate positions
              arcText.transition().duration(750)
              .attr("opacity", 1)
              .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
              .attr("x", function(d) { return y(d.y); });
            }
          });
    }


    d3.select(self.frameElement).style("height", height + "px");

    // Setup for switching data: stash the old values for transition.
    function stash(d) {
      d.x0 = d.x;
      d.dx0 = d.dx;
    }

    // When switching data: interpolate the arcs in data space.
    function arcTweenData(a, i) {
      var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
      function tween(t) {
        var b = oi(t);
        a.x0 = b.x;
        a.dx0 = b.dx;
        return arc(b);
      }
      if (i == 0) {
       // If we are on the first arc, adjust the x domain to match the root node
       // at the current zoom level. (We only need to do this once.)
        var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
        return function(t) {
          x.domain(xd(t));
          return tween(t);
        };
      } else {
        return tween;
      }
    }

    // When zooming: interpolate the scales.
    function arcTweenZoom(d) {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
          yd = d3.interpolate(y.domain(), [d.y, 1]),
          yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      return function(d, i) {
        return i
            ? function(t) { return arc(d); }
            : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
      };
    }
    // Interpolate the scales!
    function computeTextRotation(d) {
      return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
    }
  }
}
//END -- REFRESH REPORT OF THE 10 BEST SALES AND 10 WORST SALES ALSO THE GRAPH OF MENU

  var dataset = [];
  dataset[0]= {label:"John", quantity:"10" };
  dataset[1]= {label:"haha", quantity:"120" };
  dataset[2]= {label:"isaac2", quantity:"90" };
  dataset[3]= {label:"isaac3", quantity:"90" };
  dataset[4]= {label:"isaac4", quantity:"90" };
  dataset[5]= {label:"isaac5", quantity:"90" };
  dataset[6]= {label:"isaac6", quantity:"90" };
  dataset[7]= {label:"isaac7", quantity:"90" };
  dataset[8]= {label:"isaac8", quantity:"90" };
  dataset[9]= {label:"isaac9", quantity:"90" };
  dataset[10]= {label:"isaac10", quantity:"90" };

//GET THE ORDERS REPORT FROM THE TIME INTERVAL SET IN THE general.php
function getOrdersReport(ret, t2) {
  console.log(ret);
  var count = [];
  var shift_start = ret[0], shift_end = ret[1], size = shift_end - shift_start + 1;
  for (var i = 0; i < size; i++) count[i] = 0;
  for (var i = 0; i < ret[2].length; i++) {
    count[ret[2][i] - shift_start]++;
  }
  console.log(typeof shift_start);
  console.log(typeof shift_end);
  console.log(count);

  $('.bar').remove();
  $('.bar_name').remove();
  var num = 50*(shift_end-shift_start+1);
  $('.orders_report').css('width', num.toString()+'px');


  $('#piechart svg').remove();
  $('#piechart').css("display", "block");



  d3.select("#orders_report").selectAll("div")
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


  var menu_raw = {};
  var order_info = ret[3], order_info_size = ret[3].length;
  var all_series = ret[4], all_series_size = ret[4].length;
  var series_dataset = [];

  console.log(order_info);
  console.log(all_series);

  // CONSTRUCT menu_raw
  for (var i = 0; i < all_series_size; i++) {
    var main_of_series = all_series[i].main, main_of_series_size = all_series[i].main.length;
    // console.log(series, main_of_series, main_of_series_size);

    for (var j = 0; j < main_of_series_size; j++) {
      // initialize all the menu item quantity and price into zero
      menu_raw[main_of_series[j].name] = {};
      menu_raw[main_of_series[j].name]["quantity"] = 0;
      menu_raw[main_of_series[j].name]["price"] = 0;
    }
  }

  // CALCULATE THE quantity AND price OF ALL ITEM IN menu_raw
  for (var i = 0; i < order_info_size; i++) { //LOOP ALL THE ORDERS
    var item_array = order_info[i]['summary_array'];
    var item_array_size = item_array.length;
    for (var j = 0; j < item_array_size; j++) { //LOOP ALL ITEMS IN 1 ORDER
      var name = item_array[j]['name'];
      menu_raw[name]["quantity"] += parseInt(item_array[j]["quantity"]);

      menu_raw[name]["price"] += parseInt(item_array[j]["main_price"]);
      var ro = item_array[j]["RO_array"], ro_size = ro.length;
      var ai = item_array[j]["AI_array"], ai_size = ai.length;
      for (var k = 0; k < ro_size; k++) menu_raw[name]["price"] += parseInt(ro[k]["price"]);
      for (var k = 0; k < ai_size; k++) menu_raw[name]["price"] += parseInt(ai[k]["price"]);
    }
  }

  // UPDATE series_dataset
  for (var i = 0; i < all_series_size; i++) {
    var series = {"label": all_series[i].name, "details": []};
    var main_of_series = all_series[i].main, main_of_series_size = all_series[i].main.length;

    var check = 0; // check if there's thing in series
    var total_quantity = 0;
    var total_price = 0;

    for (var j = 0; j < main_of_series_size; j++) {
      //update the data in json
      var name = main_of_series[j].name;

      var tmp = {};
      tmp["label"] = name;
      tmp["quantity"] = menu_raw[name]["quantity"];
      tmp["price"] = menu_raw[name]["price"];

      total_quantity += parseInt(tmp["quantity"]);
      total_price += parseInt(tmp["price"]);

      if (tmp["quantity"] == 0) continue;

      series["details"].push(tmp);   //push into the series array
      check = 1;
    }
    if (check == 0) continue;
    series["quantity"] = total_quantity;
    series["price"] = total_price;
    series_dataset.push(series);  //push into the json array
  }

  // if (graph_json["children"].length == 0) {
  //   var tmp = {};
  //   tmp["name"] = ' ';
  //   tmp["quantity"] = 0;
  //   tmp["price"] = 0;

  //   graph_json["children"].push(tmp);
  // }
  console.log(series_dataset);

  var countOrSize = 1;    //default: 1(price)
  d3.select("#p_form").selectAll("input").on("click", function change() {
    if (this.value == "quantity") {
      countOrSize = 0;   // 0: quantity
    }
    else if (this.value == "price"){
      countOrSize = 1;     //1: price
    }
    // console.log(countOrSize);
    $('#piechart svg').remove();
    drawPieChart(series_dataset, countOrSize, 0);
  });
  drawPieChart(series_dataset, countOrSize, 0);

}
//END -- GET THE ORDERS REPORT FROM THE TIME INTERVAL SET IN THE general.php



function drawPieChart(dataset, set, times) {
  'use strict';

  var width = 360;
  var height = 360;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;
  var legendRectSize = 18;
  var legendSpacing = 4;


  var color = d3.scale.category20();

  var svg = d3.select('#piechart')
    .append('svg')
    .attr('width', width + 2*radius)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
      ',' + (height / 2) + ')');

  var arc = d3.svg.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

  var pie = d3.layout.pie()
    .value(function(d) {
      if (set == 0) return d.quantity;
      else return d.price;
    })
    .sort(null);

  // ADD FLOATING TAG tooltip TO MANIFEST THE DETAILS
  // var tooltip = d3.select('#piechart')                               // NEW
  //   .append('div')                                                // NEW
  //   .attr('class', 'tooltip');                                    // NEW

  // tooltip.append('div')                                           // NEW
  //   .attr('class', 'label');                                      // NEW

  // tooltip.append('div')                                           // NEW
  //   .attr('class', 'quantity');                                      // NEW

  // tooltip.append('div')                                           // NEW
  //   .attr('class', 'percent');                                    // NEW

  var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      return color(d.data.label);
    });

  // path.on('mouseover', function(d) {                            // NEW
  //   if (set == 0) {
  //     var total = d3.sum(dataset.map(function(d) {                // NEW
  //       return d.quantity;                                           // NEW
  //     }));
  //     var percent = Math.round(1000 * d.data.quantity / total) / 10; // NEW
  //     tooltip.select('.label').html(d.data.label);                // NEW
  //     tooltip.select('.quantity').html(d.data.quantity);                // NEW
  //     tooltip.select('.percent').html(percent + '%');             // NEW
  //     tooltip.style('display', 'block');                          // NEW
  //   }
  //   else {
  //     var total = d3.sum(dataset.map(function(d) {                // NEW
  //       return d.price;                                           // NEW
  //     }));
  //     var percent = Math.round(1000 * d.data.price / total) / 10; // NEW
  //     tooltip.select('.label').html(d.data.label);                // NEW
  //     tooltip.select('.quantity').html(d.data.price);                // NEW
  //     tooltip.select('.percent').html(percent + '%');             // NEW
  //     tooltip.style('display', 'block');                          // NEW
  //   }
  // });                                                           // NEW

  // path.on('mouseout', function() {                              // NEW
  //   tooltip.style('display', 'none');                           // NEW
  // });                                                           // NEW

  if (times == 0) {
    path.on('click', function(d) {                              // NEW
      console.log("click "+d.data.label+" "+d.data.quantity);

      // add ajax to query data
      dataset = d.data.details;
      $('#piechart svg').remove();
      drawPieChart(dataset, set, 1);
    });
  }

  var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var height = legendRectSize + legendSpacing;
      var offset =  height * color.domain().length / 2;
      var horz = 13 * legendRectSize;
      var vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d, i) {
      var percent = 0;
      if (set == 0) {
      var total = d3.sum(dataset.map(function(d) {                // NEW
        return d.quantity;                                           // NEW
      }));
      percent = Math.round(1000 * dataset[i].quantity / total) / 10; // NEW
    }
    else {
      var total = d3.sum(dataset.map(function(d) {                // NEW
        return d.price;                                           // NEW
      }));
      percent = Math.round(1000 * dataset[i].price / total) / 10; // NEW
    }
      return d+" "+percent+"%";
    });
}


//GET ALL THE DETAILS OF ALL MENU
function getMenuReport(ret, t3) {
  $('#total_menu_report > div').remove();
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
//END -- GET ALL THE DETAILS OF ALL MENU


//THE EVENT WHICH THE CLICK TOUCHED
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
      alert("請先選取一個時段");
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
      alert("請先選取一個時段");
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
      alert("請先選取一個時段");
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
