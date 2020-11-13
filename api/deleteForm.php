<?

$_POST = json_decode(file_get_contents('php://input'), true);

$fileName = $_POST['fileName'];

$home = $_SERVER['DOCUMENT_ROOT']."/api/";

$unlink = @unlink($home. $fileName);

if($unlink == true){ echo "Файл удалён";} else{ echo "Произошла ошибка" . $home .  $fileName;}

?>