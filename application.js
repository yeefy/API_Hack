// JavaScript Document

//var clientID = "a2755c30cab54e28a1d31896eee5333f";
//var code = "dd8ef8eb6d104f99b1716fb145de508c";

var tag = "";
var nextTag = "";


function getInstagram () {

	var accessToken = "285306793.a2755c3.6da79bffc3fa4a8b88eb3ee051058f4e";
	var instagramAPI = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + accessToken + "&callback=?&count=18";
	
	
		$.ajax({
			dataType:"jsonp",
			url:instagramAPI,
			success: function(photo){
				if (photo.data.length>0){
					for (i=0; i<=photo.data.length; i++){
						var photoImage = photo.data[i].images.low_resolution.url;
						var photoCaption = photo.data[i].caption.text;
						var photoLink = photo.data[i].link;
						var photoContent = "<a href= " + photoLink + "  target='_blank'><img src= " + photoImage + " /><span class = overlay><span class = overlayInner><h3>" + photoCaption + "<h3/><span/><span/><a/>"
						$(".images").append(photoContent).hide().fadeIn(600);
						$(".viewmore").attr("hidden", false).hide().fadeIn(700);
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
					for (i=0; i<=photo.data.length; i++){
						var photoImage = photo.data[i].images.low_resolution.url;
						var photoCaption = photo.data[i].caption.text;
						var photoLink = photo.data[i].link;
						var photoContent = "<a href= " + photoLink + "  target='_blank'><img src= " + photoImage + " /><span class = overlay><span class = overlayInner><h3>" + photoCaption + "<h3/><span/><span/><a/>"
						$(".images").append(photoContent).hide().fadeIn(600);
						$(".viewmore").attr("hidden", false).hide().fadeIn(700);
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
	
	function submit() {
		$(".images").empty();
		tag = document.getElementById("input").value;
		getInstagram(tag);
	};
	
	$(".viewmore").click(function(e) {
        pagination();
    });
	
});




	

