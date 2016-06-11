/* jQuery v1.11.3 function for edit menu */
jQuery.ajaxSetup({async:false});

// global variables
global_status = 0;
series_id = 0;
detail_div_number = 0;
item_id = new Array();


function edit_additional()
{
    $("#edit_add_set").css({"display":"block"});
}

function del_detail_div()
{
	detail_div_number = $(this).attr('id').replace('del_detail_', '');
	console.log(detail_div_number);
	$('#detail_' + detail_div_number).remove();
}
/*
function edit_ai(){
	console.log($(this).text());
	var item_ai_id = $($(this).children("input")).val().replace("ai_", "");
	var ai_html = $(this).html();
	var ai_text = $(this).text();
	var ai_type = $($(this).children("input")).attr('type');
	ai_html = ai_html.replace(ai_text, '');
	$(this).html(ai_html);
	var ai_value = $($(this).children("input")).val();
	$($(this).children("input")).attr({'type':'text', 'value':ai_text});
	$($(this).children("input")).focus();
	$(this).unbind();
	$(this).bind('focusout', function(){
		var new_ai_text = $($(this).children("input")).val();
		new_ai_text = new_ai_text.replace(/\s/g, '');
		if(new_ai_text != '') {
					$($(this).children("input")).attr({'type':ai_type, 'value':ai_value});
		$(this).append(new_ai_text);
		$(this).unbind();
		$(this).bind('click', edit_ai);
		$.ajax({
				url:"process_required.php",
				method: "POST",
				dataType:"json",
				data: {"action": "edit_ai", "ai_id": item_ai_id, 'data': new_ai_text, 'data_type':'name'}
			})
			.done(function(msg){
				console.log(msg);
				
			})
		    .fail(function(){
				alert("Fail");
			})
			.always(function(){
				//alert("Complete");
			})
			;
		}
		else
			alert('請輸入項目名稱');

	})
}
*/
function edit_ai_price(){
	console.log($(this).text());
	var ai_price = $(this).text();
	$(this).empty();
	$(this).append($("<input>").attr({'type': 'number', 'value': ai_price, 'min':'0'}));
	$($(this).children("input")).focus();
	$(this).unbind();
	$(this).bind('focusout', function(){
		var new_ai_price = parseInt($($(this).children("input")).val());
		if($.isNumeric(new_ai_price) && new_ai_price >= 0)
		{
			var item_id = $(this).attr('id').replace('price', 'items');
			var item_ai_id = $("#" + item_id).children("input").val().replace("ai_", "");
			//var div_id = $(this).attr('id');
			//div_id = div_id.replace('price_', '');
			//div_id = div_id.replace(/_./ig, '');
			//var at_id = $("select[name='select_type_" + div_id + "'] :selected").val().replace('at_','');
			$(this).empty();
			$(this).append(new_ai_price);
			$(this).unbind();
			$(this).bind('click', edit_ai_price);
			$.ajax({
				url:"process_required.php",
				method: "POST",
				dataType:"json",
				data: {"action": "edit_ai", "ai_id": item_ai_id, 'data': new_ai_price, 'data_type':'price'}
			})
			.done(function(msg){
				//alert(msg);
				
			})
		    .fail(function(){
				alert("Fail");
			})
			.always(function(){
				//alert("Complete");
			})
			;
		}
		else{
			alert('請輸入正確項目金額')
		}
	})
}

function edit_series(){
	var series_edit = $(this);
	series_edit.unbind('click');
	var s_id = parseInt(series_edit.attr("id").replace("es_", ""));
	
	series_edit.css({
		"border": "2px gray solid",
		"background-color": "#FFFFCC"
	});
	
	var old_series = series_edit.val();
	
	series_edit.bind('blur', function(){		
		var series_text = series_edit.val().replace(/\s/g, ''); // 去除字串中所有空白
		//console.log(series_text);
		
		if(series_text == '') {
			alertify.error("系列名稱不得為空白!");  
			series_edit.val(old_series);
			//series_edit.blur();
		}
		
		else{
			series_edit.val(series_text);
			
			if(series_text == old_series){
				alertify.log("系列名稱「" + old_series + "」未修改");
			}
			else{
				
				$.ajax({
					url:"edit_menu_op.php",
					method: "POST",
					dataType:"json",
					data: {"action": "edit_series", "series_text": series_text, "s_id": s_id},
					async:false
				})
				.done(function(msg){
					//alert(msg);
					alertify.success("修改「" + old_series + "」為「" + series_text + "」"); 
				})
				.fail(function(){
					alertify.error('修改系列失敗！');
					series_edit.val(old_series);
				})
				;
			}
		}
		
		series_edit.css({
			"border": "0px gray solid",
			"background-color": "#FFFFFF"
		});
		series_edit.unbind('blur');
		series_edit.bind('click', edit_series);
	});
	
	series_edit.bind("keydown", function(key){
		if(key.which == 13){ // Enter
			series_edit.trigger("blur");
		}
	});
	
	
	/*
	var s_id = $($(this).parents("div")).attr('id').replace('s', '');
	//alert(s_id);
	var series_content = $(this);
	var series_text = series_content.text();
	var temp_text = series_content.text();
	//alert(series_text);
	var series_edit = $("<input>").attr({"id": "es_" + s_id, "type": "text", "value": series_text}); // es: edit series
	series_content.empty();
	series_content.append(series_edit);
	series_edit.focus();
	series_edit.css("background-color","#FFFFCC")
	series_content.unbind();
	
	var series_submit = $("<input>").attr({"id": "ss_" + s_id, "type": "button", "value": "確定", "class": "input__field input__field--minoru"});// ss: submit series
	series_submit.bind("click", series_submit, function(){
		series_text = $.trim($("#es_" + s_id).val());
		//alert(series_text);
		if(series_text == '') {
			alertify.error("系列名稱不得為空白!");  
			series_edit.val(temp_text);
			series_edit.blur();
		}
		else {
			if(series_text == temp_text)
			{
				alertify.log("系列名稱「" + temp_text + "」未修改");
			}
			else
			{
				alertify.success("修改「" + temp_text + "」為「" + series_text + "」"); 
			}
			
			//series_submit.remove();
			//series_edit.remove();
			series_content.empty();
			series_content.append(series_text);
			
			setTimeout(function(){ // 按下確定後200ms才bind edit_series()，不然按下確定的瞬間馬上又觸發edit_series()
				$("div[id='s" + s_id + "'] h3").bind("click", edit_series);
			}, 100);	
		}
	})
	series_content.append($("<br>"));
	//series_content.append(series_submit);
	
	series_edit.bind("blur", function(){
		series_submit.trigger('click');
	});
	*/
}

/*
function add_series(){
	var this_button = $(this);
	var max_id = 0;
	var series_all = $("div[id^='s']");
	var series_edit = $("<input>").attr({"id": "as", "type": "text", "value": "請輸入新增系列名稱"}); // as: add series
	var series_order = $('<input>').attr({'id': 'so', 'type': 'number', 'min': '1', 'value': '1'}); // so: series order
	var series_submit = $('<input>').attr({"id": "ass", "type": "button", "value": "確定"}); // ass: add series submit
	$(this).after(series_order);
	$("#so").before("顯示順位：");
	$("#so").after(series_edit);
	$("#as").after(series_submit);
	$(this).remove();
	
	for(i = 0; i < series_all.size(); i++) {
		var temp_id = $(series_all[i]).attr("id");
		temp_id = parseInt(temp_id.replace("s", ""))
		//alert(temp_id);
		if(temp_id > max_id) {
			max_id = temp_id;
		}
	}
	max_id++;
	//alert(max_id);
	
	$("#as").on('focus', function (){
		$(this).val('');
		$(this).unbind();
	});
	
	var new_series = $('<div>').attr({'id': 's' + max_id, 'class': 'w3-group w3-row w3-padding-left'});
	
	series_submit.on("click", series_submit, function(){
		var series_text = $.trim($("#as").val());
				if(series_text == '' || series_text == '請輸入新增系列名稱') {
			alert('請輸入系列名稱');
		}
		else {
			$("body").append(new_series);
			$("#s" + max_id).append($('<center>').append($('<h3>').append(series_text)));
			$("div[id='s" + max_id + "'] h3").on("click", edit_series);
			order_number = $("#so").val();
			series_edit.remove();
			series_submit.remove();
			series_order.remove();
			this_button.on('click', add_series);
			$("#button").append(this_button);
			
			$.ajax({
				url:"add_new_series.php",
				method: "POST",
				dataType:"json",
				data: {"new_series": series_text, "new_id": max_id, "new_order": order_number}
			})
			.done(function(msg){
				//alert(msg);
				window.location.reload();
			})
		    .fail(function(){
				alert("Fail");
			})
			.always(function(){
				//alert("Complete");
			})
			;
		}
		
		
	});
}
*/

