<?php
require_once('../clases/conexion.php');
// require '../vendor/autoload.php';

//crear conexion
$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {


    // $json = json_decode(file_get_contents('php://input'), true);
    // if (isset($json['username'])) {
 //     $passHash = hash("sha512", $json['pass']);
    //     $username = $json['username'];
  
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


    // $sql = "SELECT username FROM users";
    // print_r($sql);
    

    // try {
    //     $result = $con->query($sql);

    //     // $users = $result->fetch_all(MYSQLI_ASSOC);
    //     header("HTTP/1.1 200 OK");
    //     // echo json_encode($users);
    // } catch (mysqli_sql_exception $e) {
    //     header("HTTP/1.1 404 Not Found");
    // }
    // exit;
//}
