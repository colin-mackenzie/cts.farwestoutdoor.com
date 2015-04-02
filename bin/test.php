<?
header('Content-Type: text/html');
set_time_limit(111111111111110);
mysql_connect("internal-db.s154977.gridserver.com", "db154977_global", "Cmac185130") or die(mysql_error());
mysql_select_db("db154977_fw") or die ("Could not connect to the Database fw\n\n");


//mysql_query("truncate grid") or die(mysql_error());

$bricks = file_get_contents("https://adcentral-staging.ivrnet.com/api/v1/bricks?channel_id=80159af0-0ebd-41f9-9a49-bf86337b26d5");
//$bricks = file_get_contents("https://adcentral-staging.ivrnet.com/api/v1/bricks/40224db4-59ca-4f79-bef7-09bda662e781");
$bricks_array = json_decode($bricks);

/*
echo "<pre>";
print_r($bricks_array);
echo "</pre>";
*/

for($c=0;$c<50; $c++){
	if($bricks_array[$c]){
	$brick_detail = file_get_contents("https://adcentral-staging.ivrnet.com/api/v1/bricks/".$bricks_array[$c]->id);
	$brick_detail_array = json_decode($brick_detail);
	echo $brick_detail_array->brick_id."<br>";
	echo $brick_detail_array->avg_hits_per_month."<br>";
	echo $brick_detail_array->current_month_hits."<br>";
	
	}
}

?>