function add_series() {
	var new_series;
	alertify.prompt("請輸入新系列名稱", function(e, new_series) {
		if(e && (new_series != "")) {  
			
			$.ajax({
				url:"edit_menu_op.php",
				method: "POST",
				dataType:"json",
				data: {"action": "add_series", "new_series": new_series, "order_number": 1},
				async:false
			})
			.done(function(msg){
				//alert(msg);
				alertify.success("新增系列：" + new_series);
				$("#series_table").load("edit_menu.php #series_table");
				//window.location.reload();
				series_table_bind();
			})
		    .fail(function(){
				alertify.error('新增系列失敗！');  
			})
			;
			
		}
		else {  
			alertify.error('新增系列操作取消！');  
		}  
	}, "");  
}


function edit_ai(){
	$(this).unbind("click");
	$(this).css({"border": "1px solid gray", "background-color": "#FFEE99"});
	$(this).attr({"data-old_data":$(this).val()});
}

function add_item(){
	// 關閉視窗
	$("#close_new_main_win").bind('click', close_new_main_win); // 關閉新增品項視窗
	
	// 初始化
	$("#detail_title").show();
	$("#add_item_finish").show();
	$("#new_main_win_h3").text('新增品項');
	$("#new_main_name").val('');
	$("#new_main_price").val('0');
	$("#edit_item_submit").remove();
	$("#del_item_submit").remove();
	
	$("#new_main_series").empty();
	$("#new_main_series").append($("<option>").attr({"value": 's_0'}).append('請選擇系列名稱'));
	$("#new_main_series").val('s_0'); // 預設選取此選項
	
	$("#multi_choice").empty();
	$("#single_choice").empty();
	$("#single_choice").append($("<input>").attr({'type':"radio", 'name':"mul", 'value':"at_0", 'id':"at_0", 'checked':true}));
	$("#single_choice").append($("<label>").attr({'for':"at_0"}).append('&nbsp;無加點&nbsp;'));
	
	$("#edit_add").empty();
	$("#edit_add").append($("<span>").append('細項編輯'));
	$("#edit_add").append($("<div>").attr({'id':'edit_add_detail'}));
	
	
	// 取得所有系列名稱
	$.ajax({
		url:"edit_menu_op.php",
		method: "POST",
		dataType:"json",
		data: {"action": "get_series"},
		async:false
	})
	.done(function(series_array){
		
		for(var i = 0; i < $(series_array).size(); i++){
			console.log(series_array[i]);
			$("#new_main_series").append($("<option>").attr({"value": 's_' + series_array[i]['s_id']}).append(series_array[i]['name']));
		}
		
	})
    .fail(function(){
		alertify.error('讀取系列失敗！');
	});
	
	// 取得所有加點類型名稱
	$.ajax({
		url:"edit_menu_op.php",
		method: "POST",
		dataType:"json",
		data: {"action": "get_add_type"},
		async:false
	})
	.done(function(add_type_array){

		for(var i = 0; i < $(add_type_array).size(); i++){
			console.log(add_type_array[i]);
			if(add_type_array[i]['multiple_choice'] == '0') {// 下單時為單選的細項
				$("#multi_choice").append($("<input>").attr({'type':"checkbox", 'name':"single", 'value':"at_" + add_type_array[i]['at_id'], 'id':"at_" + add_type_array[i]['at_id']}));
				$("#multi_choice").append($("<label>").attr({'for':"at_" + add_type_array[i]['at_id']})
					.append($("<a>").attr({"href":"#", "id": "edit_at_" + add_type_array[i]['at_id'], "class":"icon"}).append($("<img>").attr({"src": "icon/edit_at_icon.png"})))
					.append($("<span>").append(add_type_array[i]['option_name']))
					.append($("<a>").attr({"href":"#", "id": "del_at_" + add_type_array[i]['at_id'], "class":"icon"}).append($("<img>").attr({"src": "icon/del_at_icon.png"})))
				);
					
			}
			else{
				$("#single_choice").append($("<input>").attr({'type':"radio", 'name':"mul", 'value':"at_" + add_type_array[i]['at_id'], 'id':"at_" + add_type_array[i]['at_id']}));
				$("#single_choice").append($("<label>").attr({'for':"at_" + add_type_array[i]['at_id']})
					.append($("<a>").attr({"href":"#", "id": "edit_at_" + add_type_array[i]['at_id'], "class":"icon"}).append($("<img>").attr({"src": "icon/edit_at_icon.png"})))
					.append($("<span>").append(add_type_array[i]['option_name']))
					.append($("<a>").attr({"href":"#", "id": "del_at_" + add_type_array[i]['at_id'], "class":"icon"}).append($("<img>").attr({"src": "icon/del_at_icon.png"})))
				);
				
			}
			
			// 編輯細項視窗
			$("#edit_at_" + add_type_array[i]['at_id']).bind('click', function(){
				var at_id = $(this).attr('id').replace("edit_at_", "");
				$("#edit_add > span").text("細項編輯"); // 刪除其他文字
				var add_type; //決定填入值（單選/多選）
				var input_type; //決定input type（radio/checkbox）
				
				if($("#at_" + at_id).attr("name")=="mul"){
					add_type = "加點細項(單選)";
					input_type = "checkbox";
				}
				else{
					add_type = "主餐細項(多選)";
					input_type = "radio";
				}
				$("#edit_add > span").append(" -> " + add_type + " -> ");
				$("#edit_add > span").append($("<input>").attr({"id":"edit_add_type_name", "type":"text", "value":$("[for='at_" + at_id + "']").text(), "data-at_id":at_id}));
				$("#edit_add > span").append($("<br>"));
				$("#edit_add > span").append($("<img>").attr({"id":"add_additional_item", "src":"icon/add_ai_icon.png"})); // 新贈細項按鈕
				
				// 新增細項按鈕功能實作
				$("#add_additional_item").bind('click', function(){
					var ai_name;
					var ai_price;
					
					alertify.prompt("請輸入新細項名稱", function(e, ai_name) {
						if(e){
							ai_name = ai_name.replace(/\s/g, '');
							if(ai_name != ""){
								alertify.prompt("請輸入新細項價格", function(e, ai_price) {
									var price_err_msg = "";
									if(e){

										if($.isNumeric(ai_price)){
											if(parseInt(ai_price) < 0){
												price_err_msg = "價格不可小於零！";
											}
										}
										else{
											price_err_msg = "請輸入正確價格";
										}
										
										if(price_err_msg == ""){
											
											console.log("at_id: " + at_id);
											console.log("名稱：" + ai_name);
											console.log("價格：" + ai_price);
											$.ajax({
												url:"edit_menu_op.php",
												method: "POST",
												dataType:"json",
												data: {
													"action": "add_additional_item", 
													"at_id":at_id, 
													"name":ai_name,
													"price":ai_price
												},
												async:false
											})
											.done(function(){
												alertify.success("新增細項成功！");
												$("#edit_at_" + at_id).trigger('click');
											})
											.fail(function(){
												alertify.error("新增細項傳輸錯誤！");
											});
										}
										else{
											alertify.error(price_err_msg);  
										}
									}
									else{
										alertify.error('新增細項取消！');  
									}
								}, "");
								$("#alertify-text").attr({"placeholder":"請輸入「價格」", "type":"number", "value": "0"});
							}
						}
						else {  
							alertify.error('新增細項取消！');  
						}  
					}, "");
					$("#alertify-text").attr({"placeholder":"請輸入「名稱」"});
				});
				
				// 編輯加點類別名稱用
				$("#edit_add_type_name").bind('focus', function(){ // 點擊開始編輯
					$(this).css({
						"background-color": "rgb(255, 238, 153)",
						"border-style": "solid"
					}).attr({'data-old_name':$(this).val()});
				});
				
				$("#edit_add_type_name").bind('blur', function(){ // 離開結束編輯並儲存
					$(this).css({
						"background-color": "rgb(255, 255, 221)",
						"border-style": "dotted"
					});
					var at_id = $(this).attr("data-at_id");
					var new_at_name = $(this).val().replace(/\s/g, ''); // 去除字串中所有空白
					$(this).val(new_at_name);
					//console.log(new_at_name);
					if(new_at_name != ''){ // ajax寫入資料庫、更改畫面

						$.ajax({ //編輯細項資料
							url:"edit_menu_op.php",
							method: "POST",
							dataType:"json",
							data: {"action": "edit_at_name", "new_at_name": new_at_name, "at_id": at_id},
							async:false
						})
						.done(function(msg){
							alertify.success('細項名稱已修改！');
							$("[for='at_" + at_id  + "'] > span").text(new_at_name);
							
						})
						.fail(function(){
							alertify.error("編輯細項失敗：資料庫傳輸錯誤");
							$("#edit_add_type_name").val($("#edit_add_type_name").attr('data-old_name'));
						});
						
					}
					else{
						alertify.error('細項類別名稱不可空白！');
						$(this).val($(this).attr('data-old_name'));
					}					
				});
				
				
								
				$.ajax({ // 取得細項資料
					url:"edit_menu_op.php",
					method: "POST",
					dataType:"json",
					data: {"action": "get_add_data", "at_id": at_id},
					async:false
				})
				.done(function(add_data_array){
					$("#edit_add_detail").empty(); // 清空前次資料
					for(var i = 0; i < $(add_data_array).size(); i++){
						var edit_add_detail_div = $("<div>");
						
						// 刪除細項按實作
						var del_additional_item_button = $("<a>").attr({"id":"del_additional_item_" + add_data_array[i]["ai_id"], "href":"#"})
							.append($("<img>").attr({"src":"icon/del_ai_icon.png"})
						);
						del_additional_item_button.bind('click', function(){
							var ai_id = $(this).attr('id').replace('del_additional_item_', '');
							console.log('ai_id: ' + ai_id);
							console.log('at_id: ' + at_id);
							$.ajax({
								url:"edit_menu_op.php",
								method: "POST",
								dataType:"json",
								data: {
									"action": "del_additional_item", 
									"ai_id":ai_id
								},
								async:false
							})
							.done(function(){
								alertify.success('刪除細項成功');
								$("#edit_at_" + at_id).trigger('click');
							})
							.fail(function(){
								alertify.error("刪除細項傳輸錯誤！");
							});
						});
						
						edit_add_detail_div.append(del_additional_item_button);
						edit_add_detail_div.append($("<input>").attr({"type": input_type, "name": "#", "style":"margin-left: 30px; margin-right: 5px;"}));
						edit_add_detail_div.append($("<input>").attr({"id": "ai_" + add_data_array[i]["ai_id"], "type": "text", "value": add_data_array[i]['name'], "style": "border: 0px; background-color: #FFFFDD; width: 8%;"}));
						edit_add_detail_div.append($("<input>").attr({"id": "ai_" + add_data_array[i]["ai_id"] + "_price", "type": "text", "value": add_data_array[i]['price'], "style": "border: 0px; background-color: #FFFFDD; width: 5%; text-align:right;"}));
						edit_add_detail_div.append("元");
						

						
						$("#edit_add_detail").append(edit_add_detail_div);
						$("[id^='ai_" + add_data_array[i]["ai_id"] + "']").bind("click", edit_ai);
						$("[id^='ai_" + add_data_array[i]["ai_id"] + "']").bind("blur", function(){
							var new_ai_data_err_msg = '';
							var new_ai_data_jqobj = $(this);
							var new_ai_data = $(this).val().replace(/\s/g, ''); // 去除字串中所有空白
							console.log(new_ai_data);

							var ai_id = $(this).attr("id").replace("ai_", "").replace("_price", "");
							var edit_data = "name";
							if($(this).attr("id").replace("ai_" + ai_id + "_", "") == "price"){
								edit_data = "price";
							}
							
							if(edit_data == "price"){
								if(!$.isNumeric(new_ai_data)){ // 判斷是否為純數字
									new_ai_data_err_msg = "編輯細項失敗：價格含有非法字元";
								}
							}
							else{
								if(new_ai_data == ''){
									new_ai_data_err_msg = "編輯細項失敗：細項名稱不可空白";
								}
							}
							
							if(new_ai_data == new_ai_data_jqobj.attr('data-old_data'))
								new_ai_data_err_msg = "資料未修改";
							
							
							if(new_ai_data_err_msg == ''){
								new_ai_data_jqobj.val(new_ai_data);
								
								$.ajax({ //編輯細項資料
									url:"edit_menu_op.php",
									method: "POST",
									dataType:"json",
									data: {"action": "edit_ai", "new_ai_data": new_ai_data, "ai_id": ai_id, "edit_data": edit_data},
									async:false
								})
								.done(function(msg){
									alertify.success('細項內容已修改！');
									
								})
								.fail(function(){
									alertify.error("編輯細項失敗：資料庫傳輸錯誤");
									new_ai_data_jqobj.val(new_ai_data_jqobj.attr('data-old_data'));
								});
							}
							else if(new_ai_data_err_msg == "資料未修改"){
								alertify.log(new_ai_data_err_msg);	
							}
							else{
								alertify.error(new_ai_data_err_msg);
								new_ai_data_jqobj.val(new_ai_data_jqobj.attr('data-old_data'));
							}

							$(this).css({"border": "0px", "background-color": "#FFFFDD"});
							$(this).bind("click", edit_ai);
						});
						
						
						console.log(add_data_array[i]);
					}
					//console.log(add_data_array);
				});
				
				
				
			});
			
			$("#del_at_" + add_type_array[i]['at_id']).bind('click', function(){
				var at_id = $(this).attr("id").replace("del_at_", "");
				console.log(at_id);
				alertify.confirm("確定刪除「" + $(this).parent().text() + "」？", function(e){
					//alert(at_id);
					if(e){

						$.ajax({ //刪除細項種類
							url:"edit_menu_op.php",
							method: "POST",
							dataType:"json",
							data: {"action": "del_additional_type", "at_id": at_id},
							async:false
						})
						.done(function(msg){
							alertify.success('細項已刪除！');
							unbind_new_main_win();
							
							if($("#new_main_win_h3").text() == '編輯加點項目'){ // 修改編輯加點視窗畫面
								$("#edit_additional").trigger('click');
							}
							else{
								$("#add_main").trigger('click');
							}
						})
						.fail(function(){
							alertify.error("刪除細項失敗：資料庫傳輸錯誤");
							
						});
						
					}
					else{
						alertify.error("刪除細項取消！");
					}
				})
			});
		}
		
	})
    .fail(function(){
		alertify.error('讀取細項類別失敗！');
	});

	//$("#add_detail").bind('click', detail_div);
	
	// 確定按鈕
	$("#add_item_finish").bind("click", function(){
		var single_checked = $("[name='single']:checked"); // 所有checked元素的陣列
		var add_item_error_msg = Array();
		var single_at_id = Array();
		for(var i = 0; i < single_checked.size(); i++){
			var at_id = $(single_checked[i]).attr("id").replace("at_", "");
			single_at_id.push(at_id);
		}
		if(single_at_id.length == 0){
			single_at_id.push(0);
		}

		mul_at_id = $("[name='mul']:checked").attr("id").replace("at_", "");
		
		
		new_main_series = ($("#new_main_series").val().replace("s_", "")); // .val()取得select中被選取的option的value
		new_main_name = $("#new_main_name").val().replace(/\s/g, ''); // 去除所有空白
		new_main_price = $("#new_main_price").val();
		
		if(new_main_name == ""){
			add_item_error_msg.push("品項名稱不可空白！");
		}
		if(new_main_series=="0"){
			add_item_error_msg.push("請選擇系列！");
		}
		if(new_main_price==""){
			add_item_error_msg.push("品項價格無效！");
		}
		
		if(add_item_error_msg.length == 0){
			$.ajax({
					url:"edit_menu_op.php",
					method: "POST",
					dataType:"json",
				data: {
					"action": "add_item", 
					"single_at_id": single_at_id, 
					"mul_at_id": mul_at_id, 
					"new_main_series": new_main_series, 
					"new_main_name": new_main_name, 
					"new_main_price": new_main_price
				},
				async:false
			})
			.done(function(){
				$("#close_new_main_win").trigger('click');
				$("#series_table").load("edit_menu.php #series_table");
				alertify.success("新增品項成功！");
				series_table_bind();
			})
			.fail(function(){
				alertify.error("新增品項傳輸錯誤！");
			});
		}
		else{
			alertify.error(add_item_error_msg.join("<br>"));
		}
		
	});
	$("#new_main_set").css({"display":"block"});
	
	// 新增細項類別
	$("#add_multi_choice").bind('click', function(){ // 下單時之單選項目
		var new_mul_type;
		alertify.prompt("請輸入新單選細項類別名稱", function(e, new_mul_type) {
			if(e && (new_mul_type != "")) {
				$.ajax({
					url:"edit_menu_op.php",
					method: "POST",
					dataType:"json",
					data: {
						"action": "add_additional_type", 
						"option_name":new_mul_type, 
						"multiple_choice":"0"
					},
					async:false
				})
				.done(function(){
					$("#multi_choice").load("edit_menu.php #multi_choice", function(){
						unbind_new_main_win();
						if($("#new_main_win_h3").text() == '編輯加點項目'){ // 修改編輯加點視窗畫面
							$("#edit_additional").trigger('click');
						}
						else{
							$("#add_main").trigger('click');
						}
					});
					alertify.success('新增單選細項類別：' + new_mul_type);
				})
				.fail(function(){
					alertify.error("新增品項傳輸錯誤！");
				});				
			}
			else {  
				alertify.error('新增單選細項類別取消！');  
			}  
		}, ""); 
	});
	
	$("#add_single_choice").bind('click', function(){// 下單時之多選項目
		var new_single_type;
		alertify.prompt("請輸入新多選細項類別名稱", function(e, new_single_type) {
			if(e && (new_single_type != "")) {
				$.ajax({
					url:"edit_menu_op.php",
					method: "POST",
					dataType:"json",
					data: {
						"action": "add_additional_type", 
						"option_name":new_single_type, 
						"multiple_choice":"1"
					},
					async:false
				})
				.done(function(){
					$("#add_single_choice").load("edit_menu.php #add_single_choice", function(){
						unbind_new_main_win();
						if($("#new_main_win_h3").text() == '編輯加點項目'){ // 修改編輯加點視窗畫面
							$("#edit_additional").trigger('click');
						}
						else{
							$("#add_main").trigger('click');
						}
					});
					alertify.success('新增多選細項類別：' + new_single_type);
				})
				.fail(function(){
					alertify.error("新增品項傳輸錯誤！");
				});				
			}
			else {  
				alertify.error('新增多選細項類別取消！');  
			}  
		}, ""); 
	});
}
function edit_item_for_series (){
	$("#edit_item_set").css({"display":"block"});
	detail_div_number = 0; // global
	//series_id = $(this).parent().attr('id').replace('s', ''); // global	
	
	global_main_id = $(this).attr('id').replace('m', '');
	var main_name = $(this).text();
	main_name = $.trim(main_name)
	var at_id = $(this).data('at_id');
	var price = $(this).val();
	console.log('main_id = ' + global_main_id);
	console.log('main_name = ' + main_name);
	console.log('at_id = ' + at_id);
	console.log('price = ' + price);
	
	//console.log('series_id = ' + series_id);
	$("#edit_main_name").val(main_name);
	$("#edit_main_price").val(price);
	
	$("#edit_add_detail").bind('click', edit_detail_div);
	if(at_id > 0){ // 處理加點項目
		console.log("Info: 有加點項目，呼叫edit_detail_div()");
		$("#edit_add_detail").trigger('click');
		console.log("(OUT)detail_div_number = " + detail_div_number);
		$("select[name='select_mul_" + (detail_div_number-1) + "']").val('multi');
		$("select[name='select_mul_" + (detail_div_number-1) + "']").trigger('change');
		
		$("select[name='select_type_" + (detail_div_number-1) + "']").val("at_" + at_id);
		$("select[name='select_type_" + (detail_div_number-1) + "']").trigger('change');
	}
	
	$.ajax({
			url:"process_required.php",
			method: "POST",
			dataType:"json",
			data: {"action": "read_ro_for_m_id", "m_id": global_main_id},
			async:false
		})
		.done(			
			function(ro_for_main_arrays){
				console.log("ro_for_main_arrays.length = " + ro_for_main_arrays.length);
				for(var i = 0; i < ro_for_main_arrays.length; i++){
					console.log(ro_for_main_arrays[i]['option_name']);
					$("#edit_add_detail").trigger('click');
					console.log("(OUT)detail_div_number = " + detail_div_number);
					$("select[name='select_type_" + (detail_div_number-1) + "']").val(ro_for_main_arrays[i]['at_id']);
					$("select[name='select_type_" + (detail_div_number-1) + "']").trigger('change');
				}
			
			}
			
		)
	    .fail(function(){
			alert("Error: read_required_option_table");
		})
		.always(function(){
			//alert("Complete");
		})
		;

		$("#del_item").bind('click', function () { // 刪除品項
		    if (confirm('確定要刪除此品項？')) {
		        $.ajax({
		            url: "process_required.php",
		            method: "POST",
		            dataType: "json",
		            data: { "action": "del_main", "m_id": global_main_id },
		            async: false
		        })
		    .done(function () {
		        alert('此品項已刪除！');
		        location.reload(); // 刷新頁面
		    })
		    .fail();
		    }
		    else {
		        alert("操作已取消");
		    }

		});
}

