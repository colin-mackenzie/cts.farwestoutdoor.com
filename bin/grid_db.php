<?
error_reporting(1);
error_reporting(E_ALL ^ E_NOTICE);

mysql_connect("internal-db.s154977.gridserver.com", "db154977_global", "Cmac185130") or die(mysql_error());
mysql_select_db("db154977_fw") or die ("Could not connect to the Database fw\n\n");

$sql="SELECT * FROM grid";
$grid_array=array();
$result=mysql_query($sql) or die(mysql_error());

while($row=mysql_fetch_assoc($result)){
$grid_array[]=$row;
}

echo json_encode($grid_array);

?>