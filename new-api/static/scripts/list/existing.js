
function saveTask(element){
	title = element.find(".item-title .text-input").val();
	text = element.find(".item-text .text-input").val();
	done = element.hasClass("done");
	number = $(".list-item").index(element) + 1;

	if(element.hasClass("important")) priority = "important";
	else if(element.hasClass("moderate")) priority = "moderate";
	else priority = "normal";

	taskId = element.attr("data-id");

	$.ajax({
 		type: "POST",
 		url: "/api/v1/"+listId+"/tasks/"+taskId+"/",
 		data: {
			title:title,
			text:text,
			done:done,
			number:number,
			priority:priority
		},
 		success: function(response){
      console.log(response);
		}
	});
}

$.get("/api/v1/list/" + listId, function(response){
	listInfo = response.info;
	createList(listInfo);
	updateItemPlugins();
});

$("body").on("change", ".item-title, .item-text", function(){
	element = $(this).parents(".list-item");
	saveTask(element);
});

$("body").on("click", ".select-normal", function(){
	element = $(this).parents(".list-item");
	element.removeClass("normal").removeClass("moderate").removeClass("important");
	element.addClass("normal");
	updateItemPlugins();
	saveTask(element);
});
$("body").on("click", ".select-moderate", function(){
	element = $(this).parents(".list-item");
	element.removeClass("normal").removeClass("moderate").removeClass("important");
	element.addClass("moderate");
	updateItemPlugins();
	saveTask(element);
});
$("body").on("click", ".select-important", function(){
	element = $(this).parents(".list-item");
	element.removeClass("normal").removeClass("moderate").removeClass("important");
	element.addClass("important");
	updateItemPlugins();
	saveTask(element);
});




$("body").on("click", ".checkbox", function(){
	$(this).toggleClass("checked");
	$(this).parents(".list-item").toggleClass("done");
	$(this).parents(".list-item").hasClass("done") ? $(this).parents(".list-item").find(".text-input").attr("readonly", "true") : $(this).parents(".list-item").find(".text-input").removeAttr("readonly");
	updateItemPlugins();

	element = $(this).parents(".list-item");
	saveTask(element);
});
$("body").on("click", ".actions-remove", function(){
	element = $(this).parents(".list-item");
	element.slideUp(200, function(){
		element.remove();
		updateItemPlugins();
	});

	taskId = element.attr("data-id");

	$.ajax({
		type: "DELETE",
		url: "/api/v1/"+listId+"/tasks/"+taskId+"/",
		data: {},
		success: function(response){
			console.log(response);
		}
	});
});



$("body").on("change", "#list-title input", function(){
	element = $(this).parents(".list-item");

	taskId = element.attr("data-id");

	$.ajax({
		type: "POST",
		url: "/api/v1/"+listId+"/tasks/"+taskId+"/",
		data: {
			title:element.find("#list-title input").val()
		},
		success: function(response){
			console.log(response);
		}
	});
});

$("#delete-all").click(function(){
	if(confirm("Are you sure? There is no going back!"))
	{
		$("#list ul").slideUp(500, function(){
			$("#list ul").empty();
			$("#list ul").slideDown(0);
			updateItemPlugins();
		});

		$.ajax({
			type: "DELETE",
			url: "/api/v1/"+listId+"/tasks/",
			data: {},
			success: function(response){
				console.log(response);
			}
		});
	}
});



$("#new-item").click(function(){
	$.ajax({
		type: "POST",
		url: "/api/v1/"+listId+"/tasks/0/",
		data: {
			title:"Item Title",
			text:"Something to do...",
			done:false,
			number:$(".list-item").length + 1,
			priority:"normal"
		},
		success: function(response){
			$("#list ul").append('<li class="list-item normal" data-id="'+response.payload.id+'">\
					<div class="item-dots"></div>\
					<div class="item-done"><div class="checkbox" title="Toggle Completeness"></div></div>\
					<div class="item-title"><input type="text" class="text-input" value="Item Title" maxlength="100"></div>\
					<div class="item-text"><input type="text" class="text-input" value="Something to do..."></div>\
					<div class="item-actions">\
					<div title="Change Importance" class="actions-importance"><img src="/static/images/menulines.png" alt="Change Importance"></div><div title="Remove Item" class="actions-remove"><img src="/static/images/trashbin.png" alt="Delete"></div>\
					</div>\
					<div class="importance-select">\
						<div class="select-normal">Normal</div>\
						<div class="select-moderate">Moderate</div>\
						<div class="select-important">Important</div>\
					</div>\
				</li>');
		}
	});

	updateItemPlugins();
});