function edit_detail_div()
{
	detail_unfocus(); // 隱藏黑色框線以及「新增細項」、「－」按鈕
	$("select[name^='select_']").not($(this).find("select")).hide(); // 除了點選的detail_div內的select標籤外，隱藏所有select標籤
	for(var i = 0; i < detail_div_number; i++) { // 將select所選項目的內容轉為純文字
		//alert(i);
		$("#select_mul_" + i).text($("select[name='select_mul_" + i + "'] :selected").text());
		$("#select_type_" + i).text($("select[name='select_type_" + i + "'] :selected").text());
	}
	
	var main_div = $("#edit_detail_title"); // 編輯畫面主視窗
	
	var detail = $("<div>").attr({'id':'detail_' + detail_div_number, 'class':'w3-row', 'style':'border-style:outset; padding:5px;'})
	var div = $("<div>").attr({'id':'top_' + detail_div_number}); // top
	var span = $("<span>");
	var sel_type = $("<select>").attr({'name':'select_type_' + detail_div_number});

	$.ajax({
	    url: "process_required.php",
	    method: "POST",
	    dataType: "json",
	    data: { "action": 'read_ro' },
	    async: false
	})
	.done(function (ro_arrays) {

	    /* 設定detail中的top */
	    // 設定select_type
	    var default_option = $("<option>").attr({ 'value': 'unselect' }).append('請選擇種類');
	    var add_option = $("<option>").attr({ 'value': 'add_options' }).append('新增種類');
	    sel_type.append(default_option).append(add_option);
	    for (var i = 0; i < $(ro_arrays).size(); i++) {
	        console.log("ro_id = " + ro_arrays[i]['at_id'] + ", option_name = " + ro_arrays[i]['option_name']);
	        sel_type.append($("<option>").attr({ "value": ro_arrays[i]['at_id'] }).append(ro_arrays[i]['option_name']));
	    }

	    span.append(sel_type).append($("<span>").attr({ 'id': 'select_type_' + detail_div_number }));
	    div.append(span); // 加入top中

	    // 設定select_mul
	    span = $("<span>").attr({ 'style': 'float:right;' }); // 設定靠右
	    var sel_mul = $("<select>").attr({ 'name': 'select_mul_' + detail_div_number });
	    var single_option = $("<option>").attr({ 'value': 'single' }).append('單選（主餐細項設定）');
	    var multi_option = $("<option>").attr({ 'value': 'multi' }).append('多選（加點細項設定）');
	    sel_mul.append(single_option).append(multi_option);



	    span.append(sel_mul);
	    span.append($("<span>").attr({ 'id': 'select_mul_' + detail_div_number }));
	    div.append(span); // 加入top中

	    detail.append(div); // top加入deatil中
	    /* 設定detail中的top */

	    /* 設定detail中的mid */
	    div = $("<div>").attr({ 'id': 'mid_' + detail_div_number }); // mid
	    detail.append(div); // mid加入deatil中
	    /* 設定detail中的mid */

	    /* 設定detail中的bottom */
	    div = $("<div>").attr({ 'id': 'bottom_' + detail_div_number }); // bottom
	    span = $("<span>").attr({ 'id': 'add_detail_item_' + detail_div_number, 'style': 'float:left; font-weight: bold; display: none;', 'class': 'w3-btn' }).append('新增細項'); // 預設隱藏
	    span.bind('click', function () { // 「新增細項」按鈕功能
	        var type_self_id = $(this).attr('id').replace('add_detail_item_', '');
	        var at_id = $("select[name='select_type_" + type_self_id + "'] :selected").val().replace('at_', '');

	        $.ajax({
	            url: "process_required.php",
	            method: "POST",
	            dataType: "json",
	            data: { "action": "add_new_ai", 'at_id': at_id }
	        })
			.done(function (new_ai_id) {
			    //alert(new_ai_id);
			    //alert(item_id[type_self_id]);
			    if (typeof (item_id[type_self_id]) == 'undefined') {
			        item_id[type_self_id] = 0;
			    }
			    if ($("select[name='select_mul_" + type_self_id + "']").val() == 'single') {
			        span = $("<span>").append($("<span>").attr({ 'id': 'items_' + type_self_id + '_' + item_id[type_self_id] })
						.append($("<input>").attr({ 'type': 'radio', 'name': '', 'value': 'ai_' + new_ai_id }))
						.append('未命名品項')
						.bind('click', edit_ai));
			    }
			    else {
			        span = $("<span>").append($("<span>").attr({ 'id': 'items_' + type_self_id + '_' + item_id[type_self_id] })
						.append($("<input>").attr({ 'type': 'checkbox', 'name': '', 'value': 'ai_' + new_ai_id }))
						.append('未命名品項')
						.bind('click', edit_ai));
			    }

			    //console.log($('#items_'+type_self_id+'_'+item_id[type_self_id]));
			    span = span.append($("<span>").attr({ 'id': 'price_' + type_self_id + '_' + item_id[type_self_id] })
					.bind('click', edit_ai_price)
					.append('0'))
					.append('元');
			    temp = span.append(span);
			    //alert(type_self_id.toString() + " " + item_id[type_self_id])
			    $("#mid_" + type_self_id).append(temp);
			    item_id[type_self_id]++;
			})
			.fail(function () {
			    alert('action: "add_new_ai" failed...');
			})
			.always(function () {
			    //alert("Complete");
			});
	    });


	    div.append(span);
	    span = $("<span>").attr({ 'id': 'del_detail_' + detail_div_number, 'style': 'float:right; font-weight: bold;', 'class': 'w3-btn' }).append('－').bind('click', del_detail_div); // 刪除此detail_div
	    div.append(span);
	    detail.append(div); // bottom加入deatil中
	    /* 設定detail中的bottom */


	    /* 設定detail_div點選focus效果 */
	    detail.bind('click', function () {
	        var self_id = parseInt($(this).attr('id').replace('detail_', ''));
	        //console.log(self_id);	

	        detail_unfocus(); // 隱藏黑色框線以及「新增細項」、「－」按鈕
	        $("select[name^='select_']").not($(this).find("select")).hide(); // 除了點選的detail_div內的select標籤外，隱藏所有select標籤
	        $(this).attr({ 'style': 'border-style:outset; padding:5px;' }); // 顯示黑色粗框
	        $(this).find("span").not($("#add_detail_item_" + self_id)).show(); // ，除「新增細項」按鈕外，顯示此detail_div中的span
	        if ($("select[name^='select_type_" + self_id + "']").val() != 'unselect' && $("select[name^='select_type_" + self_id + "']").val() != 'add_options') { // 所有select_type中，顯示已經設定的項目
	            $(this).find("span").show();
	        }
	        $(this).find("select").show();

	        for (var i = 0; i < detail_div_number; i++) { // 將其他detail_div中所選擇的內容轉為純文字，並清除此detail_div中的純文字部份
	            if (i != self_id) {
	                $("#select_mul_" + i).text($("select[name='select_mul_" + i + "'] :selected").text());
	                $("#select_type_" + i).text($("select[name='select_type_" + i + "'] :selected").text());
	            }
	            else {
	                $("#select_mul_" + i).text('');
	                $("#select_type_" + i).text('');
	            }
	        }
	    });
	    /* 設定detail_div點選focus效果 */

	    main_div.append(detail); // 將動態產生的top, mid, bottom加入
	    main_div.append($("<div>").attr({ 'style': 'height:20px;' })) // 產生間隔用

	    detail_div_number++; // 計數detail_div_number
	    console.log("(IN)detail_div_number = " + detail_div_number);

	    // Select Multi Evenet 
	    sel_mul.bind('change', function () {
	        var mul_value = $(this).val();
	        var mul_self_id = $(this).attr('name').replace('select_mul_', '');
	        console.log('mul_self_id = ' + mul_self_id);

	        at_list_name = $("select[name=select_type_" + mul_self_id + "]").empty();
	        at_list_name.append(default_option).append(add_option);
	        at_list_name[0].selectedIndex = 0;
	        at_list_name.trigger('change');

	        $.ajax({
	            url: "process_required.php",
	            method: "POST",
	            dataType: "json",
	            data: { "action": 'read_at', 'mul_value': mul_value },
	            async: false
	        })
			.done(function (msg) {
			    for (var i = 0; i < $(msg).size(); i++) {
			        //console.log(msg[i]['at_id']);
			        //console.log(msg[i]['option_name']);
			        //console.log(msg[i]['multiple_choice']);
			        at_list_name.append($("<option>").attr({ "value": "at_" + msg[i]["at_id"] }).append(msg[i]["option_name"]));
			    }
			})
			.fail(function () {
			    alert("Fail");
			})
			.always(function () {
			    //alert("Complete");
			});
	    })

	    // Select Type Event
	    sel_type.bind('change', function () {
	        var type_value = $(this).val();
	        var type_self_id = $(this).attr('name').replace('select_type_', '');
	        $("#mid_" + type_self_id).empty();

	        if (type_value == 'add_options') { // 新增種類
	            $("#add_detail_item_" + type_self_id).attr({ 'style': 'float:left; font-weight: bold;', 'class': 'w3-btn' });
	            //console.log($("select[name='select_type_" + (detail_div_number-1) + "'] :selected").text());
	            var type_edit = $("<input>").attr({ "id": "add_type_" + type_self_id, "type": "text", "value": "", "placeholder": "請輸入新增種類名稱" })
	            var type_cancel = $('<input>').attr({ "id": "add_type_cancel_" + type_self_id, "type": "button", "value": "取消" })
					.bind('click', function () {
					    type_edit.remove();
					    type_submit.remove();
					    $(this).remove();
					    $("select[name=select_type_" + type_self_id + "]")[0].selectedIndex = 0;
					});
	            var type_submit = $('<input>').attr({ "id": "add_type_sub_" + type_self_id, "type": "button", "value": "確定" })
					.bind('click', function () {
					    var new_type = $("#add_type_" + type_self_id).val();
					    var mul_type = $("select[name='select_mul_" + type_self_id + "']").val();
					    console.log(mul_type);

					    $.ajax({
					        url: "process_required.php",
					        method: "POST",
					        dataType: "json",
					        data: { "action": 'write_required_option', "new_type": new_type, "mul_type": mul_type },
					        async: false
					    })
						.done(function (new_at_id) {
						    console.log(new_at_id); // 回傳新增的at_id
						    $("select[name='select_type_" + type_self_id + "']").append($("<option>").attr({ "value": "at_" + new_at_id }).append(new_type));
						    $("select[name='select_type_" + type_self_id + "']").val("at_" + new_at_id); // 選取特定value的選項
						    $("select[name='select_type_" + type_self_id + "']").trigger('change');
						    $("#add_detail_item_" + type_self_id).show();
						    type_edit.remove();
						    type_submit.remove();
						    type_cancel.remove();
						    $(this).remove();
						})
						.fail(function () {
						    alert('action: "write_required_option" failed...');
						})
						.always(function () {
						    //alert("Complete");
						});
					});
	            $("select[name='select_type_" + type_self_id + "']").after(type_edit).after(type_submit).after(type_cancel);
	        }
	        else { // 讀取細項
	            $("#add_detail_item_" + type_self_id).hide();
	            //console.log(type_value);
	            if (type_value != 'unselect') {
	                $.ajax({
	                    url: "process_required.php",
	                    method: "POST",
	                    dataType: "json",
	                    data: { "action": 'read_detail', "at_id": type_value.replace('at_', '') },
	                    async: false
	                })
					.done(function (msg) {

					    for (var i = 0; i < $(msg).size(); i++) {
					        //console.log(msg[i]["name"]);
					        //console.log(msg[i]["price"]);
					        if (typeof (item_id[type_self_id]) == 'undefined') {
					            item_id[type_self_id] = 0;
					        }

					        var input_type = '';
					        if ($("select[name='select_mul_" + type_self_id + "']").val() == 'single') {
					            input_type = 'radio';
					        }
					        else {
					            input_type = 'checkbox';
					        }
					        temp = $("<span>").append($("<span>").attr({ 'id': 'items_' + type_self_id + '_' + item_id[type_self_id] })
								.append($("<input>").attr({ 'type': input_type, 'name': '', 'value': 'ai_' + msg[i]["ai_id"] }))
								.append(msg[i]["name"])
								.bind('click', edit_ai));




					        temp.append(
								$("<span>").attr({ 'id': 'price_' + type_self_id + '_' + item_id[type_self_id] })
									.bind('click', edit_ai_price)
									.append(msg[i]["price"]))
								.append('元');
					        temp.append(temp);
					        //console.log(type_self_id.toString() + " " + item_id[type_self_id])

					        $("#mid_" + type_self_id).append(temp);
					        item_id[type_self_id]++;
					    }
					})
					.fail(function () {
					    alert("Fail");
					})
					.always(function () {
					    //alert("Complete");
					});
	            }
	        }
	    });

	})
	.fail(function () {
	    alert("Fail");
	})
	.always(function () {
	    //alert("Complete");
	});
}



