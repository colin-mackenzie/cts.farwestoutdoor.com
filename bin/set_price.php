<?
error_reporting(1);
error_reporting(E_ALL ^ E_NOTICE);

mysql_connect("internal-db.s154977.gridserver.com", "db154977_global", "Cmac185130") or die(mysql_error());
mysql_select_db("db154977_fw") or die ("Could not connect to the Database fw\n\n");

$sql="update grid set cost='".$_POST['price']."' where id='".$_POST['id']."'";
echo $sql;
mysql_query($sql);

?>