<?php
if (isset($_GET['idruta'])) {
  $idruta = $_GET['idruta'];
 

  $uri = "http://localhost/dwes/proyectoIntegrador/api/routes/?id=$idruta";

  $rutaJSON = file_get_contents($uri);
  $resultado = json_decode($rutaJSON);


  $nombreruta = $resultado[0]->route_name;
  $autor = $resultado[0]->user;
  $fecha = $resultado[0]->date;
  $dif = $resultado[0]->dif;
  $distance = $resultado[0]->distance;
  $tiporuta = $resultado[0]->circular;
  $maxHeight = $resultado[0]->max_height;
  $minHeight = $resultado[0]->min_height;
  $description = $resultado[0]->description;
  $startLat = $resultado[0]->start_lat;
  $startLon = $resultado[0]->start_lon;

  $rutas[] = array(
    'nombre' => $nombreruta,
    'lat' => $startLat,
    'lng' => $startLon,
  );

 


  switch ($dif) {
    case 0:
      $dificultad = "Facil";
      $color = "green";
      break;
    case 1:
      $dificultad = "Moderado";
      $color = "yellow";
      break;
    case 2:
      $dificultad = "Difícil";
      $color = "orange";
      break;
    case 3:
      $dificultad = "Muy difícil";
      $color = "tomato";
      break;
    case 4:
      $dificultad = "Expertos";
      $color = "red";
      break;
  }

  if ($tiporuta == '1') {
    $tiporuta = "si";
  } else {
    $tiporuta = "no";
  }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="css/estilos-detallerutas.css" />
  <link rel="stylesheet" href="css/estilos-menu-footer.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel=”stylesheet” href=”ruta/a/font-awesome/css/font-awesome.min.css”>
  <link href="https://fonts.googleapis.com/css2?family=Raleway&family=Wallpoet&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>

  <title>Detalle de Rutas</title>
</head>

<body>
  <div id="fondo"></div>
  <div class="header">
    <div class="menu">
      <!-- Menu exportado de funciones.js -->
    </div>
    <div class="areatitulo">
      <div class="titulo-central">
        <?php echo $nombreruta ?>
      </div>
    </div>
  </div>
  <!-- fin div header -->

  <div class="contenido">
    <div class="colizq">
      <div id="map"></div>
      <div class="barradetalle">
        <div class="nivel">
          <span class="btnInt  <?php echo $color ?>"> <?php echo $dificultad ?></span>
        </div>

        <span><?php echo $distance ?> kms<img class="icono-distancia" src="img/img-principal/distance.png" alt="distancia" /></span>
      <!-- <span>Tiempo<img class="icono-tiempo" src="img/img-principal/icontime.png" alt="tiempo" /></span> -->
        <span><?php echo $maxHeight ?><img class="altura-up" src="img/img-principal/altitudarriba.png" alt="altura_alta" /></span>
        <span><?php echo $minHeight ?><img class="altura-down" src="img/img-principal/altitudarriba.png" alt="altura_baja" /></span>
      </div>
      <div class="titulo">Descripción</div>
      <div class="descripcion"> <?php echo $description ?></div>
    </div>

    <div class="colder">
      <div class="box-detalles">

        <div class="grid">
          <h3>Detalles de la Ruta</h3>
          <div class="autortitulo bold">Autor</div>
          <div class="nombreautor"> <?php echo $autor ?></div>
          <div class="fechatitulo bold">Fecha:</div>
          <div class="fecharuta"> <?php echo $fecha ?></div>
          <div class="tiporuta bold">Circular</div>
          <div class="circular"> <?php echo $tiporuta ?></div>
        </div>

      </div>
      <div class="imagen uno"></div>
      <div class="imagen dos"></div>
      <div class="imagen tres"></div>
    </div>
  </div>
  <!-- fin div contenido -->

  <div class="footer">
    <!-- importado desde header.html por medio de funciones.js -->
  </div>
  <!-- fin footer -->
  <script>
    function initMap() {
      let map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: 40,
          lng: -4
        },
        zoom: 7,
      });
    }
  </script>

  <script async src=" https://maps.googleapis.com/maps/api/js?key=AIzaSyDxqeqhM5qi4qubPhqW3iBaVY-ZKgry3p0&callback=initMap">
  </script>


  <script>
    function initMap() {
      let map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: 42.600003,
          lng: -5.57032
        },
        zoom: 6,
        mapTypeId: 'terrain',
        //  mapTypeId:google.maps.MapTypeId.SATELLITE
      });

      let points = JSON.parse('<?php echo json_encode($rutas)?>');
      // console.log(points);
      for (var i = 0; i < points.length; i++) {
        let nombre = points[i].nombre;
        let icon = "img/img-index/location(1).png";
        let latLng = new google.maps.LatLng(points[i].lat, points[i].lng);
        let marker = new google.maps.Marker({
          position: latLng,
          title: nombre,
          icon: icon,
          map: map,

        });
      }
    }
  </script>

  <script src="js/script-detallerutas.js" type="module"></script>
  <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
</body>

</html>