function detail_div() {	
	detail_unfocus();
	$("select[name^='select_']").not($(this).find("select")).hide();
	for(var i = 0; i < detail_div_number; i++) { // 最後才detail_div_number++
		//alert(i);
		$("#select_mul_" + i).text($("select[name='select_mul_" + i + "'] :selected").text());
		$("#select_type_" + i).text($("select[name='select_type_" + i + "'] :selected").text());
	}
	
	var detail = $("<div>").attr({'id':'detail_' + detail_div_number, 'class':'w3-row', 'style':'border-style:outset; padding:5px;'})
	
	var div = $("<div>").attr({'id':'top_' + detail_div_number}); // top
	var span = $("<span>");
	var ro_list_name = $("<select>").attr({'name':'select_type_' + detail_div_number});
	var default_option = $("<option>").attr({'value':'unselect'}).append('請選擇種類');
	var add_option = $("<option>").attr({'value':'add_options'}).append('新增種類');
		
	$.ajax({
		url:"process_required.php",
		method: "POST",
		dataType:"json",
		data: {"action": 'read_ro'}
	})
	.done(function(msg){
		for(var i = 0; i < $(msg).size(); i++){
			//alert(msg[i]['ro_id']);
			//alert(msg[i]['name']);
			//alert(msg[i]['m_id']);
			//alert(msg[i]['at_id']);
			ro_list_name.append($("<option>").attr({"value": "at_" + msg[i]["at_id"]}).append(msg[i]["option_name"]));
		}
		
	})
	.fail(function(){
		alert("Fail");
	})
	.always(function(){
		//alert("Complete");
	})
	;
	
	var temp = ro_list_name.append(default_option).append(add_option);
	temp = span.append(temp).append($("<span>").attr({'id':'select_type_' + detail_div_number}));
	div = div.append(temp);

	span = $("<span>").attr({'style':'float:right;'});
	var sel = $("<select>").attr({'name':'select_mul_' + detail_div_number});
	var single_option = $("<option>").attr({'value':'single'}).append('單選（主餐細項設定）');
	var multi_option = $("<option>").attr({'value':'multi'}).append('多選（加點細項設定）');
	temp = sel.append(single_option).append(multi_option);
	temp = span.append(temp).append($("<span>").attr({'id':'select_mul_' + detail_div_number}));
	div = div.append(temp);
	detail = detail.append(div);
	
	div = $("<div>").attr({'id':'mid_' + detail_div_number}); // mid
	//span = $("<span>").append($("<input>").attr({'type':'radio'}));
	//span = span.append('未命名品項');
	//span = span.append($("<span>").append('0')).append('元');
	//div = div.append(span);
	detail = detail.append(div);
	
	
	div = $("<div>").attr({'id':'bottom_' + detail_div_number}); // bottom

	span = $("<span>").attr({'id':'add_detail_item_' + detail_div_number, 'style':'float:left; font-weight: bold; display: none;', 'class':'w3-btn'}).append('新增細項');
	span.bind('click', function(){
		var type_self_id = $(this).attr('id').replace('add_detail_item_', '');
		var at_id = $("select[name='select_type_" + type_self_id + "'] :selected").val().replace('at_','');
		
		$.ajax({
			url:"process_required.php",
			method: "POST",
			dataType:"json",
			data: {"action": "add_new_ai", 'at_id': at_id}
		})
		.done(function(new_ai_id){
			//alert(new_ai_id);
			//alert(item_id[type_self_id]);
			if(typeof(item_id[type_self_id])== 'undefined')
				{
					item_id[type_self_id] = 0;
				}
			if($("select[name='select_mul_" + type_self_id + "']").val() == 'single') {
				span = $("<span>").append($("<span>").attr({'id':'items_'+type_self_id+'_'+item_id[type_self_id]})
					.append($("<input>").attr({'type':'radio', 'name':'', 'value':'ai_' + new_ai_id}))
					.append('未命名品項')
					.bind('click', edit_ai));
			}
			else {
				span = $("<span>").append($("<span>").attr({'id':'items_'+type_self_id+'_'+item_id[type_self_id]})
					.append($("<input>").attr({'type':'checkbox', 'name':'', 'value':'ai_' + new_ai_id}))
					.append('未命名品項')
					.bind('click', edit_ai));
			}

			//console.log($('#items_'+type_self_id+'_'+item_id[type_self_id]));
			span = span.append($("<span>").attr({'id':'price_'+type_self_id+'_'+item_id[type_self_id]})
				.bind('click', edit_ai_price)			
				.append('0'))
				.append('元');
			temp = span.append(span);
			//alert(type_self_id.toString() + " " + item_id[type_self_id])
			$("#mid_" + type_self_id).append(temp);
			item_id[type_self_id]++;
		})
		.fail(function(){
			alert('action: "add_new_ai" failed...');
		})
		.always(function(){
		//alert("Complete");
		})
		;
	});
	
	div = div.append(span);
	span = $("<span>").attr({'id':'del_detail_' + detail_div_number,'style':'float:right; font-weight: bold;', 'class':'w3-btn'}).append('－').bind('click', del_detail_div);
	div = div.append(span);
	detail = detail.append(div);
	
	
	$("#detail_title").append(detail).append($("<div>").attr({'style':'height:20px;'}));
	detail_div_number++;
	detail.bind('click', function(){
		var self_id = parseInt($(this).attr('id').replace('detail_', ''));
		//alert(self_id);	
		
		detail_unfocus();
		$("select[name^='select_mul_']").not($(this).find("select")).hide();
		$("select[name^='select_type_']").not($(this).find("select")).hide();
		
		$(this).attr({'style':'border-style:outset; padding:5px;'});
		$(this).find("span").not($("#add_detail_item_" + self_id)).show();
		if($("select[name^='select_type_" + self_id + "']").val() != 'unselect'){
			$(this).find("span").show();
		}
		$(this).find("select").show();
		
		for(var i = 0; i < detail_div_number; i++) {
			if(i != self_id) {
				$("#select_mul_" + i).text($("select[name='select_mul_" + i + "'] :selected").text());
				$("#select_type_" + i).text($("select[name='select_type_" + i + "'] :selected").text());
			}
			else{
				$("#select_mul_" + i).text('');
				$("#select_type_" + i).text('');
			}
		}
	});
	
	
	/* Select Type and Add Type Evenet */
	$("select[name^='select_type_" + (detail_div_number-1) + "']").bind('change', function(){
		var type_value = $(this).val();
		var type_self_id = $(this).attr('name').replace('select_type_', '');
		$("#mid_" + type_self_id).empty();
		//span = $("<span>").attr({'id':'add_detail_item_' + type_self_id, 'style':'float:left; font-weight: bold; display: none;', 'class':'w3-btn'}).append('新增細項');
		//$("#bottom_" + type_self_id).prepend(span);
		if(type_value == 'add_options') {
			$("#add_detail_item_" + type_self_id).attr({'style': 'float:left; font-weight: bold;', 'class': 'w3-btn'});
			//console.log($("select[name='select_type_" + (detail_div_number-1) + "'] :selected").text());
			var type_edit = $("<input>").attr({"id": "add_type_"+type_self_id, "type": "text", "value": "", "placeholder": "請輸入新增種類名稱"})
                .bind("keypress", function(key){
                    if(key.which == 13) //13為Enter鍵
                        type_submit.trigger("click");
                })
			var type_cancel = $('<input>').attr({"id": "add_type_cancel_"+type_self_id, "type": "button", "value": "取消"})
				.bind('click', function(){
					type_edit.remove();
					type_submit.remove();
					$(this).remove();
					$("select[name=select_type_" + type_self_id + "]")[0].selectedIndex = 0;
				});
			var type_submit = $('<input>').attr({"id": "add_type_sub_"+type_self_id, "type": "button", "value": "確定"})
				.bind('click', function(){
					var new_type = $("#add_type_"+type_self_id).val();
					var mul_type = $("select[name='select_mul_" + type_self_id + "']").val();
					console.log(mul_type);
					//if($("select[name='select_mul_" + type_self_id + "']").val() == 'single') {
						$.ajax({
							url:"process_required.php",
							method: "POST",
							dataType:"json",
							data: {"action": 'write_required_option', "new_type": new_type, "mul_type":mul_type}
						})
						.done(function(new_at_id){
							console.log(new_at_id); // 回傳新增的at_id
							$("select[name='select_type_" + type_self_id + "']").append($("<option>").attr({"value": "at_" + new_at_id}).append(new_type));
							$("select[name='select_type_" + type_self_id + "']").val("at_" + new_at_id); // 選取特定value的選項
							$("select[name='select_type_" + type_self_id + "']").trigger('change');
							$("#add_detail_item_" + type_self_id).show();
							type_edit.remove();
							type_submit.remove();
							type_cancel.remove();
							$(this).remove();
						})
						.fail(function(){
							alert('action: "write_required_option" failed...');
						})
						.always(function(){
							//alert("Complete");
						})
						;
					//}
				});
	$("select[name='select_type_" + type_self_id + "']").after(type_edit).after(type_submit).after(type_cancel);
		}
		else{
			$("#add_detail_item_" + type_self_id).hide();
			//console.log(type_value);
			if(type_value != 'unselect') {
				$.ajax({
					url:"process_required.php",
					method: "POST",
					dataType:"json",
					data: {"action": 'read_detail', "at_id": type_value.replace('at_', '')}
				})
				.done(function(msg){
					
					for(var i = 0; i < $(msg).size(); i++){
						//console.log(msg[i]["name"]);
						//console.log(msg[i]["price"]);
						if(typeof(item_id[type_self_id])== 'undefined')
						{
							item_id[type_self_id] = 0;
						}					
						
						if($("select[name='select_mul_" + type_self_id + "']").val() == 'single') {
							span = $("<span>").append($("<span>").attr({'id':'items_'+type_self_id+'_'+item_id[type_self_id]})
								.append($("<input>").attr({'type':'radio', 'name':'', 'value':'ai_' + msg[i]["ai_id"]}))
								.append(msg[i]["name"])
								.bind('click', edit_ai));
						}
						else{
							span = $("<span>").append($("<span>").attr({'id':'items_'+type_self_id+'_'+item_id[type_self_id]})
								.append($("<input>").attr({'type':'checkbox', 'name':'', 'value':'ai_' + msg[i]["ai_id"]}))
								.append(msg[i]["name"])
								.bind('click', edit_ai));
						}
						span = span
							.append(
								$("<span>").attr({'id':'price_'+type_self_id+'_'+item_id[type_self_id]})
									.bind('click', edit_ai_price)
								.append(msg[i]["price"]))
							.append('元');
						temp = span.append(span);
						//alert(type_self_id.toString() + " " + item_id[type_self_id])
						
						$("#mid_" + type_self_id).append(temp);
						item_id[type_self_id]++;
					}
				})
				.fail(function(){
					alert("Fail");
				})
				.always(function(){
					//alert("Complete");
				})
				;
			}
			
		}
	});
	
	/* Select Multi Evenet */
	$("select[name^='select_mul_" + (detail_div_number-1) + "']").bind('change', function(){
		var mul_value = $(this).val();
		var mul_self_id = $(this).attr('name').replace('select_mul_', '');
				
		$("#mid_" + (detail_div_number-1)).empty();
		at_list_name = $("select[name=select_type_" + mul_self_id + "]").empty();
		at_list_name.append(default_option).append(add_option);
		at_list_name[0].selectedIndex = 0;
			
		$.ajax({
			url:"process_required.php",
			method: "POST",
			dataType:"json",
			data: {"action": 'read_at', 'mul_value':mul_value}
		})
		.done(function(msg){
			for(var i = 0; i < $(msg).size(); i++){
				//alert(msg[i]['at_id']);
				//alert(msg[i]['option_name']);
				//alert(msg[i]['multiple_choice']);
				at_list_name.append($("<option>").attr({"value": "at_" + msg[i]["at_id"]}).append(msg[i]["option_name"]));
			}
		})
		.fail(function(){
			alert("Fail");
		})
		.always(function(){
			//alert("Complete");
		})
		;
	})
}

