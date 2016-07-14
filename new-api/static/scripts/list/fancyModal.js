/**
 *
 *
 *	Fancy Modal v0.1
 *
 * 	By Luca Demian
 *  https://github.com/lucadem1313
 *
 */



// Example:
//
// 		fancyModal({
// 		 		id:"myModal",
// 		 		color:"blue",
// 		 		content:"<h1>Hello there!</h1>"
// 		});
//
//
// 		This will display a modal with a header, text color blue, with the id "myModal"



// closes all modal boxes
function closeFancyModals(){
		$(".full-modal").removeClass("active");
}

// displays fancy modal
function fancyModal(passedValues = {})
{
	closeFancyModals();
	if($(".full-modal").length < 1)
		$("body").append('<div class="full-modal">\
	<div class="modal-dim"></div>\
	<div class="modal animation-popup">\
		<div class="close-modal"></div>\
		<div class="modal-content"></div>\
	</div>\
</div>');

	defaults = {id:"modal", timeout:null, content:"hi", width:"80", height:"80", unitWidth:"vw", unitHeight:"vh", color:"#000", background:"", timeout:false, animationStyle:"popup", font:"20px Roboto, sans-serif", fontFamily:"Roboto", fontAlign:"center", dark:false};
	properties = passedValues;

	if(properties.id == undefined)
		properties.id = defaults.id;

	if(properties.content == undefined)
		properties.content = defaults.content;

	if(properties.color == undefined)
		properties.color = defaults.color;

	if(properties.background == undefined)
		properties.background = defaults.background;

	if(properties.timeout == undefined)
		properties.timeout = defaults.timeout;

	if(properties.animationStyle == undefined)
		properties.animationStyle = defaults.animationStyle;

	if(properties.font == undefined)
		properties.font = defaults.font;

	if(properties.fontFamily == undefined)
		properties.fontFamily = defaults.fontFamily;

	if(properties.fontAlign == undefined)
		properties.fontAlign = defaults.fontAlign;

	if(properties.dark == undefined)
	properties.dark = defaults.dark;

	if(properties.width == undefined)
		properties.width = defaults.width;

	if(properties.height == undefined)
		properties.height = defaults.height;

	if(properties.unitWidth == undefined)
		properties.unitWidth = defaults.unitWidth;

	if(properties.unitHeight == undefined)
		properties.unitHeight = defaults.unitHeight;

	if(properties.timeout == undefined)
		properties.timeout = defaults.timeout;

	if(properties.dark)
		$(".modal").addClass("dark");
	else
		$(".modal").removeClass("dark");

	$(".modal")
		.attr("id", "#"+properties.id)
		.removeClass("animation-fade")
		.removeClass("animation-popup")
		.removeClass("animation-slideLeft")
		.removeClass("animation-slideRight")
		.removeClass("animation-slideUp")
		.removeClass("animation-slideDown")
		.addClass("animation-"+properties.animationStyle)
		.css({
			"color":properties.color,
			"font":properties.font,
			"font-family":properties.fontFamily,
			"text-align":properties.fontAlign,
			"height":properties.height + properties.unitHeight,
			"width":properties.width + properties.unitWidth
		});
	if(properties.background != "")
		$(".modal").css("background", properties.background);

	$(".modal-content").html(properties.content);
	$(".full-modal").addClass("active");

	if(properties.timeout)
	{
		window.setTimeout(function(){
			closeFancyModals();
		}, properties.timeout);
	}


	$("body").on("click", ".close-modal", function(){
		closeFancyModals();
	});
	$("body").click(function(){
		if($(".modal:hover").length === 0 && $(".full-modal:hover").length > 0)
			closeFancyModals();
	});
}
