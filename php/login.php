<?php
require_once('../clases/conexion.php');

if (isset($_REQUEST['login'])) {

    $username = $_REQUEST['username'];
    $password2 = $_REQUEST['password2'];

    $passHash = hash("sha512", $password);
   

    try {
        $con = mysqli_connect(HOST, USER, PASS, BD);

        $sql = "SELECT username FROM users where 1
  and  username='$username'
  and password='$passHash'";


        $result = mysqli_query($con, $sql);


        if (mysqli_num_rows($result) == 1) {

            echo "<h2 >Login correcto</h2>";
        } else {
            echo "<h2 '>Login incorrecto</h2>";
           
        }
        mysqli_close($con);

    } catch (mysqli_sql_exception $e) {
        echo "<p>******Error de conexion*******" . $e->getMessage() . "</p>";
    }
}

//El usuario se registra introduciendo nuevas credenciales
if (isset($_REQUEST['register'])) {

    $username = $_REQUEST['username'];
    $pass = $_REQUEST['pass'];

    $passwordHash = hash("sha512", $password);

    try {
        $con = mysqli_connect(HOST, USER, PASS, BD);
        $sql = "INSERT INTO usuarios (user,password) values ('$usuario','$passwordHash')";

        $result = mysqli_query($con, $sql);


        if (mysqli_affected_rows($con) == 1) {
            echo "<h2 >Bienvenido</h2>";
            mysqli_close($con);
        } else {
            echo "<h2 '>No se ha podido realizar el login</h2>";
        }
    } catch (mysqli_sql_exception $e) {
        echo "<p>******Error de conexion*******" . $e->getMessage() . "</p>";
    }
}

?>