function detail_unfocus(){
	$("div[id^='detail_']").not($("#detail_title")).attr({'style':'padding:5px;'});
	$("span[id^='add_detail_item_']").hide();
	$("span[id^='del_detail_']").hide();	
}

function unbind_new_main_win()
{
	$("#add_item_finish").unbind();
	$("#add_multi_choice").unbind();
	$("#add_single_choice").unbind();
}

function close_new_main_win(){
	$("#new_main_set").css({"display":"none"});
	unbind_new_main_win();
	//location.reload(); 
}

function edit_item_finish(){
    var edit_main_name = $.trim($("#edit_main_name").val()); // 去除空白
	var edit_main_price = $("#edit_main_price").val();
    console.log('edit_main_name = ' + edit_main_name);
	console.log('edit_main_price = ' + edit_main_price);
    var ro_array = [];
	var at_array = [];
	var error = 0, required_flag = 0, main_at_id = 0; // 0: 無加點
	
    console.log("detail_div_number = " + detail_div_number);
	for(var i = 0; i < detail_div_number; i++){
		var type_val = $("select[name='select_type_" + i + "'] :selected").val();
		var mul_val = $("select[name='select_mul_" + i + "'] :selected").val();
		if((type_val != 'unselect') && (type_val != 'add_options')){
			var at_id = type_val.replace('at_','');
			if(mul_val == 'single'){
				required_flag = 1;
				ro_array.push(type_val.replace('at_', ''));
			}
			else if(mul_val == 'multi'){
				at_array.push(type_val);
			}
            else{
                alert('Error: undefined select_mul value');
            }
		}
	}
	
	if(at_array.length > 1){
	    alert('加點類別(多選)只能設定一種！');
	}
    else{
        ro_array.sort();
		for(var i = 0; i<ro_array.length; i++){
			if(ro_array[i] == ro_array[i+1]){
				error = 1;
				alert("不可設定重複主餐類別(單選)！");
				break;
			}
		}
		if(at_array.length){
			main_at_id = parseInt(at_array[0].replace('at_', ''));
		}
		console.log("main_at_id = " + main_at_id);

        if(error == 0){
            // UPDATE table `main` and `required_option`
            console.log("global_main_id = " + global_main_id);
            console.log('detail_div_number = ' + detail_div_number);
			console.log('edit_main_name = ' + edit_main_name);
			console.log('edit_main_price = ' + edit_main_price);
			console.log('required_option = ' + required_flag);
            
			$.ajax({
			    url: "process_required.php",
			    method: "POST",
			    dataType: "json",
			    data: {
			        'action': 'edit_main_del_ro',
			        'm_id': global_main_id,
			        'name': edit_main_name,
			        'price': edit_main_price,
			        'at_id': main_at_id,
			        'required_option': required_flag
			    },
			    async: false
			})
			.done(function () {
			    // Write to table `required_option`
			    if (required_flag == 1) {
			        console.log("ro_global_main_id = " + global_main_id);

			        $.ajax({
			            url: "process_required.php",
			            method: "POST",
			            dataType: "json",
			            data: {
			                "action": 'write_required_option_table',
			                'm_id': global_main_id,
			                'at_id_array': ro_array
			            }
			        })
			        .done(function (new_ro_number) { // 回傳新增的ro筆數
			            //alert("新增ro筆數 = " + new_ro_number);
			            location.reload(); // 刷新頁面
			        })
			        .fail(function () {
			            alert("Error: action = write_required_option_table, write to table `required_option` failed...");
			        })
			        .always(function () {
			            //alert("Complete");
			        });

			    }
			    else {
			        location.reload(); 
			    }

			})
			.fail(function () {
			    alert('action: "write_main" failed...');
			});
            
        }
    }   
}

