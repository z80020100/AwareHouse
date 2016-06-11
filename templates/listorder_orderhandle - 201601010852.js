
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


function order_status_down(id){
	order_detail = "#order_detail_" + id;
	if( $(order_detail).hasClass("order_done")){
		$(order_detail).removeClass("order_done");
		$(order_detail).addClass("order_making");		
	}
	else if( $(order_detail).hasClass("order_making") ){
		$(order_detail).removeClass("order_making");
		$(order_detail).addClass("order_waiting");			
	}
	else if($(order_detail).hasClass("order_waiting")){
		
	}
	else{
		alert('error occured');
	}
}

function order_status_up(id){
	order_detail = "#order_detail_" + id;
	if( $(order_detail).hasClass("order_waiting")){
		$(order_detail).removeClass("order_waiting");
		$(order_detail).addClass("order_making");		
	}
	else if( $(order_detail).hasClass("order_making") ){
		$(order_detail).removeClass("order_making");
		$(order_detail).addClass("order_done");			
	}
	else if($(order_detail).hasClass("order_done")){
		
	}
	else{
		alert('error occured');
	}
}


//-------------------------------單子的顯示設定 START---------------------------------->
$('.viewshare').hide();



/*
// Legacy : not able to handle dynamic generated tags

$('.order_title').on("click", function(e){	
	$(this).next('.order_detail').toggle();
});

$('.button_calshare').on( "click", function(e){
	
	$(this).parents('.order_title').next('.order_detail').children('.viewsummary').hide();
	$(this).parents('.order_title').next('.order_detail').children('.viewshare').show();
	$(this).addClass("ui-btn-active");hg
	 $(this).parent().children('.button_viewsum').removeClass("ui-btn-active");
	 e.stopImmediatePropagation();
	 return false;
});

$('.button_viewsum').on( "click", function(e){
	$(this).parents('.order_title').next('.order_detail').children('.viewsummary').show();
	$(this).parents('.order_title').next('.order_detail').children('.viewshare').hide();
	$(this).addClass("ui-btn-active");
	$(this).parent().children('.button_calshare').removeClass("ui-btn-active");
	 e.stopImmediatePropagation();
	 return false;
});

$(".order_detail").on("swipeleft", order_swipeleft);
$(".order_title").on("swipeleft", order_swipeleft);
$(".order_detail").on("swiperight",order_swiperight);
$(".order_title").on("swiperight",order_swiperight);

*/

$('#order_list').on("click", ".order_title", function(e){	
	$(this).next('.order_detail').toggle();
});

$('#order_list').on("click", ".button_calshare", function(e){
	$(this).parents('.order_title').next('.order_detail').children('.viewsummary').hide();
	$(this).parents('.order_title').next('.order_detail').children('.viewshare').show();
	$(this).addClass("ui-btn-active");
	 $(this).parent().children('.button_viewsum').removeClass("ui-btn-active");
	 e.stopImmediatePropagation();
	 return false;
});

$('#order_list').on("click", ".button_viewsum", function(e){	
	$(this).parents('.order_title').next('.order_detail').children('.viewsummary').show();
	$(this).parents('.order_title').next('.order_detail').children('.viewshare').hide();
	$(this).addClass("ui-btn-active");
	$(this).parent().children('.button_calshare').removeClass("ui-btn-active");
	 e.stopImmediatePropagation();
	 return false;
});

//$('#order_list').


var order_swipeleft = function(e){
	//alert('test');
	order_status_down( $(this).attr('order_id'));
};
	
var order_swiperight = function(e){
	//alert('test');
	order_status_up( $(this).attr('order_id'));
};
	
//$('#order_list').on("swipeleft", ".order_detail" , order_swipeleft);
//$("#order_list").on("swipeleft", ".order_title", order_swipeleft);
//$("#order_list").on("swiperight",".order_detail",order_swiperight);
//$("#order_list").on("swiperight",".order_title",order_swiperight);

$("#order_list").on("swipeleft", ".order_view", order_swipeleft);
$("#order_list").on("swiperight",".order_view",order_swiperight);

$("#debug_get_table").on("click", function(e){
	$("#debug_text").val(  $("#order_list").html() );

});

//-------------------------------單子的顯示設定 END---------------------------------->





