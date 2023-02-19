<?php
require_once('../clases/conexion.php');
require '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    // $headers = apache_request_headers();
    // if (isset($headers['Authorization'])) {

    //     $token = $headers['Authorization'];

    //     $secretKey = 's3cr3tw0rd';

    //     $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['email'])  && isset($json['height']) && isset($json['weight']) && isset($json['birthday']) && isset($json['activities'])) {


        $id = $json['id'];
        $email = $json['email'];

        $height = $json['height'];
        $weight = $json['weight'];
        $birthday = $json['birthday'];
        $activities = implode(",", $json['activities']);

        if (isset($json['pass'])) {
            $pass = hash("sha512", $json['pass']);
            $sql = "UPDATE users SET email='$email', pass='$pass', height='$height', weight='$weight', birthday='$birthday', activities='$activities' WHERE id ='$id'";
        } else {
            $sql = "UPDATE users SET email='$email', height='$height', weight='$weight', birthday='$birthday', activities='$activities' WHERE id ='$id'";
        }

        //         if (isset($json['token'])) {
        // $token = $_GET['token'];
        //         }

        try {
            // print_r($sql);
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");


            // header("Authorization: $token");

            echo json_encode($id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
} else {
    header("HTTP/1.1 400 Bad Request");
}