function add_item_finish() {

    //var main_all = $("button[id^='m']");
    var new_main_name = $("#new_main_name").val();
    var new_main_price = $("#new_main_price").val();
    var ro_array = [];
    var at_array = [];
    var error = 0, required_flag = 0, main_at_id = 0; // 0: 無加點
    for (var i = 0; i < detail_div_number; i++) {
        var type_val = $("select[name='select_type_" + i + "'] :selected").val();
        var mul_val = $("select[name='select_mul_" + i + "'] :selected").val();
        if ((type_val != 'unselect') && (type_val != 'add_options')) {
            var at_id = type_val.replace('at_', '');
            if (mul_val == 'single') {
                required_flag = 1;
                ro_array.push(type_val.replace('at_', ''));
            }
            else if (mul_val == 'multi') {
                at_array.push(type_val);
            }
        }
    }

    if (at_array.length > 1) {
        alert('加點類別(多選)只能設定一種！')
        error = 1;
    }

    ro_array.sort();

    for (var i = 0; i < ro_array.length; i++) {
        if (ro_array[i] == ro_array[i + 1]) {
            error = 1;
            alert("不可設定重複主餐類別(單選)！");
            break;
        }
    }
    if (new_main_name == "請輸入品項名稱") {
        alert("品項名稱未設定");
        error = 1;
    }
    if (at_array.length)
        main_at_id = parseInt(at_array[0].replace('at_', ''));


    if (error == 0) {
        console.log('detail_div_number = ' + detail_div_number);
        console.log('new_main_name = ' + new_main_name);
        console.log('new_main_price = ' + new_main_price);
        console.log('series_id = ' + series_id);
        console.log('at_id = ' + main_at_id);
        console.log('required_option = ' + required_flag);
        /* Write to table `main` */
        $.ajax({
            url: "process_required.php",
            method: "POST",
            dataType: "json",
            data: {
                "action": 'write_main',
                'name': new_main_name,
                'price': new_main_price,
                's_id': series_id,
                'at_id': main_at_id,
                'required_option': required_flag
            },
            async: false
        })
		.done(function (new_main_id) {
		    /* Write to table `required_option` */
		    if (required_flag == 1) {

		        $.ajax({
		            url: "process_required.php",
		            method: "POST",
		            dataType: "json",
		            data: {
		                "action": 'write_required_option_table',
		                'm_id': new_main_id,
		                'at_id_array': ro_array
		            }
		        })
				.done(function (msg) { // 回傳新增的ro筆數
				    //alert(msg)
				    location.reload(); // 刷新頁面
				})
				.fail(function () {
				    alert("Error: action = write_required_option_table, write to table `required_option` failed...");
				})
				.always(function () {
				    //alert("Complete");
				})
				;

		    }
		    else
		        location.reload();
		})
			.fail(function () {
			    alert('action: "write_main" failed...');
			})
			.always(function () {
			    //alert("Complete");
			})
			;
    }
}


