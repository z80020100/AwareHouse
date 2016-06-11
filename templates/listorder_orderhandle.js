
//--------單子顯示相關的函式------------------------------
//
//	ordershow 顯示整張單子，包含viewsummary跟viewshare
//	viewsummary 單子總結
//	viewshare 以小單為單位顯示
//
//--------------------------------------------------------

//function toggle_ordershow( id ){
//	order_filter = "#order_detail_"+id;
//	$(order_filter).toggle();
//}

$(document).ready(function(){

        alertify.log("在單子上左滑右滑會改變他的狀態哦!", "", 4000);

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


function order_status_change(oid, direction){
	order_detail = "#order_detail_" + oid;
	var req = new Object();
	req["type"] = 'updateOrderStatus';
	req["swipe"] = direction;
	req["current_status"] = $('#order_detail_'+oid).data("status");
	req["oid"] = oid;
	//$("#debug_text").val( $("#debug_text").val() + "\norder_status_change----\nOID:" + oid +"\nSWIPE:" + req["swipe"] + "\ncurS:" + req["current_status"] + "\n" );
	
	
	$.ajax( {
		url:"listorder_process.php",
		method: "POST",
		//dataType:"text",
		dataType:"json",
		data:{request:req}
	} )
	.done(function(msg){
		//$("#debug_text").val( $("#debug_text").val() + '\nSET:' +msg );
		$('#order_detail_'+oid).data("status", msg);
		refresh_orderstatus(oid);
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(textStatus, errorThrown);
	})
	.always(function(){
		//$("#debug_text").val( window.page_ordertime + "...done" );
	})
	;	

}

//-------------------------------單子的顯示設定 START---------------------------------->
$('.viewshare').hide();

$('#order_list').on("click", ".order_title", function(e){	
	$(this).next('.order_detail').toggle();
});

$('#order_list').on("click", ".button_calshare", function(e){
	$(this).parents('.order_title').next('.order_detail').children('.viewsummary').hide();
	$(this).parents('.order_title').next('.order_detail').children('.viewshare').show();
	$(this).removeClass("ui_button");
	$(this).addClass("ui_button_active");
	$(this).parent().children('.button_viewsum').removeClass("ui_button_active");
	$(this).parent().children('.button_viewsum').addClass("ui_button");
	 e.stopImmediatePropagation();
	 return false;
});

$('#order_list').on("click", ".button_viewsum", function(e){	
	$(this).parents('.order_title').next('.order_detail').children('.viewsummary').show();
	$(this).parents('.order_title').next('.order_detail').children('.viewshare').hide();
	$(this).removeClass("ui_button");
	$(this).addClass("ui_button_active");
	$(this).parent().children('.button_calshare').removeClass("ui_button_active");
	$(this).parent().children('.button_calshare').addClass("ui_button");
	 e.stopImmediatePropagation();
	 return false;
});

var order_swipeleft = function(e){
	//alert('test');
	//order_status_down( $(this).attr('order_id'));
	order_status_change($(this).attr('order_id'), 'left');
};
	
var order_swiperight = function(e){
	//alert('test');
//	order_status_up( $(this).attr('order_id'));
	order_status_change($(this).attr('order_id'), 'right');
};
	
$("#order_list").on("swipeleft", ".order_view", order_swipeleft);
$("#order_list").on("swiperight",".order_view",order_swiperight);

$("#debug_get_table").on("click", function(e){
	$("#debug_text").val(  $("#order_list").html() );
});

$('#order_list').on("click", ".button_addtime", function(e){	
	
	oid = $(this).attr('order_id');
	order_detail = "#order_detail_" + oid;
	var req = new Object();
	req["type"] = 'updateOrderEstimate';
	req["addMIN"] = $(this).attr('atime');
	req["oid"] = oid;
	
	var old_order_esttime = $('.order_view[order_id|='+oid+'] > .order_title > .order_estimate_time').data("est_time");
	
	if(typeof old_order_esttime == "undefined"){
		var order_esttime = new Date(Date.now() + $(this).attr('atime')*60000);
		$('.order_view[order_id|='+oid+'] > .order_title > .order_estimate_time').data("est_time", order_esttime);	
	}
	else{
		var order_esttime = new Date(old_order_esttime.getTime() + $(this).attr('atime')*60000);
		$('.order_view[order_id|='+oid+'] > .order_title > .order_estimate_time').data("est_time", order_esttime);	
	}
	
	$.ajax( {
		url:"listorder_process.php",
		method: "POST",
		dataType:"text",
		//dataType:"json",
		data:{request:req}
	} )
	.done(function(msg){
		//if(msg == 'ok')
		alertify.success("成功修改等待時間", "", 1000);
		//alert(msg);
		time_refresh();
		//page_refresh();
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(textStatus, errorThrown);
	})
	.always(function(){
		//$("#debug_text").val( window.page_ordertime + "...done" );
	})
	;	
	
	 e.stopImmediatePropagation();
	 
	 return false;
});


//-------------------------------單子的顯示設定 END---------------------------------->

function orderSummary_block( items_array ){

	var orderSum_start = '\n\
				<td colspan=7 class="viewsummary">                                                                                                                                                                          \n\
					<table>                                                                                                                                                                                                             \n\
	';

	var orderSum_end = '                                                                                                                                                                                                                        \n\
					</table>                                                                                                                                                                                                           \n\
				</td>                                                                                                                                                                                                                       \n\
	';

	// items_array -->  item( name, main_price , RO_array, AI_array, quantity )
	// RO_array [ ro1 , ro2 , .... ]
	// roItem1[name, price]   
	//
	//						    	----- name
	//						    	|									
	//				---- item1 ----------- main_price			------- roItem1 ----------- name
	//				|		    	|					|				|
	//	items_array  --  --- item2  	----- RO_array	-------------------- roItem2			---- price
	//				|		    	|					|				
	//				---  item3  	----- AI_array			------- roItem3		
	//						    	|						
	//						    	----- quantity
	//						 
	//
	//						    	----- 珍珠奶茶
	//						    	|									
	//				---- item1 ----------- 30				------- roItem1 ----------- 少冰
	//				|		    	|					|				|
	//	items_array  --  --- item2  	----- RO_array	--------------					---- 0
	//				|		    	|					|				
	//				---  item3  	----- AI_array			------- roItem2 ----------- 無糖		
	//						    	|									|
	//						    	----- 2								---- 0
	//						 


	// price = main.price + (all RO_array item.price) + (all AI_array item.price)
	//
	//alert(items_array[0].name);
	Items_html = '';
	
	/*
		myArray = new Array("item 1", "item 2", "item 3");
		$.each(myArray, function() {
			this = "Do Something Here";
		});	
	*/
	//$("#debug_text").val("");
	for( var item_i in items_array ){
		item = items_array[item_i];
		RO_html = '';
		allROcost = 0;
		for( var ro_i in item.RO_array ){
			ro = item.RO_array[ro_i];
			RO_html = RO_html + ',' + ro.name;
			allROcost = allROcost + Number(ro.price);
		}
		
		AI_html = '';
		allAIcost = 0;
		for( var ai_i in item.AI_array ){
			ai = item.AI_array[ai_i];
			AI_html = AI_html + ',' + ai.name;
			allAIcost = allAIcost + Number(ai.price);
		}
		itemcost = Number(item.main_price) + Number(allROcost) + Number(allAIcost);
		//$("#debug_text").val( $("#debug_text").val() + "\n" + allROcost );
		
		Items_html =  Items_html + 
			' 					<tr>                                                                                                                                                                                                       \n\
									<td>'+ item.name +'</td><td>'+ RO_html + ' / '+AI_html+'/'+item.comment+' </td><td>'+itemcost+'</td><td>'+item.quantity+'</td>                                  \n\
								</tr>';		
	}
	
		
	return orderSum_start + Items_html + orderSum_end;
}



function orderShare_block( share_array ){		// share total is calculated here

	orderShare_start = 
	'                                                                                                                                                                                                               				\n\
			<td colspan=7 class="viewshare" style="display:none;">                                                                                                                                                                        	\n\
				<table>                                                                                                                                                                                                          	\n\
	';

	//
	//							-----	total			            		----- name
	//							|				            		|				
	//				-----	share1---------  item_array --------  item1--------------- main_price	------- roItem1 ----------- name
	//				|							|            		|                        	|				| 
	//	share_array ------							---- item2		---- RO_array   ------------- roItem2		---- price
	//				|               					            		|                        	|				 
	//				----	share2					     	    		---- AI_array    	------- roItem3		
	//														|
	//														---- quantity
	//
	//
	//							-----	70			            		----- 牛肉漢堡
	//							|				            		|				
	//				-----	share1---------  item_array --------  item1--------------- 50		
	//				|							|            		|                       
	//	share_array ------							---- item2		---- RO_array   	------- aiItem1 ----------- 加蛋
	//				|               					            		|                         	|				| 
	//				----	share2					     	    		---- AI_array     ------------- aiItem2		---- 10 
	//														|                         	|				 
	//														---- quantity      	------- aiItem3		
	
	
	share_html = '';
	for ( share_i in share_array ){
		share = share_array[share_i];
		share_html = share_html + '\n\
				<tr><td>' + share.total + '</td>                                                                                                                                                                                          \n\
					<td>                                                                                                                                                                                                      \n\
					<table>                                                                                                                                                                                                  \n\
		';
	
		Items_html = '';
		share_total = 0;
		for( var item_i in share.items_array ){
			item = share.items_array[item_i];
			RO_html = '';
			allROcost = 0;
			for( var ro_i in item.RO_array ){
				ro = item.RO_array[ro_i];
				RO_html = RO_html + ',' + ro.name;
				allROcost = allROcost + Number(ro.price);
			}
			
			AI_html = '';
			allAIcost = 0;
			for( var ai_i in item.AI_array ){
				ai = item.AI_array[ai_i];
				AI_html = AI_html + ',' + ai.name;
				allAIcost = allAIcost + Number(ai.price);
			}

			itemcost = Number(item.main_price) + Number(allROcost) + Number(allAIcost);
			share_total = Number(share_total) + Number(itemcost) * Number(item.quantity);
			//$("#debug_text").val(share_total);
			Items_html =  Items_html + 
				' 					<tr>                                                                                                                                                                                                       \n\
										<td>'+ item.name +'</td><td>'+ RO_html + ' / '+AI_html+' </td><td>'+itemcost+'</td><td>'+item.quantity+'</td>                                  \n\
									</tr>';		
		}
	
		if(share_total != share.total){
			//alert('Alert #Share total does not match in database, js:'+share_total+',db:'+share.total);
		}
	
		share_html = share_html + Items_html;
		
		share_html = share_html + '\n\
			</table>                                                                                                                                                                                                                \n\
			</td>                                                                                                                                                                                                                     \n\
		</tr>                                                                                                                                                                                                                             \n\
		';
	}
	
	orderShare_end = '\n\
				</table>                                                                                                                                                                                                         \n\
			</td>                                                                                                                                                                                                                     \n\
	';
	
	return orderShare_start + share_html + orderShare_end;
}


function status_getText(status){
	var result = {'status_text': '', 'status_class':''}
	switch( status ){
		case 'WAIT':
			result.status_text = "尚在等候";
			result.status_class = "order_waiting";
		break;
		case 'MAKING':
			result.status_text = "製作中";
			result.status_class = "order_making";
		break;
		case 'DONE':
			result.status_text = "已出餐";
			result.status_class = "order_done";
		break;
		case 'PAID':
			result.status_text = "已付帳";
			result.status_class = "order_paid";
		break;
	}
	return result;
}

var t_unDoFade = 0;
var function_timeoutCtrl = null;

function unDoFade(){
	if(t_unDoFade == 0)
		$('#unDo').fadeOut();
	else{
		$('#unDoCntDwn').html("("+t_unDoFade+")");
		t_unDoFade -= 1;
		function_timeoutCtrl = setTimeout('unDoFade()',1000);
	}
}


function refresh_orderstatus( oid ){
	
	//alert('test');
	var dStatus = $('#order_detail_'+oid).data("status");
	
	//$("#debug_text").val( $("#debug_text").val() + "\nrefresh_orderstatus\nGET:" + dStatus + "\n");
	if(dStatus == "ARCHIVE"){
		$('.order_view[order_id|='+oid+']').fadeOut();
		var clkFunc = new Function("order_status_change("+oid+", 'left');$('#unDo').fadeOut();$('.order_view[order_id|="+oid+"]').fadeIn(); ");		
		
		//$("#debug_text").val( $("#debug_text").val() + '\n' +  clkFunc.toString() + '\n==============\n');
		t_unDoFade = 10;
		$('#unDo').off();
		$('#unDo').on("click", clkFunc);
		$('#unDo').fadeIn();
		$('#unDoText').html("該訂單已被存檔，按此取消 ");
		//alertify.success("訂單已存檔");
		if(function_timeoutCtrl != null)
			clearTimeout(function_timeoutCtrl);
		unDoFade();
	}
	else if(dStatus == "CANCEL"){
		$('.order_view[order_id|='+oid+']').fadeOut();
		var clkFunc = new Function("order_status_change("+oid+", 'right');$('#unDo').fadeOut();$('.order_view[order_id|="+oid+"]').fadeIn(); ");		

		//$("#debug_text").val( $("#debug_text").val() + '\n' +  clkFunc.toString() + '\n==============\n');	
		t_unDoFade = 10;
		$('#unDo').off();
		$('#unDo').on("click", clkFunc);
		$('#unDo').fadeIn();
		$('#unDoText').html("該訂單已被刪除，按此取消");
		//alertify.success("訂單已刪除");
		if(function_timeoutCtrl != null)
			clearTimeout(function_timeoutCtrl);
		unDoFade();
	}
	else {
	
		var r = status_getText($('#order_detail_'+oid).data("status"));	 
		status_text = r.status_text;
		status_class = r.status_class;	
		$('.order_view[order_id|='+oid+'] > .order_title > .order_status').html(status_text);
		$('#order_detail_'+oid).removeClass('order_waiting');
		$('#order_detail_'+oid).removeClass('order_making');
		$('#order_detail_'+oid).removeClass('order_done');
		$('#order_detail_'+oid).removeClass('order_paid');
		
		$('#order_detail_'+oid).addClass(status_class);
	}
}

function order_block( order_info ){
//
//
//		
//
//		order_info ---------- 	o_id     
//						o_time
//						table_num
//						people_num
//						status
//						total		    ---------> calculated from share or summary
//						share_array    -------->  [specified in other graph]
//						summary_array -------> [specified in other graph]
//
//




//var dateFormat = require('dateformat');var a = new Date(UNIX_timestamp * 1000);
/*var order_date = new Date(order_info.o_time * 1000);
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var year = order_date.getFullYear();
var month =  order_date.getMonth() + 1;//months[order_date.getMonth()];
var date = order_date.getDate();
var hour = order_date.getHours();
var min = order_date.getMinutes();
var sec = order_date.getSeconds();
var order_disptime =  month + '/'  + date + ' '  + hour + ':' + min ;
*/
var order_disptime = order_info.o_time;
//<tbody class="order_view" order_id="1">alert('test');

var orderblock_start = '<tbody class="order_view" order_id="'+order_info.o_id+'">                                                                                                                                        \n\
		<tr class="order_title">                                                                                                                                                                                           			\n\
			<th class="order_status"></th>                                                                                                                                                                                            \n\
			<th class="order_time"></th>																								\n\
			<th class="order_estimate_time"></th>																								\n\
			<th>#'+order_info.table_num+'</th>                                                                                                                                                                                    \n\
			<th>'+order_info.people_num+'</th>                                                                                                                                                                                   \n\
			<th>$'+order_info.total+'</th>                                                                                                                                                                                            \n\
			<th>                                                                                                                                                                                                                                 \n\
				<fieldset data-role="controlgroup" data-type="horizontal">                                                                                                                          	                \n\
					<a class="button_viewsum ui_button_active" order_id="'+order_info.o_id+'" >單子總結</a> \n\
					<a class="button_calshare ui_button" order_id="'+order_info.o_id+'" >計算小單價格</a> \n\
				</fieldset>                                                                                                                                                                                                                 \n\
				<fieldset data-role="controlgroup" data-type="horizontal">                                                                                                                          	                \n\
					<a class="button_addtime ui_button" order_id="'+order_info.o_id+'" atime="1" > +1 </a>\n\
					<a class="button_addtime ui_button" order_id="'+order_info.o_id+'" atime="5"  > +5 </a>\n\
					<a class="button_addtime ui_button" order_id="'+order_info.o_id+'" atime="10"> +10 </a> \n\
				</fieldset>                                                                                                                                                                                                                 \n\
			</th>			                                                                                                                                                                                                        \n\
		</tr>                                                                                                                                                                                                                                         \n\
																														                \n\
		<tr id="order_detail_'+order_info.o_id+'" class="order_detail" >                                                                                                      		\n\
';

if( order_info.o_estimate_time == 'NULL' ){
	var order_est_disptime = '---';
}
else{
	t = order_info.o_estimate_time.split(/[- :]/);
	var order_esttime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

	
	var timeDiff = order_esttime.getTime() - Date.now();
	var diffMins = Math.ceil(Math.abs(timeDiff) / (1000 * 60)); 
	if(timeDiff > 0)
		var order_est_disptime = diffMins + '分鐘';//order_info.o_estimate_time;  
	else
		var order_est_disptime = '超過' + diffMins + '分鐘';//order_info.o_estimate_time;  
	
}

$("#order_list_header").after( orderblock_start + orderSummary_block(order_info.summary_array) + orderShare_block(order_info.share_array)+'<tr><td colspan="7" class="separator"></td></tr></tbody>');  // -- 寫入html
var t = order_disptime.split(/[- :]/);
var ordertime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

	$('.order_view[order_id|='+order_info.o_id+'] > .order_title > .order_estimate_time').data("est_time", order_esttime);		//將估計完成時間寫入
//	alertify.log(order_esttime);
//	alertify.log( $('.order_view[order_id|='+order_info.o_id+'] > .order_title > .order_estimate_time').data("est_time") );


	$('.order_view[order_id|='+order_info.o_id+'] > .order_title > .order_time').data("time", ordertime);		//將點單時間寫入，未來可能用上
	$('.order_view[order_id|='+order_info.o_id+'] > .order_title > .order_time').html( order_disptime ); 		//顯示時間
	$('#order_detail_'+order_info.o_id).data("status",  order_info.status);						//將資料庫的status寫入order中
	$('.order_view[order_id|='+order_info.o_id+'] > .order_title > .order_estimate_time').html( order_est_disptime ); 		//顯示預計時間
	
//var r = status_getText(order_info.status);
//status_text = r.status_text;
//status_class = r.status_class;
	
	refresh_orderstatus(order_info.o_id);
}



window.page_ordertime = '1900-01-01 00:00:00';

function refresh_order(  ){
	
	var req = new Object();
	req["type"] = 'refresh';
	req["time"] = window.page_ordertime;
	
	
	$.ajax( {
		url:"listorder_process.php",
		method: "POST",
		//dataType:"text",
		dataType:"json",
		data:{request:req}
	} )
	.done(function(msg){
		if( msg.length ){
			window.page_ordertime = msg[msg.length-1]['o_time'];
			//$("#debug_text").val(msg[0]['share_array'][0]['items_array'][0]['name']);
			$("#debug_text").val(  $("#debug_text").val( )+ msg[msg.length-1]['o_time'] + '\n');
			//alert( msg[0]['o_id'] );

			//var t =msg[0]['o_time'].split(/[- :]/);

			// Apply each element to the Date function
			//var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
			
			
			
			// Generate block!
			for( i = 0 ; i < msg.length ; i++){
				order_block(msg[i]);				
			}
			
			$('#order_list').enhanceWithin();
		}
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(textStatus, errorThrown);
		//$("#debug_text").val(textStatus); //alert(textStatus);
	})
	.always(function(){
		//$("#debug_text").val( window.page_ordertime + "...done" );
	})
	;
	
	
}
//refresh_order();
refresh_order();
setInterval( refresh_order, 3000);

 function page_refresh()   // 為了Demo 暫時使用全頁刷新
 {
      window.location.reload();
 }
 //setTimeout('page_refresh()',10000); 

 function time_refresh()
 {
	 $('.order_view > .order_title > .order_estimate_time').each(function(index){
		 
		//alertify.log($(this).data("est_time"));
		var order_esttime = $(this).data("est_time"); 
		if(typeof order_esttime != "undefined"){
			var timeDiff = order_esttime.getTime() - Date.now();
			var diffMins = Math.ceil(Math.abs(timeDiff) / (1000 * 60)); 
			if(timeDiff > 0)
				var order_est_disptime = diffMins + '分鐘';//order_info.o_estimate_time;  
			else
				var order_est_disptime = '超過' + diffMins + '分鐘';//order_info.o_estimate_time;  
			//alert(order_est_disptime);
			$(this).html( order_est_disptime ); 		//顯示時間
		}
	 });  
	 
 }


setInterval('time_refresh()',10000);
