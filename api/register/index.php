<?php
require '../../vendor/autoload.php';
require_once('../clases/conexion.php');

use Firebase\JWT\JWT;

//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['username']) && isset($json['fullname'])  && isset($json['pass']) && isset($json['email'])  && isset($json['height']) && isset($json['weight']) && isset($json['birthday']) && isset($json['activities'])) {

       
        $json['activities'] = implode(",", $json['activities']);
        $pass = hash("sha512", $json['pass']);
        $username = $json['username'];
        $fullname = $json['fullname'];
        $email = $json['email'];
        $height = $json['height'];
        $weight = $json['weight'];
        $birthday = $json['birthday'];



        $sql = "INSERT INTO users (username,fullname,pass,email,height,weight,birthday,activities) VALUES ('$username', '$fullname', '$pass',  '$email', '$height', '$weight', '$birthday','{$json['activities']}')";
        try {

            $con->query($sql);
             $id = $con->insert_id;

            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'id' => $id,
                'msg' => "usuario creado",
                // 'token' => $jwt,
            ]);
            // echo json_encode($con->insert_id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}




header("HTTP/1.1 400 Bad Request");