function edit_item(){
	
	var s_id = $(this).parents("div").attr('id').replace('s', '');
	var m_id = $(this).attr('id').replace('m', '');
	var at_id = $(this).attr('data-at_id');
	var name = $(this).text().replace(/\s/g, ''); // 去除字串中所有空白
	var price = $(this).attr('value');
	console.log("s_id: " + s_id);
	console.log("m_id: " + m_id);
	console.log("多選at_id: " + at_id);
	console.log("name: " + name);
	console.log("price: " + price);
	
	// 修改畫面為個別品項編輯用
	$("#add_main").trigger("click");
	$("#new_main_win_h3").text('編輯品項');
	
	// 依品項內容設定畫面
	$('#new_main_series').val('s_' + s_id);
	$('#new_main_name').val(name);
	$('#new_main_price').val(price);
	$("#at_" + at_id).attr("checked", true); // 選取
	
	// 確定按鈕for編輯品項
	var edit_item_submit = $('<button>').attr({"id":"edit_item_submit", "class":"w3-btn w3-right w3-round"}).text('確定');
	var del_item_submit = $('<button>').attr({"id":"del_item_submit", "class":"w3-btn w3-right w3-round"}).text('刪除此品項');
	$('#add_item_finish').after(edit_item_submit);
	$('#add_item_finish').after(del_item_submit);
	$('#add_item_finish').hide();
	
	edit_item_submit.bind('click', function(){		
		var single_checked = $("[name='single']:checked"); // 所有checked元素的陣列
		var add_item_error_msg = Array();
		var single_at_id = Array();
		for(var i = 0; i < single_checked.size(); i++){
			var at_id = $(single_checked[i]).attr("id").replace("at_", "");
			single_at_id.push(at_id);
		}
		if(single_at_id.length == 0){
			single_at_id.push(0);
		}

		mul_at_id = $("[name='mul']:checked").attr("id").replace("at_", "");
		
		new_main_series = ($("#new_main_series").val().replace("s_", "")); // .val()取得select中被選取的option的value
		new_main_name = $("#new_main_name").val().replace(/\s/g, ''); // 去除所有空白
		new_main_price = $("#new_main_price").val();
		
		if(new_main_name == ""){
			add_item_error_msg.push("品項名稱不可空白！");
		}
		if(new_main_series=="0"){
			add_item_error_msg.push("請選擇系列！");
		}
		if(new_main_price==""){
			add_item_error_msg.push("品項價格無效！");
		}
		
		if(add_item_error_msg.length == 0){
			
			$.ajax({
					url:"edit_menu_op.php",
					method: "POST",
					dataType:"json",
				data: {
					"action": "edit_item",
					"m_id":m_id,
					"single_at_id": single_at_id, 
					"mul_at_id": mul_at_id, 
					"new_main_series": new_main_series, 
					"new_main_name": new_main_name, 
					"new_main_price": new_main_price
				},
				async:false
			})
			.done(function(){
				$("#close_new_main_win").trigger('click');
				$("#series_table").load("edit_menu.php #series_table");
				alertify.success("編輯品項成功！");
				series_table_bind();
			})
			.fail(function(){
				alertify.error("編輯品項傳輸錯誤！");
			});
			
		}
		else{
			alertify.error(add_item_error_msg.join("<br>"));
		}
	});
	
	del_item_submit.bind('click', function(){
		alertify.confirm("確定刪除此品項？", function(e){
			if(e){
				$.ajax({
					url:"edit_menu_op.php",
					method: "POST",
					dataType:"json",
					data: {
						"action": "del_item", 
						"m_id": m_id
					},
					async:false
				})
				.done(function(){
					$("#close_new_main_win").trigger('click');
					$("#series_table").load("edit_menu.php #series_table");
					alertify.success("刪除品項成功！");
					series_table_bind();
				})
				.fail(function(){
					alertify.error("刪除品項傳輸錯誤！");
				});
			}
			else{
				alertify.error("刪除細項取消！");
			}
		});
	});
	
	$.ajax({
		url:"edit_menu_op.php",
		method: "POST",
		dataType:"json",
		data: {
			"action": "get_ro_for_main", 
			"m_id":m_id
		},
		async:false
	})
	.done(function(ro_data_array){
		console.log(ro_data_array);
		console.log(ro_data_array.length);
			
		for(var i = 0; i < ro_data_array.length; i++)
		{
			console.log("單選at_id: " + ro_data_array[i]['at_id']);
			$("#at_" + ro_data_array[i]['at_id']).attr("checked", true); // 選取
		}
	})
	.fail(function(){
		alertify.error("新增細項傳輸錯誤！");
		edit_item_submit.remove();
	});
}

