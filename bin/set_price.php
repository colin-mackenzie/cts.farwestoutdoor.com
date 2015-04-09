<?
error_reporting(1);
error_reporting(E_ALL ^ E_NOTICE);

include "db.php";

$sql="update grid set cost='".$_POST['price']."' where id='".$_POST['id']."'";
echo $sql;
mysql_query($sql);

?>