-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2016 at 09:06 AM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bfproj`
--

-- --------------------------------------------------------

--
-- Table structure for table `additional_item`
--

CREATE TABLE `additional_item` (
  `ai_id` int(11) NOT NULL,
  `at_id` int(11) NOT NULL,
  `name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `additional_item`
--

INSERT INTO `additional_item` (`ai_id`, `at_id`, `name`, `price`) VALUES
(1, 2, '加蛋', 10),
(2, 2, '加起司', 5),
(3, 3, '熱', 0),
(4, 3, '溫', 0),
(5, 3, '冰', 0),
(6, 4, '全糖', 0),
(7, 4, '半糖', 0);

-- --------------------------------------------------------

--
-- Table structure for table `additional_type`
--

CREATE TABLE `additional_type` (
  `at_id` int(11) NOT NULL,
  `option_name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `multiple_choice` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `additional_type`
--

INSERT INTO `additional_type` (`at_id`, `option_name`, `multiple_choice`) VALUES
(1, '無加點', 1),
(2, '漢堡類加點', 1),
(3, '溫度', 0),
(4, '甜度', 0);

-- --------------------------------------------------------

--
-- Table structure for table `main`
--

CREATE TABLE `main` (
  `m_id` int(10) UNSIGNED NOT NULL,
  `name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `s_id` int(11) NOT NULL,
  `at_id` int(11) NOT NULL,
  `required_option` tinyint(1) NOT NULL,
  `order_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `main`
--

INSERT INTO `main` (`m_id`, `name`, `price`, `s_id`, `at_id`, `required_option`, `order_num`) VALUES
(1, '黑胡椒漢堡', 40, 1, 2, 0, 1),
(2, '奶茶', 10, 2, 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `o_id` int(11) NOT NULL,
  `o_time` datetime NOT NULL,
  `table_num` int(11) NOT NULL,
  `people_num` int(11) NOT NULL COMMENT '本欄位無功能上之用途，但可作為統計與產生報表之用',
  `status` enum('CANCEL','WAIT','MAKING','DONE','ARCHIVE') COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`o_id`, `o_time`, `table_num`, `people_num`, `status`) VALUES
(21, '2015-12-01 04:18:30', 16, 2, 'ARCHIVE'),
(22, '2016-01-06 00:00:00', 16, 2, 'CANCEL'),
(23, '2016-01-08 15:20:48', 16, 2, 'CANCEL'),
(24, '2016-01-08 15:43:24', 16, 2, 'CANCEL'),
(25, '2016-01-08 16:45:25', 16, 2, 'CANCEL'),
(26, '2016-01-14 00:00:26', 16, 2, 'ARCHIVE'),
(27, '2016-01-17 13:54:59', 16, 2, 'WAIT'),
(28, '2016-01-17 13:56:41', 16, 2, 'ARCHIVE'),
(29, '2016-01-17 13:57:23', 16, 2, 'DONE');

-- --------------------------------------------------------

--
-- Table structure for table `required_option`
--

CREATE TABLE `required_option` (
  `ro_id` int(11) NOT NULL,
  `name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `m_id` int(11) NOT NULL,
  `at_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `required_option`
--

INSERT INTO `required_option` (`ro_id`, `name`, `m_id`, `at_id`) VALUES
(1, '溫度', 2, 3),
(2, '甜度', 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE `series` (
  `s_id` int(11) NOT NULL,
  `order_num` int(30) NOT NULL,
  `name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`s_id`, `order_num`, `name`) VALUES
(1, 2, '漢堡系列'),
(2, 1, '飲料');

-- --------------------------------------------------------

--
-- Table structure for table `sh-i_ai`
--

