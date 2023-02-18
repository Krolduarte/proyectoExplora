<?php
require_once('../clases/conexion.php');


//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['email'])  && isset($json['height']) && isset($json['weight']) && isset($json['birthday']) && isset($json['activities']) ) {
        // isset($json['pass']) && 

        $id = $json['id'];
        $email = $json['email'];
        
        $height = $json['height'];
        $weight = $json['weight'];
        $birthday = $json['birthday'];
        $activities = implode(",", $json['activities']);

       if( isset($json['pass'])){
        $pass = hash("sha512", $json['pass']);
        $sql = "UPDATE users SET email='$email', pass='$pass', height='$height', weight='$weight', birthday='$birthday', activities='$activities' WHERE id ='$id'";
       }else{
        $sql = "UPDATE users SET email='$email', height='$height', weight='$weight', birthday='$birthday', activities='$activities' WHERE id ='$id'";
       }

        

        try {
            // print_r($sql);
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");
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