function del_series(){
	var s_id = $(this).attr('id').replace('del_s_', '');
	console.log('s_id: ' + s_id);
		alertify.confirm("確定刪除系列：" + $('#es_' + s_id).val() + "？", function(e){
			if(e){
				
				$.ajax({
					url:"edit_menu_op.php",
					method: "POST",
					dataType:"json",
					data: {
						"action": "del_series", 
						"s_id": s_id
					},
					async:false
				})
				.done(function(main_data_array){
					console.log(main_data_array);
					$("#series_table").load("edit_menu.php #series_table");
					alertify.success("刪除系列成功！");
					series_table_bind();
				})
				.fail(function(){
					alertify.error("刪除系傳輸錯誤！");
				});
				
			}
			else{
				alertify.error("刪除系列取消！");
			}
		});
}


function series_table_bind() {
	
    
    //$("#edit_close_item").on('click', close_new_item);
    //$("#add_item_finish").on('click', add_item_finish);
    //$("#edit_item_finish").on('click', edit_item_finish);
    
    
    //$("#edit_add_close").on('click', close_new_item);

	// 新增
    //$("button[id^='add_item_for_s']").on('click', add_item_for_series); // 開啟新增品項視窗
	

    // 修改
    $("button[id^='m']").bind('click', edit_item); // 開啟編輯品項視窗
	$("input[id^='es']").bind('click', edit_series); // 編輯系列名稱
	
	// 拖曳排序
	//$("#series_table .w3-group").sortable({connectWith: "div"});
	//$("div[id^='m']").draggable({connectToSortable: ".w3-group"});
	
	// 刪除系列
	$('a[id^=del_s_]').bind('click', del_series);
	

}

$(document).ready(function(){

	$("#add_series").bind("click", add_series);// 新增系列
	$("#add_main").bind('click', add_item); // 開啟新增品項視窗
	$("#edit_additional").bind('click', function(){
		$("#add_main").trigger('click');
		$("#detail_title").hide();
		$("#add_item_finish").hide();
		$("#new_main_win_h3").text('編輯加點項目');
	});
	//$("#edit_additional").bind('click', edit_additional); // 編輯加點項目
	
	series_table_bind();
	
        $("#nav_cross").click(function(){

            $(".w3-sidenav").toggle();
            $("#main").css({"marginLeft":"0%"});
            $(".w3-sidenav").css({"display":"none"});
            $(".w3-opennav").css({"display":"inline-block"});

        });

        $("#nav_open").click(function(){
                            
            $(".w3-sidenav").toggle();
            $("#main").css({"marginLeft":"20%"});
            $(".w3-sidenav").css({"display":"block", "width":"20%"});
            $(".w3-opennav").css({"display":"none"});

        });


        $("#nav_open").css({"position":"fixed"});
        /////
        $("#open_cart").css({"position":"fixed", "right":"7%", "bottom":"7%", "z-index":"2"});
        $("#open_cart2").css({"position":"fixed", "right":"15%", "bottom":"7%", "z-index":"2"});
        $("#open_cart3").css({"position":"fixed", "right":"23%", "bottom":"7%", "z-index":"2"});
        $("#open_cart4").css({"position":"fixed", "right":"31%", "bottom":"7%", "z-index":"2"});
        //////
        $("#nav_cross").click(); 	
	
});


