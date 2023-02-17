<?php
require_once('../clases/conexion.php');


//crear conexion
$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  
 $uri = "http://localhost/dwes/proyectoIntegrador/api/users";
 if (isset($_REQUEST['username'])) {
    $username = $_REQUEST['username'];
    $uri .=  "?username=" . $username;
    
} 
$userJSON = file_get_contents($uri);
$resultado = json_decode($userJSON);

if(!$resultado){
    header("HTTP/1.1 200 OK");
    echo json_encode([
        'success' => true,   
        'msg'=> 'Puede escoger este username'
    ]);
    
}else{
    header("HTTP/1.1 400 ");
    echo json_encode([
        'success' => false,   
        'msg'=> 'Usuario existente'
    ]);
}
}

