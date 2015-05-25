var infoWindow = null

function RemoveBrick(obj){
	$(obj).closest('tr').remove();
	var bid=$(obj).closest('tr').attr("id");
	var cartlength = $("#cartLength").val();
	cartlength--;
	$("#cartLength").val(cartlength);
    $(".badge").html(cartlength);
	if(	!cartlength)  $("#Checkout").attr("disabled",true);
	var bids = $("#brickids").val();
	var bidsArray = bids.split("-"); 
	var index = bidsArray.indexOf(realid);
	if (index > -1) {
   		 bidsArray.splice(index, 1);
		 var bidsstring =bidsArray.join("-");
		 $("#brickids").val(bidsstring);
		 
	}
}

function AddtoCampaignList(bid,avail,tc){

	if($("#CampaignBody tbody tr").find("#" + bid).length>0	){
		$("#addAlert").html("Brick : "+bid+" is already in your Campaign List");
			$("#addAlert").fadeIn(3);
			$("#addAlert").fadeOut(6000);
	} else {

		$("#Checkout").attr("disabled",false);
		$("li #addAlert").html("Brick : "+bid+" was added to your Campaign List");
		$("#addAlert").fadeIn(3);
		$("#addAlert").fadeOut(6000);
		var cartlength = $("#cartLength").val();
		cartlength++;
		$("#cartLength").val(cartlength);
		$(".badge").html(cartlength);
		data="<tr id='"+bid+"'><td><button onClick=\"RemoveBrick(this)\"  type=\"button\" class=\"btn btn-danger  btn-sm\" id=\""+bid+"\" title=\"Remove\">Remove</i></button></td><td>"+bid+"</td><td>" +tc+"</td><td>TBA</td><td>"+avail+ "</td></tr>";
		$("#campaignModal .modal-body #CampaignBody tbody").append(data);
		if (!$("#brickids").val()){
			 $("#brickids").val(bid);
		} else {
			 $("#brickids").val($("#brickids").val() + "-" + bid);

		}
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
			var sc='#fad201'	
			var status='Under Construction';
			var icon="yellow";	
			var avail="TBA";
			var no=0;
		}else if(data[i].cost>0.5){
			var sc='#27e833';
			var status='Avialable';
			var icon="green";
			var avail="Immediate";
			var no=1;

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
		// content= content+"<div class='row' style='width:300px;height:230;overflow:hidden'>";
		// content= content+"<span style='font-size:12px;'><span style='color:"+sc+";'>&nbsp;</span>"+status+"<br>";
		// content= content+"<span style='font-size:12px;'>Brick Code:&nbsp;<span style='color:red;'>"+data[i].code2+"</span>&nbsp;&nbsp;<br>";
		// content= content+"<span style='font-size:12px;'>28 day:&nbsp;<span style='color:red;'>"+data[i].hit_count_last_period+"</span>&nbsp;&nbsp;<br>";
		// content= content+"<span style='font-size:12px;'>84 day:&nbsp;<span style='color:red;'>"+data[i].hit_count_last_three_periods+"</span>&nbsp;&nbsp;<br><br>";
		// content= content+"<button type='button' class='btn btn-default save' id='savebutton' code='"+data[i].id+"' onClick=\"savePrice('"+data[i].code2+"','"+data[i].id+"')\">Save</button>";
		// content= content+"&nbsp;&nbsp;<span style='font-size:12px;' style='color:red;' id='error'></span></div></div>";
		

		/*if(!j[i].statusCheck) buttons="<button type='button' class='btn btn-default'>Request Now</button>&nbsp;<button type='button' class='btn btn-default'>Add to Request List</button>";
						else buttons="<button type='button' class='btn btn-default'>Add to Request List</button>";*/

		if(no) buttons="<button type='button' class='btn btn-default' onClick='AddtoCampaignList("+data[i].code2+",\""+avail+"\","+data[i].hit_count_last_period+")' id='AddCampaign'>Add to Campaign</button>&nbsp;<button type='button' class='btn btn-default' data-toggle='modal' class='closeInfoWindow' data-bid='"+data[i].code2+"' data-target='#checkoutModel'>Request Now</button>";
		else buttons="";
		content="<div class='container' style='width:300px;height:225px;overflow:hidden'><div class='row' style='width:300px;height:275;overflow:hidden'><h3><img  src='i/"+icon+".png'>&nbsp;"+status+"</h3><span style='font-size:12px;'>Brick ID:&nbsp;<span style='color:red;'>"+data[i].code2+"</span>&nbsp;&nbsp;<i>"+status+"</i><br><br>28 day traffic counts: <span style='color:red;'>"+data[i].hit_count_last_period+"</span><br>Guaranteed Traffic Price Point: <span style='color:red;'>TBA</span>&nbsp;<br>Avialable:<span style='color:red;'>"+avail+"</span></span><br><br>"+buttons+"</div></div>";
		createClickablePoly(rectangle, content, map);
		var mapLabel = new MapLabel({
          text: data[i].cost,
          position: rectangle.bounds.getCenter(),
          map: map,
          fontSize: 10,
          align: 'center'
        });
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
  $("#addAlert").hide();
  $("#campaignModal .modal-body #CampaignBody tbody").html("");
  $("#cartLength").val("");

  $(".closeInfoWindow").click(function(){
  		$("#brickids").val($(".closeInfoWindow").data("bid"));
  })

$('#checkoutModel').on('show.bs.modal', function (event) {


		console.log($("#brickids").val());
		
  		  	if (typeof infoWindow != "undefined") {
			if (infoWindow) {
				infoWindow.close();
			}
		}

		$('#myTab a[href="#home"]').tab('show')

  })


$('.next-btn').click(function(){
		$('.nav-tabs > .active').next('li').find('a').trigger('click');
});

$(".exec-btn").click(function (e) {




			 $("#cartLength").val("");

			 $(".badge").html("0");



			$("#brickids").val("");
			$('#myTab a[href="#home"]').tab('show')

			$("#confirmModal").modal('show');



});


 $('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

 $('#myTab a[href="#home"]').tab('show')

});
