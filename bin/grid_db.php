<?
error_reporting(1);
error_reporting(E_ALL ^ E_NOTICE);

include "db.php";

$sql="SELECT * FROM grid";
$grid_array=array();
$result=mysql_query($sql) or die(mysql_error());

while($row=mysql_fetch_assoc($result)){
$grid_array[]=$row;
}

echo json_encode($grid_array);

?>