CREATE TABLE `sh-i_ai` (
  `sh-i_ai_id` int(11) NOT NULL,
  `sh-i_id` int(11) NOT NULL,
  `ai_id` int(11) NOT NULL,
  `is_ro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sh-i_ai`
--

INSERT INTO `sh-i_ai` (`sh-i_ai_id`, `sh-i_id`, `ai_id`, `is_ro`) VALUES
(11, 8, 4, 1),
(12, 9, 6, 0),
(13, 9, 7, 1),
(14, 10, 2, 1),
(15, 10, 3, 1),
(16, 12, 3, 0),
(17, 14, 3, 0),
(18, 15, 6, 0),
(19, 16, 1, 0),
(20, 16, 2, 0),
(21, 18, 2, 0),
(22, 19, 3, 0),
(23, 21, 3, 0),
(24, 22, 1, 0),
(25, 22, 2, 0),
(26, 23, 6, 0),
(27, 24, 3, 1),
(28, 24, 6, 1),
(29, 25, 3, 1),
(30, 25, 6, 1),
(31, 26, 3, 1),
(32, 26, 7, 1),
(33, 27, 3, 1),
(34, 27, 6, 1),
(35, 28, 3, 1),
(36, 28, 7, 1),
(37, 29, 3, 1),
(38, 29, 6, 1),
(39, 30, 3, 1),
(40, 30, 7, 1),
(41, 31, 2, 0),
(42, 32, 3, 1),
(43, 32, 6, 1),
(44, 33, 3, 1),
(45, 33, 7, 1),
(46, 34, 3, 1),
(47, 34, 6, 1),
(48, 35, 3, 1),
(49, 35, 7, 1),
(50, 36, 2, 0),
(51, 37, 3, 1),
(52, 37, 6, 1),
(53, 38, 3, 1),
(54, 38, 7, 1),
(55, 39, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `share`
--

CREATE TABLE `share` (
  `sh_id` int(11) NOT NULL,
  `o_id` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `share`
--

INSERT INTO `share` (`sh_id`, `o_id`, `total`) VALUES
(11, 21, 0),
(12, 22, 0),
(13, 23, 0),
(14, 24, 0),
(15, 25, 0),
(16, 26, 0),
(17, 27, 0),
(18, 28, 0),
(19, 29, 0);

-- --------------------------------------------------------

--
-- Table structure for table `share_item`
--

CREATE TABLE `share_item` (
  `sh-i_id` int(11) NOT NULL,
  `sh_id` int(11) NOT NULL,
  `m_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `comment` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `share_item`
--

INSERT INTO `share_item` (`sh-i_id`, `sh_id`, `m_id`, `quantity`, `comment`) VALUES
(8, 11, 1, 1, ''),
(9, 11, 2, 1, 'heymt'),
(10, 11, 1, 1, 'hh'),
(11, 12, 0, 0, ''),
(12, 12, 2, 1, ''),
(13, 13, 0, 0, ''),
(14, 13, 2, 3, ''),
(15, 13, 2, 1, ''),
(16, 13, 1, 1, ''),
(17, 14, 0, 0, ''),
(18, 14, 1, 1, ''),
(19, 14, 2, 1, ''),
(20, 15, 0, 0, ''),
(21, 15, 2, 4, ''),
(22, 15, 1, 2, ''),
(23, 15, 2, 1, ''),
(24, 16, 2, 1, ''),
(25, 17, 2, 2, ''),
(26, 17, 2, 1, ''),
(27, 18, 2, 2, ''),
(28, 18, 2, 1, ''),
(29, 18, 2, 2, ''),
(30, 18, 2, 1, ''),
(31, 18, 1, 1, ''),
(32, 19, 2, 2, ''),
(33, 19, 2, 1, ''),
(34, 19, 2, 2, ''),
(35, 19, 2, 1, ''),
(36, 19, 1, 1, ''),
(37, 19, 2, 2, ''),
(38, 19, 2, 1, ''),
(39, 19, 1, 1, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `additional_item`
--
ALTER TABLE `additional_item`
  ADD PRIMARY KEY (`ai_id`);

--
-- Indexes for table `additional_type`
--
ALTER TABLE `additional_type`
  ADD PRIMARY KEY (`at_id`);

--
-- Indexes for table `main`
--
ALTER TABLE `main`
  ADD PRIMARY KEY (`m_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`o_id`);

--
-- Indexes for table `required_option`
--
ALTER TABLE `required_option`
  ADD PRIMARY KEY (`ro_id`);

--
-- Indexes for table `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `sh-i_ai`
--
ALTER TABLE `sh-i_ai`
  ADD PRIMARY KEY (`sh-i_ai_id`);

--
-- Indexes for table `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`sh_id`);

--
-- Indexes for table `share_item`
--
ALTER TABLE `share_item`
  ADD PRIMARY KEY (`sh-i_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `additional_item`
--
ALTER TABLE `additional_item`
  MODIFY `ai_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `additional_type`
--
ALTER TABLE `additional_type`
  MODIFY `at_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `main`
--
ALTER TABLE `main`
  MODIFY `m_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `required_option`
--
ALTER TABLE `required_option`
  MODIFY `ro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `series`
--
ALTER TABLE `series`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sh-i_ai`
--
ALTER TABLE `sh-i_ai`
  MODIFY `sh-i_ai_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT for table `share`
--
ALTER TABLE `share`
  MODIFY `sh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `share_item`
--
ALTER TABLE `share_item`
  MODIFY `sh-i_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
