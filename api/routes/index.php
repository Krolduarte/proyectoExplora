<?php
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM routes WHERE 1 ";
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql .= "AND id='$id'";
    } elseif (isset($_GET['route_name'])) {
        $route_name = $_GET['route_name'];
        $sql .= " AND route_name='$route_name'";

    } elseif (isset($_GET['distance'])) {
        $distance = $_GET['distance'];
        $sql .= " AND distance='$distance'";

    } elseif (isset($_GET['max_height'])) {
        $max_height = $_GET['max_height'];
        $sql .= " AND max_height='$max_height'";

    } elseif (isset($_GET['min_height'])) {
        $min_height = $_GET['min_height'];
        $sql .= " AND min_height='$min_height'";


    } elseif (isset($_GET['pos_slope'])) {
        $pos_slope = $_GET['pos_slope'];
        $sql .= " AND pos_slope='$pos_slope'";

    } elseif (isset($_GET['neg_slope'])) {
        $neg_slope = $_GET['neg_slope'];
        $sql .= " AND neg_slope='$neg_slope'";

    } elseif (isset($_GET['circular'])) {
        $circular = $_GET['circular'];
        $sql .= " AND circular='$circular'";


    } elseif (isset($_GET['start_lat'])) {
        $start_lat = $_GET['start_lat'];
        $sql .= " AND start_lat='$start_lat'";

    } elseif (isset($_GET['start_lon'])) {
        $start_lon = $_GET['start_lon'];
        $sql .= " AND start_lon='$start_lon'";

    } elseif (isset($_GET['dif'])) {
        $dif = $_GET['dif'];
        $sql .= " AND dif='$dif'";

    } elseif (isset($_GET['user'])) {
        $user = $_GET['user'];
        $sql .= " AND user='$user'";

    } elseif (isset($_GET['date'])) {
        $date = $_GET['date'];
        $sql .= " AND date='$date'";

    } elseif (isset($_GET['description'])) {
        $description = $_GET['description'];
        $sql .= " AND description='$description'";

    } elseif (isset($_GET['tcx'])) {
        $tcx = $_GET['tcx'];
        $sql .= " AND tcx='$tcx'";

      
    //         $min_dist = $_GET['description'];
    //         $sql .= " AND description='$description'";

    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        $result = $con->query($sql);
        $routes = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($routes);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);
print_r($json);

    if (isset($json['route_name']) && isset($json['distance'])  && isset($json['max_height']) && isset($json['min_height'])  && isset($json['pos_slope']) && isset($json['neg_slope']) && isset($json['circular']) && isset($json['start_lat'])&& isset($json['start_lon'])&& isset($json['dif'])&& isset($json['user'])&& isset($json['date'])&& isset($json['description'])&& isset($json['tcx'])) {

     
    
        $route_name = $json['route_name'];
        $distance = $json['distance'];
        $maxHeight = $json['max_height'];
        $minHeight = $json['min_height'];
        $pos_slope = $json['pos_slope'];
        $neg_slope = $json['neg_slope'];
        $circular = $json['circular'];
        $start_lat = $json['start_lat'];
        $start_lon = $json['start_lon'];
        $dif = $json['dif'];
        $user = $json['user'];
        $date = $json['date'];
        $tcx = $json['tcx'];
       
       

        $sql = "INSERT INTO routes (route_name,distance,max_height,min_height,pos_slope,neg_slope,circular,start_lat,start_lon,dif,user,date,description,puntos) VALUES ('$route_name', '$distance', '$maxHeight',  '$minHeight', '$pos_slope', '$neg_slope', '$circular', '$start_lat','$start_lon, '$dif','$user','$date','$description','$tcx')";
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



header("HTTP/1.1 400 Bad Request");
