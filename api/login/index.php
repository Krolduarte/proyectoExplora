<?php
require '../../vendor/autoload.php';
require_once('../clases/conexion.php');

use Firebase\JWT\JWT;

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (isset($json['username']) &&  isset($json['pass'])) {

        $passHash = hash("sha512", $json['pass']);
        $username = $json['username'];

      
        $sql = "SELECT username FROM users where 1
        and  username='$username'
        and pass='$passHash'";

    }
    

    try {

       
        // $con->query($sql);
        $result = mysqli_query($con, $sql);
    if (mysqli_num_rows($result) == 1) {
     
        $payload = [
            'iss' => '$issuer',
            'user' => "localhost",
        ];
        $jwt = JWT::encode($payload, 's3cr3tw0rd', 'HS256');

        header("HTTP/1.1 200 OK");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => true,   
            'msg'=> "usuario ha podido hacer login", 
            'token' => $jwt,
            //  'id'=> $id,

        ]);


        exit;
    }else{
        header("HTTP/1.1 401 ");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => false,   
            'msg'=> 'Credenciales no validas'
        ]);


    }

    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}