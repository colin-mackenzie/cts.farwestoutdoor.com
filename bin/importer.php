<?
header('Content-Type: text/html');
set_time_limit(111111111111110);
include "db.php";


//mysql_query("truncate grid") or die(mysql_error());

$bricks = file_get_contents("https://adcentral-staging.ivrnet.com/api/v1/bricks?channel_id=80159af0-0ebd-41f9-9a49-bf86337b26d5");
//$bricks = file_get_contents("https://adcentral-staging.ivrnet.com/api/v1/bricks/40224db4-59ca-4f79-bef7-09bda662e781");
$bricks_array = json_decode($bricks);

/*
echo "<pre>";
print_r($bricks_array);
echo "</pre>";
*/
for($c=250;$c<300;$c++){
	if($bricks_array[$c]){
	$brick_detail = file_get_contents("https://adcentral-staging.ivrnet.com/api/v1/bricks/".$bricks_array[$c]->id);
	$brick_detail_array = json_decode($brick_detail);
	echo $bricks_array[$c]->id."<br>";
	$sql="INSERT INTO grid VALUES(
	'".$bricks_array[$c]->id."',
	'".$bricks_array[$c]->code."',
	'".$bricks_array[$c]->ne_latitude."',
	'".$bricks_array[$c]->ne_longitude."',
	'".$bricks_array[$c]->sw_latitude."',
	'".$bricks_array[$c]->sw_longitude."',
	'".$bricks_array[$c]->properties_count."',
	'".$bricks_array[$c]->channel_id."',
	'".$brick_detail_array->code."',
	'".$brick_detail_array->label."',
	'".$brick_detail_array->campaign_id."',
	'".round($brick_detail_array->hit_count_last_three_periods)."',
	'".$brick_detail_array->hit_count_last_period."',
	'".$brick_detail_array->availability."',
	'".$brick_detail_array->avialable."',
	'',
	'".$bricks_array[$c]->created_at."',
	'".$bricks_array[$c]->updated_at."'
	
	);";
	
	mysql_query($sql) or die(mysql_error());
	}
}

?>
