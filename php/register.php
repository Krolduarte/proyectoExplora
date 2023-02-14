<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (isset($_POST['username']) && isset($_POST['fullname'])  && isset($_POST['pass']) && isset($_POST['email'])  && isset($_POST['height']) && isset($_POST['weight']) && isset($_POST['birthday']) && isset($_POST['activitites'])) {

        $id = uniqid();
        $username = $_POST['username'];
        $fullname = $_POST['fullname'];
        $pass = $_POST['pass'];
        $email = $_POST['email'];
        $height = $_POST['height'];
        $weight = $_POST['weight'];
        $birthday = $_POST['birthday'];
        $activities = $_POST['activitites'];

        $passwordHash = hash("sha512", $pass);
        

        $sql = "INSERT INTO users (id, username,fullname,pass,email,height,weight,birthday, activities) VALUES ('$id', '$username', '$fullname', '$passwordHash',  '$email', '$height', '$weight', '$birthday','$activities')";
        try {
            $con->query($sql);
            header("HTTP/1.1 201 Created");
            echo json_encode($con->insert_id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}

?>




