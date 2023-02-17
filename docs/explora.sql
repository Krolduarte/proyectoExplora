-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-02-2023 a las 19:42:51
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `explora`
--
CREATE DATABASE IF NOT EXISTS `explora` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `explora`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `route_name` varchar(50) NOT NULL,
  `distance` int(11) NOT NULL,
  `max_height` int(11) NOT NULL,
  `min_height` int(11) NOT NULL,
  `pos_slope` int(11) NOT NULL,
  `neg_slope` int(11) NOT NULL,
  `circular` tinyint(1) NOT NULL,
  `start_lat` float NOT NULL,
  `start_lon` float NOT NULL,
  `dif` int(11) NOT NULL,
  `user` varchar(250) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `tcx` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `routes`
--

INSERT INTO `routes` (`id`, `route_name`, `distance`, `max_height`, `min_height`, `pos_slope`, `neg_slope`, `circular`, `start_lat`, `start_lon`, `dif`, `user`, `date`, `description`, `tcx`) VALUES
(1, 'Ruta Fuentes El Bierzo, Castilla y León', 11043, 1330, 838, 491, 491, 1, 42.8239, -5.77881, 4, 'usuario1', '2022-05-08', 'Una ruta destacada de la comarca del Bierzo, por lugares fantásticos, variada y con numerosos atractivos en un recorrido circular perfectamente señalizado. Una ruta visitando las distintas fuentes minero medicinales que existen. ', 'ruta-fuentes-elbierzo'),
(2, 'Hayedo de Busmayor-Senda Castilla y León', 7530, 1335, 947, 399, 399, 1, 42.36, -7.86407, 1, 'usuario2', '2020-12-12', 'Para llegar a este lugar sorprendente, lo hacemos desde Vega de Valcárcel, lugar de paso del Camino de Santiago. A partir de Vega, la carretera es sinuosa y muy estrecha. Barja es el núcleo principal, donde se ubica la casa Ayuntamiento. ', 'hayedo-de-busmayor'),
(3, 'Puerto de Ancares, Castilla y León', 8050, 2104, 1190, 40, 950, 0, 42.2368, -6.46165, 2, 'usuario3', '2023-02-05', 'En todo el recorrido se puede disfrutar de vistas maravillosas, fantásticas. Tierras de Galicia al oeste, tierras de Asturias al norte y tierras de León al sur.\r\nEl descenso lo se realiza con destino al pueblo de La Balouta. Maravilloso día de montaña.', 'puerto-de-ancares'),
(4, 'Valladolid Canal de Castilla', 6100, 1800, 1200, 889, 890, 0, 41.6552, -4.72372, 0, 'usuario2', '2020-12-12', 'Iniciamos nuestra ruta en la Dársena del Canal de Castilla de Valladolid, en dirección Dueñas, calle Canal, por los caminos de sirga que discurren anexos al Ramal Sur del Canal de Castilla.\r\n\r\nEnseguida cruzamos el puente del barrio de La Victoria, que cruza el canal, a su margen derecha, por donde seguiremos. La vuelta la realizaremos por el otro lado, siempre dejando el canal a la izquierda. ', 'canaldecastilla'),
(5, 'Ruta de los Cortijos y Lagares Málaga', 4100, 1800, 1200, 1300, 1310, 0, 36.7202, -4.42034, 1, 'usuario2', '2022-12-12', 'Hay pasillos naturales que parecen conducir', 'ruta-cortijos-lagares'),
(6, 'Monte Galleiro, Pontevedra Vigo', 3010, 1672, 1179, 711, 710, 1, 42.2328, -8.72264, 0, 'usuario2', '2022-05-08', 'Hay pasillos naturales que parecen conducir al paraíso. Otros al infierno. Y otros intrigan tanto que resulta imposible resistirse al embrujo que emana en cada una de sus curvas. El desfiladero natural de Los Calderones es de estos últimos: tan fascinante y estrecho como el embudo que comunica este mundo con el País de Nunca Jamás.', 'monte-galleira'),
(7, 'Pico Paisano Oviedo', 710, 1672, 1179, 1864, 1864, 0, 43.3603, -5.84476, 2, 'usuario3', '2022-05-08', 'Hay pasillos naturales que parecen conducir al paraíso. Otros al infierno. Y otros intrigan tanto que resulta imposible resistirse al embrujo que emana en cada una de sus curvas. El desfiladero natural de Los Calderones es de estos últimos: tan fascinante y estrecho como el embudo que comunica este mundo con el País de Nunca Jamás.', 'pico-paisano'),
(8, 'Encinar de Humienta, Burgos', 3010, 1672, 1179, 611, 611, 1, 42.3411, -3.70184, 4, 'usuario3', '2022-05-08', 'Hay pasillos naturales que parecen conducir al paraíso. Otros al infierno. Y otros intrigan tanto que resulta imposible resistirse al embrujo que emana en cada una de sus curvas. El desfiladero natural de Los Calderones es de estos últimos: tan fascinante y estrecho como el embudo que comunica este mundo con el País de Nunca Jamás.', 'encinar-humienta'),
(9, 'Arapiles a  Aldeateja, Salamanca', 5010, 1672, 1179, 377, 351, 5, 40.9688, -5.66388, 0, 'usuario3', '2022-05-08', 'Hay pasillos naturales que parecen conducir al paraíso. Otros al infierno. Y otros intrigan tanto que resulta imposible resistirse al embrujo que emana en cada una de sus curvas. El desfiladero natural de Los Calderones es de estos últimos: tan fascinante y estrecho como el embudo que comunica este mundo con el País de Nunca Jamás.', 'ruta-arapiles-salamanca'),
(10, 'Palencia. Desde San Juan de Dios', 5010, 1672, 1179, 492, 492, 1, 42.0095, -4.52406, 0, 'usuario3', '2022-05-08', 'Hay pasillos naturales que parecen conducir al paraíso. Otros al infierno. Y otros intrigan tanto que resulta imposible resistirse al embrujo que emana en cada una de sus curvas. El desfiladero natural de Los Calderones es de estos últimos: tan fascinante y estrecho como el embudo que comunica este mundo con el País de Nunca Jamás.', 'ruta-palencia-sanjuan');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `pass` varchar(260) NOT NULL,
  `email` varchar(35) NOT NULL,
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `birthday` date NOT NULL,
  `activities` varchar(260) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `pass`, `email`, `height`, `weight`, `birthday`, `activities`) VALUES
(75, 'usuario1', 'Maria Sanchez', '175cd98cbe4a6e3507c38a3c83c030b6a6cb78eec099f24ed3f522738350e066436a966658ffa07ef62a7e8e5487341d64a19e7d196ced990d94ac5cfaaf562f', 'usuario1@gmail.com', 180, 70, '2001-10-10', 'bicicleta,moto,running'),
(76, 'usuario2', 'Camilo Montenegro', 'f50b2cc31671e9e10a330450d99f15e941ea2fa4278517a80ddfd3fa104de409c09e424d160e7f43ffa4304c83d472e1715ac7d0ef0e845050bdc7c8dd6f9ece', 'usuario2@gmail.com', 170, 69, '2000-10-10', 'alpinismo,kayak,paseo'),
(77, 'usuario3', 'Carlos Alvarez', '92e7bb0778aa6468d8d8633eaef8c9eca640d6ef1a8fa57c420e770e42963d654e8f0835b9a32f0fa38b548193787a1904f14ba3f0f5fb8161115ec0c392ff4d', 'usuario3@gmail.com', 170, 70, '1987-05-10', 'bicicleta,alpinismo,kayak');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
