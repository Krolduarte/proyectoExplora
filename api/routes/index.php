<?php
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM routes WHERE 1 ";


    if (isset($_GET['id']) || isset($_GET['route_name']) || isset($_GET['distance'])  || isset($_GET['max_height']) || isset($_GET['min_height'])  || isset($_GET['pos_slope']) || isset($_GET['neg_slope']) || isset($_GET['circular']) || isset($_GET['start_lat']) || isset($_GET['start_lon']) || isset($_GET['dif']) || isset($_GET['user']) || isset($_GET['date']) || isset($_GET['description']) || isset($_GET['tcx'])  || isset($_GET['minDist']) || isset($_GET['maxDist']) || isset($_GET['minSlope']) || isset($_GET['maxSlope'] 
    )
    || isset($_GET['page'] )  
    || isset($_GET['results_per_page'] ) ) {

        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql .= "AND id='$id'";
        }

        if (isset($_GET['route_name'])) {
            $route_name = $_GET['route_name'];
            $sql .= " AND route_name LIKE '%" . $route_name . "%'";
        }

        if (isset($_GET['distance'])) {
            $distance = $_GET['distance'];
            $sql .= " AND distance='$distance'";
        }
        if (isset($_GET['max_height'])) {
            $max_height = $_GET['max_height'];
            $sql .= " AND max_height='$max_height'";
        }
        if (isset($_GET['min_height'])) {
            $min_height = $_GET['min_height'];
            $sql .= " AND min_height='$min_height'";
        }
        if (isset($_GET['pos_slope'])) {
            $pos_slope = $_GET['pos_slope'];
            $sql .= " AND pos_slope='$pos_slope'";
        }
        if (isset($_GET['neg_slope'])) {
            $neg_slope = $_GET['neg_slope'];
            $sql .= " AND neg_slope='$neg_slope'";
        }
        if (isset($_GET['circular'])) {
            $circular = $_GET['circular'];
            $sql .= " AND circular='$circular'";
        }
        if (isset($_GET['start_lat'])) {
            $start_lat = $_GET['start_lat'];
            $sql .= " AND start_lat='$start_lat'";
        }
        if (isset($_GET['start_lon'])) {
            $start_lon = $_GET['start_lon'];
            $sql .= " AND start_lon='$start_lon'";
        }
        if (isset($_GET['dif'])) {
            $dif = $_GET['dif'];
            $sql .= " AND dif='$dif'";
        }
        if (isset($_GET['user'])) {
            $user = $_GET['user'];
            $sql .= " AND user='$user'";
        }
        if (isset($_GET['date'])) {
            $date = $_GET['date'];
            $sql .= " AND date='$date'";
        }
        if (isset($_GET['description'])) {
            $description = $_GET['description'];
            $sql .= " AND description='$description'";
        }
        if (isset($_GET['tcx'])) {
            $tcx = $_GET['tcx'];
            $sql .= " AND tcx='$tcx'";
        }

        if (isset($_GET['minSlope'])) {
            $minSlope = $_GET['minSlope'];
            $sql .= " AND pos_slope > '$minSlope'";
        }


        if (isset($_GET['maxSlope'])) {
            $maxSlope = $_GET['maxSlope'];
            $sql .= " AND pos_slope < '$maxSlope'";
        }


        if (isset($_GET['minDist'])) {
            $minDist = $_GET['minDist'];
            $sql .= " AND distance > '$minDist'";
        }


        if (isset($_GET['maxDist'])) {
            $maxDist = $_GET['maxDist'];
            $sql .= " AND distance < '$maxDist'";
        }

      

        if (isset($_GET['results_per_page'])) {
            $results_per_page = $_GET['results_per_page'];
            $sql .= " LIMIT  $results_per_page";
        }

        if (isset($_GET['page'])) {
            $page = $_GET['page'];
            $offset = ($page -1) *$results_per_page;
            $sql .= " OFFSET  $offset";
        }
     



    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        // print_r($sql);
        $result = $con->query($sql);
        $routes = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($routes);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}

//No es utilizado en la actualidad
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);
    print_r($json);

    if (isset($json['route_name']) && isset($json['distance'])  && isset($json['max_height']) && isset($json['min_height'])  && isset($json['pos_slope']) && isset($json['neg_slope']) && isset($json['circular']) && isset($json['start_lat']) && isset($json['start_lon']) && isset($json['dif']) && isset($json['user']) && isset($json['date']) && isset($json['description']) && isset($json['tcx'])) {



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
                'id' => $id,
                'msg' => "usuario creado"
            ]);
       
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}



header("HTTP/1.1 400 Bad Request");
