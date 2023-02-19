<?php
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM users WHERE 1 ";
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql .= "AND id='$id'";
    } elseif (isset($_GET['username'])) {
        $username = $_GET['username'];
        $sql .= " AND username='$username'";
    } elseif (isset($_GET['fullname'])) {
        $fullname = $_GET['fullname'];
        $sql .= " AND fullname='$fullname'";
    } elseif (isset($_GET['pass'])) {
        $pass = $_GET['pass'];     
        $sql .= " AND pass='$pass'";

    } elseif (isset($_GET['email'])) {
        $email = $_GET['email'];
        $sql .= " AND email='$email'";
    } elseif (isset($_GET['height'])) {
        $height = $_GET['height'];
        $sql .= " AND height='$height'";
    } elseif (isset($_GET['birthday'])) {
        $birthday = $_GET['birthday'];
        $sql .= " AND birthday='$birthday'";
    } elseif (isset($_GET['activities'])) {
        $activities = $_GET['activities'];
        $sql .= " AND activities='$activities'";
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        $result = $con->query($sql);
        $users = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($users);
          

    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (isset($json['username']) && isset($json['fullname'])  && isset($json['pass']) && isset($json['email'])  && isset($json['height']) && isset($json['weight']) && isset($json['birthday']) && isset($json['activities'])) {

        $json['activities'] = implode(",",$json['activities']);
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
                'id'=>$id,
                'msg'=> "usuario creado"
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



if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "DELETE FROM users WHERE id='$id'";
        try {
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            
            echo json_encode($id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}

header("HTTP/1.1 400 Bad Request");
