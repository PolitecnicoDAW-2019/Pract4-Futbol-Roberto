-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Nov 29, 2019 at 08:57 PM
-- Server version: 5.7.28
-- PHP Version: 7.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `docker`
--

-- --------------------------------------------------------

--
-- Table structure for table `PLAYERS`
--

CREATE TABLE `PLAYERS` (
  `ID` int(4) NOT NULL,
  `NAME` varchar(15) DEFAULT NULL,
  `ALIAS` varchar(15) DEFAULT NULL,
  `BIRTHDATE` date DEFAULT NULL,
  `PICTURE` varchar(256) NOT NULL,
  `CLUB` varchar(15) DEFAULT NULL,
  `ID_POSITION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `PLAYERS`
--

INSERT INTO `PLAYERS` (`ID`, `NAME`, `ALIAS`, `BIRTHDATE`, `PICTURE`, `CLUB`, `ID_POSITION`) VALUES
(1, 'PEDRO', 'MANCO', '1994-04-09', 'mordecai.png', 'S21AW', 2),
(2, 'Alex', 'A_ARANDA', '1999-01-01', 'db74c940d447e877d119df613edd2700c4a84cd1cf08beb7cbc319bcfaeab97a.png', 'S21AW', 4),
(3, 'Brenesito', 'BRENES', '1999-01-01', 'ae518d7920fb814e63072f76e1f423de6ecffa4061ed9b9750a9b504a35f347f.png', 'xd', 1),
(4, 'ROBERTO', 'ROBERT', '2000-08-08', 'robert.jpg', 'S21AW', 1),
(12, 'xD', 'xD', '2000-01-01', 'deno.png', 'xD', 1),
(13, 'Ruben', 'falacia', '1900-02-02', 'dc46fd96dd39cec6ded0f928e7abe04d1d26d4accb6d13a41ca0ce810000099b.png', 'xdClub', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `PLAYERS`
--
ALTER TABLE `PLAYERS`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `PLAYERS`
--
ALTER TABLE `PLAYERS`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