function orderSummary_block( items_array ){

	var orderSum_start = '\n\
				<td colspan=6 class="viewsummary">                                                                                                                                                                          \n\
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
									<td>'+ item.name +'</td><td>'+ RO_html + ' / '+AI_html+' </td><td>'+itemcost+'</td><td>'+item.quantity+'</td>                                  \n\
								</tr>';		
	}
	
		
	return orderSum_start + Items_html + orderSum_end;
}



function orderShare_block( share_array ){		// share total is calculated here

	orderShare_start = 
	'                                                                                                                                                                                                               				\n\
			<td colspan=6 class="viewshare" style="display:none;">                                                                                                                                                                        	\n\
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

status_text = '';
status_class = '';
switch( order_info.status ){
	case 'WAIT':
		status_text = "尚在等候";
		status_class = "order_waiting";
	break;
	case 'MAKING':
		status_text = "製作中";
		status_class = "order_making";
	break;
	case 'DONE':
		status_text = "已出餐";
		status_class = "order_done";
	break;
	case 'PAID':
		status_text = "已付帳";
		status_class = "order_paid";
	break;
}

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
//<tbody class="order_view" order_id="1">
var orderblock_start = '<tbody class="order_view" order_id="'+order_info.o_id+'">                                                                                                                                                                                                                               \n\
		<tr class="order_title">                                                                                                                                                                                           			\n\
			<th>'+status_text+'</th>                                                                                                                                                                                            		\n\
			<th>'+order_disptime+'</th>																								\n\
			<th>#'+order_info.table_num+'</th>                                                                                                                                                                                    \n\
			<th>'+order_info.people_num+'</th>                                                                                                                                                                                   \n\
			<th>$'+order_info.total+'</th>                                                                                                                                                                                            \n\
			<th>                                                                                                                                                                                                                                 \n\
				<fieldset data-role="controlgroup" data-type="horizontal">                                                                                                                          	                \n\
					<a href="#" data-role="button" data-transition="fade" class="button_viewsum ui-btn-active" order_id="'+order_info.o_id+'"  data-mini="true">單子總結</a>               \n\
					<a href="#" data-role="button" data-transition="fade" class="button_calshare"  data-mini="true" >計算小單價格</a>                                                   	                \n\
				</fieldset>                                                                                                                                                                                                                 \n\
			</th>			                                                                                                                                                                                                        \n\
		</tr>                                                                                                                                                                                                                                         \n\
																														                \n\
		<tr id="order_detail_'+order_info.o_id+'" class="order_detail '+status_class+' " >                                                                                                      		\n\
';

return orderblock_start + orderSummary_block(order_info.summary_array) + orderShare_block(order_info.share_array)+'</tbody>';
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
			window.page_ordertime = msg[0]['o_time'];
			//$("#debug_text").val(msg[0]['share_array'][0]['items_array'][0]['name']);
			$("#debug_text").val(msg[0]['o_time']);
			//alert( msg[0]['o_id'] );
			
			// Generate block!
			for( i = 0 ; i < msg.length ; i++){
				$("#order_list_header").after(order_block(msg[i]));				
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



// ------------------------------ Test Data -----------
 var test_order_info = {
	o_id : 3,
	o_time :  1450750967,
	table_num : 15,
	people_num : 3,
	status : 'MAKING',
	share_array : [
		{
			total:100,
			items_array:[
				{name:"牛肉漢堡",main_price:50, RO_array:[], AI_array:[{name:"加蛋", price:10},{name:"加肉片", price:20}],quantity:1 },
				{name:"豆漿",main_price:10, RO_array:[{name:"無糖", price:0},{name:"去冰", price:0}], AI_array:[],quantity:2   }
			]
		}
	],
	summary_array : [
		{name:"牛肉漢堡",main_price:50, RO_array:[], AI_array:[{name:"加蛋", price:10},{name:"加肉片", price:20}],quantity:1   },
		{name:"豆漿",main_price:10, RO_array:[{name:"無糖", price:0},{name:"去冰", price:0}], AI_array:[],quantity:2   }
	],
	total : 100
};

//$("#order_list_header").after(order_block(test_order_info));
//$("#debug_text").val(order_block(test_order_info));




