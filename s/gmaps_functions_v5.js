var infoWindow = null
function savePrice(code, id){
	if($("#"+code).val()){
		$.post('bin/set_price.php','price='+$("#"+code).val()+'&id='+id,
			 function(data, status, xhr){
			   $('#error').html('Price Saved');	
			   location.reload();
			 });  
	} else {
		$('#error').html('Please enter a price');	
	}
}
function initialize() {
    var rectangle = null,
    bounds, map,
    mapOptions = {
      center: new google.maps.LatLng(51.04,-114.057222),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      zoom: 11
    };
  map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

  $.getJSON( "bin/grid_db.php", function( data ) {
	for (var i = 0;  i < data.length;  i++) {
		var ne_lat = data[i].ne_latitude,
		  ne_lng = data[i].ne_longitude,
		  sw_lat = data[i].sw_latitude,
		  sw_lng = data[i].sw_longitude,
		bounds = new google.maps.LatLngBounds(
		  new google.maps.LatLng(sw_lat, sw_lng),
		  new google.maps.LatLng(ne_lat, ne_lng)
		);
		var sc='#000000';
		if(data[i].cost<=0.5){
			var sc='#FFFF00'		
		}else if(data[i].cost>0.5){
			var sc='#00CC00'
		}
			
		rectangle = new google.maps.Rectangle({
	      strokeColor: sc,
		  strokeOpacity: 0.8,
		  strokeWeight: 2,
		  fillColor: sc,
		  fillOpacity: 0.35,
		  bounds: bounds,
		  editable: false,
		  draggable: false
		});
		rectangle.setMap(map);
		infoWindow = new google.maps.InfoWindow();
		content="<div class='container' style='width:300px;height:400px;overflow:hidden'>";
		content= content+"<div class='row' style='width:300px;height:230;overflow:hidden'>";
		content= content+"<span style='font-size:12px;'>Label:&nbsp;<span style='color:red;'>&nbsp;</span>&nbsp;&nbsp;<br>";
		content= content+"<span style='font-size:12px;'>Brick Code:&nbsp;<span style='color:red;'>"+data[i].code2+"</span>&nbsp;&nbsp;<br>";
		content= content+"<span style='font-size:12px;'>28 day:&nbsp;<span style='color:red;'>"+data[i].hit_count_last_period+"</span>&nbsp;&nbsp;<br>";
		content= content+"<span style='font-size:12px;'>84 day:&nbsp;<span style='color:red;'>"+data[i].hit_count_last_three_periods+"</span>&nbsp;&nbsp;<br><br>";
		content= content+"<span style='font-size:12px;'>Price:&nbsp;&nbsp;<span style='color:red;'><textarea id='"+data[i].code2+"' rows='10'  name='cost'>"+data[i].cost+"</textarea></span>&nbsp;&nbsp;<br><br>";
		content= content+"<button type='button' class='btn btn-default save' id='savebutton' code='"+data[i].id+"' onClick=\"savePrice('"+data[i].code2+"','"+data[i].id+"')\">Save</button>";
		content= content+"&nbsp;&nbsp;<span style='font-size:12px;' style='color:red;' id='error'></span></div></div>";
		createClickablePoly(rectangle, content, map);
	}

  });
}

function createClickablePoly(poly, html, map) {
  var contentString = html;
  infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(poly, 'click', function(event) {
	  	if (typeof infoWindow != "undefined") {
			if (infoWindow) {
				infoWindow.close();
			}
		}
		infoWindow.setContent(contentString);
		infoWindow.setPosition(event.latLng);
		infoWindow.open(map);
  });
}
$(document).ready(function() {
  initialize();

});
