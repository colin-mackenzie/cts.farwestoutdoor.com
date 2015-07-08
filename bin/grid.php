<?
include "db.php";
$adcentral = file_get_contents("https://adcentral-staging.ivrnet.com/api/v1/bricks?channel_id=80159af0-0ebd-41f9-9a49-bf86337b26d5");

	
$adcentral_array=json_decode($adcentral,true);



$grid_array=array();

foreach($adcentral_array as $key => $value) {
	$sql="select cost from grid WHERE id='".$value['id']."'";


	$result=mysql_query($sql) or die(mysql_error());

	$row=mysql_fetch_assoc($result)  or die(mysql_error());

	
	  
	$value['cost']=$row['cost'];
	$grid_array[$key]=$value;



}

echo json_encode($grid_array);



?>