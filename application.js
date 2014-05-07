// JavaScript Document

//var clientID = "a2755c30cab54e28a1d31896eee5333f";
//var code = "dd8ef8eb6d104f99b1716fb145de508c";

var tag = "";
var nextTag = "";

function validation (){
	if (tag===""||tag===" "||tag==="   "){
		alert("enter a tag")
	}
}

function getInstagram () {

	var accessToken = "285306793.a2755c3.6da79bffc3fa4a8b88eb3ee051058f4e";
	var instagramAPI = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + accessToken + "&callback=?&count=18";
	
	
		$.ajax({
			dataType:"jsonp",
			url:instagramAPI,
			success: function(photo){
				if (photo.data.length>0){
					var imgDiv = $(".images");
					imgDiv.hide();
					var viewMore = $(".viewmore");
					for (i=0; i<=photo.data.length; i++){
						var photoImage = photo.data[i].images.low_resolution.url;
						var photoCaption = photo.data[i].caption.text;
						var photoLink = photo.data[i].link;
						var photoContent = "<a href= " + photoLink + "  target='_blank'><img src= " + photoImage + " /><span class = overlay><span class = overlayInner><h3>" + photoCaption + "<h3/><span/><span/><a/>"
						imgDiv.append(photoContent).fadeIn(600);
						$(".viewmore").attr("hidden", false);
						nextTag = photo.pagination.next_max_tag_id;
					}
					
				}				
			}
		})
	}

function pagination () {
	var accessToken = "285306793.a2755c3.6da79bffc3fa4a8b88eb3ee051058f4e";
	var instagramAPI = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + accessToken + "&callback=?&count=18";
	var morePhotos = instagramAPI + " &max_tag_id=" + nextTag;
	
	
	$.ajax({
			dataType:"jsonp",
			url: morePhotos,
			success: function(photo){
				if (photo.data.length>0){
					var imgDiv = $(".images");
					var viewMore = $(".viewmore");
					for (i=0; i<=photo.data.length; i++){
						var photoImage = photo.data[i].images.low_resolution.url;
						var photoCaption = photo.data[i].caption.text;
						var photoLink = photo.data[i].link;
						var moreContent = "<a href= " + photoLink + "  target='_blank'><img src= " + photoImage + " /><span class = overlay><span class = overlayInner><h3>" + photoCaption + "<h3/><span/><span/><a/>"
						imgDiv.append(moreContent).fadeIn(600);
						nextTag = photo.pagination.next_max_tag_id;
					}
				}				
			}
		})
}

$(document).ready(function(e) {	
	
	$("#input").focus();
	
	$("#input").keypress(function(e) {
	   if (e.keyCode==13){
			submit();
		}
    });
	
	$("#button").click(function(e) {
        submit();
    });
	

	function submit() {
		$(".images").empty();
		tag = document.getElementById("input").value.replace(/[_\W]+/g, "");
		validation(tag);
		getInstagram(tag);
	};
	
	$(".viewmore").click(function(e) {
		e.preventDefault();
        pagination();
    });
	
	//shake animation
	
	function shake(){
		$("#input").addClass("shake animated").delay(1000).queue(function(nextTag){
			$(this).removeClass("shake animated");
		});
	}
	
});




	

