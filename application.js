// JavaScript Document

var tag = "siblingday"
var clientID = "a2755c30cab54e28a1d31896eee5333f";
var code = "dd8ef8eb6d104f99b1716fb145de508c";
var accessToken = "285306793.a2755c3.6da79bffc3fa4a8b88eb3ee051058f4e";
var instagramAPI = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + accessToken + "";


	function getInstagram () {
		$.ajax({
			dataType:"jsonp",
			url:instagramAPI,
			success: function(photo){
				if (photo.data.length>0){
					for (i=0; i>photo.data.length; i++){
						var photoImage = photo.data[i].images.standard_resolution.url;
						var photoContent = "<img src=" + photoImage + "/>"
						$(".images").append(photoContent);
					}
				}
			}
		})
	}


$(document).ready(function(e) {
	
	getInstagram();

});
