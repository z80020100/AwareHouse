-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-08-02 06:33:40
-- 伺服器版本: 10.1.13-MariaDB
-- PHP 版本： 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `bfproj`
--

-- --------------------------------------------------------

--
-- 資料表結構 `additional_item`
--

CREATE TABLE `additional_item` (
  `ai_id` int(11) NOT NULL,
  `at_id` int(11) NOT NULL,
  `name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `additional_item`
--

INSERT INTO `additional_item` (`ai_id`, `at_id`, `name`, `price`) VALUES
(1, 2, '加蛋', 10),
(2, 2, '加起司', 5),
(17, 9, '法式', 10),
(18, 9, '日式', 5),
(19, 9, '義式', 5),
(20, 10, '黑暗芝麻', 5),
(21, 10, '知心樂', 10),
(23, 11, '虎咬豬', 0),
(27, 10, '薄皮', 0),
(28, 11, '薄皮', 0),
(29, 2, '不加菜', 0),
(30, 15, '大', 2),
(31, 15, '中', 0),
(32, 15, '小', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `additional_type`
--

CREATE TABLE `additional_type` (
  `at_id` int(11) NOT NULL,
  `option_name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `multiple_choice` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `additional_type`
--

INSERT INTO `additional_type` (`at_id`, `option_name`, `multiple_choice`) VALUES
(2, '漢堡類加點', 1),
(9, '吐司料理法', 1),
(10, '蛋餅皮', 1),
(11, '漢堡包', 0),
(14, '美式', 0),
(15, '飲料大小杯', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `config`
--

CREATE TABLE `config` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `config`
--

INSERT INTO `config` (`name`, `value`) VALUES
('verification', 'ae88'),
('verification_time', '1466415434');

-- --------------------------------------------------------

--
-- 資料表結構 `log`
--

CREATE TABLE `log` (
  `log_id` int(11) NOT NULL,
  `o_id` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `s_text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `m_text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `log`
--

INSERT INTO `log` (`log_id`, `o_id`, `time`, `s_text`, `m_text`, `quantity`, `price`) VALUES
(10, 76, '2016-06-23 10:46:34', '漢堡', '火腿蛋餅', 5, 40),
(11, 76, '2016-06-23 10:46:34', '漢堡', '章魚漢堡', 1, 55),
(12, 75, '2016-06-20 17:34:02', '漢堡', '章魚漢堡', 1, 65),
(13, 79, '2016-07-20 22:23:51', '漢堡', '火腿蛋餅', 1, 40),
(14, 79, '2016-07-20 22:23:51', '漢堡', '章魚漢堡', 1, 50),
(15, 78, '2016-07-20 22:21:34', '漢堡', '火腿蛋餅', 1, 40),
(16, 78, '2016-07-20 22:21:34', '漢堡', '章魚漢堡', 1, 50),
(17, 77, '2016-07-20 22:18:28', '漢堡', '火腿蛋餅', 1, 40),
(18, 80, '2016-07-20 22:29:09', '三明治', '火腿三明治', 10, 50),
(25, 81, '2016-07-20 22:32:18', '漢堡', '火腿蛋餅', 2, 40),
(26, 81, '2016-07-20 22:32:18', '三明治', '火腿三明治', 9, 50),
(27, 81, '2016-07-20 22:32:18', '漢堡', '章魚漢堡', 1, 50),
(28, 86, '2016-07-21 07:58:55', '漢堡', '章魚漢堡', 1, 50),
(29, 88, '2016-07-21 20:57:33', '漢堡', '章魚漢堡', 1, 50),
(30, 93, '2016-07-22 23:30:17', '漢堡', '章魚漢堡', 9, 50),
(31, 93, '2016-07-22 23:30:17', '漢堡', '火腿蛋餅', 4, 40),
(32, 93, '2016-07-22 23:30:17', '三明治', '火腿三明治', 4, 50),
(33, 95, '2016-07-23 12:01:07', '漢堡', '章魚漢堡', 1, 65),
(34, 94, '2016-07-23 07:57:58', '漢堡', '章魚漢堡', 1, 50),
(35, 94, '2016-07-23 07:57:58', '三明治', '火腿三明治', 1, 50),
(36, 98, '2016-07-23 16:14:26', '三明治', '火腿三明治', 1, 50),
(37, 99, '2016-07-23 16:15:08', '三明治', '火腿三明治', 1, 50),
(38, 101, '2016-07-24 19:14:54', '漢堡', '火腿蛋餅', 7, 40),
(39, 101, '2016-07-24 19:14:54', '三明治', '豬排蛋三明治', 1, 55),
(40, 102, '2016-07-25 22:08:16', '漢堡', '章魚漢堡', 5, 50),
(41, 103, '2016-07-25 22:13:27', '三明治', '豬排蛋三明治', 1, 40),
(42, 103, '2016-07-25 22:13:27', '三明治', '火腿三明治', 1, 50),
(43, 104, '2016-07-25 22:26:15', '三明治', '豬排蛋三明治', 1, 40),
(44, 105, '2016-07-25 22:26:20', '三明治', '火腿三明治', 9, 50),
(45, 106, '2016-07-25 22:26:38', '三明治', '豬排蛋三明治', 8, 55),
(46, 106, '2016-07-25 22:26:38', '三明治', '火腿三明治', 5, 50),
(47, 107, '2016-07-25 22:27:05', '三明治', '豬排蛋三明治', 6, 40),
(48, 108, '2016-07-25 22:33:53', '三明治', '豬排蛋三明治', 1, 40),
(49, 108, '2016-07-25 22:33:53', '三明治', '火腿三明治', 1, 50),
(50, 109, '2016-07-25 22:38:57', '三明治', '火腿三明治', 1, 50),
(51, 109, '2016-07-25 22:38:57', '三明治', '豬排蛋三明治', 2, 45),
(52, 109, '2016-07-25 22:38:57', '三明治', '豬排蛋三明治', 1, 40),
(53, 119, '2016-07-26 14:23:41', '三明治', '火腿三明治', 1, 50),
(54, 119, '2016-07-26 14:23:41', '三明治', '火腿三明治', 1, 50),
(55, 112, '2016-07-25 22:47:39', '三明治', '美式', 1, 0),
(56, 112, '2016-07-25 22:47:39', '三明治', '豬排蛋三明治', 5, 40),
(57, 114, '2016-07-26 10:33:03', '蛋餅', '原味', 1, 35),
(58, 116, '2016-07-26 14:07:23', '蛋餅', '原味', 1, 35),
(59, 129, '2016-07-27 22:50:20', '蛋餅', '原味', 2, 35),
(60, 131, '2016-07-29 18:15:14', '蛋餅', '起司', 1, 40),
(61, 132, '2016-07-31 14:37:45', '蛋餅', '培根', 1, 40),
(62, 133, '2016-07-31 16:45:21', '蛋餅', '蔬菜', 1, 50);

-- --------------------------------------------------------

--
-- 資料表結構 `main`
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
-- 資料表的匯出資料 `main`
--

INSERT INTO `main` (`m_id`, `name`, `price`, `s_id`, `at_id`, `required_option`, `order_num`) VALUES
(29, '火腿蛋三明治', 50, 7, 2, 1, 1),
(30, '豬排蛋三明治', 40, 7, 2, 0, 0),
(33, '原味蛋餅', 35, 10, 0, 1, 0),
(34, '美式三明治', 0, 7, 0, 0, 2),
(35, '蔬果三明治', 40, 7, 9, 1, 3),
(36, '奶茶', 20, 11, 15, 0, 1),
(37, '豆漿', 20, 11, 15, 0, 0),
(38, '可樂', 25, 11, 15, 0, 2),
(39, '米漿', 20, 11, 15, 0, 3),
(40, '鮪魚蛋餅', 35, 10, 10, 0, 1),
(41, '玉米蛋餅', 35, 10, 10, 0, 2),
(42, '火腿蛋餅', 40, 10, 10, 0, 3),
(43, '培根蛋餅', 40, 10, 10, 0, 4),
(44, '起司蛋餅', 40, 10, 10, 0, 5),
(45, '蔬菜蛋餅', 35, 10, 10, 0, 6),
(46, '卡拉雞三明治', 45, 7, 9, 0, 4),
(47, '蝦排三明治', 45, 7, 9, 0, 5),
(48, '果醬三明治', 25, 7, 9, 0, 6);

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `o_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL DEFAULT '1',
  `o_time` datetime NOT NULL,
  `o_utime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `o_estimate_time` datetime DEFAULT NULL,
  `table_num` int(11) NOT NULL,
  `people_num` int(11) NOT NULL COMMENT '本欄位無功能上之用途，但可作為統計與產生報表之用',
  `status` enum('CANCEL','WAIT','MAKING','DONE','ARCHIVE') COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `orders`
--

INSERT INTO `orders` (`o_id`, `u_id`, `o_time`, `o_utime`, `o_estimate_time`, `table_num`, `people_num`, `status`) VALUES
(21, 1, '2015-12-01 04:18:30', '2016-06-20 10:55:45', NULL, 16, 3, 'ARCHIVE'),
(22, 1, '2016-01-06 00:00:00', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(23, 1, '2016-01-08 15:20:48', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(24, 1, '2016-01-08 15:43:24', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(25, 1, '2016-01-08 16:45:25', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(26, 1, '2016-01-14 00:00:26', '0000-00-00 00:00:00', NULL, 16, 2, 'ARCHIVE'),
(27, 1, '2016-01-17 13:54:59', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(28, 1, '2016-01-17 13:56:41', '0000-00-00 00:00:00', NULL, 16, 2, 'ARCHIVE'),
(29, 1, '2016-01-17 13:57:23', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(30, 1, '2016-01-17 21:21:59', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(31, 1, '2016-01-17 21:24:08', '0000-00-00 00:00:00', NULL, 16, 2, 'ARCHIVE'),
(32, 1, '2016-01-17 21:45:48', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(33, 1, '2016-01-17 21:46:19', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(34, 1, '2016-01-17 21:46:40', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(35, 1, '2016-01-19 21:01:37', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(36, 1, '2016-01-19 21:01:55', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(37, 1, '2016-01-24 21:50:13', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(38, 1, '2016-01-24 21:51:01', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(39, 1, '2016-01-24 22:05:28', '0000-00-00 00:00:00', '2016-02-06 11:32:46', 16, 2, 'ARCHIVE'),
(40, 1, '2016-01-24 22:05:28', '0000-00-00 00:00:00', '2016-02-06 12:06:07', 16, 2, 'CANCEL'),
(41, 1, '2016-02-06 12:00:42', '0000-00-00 00:00:00', '2016-02-06 12:35:42', 16, 2, 'CANCEL'),
(42, 1, '2016-02-06 12:01:36', '0000-00-00 00:00:00', '2016-02-06 12:29:17', 16, 2, 'CANCEL'),
(43, 1, '2016-02-06 12:27:04', '0000-00-00 00:00:00', '2016-02-06 12:33:21', 16, 2, 'ARCHIVE'),
(44, 1, '2016-03-29 23:58:40', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(45, 1, '2016-03-30 00:08:56', '0000-00-00 00:00:00', NULL, 2, 1, 'ARCHIVE'),
(46, 1, '2016-04-24 18:03:00', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(47, 1, '2016-04-24 18:03:57', '0000-00-00 00:00:00', NULL, 23, 1, 'CANCEL'),
(48, 1, '2016-04-24 18:04:40', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(49, 1, '2016-04-24 18:04:57', '0000-00-00 00:00:00', NULL, 234, 1, 'CANCEL'),
(50, 1, '2016-04-24 18:06:55', '0000-00-00 00:00:00', NULL, 234, 1, 'CANCEL'),
(51, 1, '2016-04-24 18:45:03', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(52, 1, '2016-04-24 18:47:35', '0000-00-00 00:00:00', NULL, 5, 1, 'CANCEL'),
(53, 1, '2016-04-24 18:49:40', '0000-00-00 00:00:00', NULL, 5, 15, 'CANCEL'),
(54, 1, '2016-04-13 18:51:44', '0000-00-00 00:00:00', '2016-04-24 19:31:36', 9, 4, 'ARCHIVE'),
(55, 1, '2016-04-24 19:41:25', '0000-00-00 00:00:00', NULL, 16, 2, 'ARCHIVE'),
(56, 1, '2016-04-24 07:33:35', '0000-00-00 00:00:00', '2016-05-01 23:08:48', 16, 2, 'ARCHIVE'),
(57, 1, '2016-04-24 22:53:19', '0000-00-00 00:00:00', NULL, 16, 2, 'CANCEL'),
(58, 1, '2016-04-24 22:55:25', '0000-00-00 00:00:00', NULL, 16, 2, 'ARCHIVE'),
(59, 1, '2016-04-24 22:55:58', '0000-00-00 00:00:00', NULL, 123, 1, 'CANCEL'),
(60, 1, '2016-04-24 23:13:55', '0000-00-00 00:00:00', NULL, 16, 2, 'ARCHIVE'),
(61, 1, '2016-05-02 08:51:42', '0000-00-00 00:00:00', '2016-05-03 02:50:28', 3, 1, 'CANCEL'),
(62, 1, '2016-05-02 09:30:12', '0000-00-00 00:00:00', '2016-05-02 14:53:40', 3, 1, 'CANCEL'),
(63, 1, '2016-05-03 14:02:43', '0000-00-00 00:00:00', '2016-05-03 14:39:35', 123, 1, 'CANCEL'),
(64, 1, '2016-05-03 14:09:47', '0000-00-00 00:00:00', '2016-05-03 15:12:53', 123, 1, 'ARCHIVE'),
(65, 1, '2016-05-03 14:59:01', '0000-00-00 00:00:00', '2016-05-03 16:00:41', 123, 1, 'ARCHIVE'),
(66, 1, '2016-05-03 15:03:15', '0000-00-00 00:00:00', '2016-05-03 15:36:17', 123, 1, 'ARCHIVE'),
(67, 1, '2016-05-05 08:27:02', '0000-00-00 00:00:00', '2016-05-05 09:34:17', 3, 1, 'ARCHIVE'),
(68, 1, '2016-05-12 09:52:12', '0000-00-00 00:00:00', '2016-05-12 10:48:28', 16, 2, 'ARCHIVE'),
(69, 1, '2016-05-12 10:06:21', '0000-00-00 00:00:00', NULL, 1, 1, 'CANCEL'),
(70, 1, '2016-05-12 10:12:20', '0000-00-00 00:00:00', NULL, 1, 1, 'CANCEL'),
(71, 1, '2016-05-15 19:00:44', '0000-00-00 00:00:00', '2016-05-15 19:07:14', 16, 2, 'ARCHIVE'),
(72, 1, '2016-05-16 22:24:37', '0000-00-00 00:00:00', NULL, 16, 2, 'WAIT'),
(73, 1, '2016-06-20 14:21:43', '0000-00-00 00:00:00', NULL, 23, 1, 'WAIT'),
(74, 1, '2016-06-20 14:23:04', '2016-06-21 02:40:55', '2016-06-21 06:49:14', 23, 1, 'ARCHIVE'),
(75, 1, '2016-06-20 17:34:02', '2016-07-20 14:18:37', '2016-06-21 16:02:55', 123, 1, 'ARCHIVE'),
(76, 1, '2016-06-23 10:46:34', '2016-07-20 14:18:35', '2016-06-27 11:40:04', 5, 1, 'ARCHIVE'),
(77, 1, '2016-07-20 22:18:28', '2016-07-20 14:27:58', NULL, 44, 1, 'ARCHIVE'),
(78, 1, '2016-07-20 22:21:34', '2016-07-20 14:27:56', NULL, 1234, 1, 'ARCHIVE'),
(79, 1, '2016-07-20 22:23:51', '2016-07-20 14:24:02', NULL, 555, 1, 'ARCHIVE'),
(80, 1, '2016-07-20 22:29:09', '2016-07-20 14:29:14', NULL, 777, 1, 'ARCHIVE'),
(81, 1, '2016-07-20 22:32:18', '2016-07-20 14:32:38', NULL, 75556, 1, 'ARCHIVE'),
(82, 1, '2016-07-20 22:48:49', '2016-07-23 10:10:44', NULL, 333, 1, 'CANCEL'),
(83, 1, '2016-07-20 22:49:14', '2016-07-23 10:10:43', NULL, 1, 1, 'CANCEL'),
(84, 1, '2016-07-20 22:50:00', '2016-07-23 10:10:45', NULL, 333, 1, 'CANCEL'),
(85, 1, '2016-07-20 22:52:26', '2016-07-23 10:10:46', NULL, 987, 1, 'CANCEL'),
(86, 1, '2016-07-21 07:58:55', '2016-07-21 00:04:56', NULL, 44, 1, 'ARCHIVE'),
(87, 1, '2016-07-21 08:55:58', '2016-07-25 14:26:07', NULL, 543, 1, 'CANCEL'),
(88, 1, '2016-07-21 20:57:33', '2016-07-21 12:57:56', NULL, 1234, 1, 'ARCHIVE'),
(89, 1, '2016-07-22 21:14:06', '2016-07-23 04:06:30', NULL, 44, 1, 'CANCEL'),
(90, 1, '2016-07-22 22:25:14', '2016-07-23 04:06:33', NULL, 22, 1, 'CANCEL'),
(91, 1, '2016-07-22 23:02:47', '2016-07-23 03:54:37', NULL, 2, 1, 'CANCEL'),
(92, 1, '2016-07-22 23:07:46', '2016-07-22 23:56:59', NULL, 1223, 1, 'CANCEL'),
(93, 1, '2016-07-22 23:30:17', '2016-07-22 15:38:33', NULL, 22, 1, 'ARCHIVE'),
(94, 1, '2016-07-23 07:57:58', '2016-07-23 04:06:25', NULL, 3, 1, 'ARCHIVE'),
(95, 1, '2016-07-23 12:01:07', '2016-07-23 04:06:06', NULL, 23, 1, 'ARCHIVE'),
(96, 1, '2016-07-23 12:10:50', '2016-07-23 10:10:34', NULL, 456, 1, 'CANCEL'),
(97, 1, '2016-07-23 12:14:12', '2016-07-23 10:10:35', NULL, 123, 1, 'CANCEL'),
(98, 1, '2016-07-23 16:14:26', '2016-07-23 10:10:39', NULL, 5, 1, 'ARCHIVE'),
(99, 1, '2016-07-23 16:15:08', '2016-07-23 10:10:42', NULL, 5, 1, 'ARCHIVE'),
(100, 1, '2016-07-23 18:10:28', '2016-07-23 13:13:06', NULL, 44, 1, 'CANCEL'),
(101, 1, '2016-07-24 19:14:54', '2016-07-24 11:15:06', NULL, 55, 1, 'ARCHIVE'),
(102, 1, '2016-07-25 22:08:16', '2016-07-25 14:08:48', NULL, 3242, 1, 'ARCHIVE'),
(103, 1, '2016-07-25 22:13:27', '2016-07-25 14:13:27', NULL, 0, 0, 'ARCHIVE'),
(104, 1, '2016-07-25 22:26:15', '2016-07-25 14:26:15', NULL, 0, 0, 'ARCHIVE'),
(105, 1, '2016-07-25 22:26:20', '2016-07-25 14:26:20', NULL, 0, 0, 'ARCHIVE'),
(106, 1, '2016-07-25 22:26:38', '2016-07-25 14:26:38', NULL, 0, 0, 'ARCHIVE'),
(107, 1, '2016-07-25 22:27:05', '2016-07-25 14:27:05', NULL, 0, 0, 'ARCHIVE'),
(108, 1, '2016-07-25 22:33:53', '2016-07-26 14:20:39', NULL, 46, 1, 'ARCHIVE'),
(109, 1, '2016-07-25 22:38:57', '2016-07-26 14:20:42', NULL, 123, 1, 'ARCHIVE'),
(110, 1, '2016-07-25 22:46:40', '2016-07-28 08:15:51', NULL, 12, 1, 'CANCEL'),
(111, 1, '2016-07-25 22:47:30', '2016-07-28 08:15:59', NULL, 1, 1, 'CANCEL'),
(112, 1, '2016-07-25 22:47:39', '2016-07-28 08:15:44', NULL, 123, 1, 'ARCHIVE'),
(113, 1, '2016-07-25 22:47:45', '2016-07-28 08:15:45', NULL, 123, 1, 'CANCEL'),
(114, 1, '2016-07-26 10:33:03', '2016-07-28 08:16:03', NULL, 2, 1, 'ARCHIVE'),
(115, 1, '2016-07-26 10:33:52', '2016-07-27 14:44:02', NULL, 55, 1, 'CANCEL'),
(116, 1, '2016-07-26 14:07:23', '2016-07-28 08:16:10', NULL, 6, 1, 'ARCHIVE'),
(117, 1, '2016-07-26 14:10:56', '2016-07-27 09:06:41', NULL, 7, 1, 'MAKING'),
(118, 1, '2016-07-26 14:22:26', '2016-07-27 09:06:38', NULL, 4, 1, 'CANCEL'),
(119, 1, '2016-07-26 14:23:41', '2016-07-27 07:43:26', NULL, 7, 1, 'ARCHIVE'),
(120, 1, '2016-07-26 14:24:22', '2016-07-27 09:06:35', NULL, 9, 1, 'CANCEL'),
(121, 1, '2016-07-27 16:13:58', '2016-07-27 08:13:58', NULL, 4, 4, 'WAIT'),
(122, 1, '2016-07-27 17:04:44', '2016-07-27 09:06:30', NULL, 133123132, 1, 'CANCEL'),
(123, 1, '2016-07-27 22:44:28', '2016-07-27 14:44:28', NULL, 0, 1, 'WAIT'),
(124, 1, '2016-07-27 22:46:04', '2016-07-28 08:16:19', NULL, 123, 1, 'CANCEL'),
(125, 1, '2016-07-27 22:46:45', '2016-07-28 08:16:24', NULL, 123, 1, 'CANCEL'),
(126, 1, '2016-07-27 22:47:13', '2016-08-01 11:47:06', NULL, 0, 1, 'CANCEL'),
(127, 1, '2016-07-27 22:47:48', '2016-08-01 11:47:05', NULL, 1212, 1, 'CANCEL'),
(128, 1, '2016-07-27 22:49:37', '2016-07-28 11:42:06', NULL, 0, 1, 'WAIT'),
(129, 1, '2016-07-27 22:50:20', '2016-07-28 11:41:58', NULL, 12, 1, 'ARCHIVE'),
(130, 1, '2016-07-29 01:06:07', '2016-07-31 08:45:31', NULL, 9876, 1, 'CANCEL'),
(131, 1, '2016-07-29 18:15:14', '2016-07-29 13:35:11', NULL, 5, 1, 'ARCHIVE'),
(132, 1, '2016-07-31 14:37:45', '2016-07-31 06:38:01', NULL, 1234, 1, 'ARCHIVE'),
(133, 1, '2016-07-31 16:45:21', '2016-07-31 08:45:28', NULL, 2, 1, 'ARCHIVE'),
(134, 1, '2016-07-31 23:08:36', '2016-08-01 11:50:09', NULL, 23, 2, 'MAKING'),
(135, 1, '2016-07-31 23:37:37', '2016-08-02 04:29:20', NULL, 23, 2, 'WAIT');

-- --------------------------------------------------------

--
-- 資料表結構 `required_option`
--

CREATE TABLE `required_option` (
  `ro_id` int(11) NOT NULL,
  `name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `m_id` int(11) NOT NULL,
  `at_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `required_option`
--

INSERT INTO `required_option` (`ro_id`, `name`, `m_id`, `at_id`) VALUES
(13, '', 33, 11),
(14, '', 33, 14),
(15, '', 29, 11),
(16, '', 35, 11),
(17, '', 35, 14);

-- --------------------------------------------------------

--
-- 資料表結構 `series`
--

CREATE TABLE `series` (
  `s_id` int(11) NOT NULL,
  `order_num` int(30) NOT NULL,
  `name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `series`
--

INSERT INTO `series` (`s_id`, `order_num`, `name`) VALUES
(7, 1, '三明治'),
(10, 0, '蛋餅'),
(11, 2, '飲料'),
(12, 2147483647, '愛紗');

-- --------------------------------------------------------

--
-- 資料表結構 `sh-i_ai`
--

CREATE TABLE `sh-i_ai` (
  `sh-i_ai_id` int(11) NOT NULL,
  `sh-i_id` int(11) NOT NULL,
  `ai_id` int(11) NOT NULL,
  `is_ro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `sh-i_ai`
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
(55, 39, 2, 0),
(56, 40, 3, 1),
(57, 40, 7, 1),
(58, 41, 5, 1),
(59, 41, 7, 1),
(60, 42, 3, 1),
(61, 42, 7, 1),
(62, 43, 5, 1),
(63, 43, 7, 1),
(64, 44, 1, 0),
(65, 44, 2, 0),
(66, 45, 1, 0),
(67, 45, 2, 0),
(68, 46, 1, 0),
(69, 46, 2, 0),
(70, 47, 3, 1),
(71, 47, 6, 1),
(72, 48, 5, 1),
(73, 48, 6, 1),
(74, 49, 1, 0),
(75, 49, 2, 0),
(76, 50, 3, 1),
(77, 50, 6, 1),
(78, 51, 5, 1),
(79, 51, 6, 1),
(80, 52, 3, 1),
(81, 52, 6, 1),
(82, 53, 3, 1),
(83, 55, 3, 1),
(84, 57, 1, 0),
(85, 57, 2, 0),
(86, 58, 3, 1),
(87, 58, 6, 1),
(88, 59, 1, 0),
(89, 59, 2, 0),
(90, 60, 2, 0),
(91, 61, 3, 1),
(92, 61, 7, 1),
(93, 62, 3, 1),
(94, 62, 6, 1),
(95, 63, 1, 0),
(96, 63, 2, 0),
(97, 64, 3, 1),
(98, 64, 6, 1),
(99, 65, 1, 0),
(100, 65, 2, 0),
(101, 66, 3, 1),
(102, 66, 6, 1),
(103, 67, 1, 0),
(104, 67, 2, 0),
(105, 68, 8, 0),
(106, 68, 3, 1),
(107, 69, 8, 0),
(108, 69, 3, 1),
(109, 70, 11, 0),
(110, 71, 8, 0),
(111, 72, 1, 0),
(112, 72, 2, 0),
(113, 73, 2, 0),
(114, 74, 2, 0),
(115, 75, 2, 0),
(116, 76, 3, 1),
(117, 76, 7, 1),
(118, 77, 1, 0),
(119, 77, 2, 0),
(120, 78, 3, 1),
(121, 78, 6, 1),
(122, 79, 1, 0),
(123, 79, 2, 0),
(124, 81, 3, 1),
(125, 81, 6, 1),
(126, 82, 3, 1),
(127, 82, 6, 1),
(128, 84, 3, 1),
(129, 84, 6, 1),
(130, 85, 3, 1),
(131, 85, 6, 1),
(132, 86, 2, 0),
(133, 87, 3, 1),
(134, 87, 6, 1),
(135, 88, 3, 1),
(136, 88, 6, 1),
(137, 89, 5, 1),
(138, 89, 6, 1),
(139, 90, 3, 1),
(140, 90, 6, 1),
(141, 91, 16, 1),
(142, 92, 19, 0),
(143, 92, 14, 1),
(144, 93, 14, 1),
(145, 94, 14, 1),
(146, 95, 18, 0),
(147, 95, 19, 0),
(148, 95, 14, 1),
(149, 96, 3, 1),
(150, 96, 6, 1),
(151, 97, 18, 0),
(152, 97, 19, 0),
(153, 97, 14, 1),
(154, 98, 3, 1),
(155, 98, 6, 1),
(156, 99, 14, 1),
(157, 100, 14, 1),
(158, 101, 3, 1),
(159, 101, 6, 1),
(160, 102, 14, 1),
(161, 103, 14, 1),
(162, 104, 3, 1),
(163, 104, 6, 1),
(164, 105, 14, 1),
(165, 106, 1, 0),
(166, 106, 2, 0),
(167, 107, 1, 0),
(168, 107, 2, 0),
(169, 109, 1, 0),
(170, 109, 2, 0),
(171, 111, 2, 0),
(172, 117, 22, 1),
(173, 119, 22, 1),
(174, 122, 1, 0),
(175, 122, 2, 0),
(176, 124, 22, 1),
(177, 137, 22, 1),
(178, 139, 22, 1),
(179, 140, 1, 0),
(180, 140, 2, 0),
(181, 141, 1, 0),
(182, 141, 2, 0),
(183, 142, 20, 0),
(184, 142, 22, 1),
(185, 143, 1, 0),
(186, 144, 1, 0),
(187, 144, 2, 0),
(188, 146, 1, 0),
(189, 146, 2, 0),
(190, 147, 23, 1),
(191, 148, 22, 1),
(192, 149, 22, 1),
(193, 150, 22, 1),
(194, 154, 1, 0),
(195, 154, 2, 0),
(196, 157, 22, 1),
(197, 159, 22, 1),
(198, 160, 1, 0),
(199, 160, 2, 0),
(200, 161, 22, 1),
(201, 164, 22, 1),
(202, 165, 22, 1),
(203, 166, 2, 0),
(204, 168, 23, 1),
(205, 172, 22, 1),
(206, 173, 23, 1),
(207, 175, 23, 1),
(208, 176, 1, 0),
(209, 176, 2, 0),
(210, 176, 29, 0),
(211, 177, 23, 1),
(212, 180, 1, 0),
(213, 180, 2, 0),
(214, 180, 29, 0),
(215, 181, 1, 0),
(216, 181, 29, 0),
(217, 181, 23, 1),
(218, 183, 23, 1),
(219, 185, 23, 1),
(220, 187, 23, 1),
(221, 188, 2, 0),
(222, 188, 29, 0),
(223, 190, 28, 1),
(224, 191, 28, 1),
(225, 192, 23, 1),
(226, 193, 28, 1),
(227, 194, 17, 0),
(228, 194, 18, 0),
(229, 194, 19, 0),
(230, 194, 23, 1),
(231, 195, 28, 1),
(232, 196, 20, 0),
(233, 196, 21, 0),
(234, 196, 27, 0),
(235, 197, 27, 0),
(236, 199, 20, 0),
(237, 199, 21, 0),
(238, 199, 27, 0),
(239, 201, 25, 0),
(240, 203, 23, 1),
(241, 205, 23, 1),
(242, 208, 25, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `share`
--

CREATE TABLE `share` (
  `sh_id` int(11) NOT NULL,
  `o_id` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `share`
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
(19, 29, 0),
(20, 30, 0),
(21, 31, 0),
(22, 32, 0),
(23, 33, 0),
(24, 34, 0),
(25, 35, 0),
(26, 36, 0),
(27, 37, 0),
(28, 38, 0),
(29, 39, 0),
(30, 40, 0),
(31, 41, 0),
(32, 42, 0),
(33, 43, 0),
(34, 44, 0),
(35, 45, 0),
(36, 46, 0),
(37, 47, 0),
(38, 48, 0),
(39, 49, 0),
(40, 50, 0),
(41, 51, 0),
(42, 52, 0),
(43, 53, 0),
(44, 54, 0),
(45, 55, 0),
(46, 56, 0),
(47, 57, 0),
(48, 58, 0),
(49, 59, 0),
(50, 60, 0),
(51, 61, 0),
(52, 62, 0),
(53, 63, 0),
(54, 64, 0),
(55, 65, 0),
(56, 66, 0),
(57, 67, 0),
(58, 68, 0),
(59, 69, 0),
(60, 70, 0),
(61, 71, 0),
(62, 72, 0),
(63, 73, 0),
(64, 74, 0),
(65, 75, 0),
(66, 76, 0),
(67, 77, 0),
(68, 78, 0),
(69, 79, 0),
(70, 80, 0),
(71, 81, 0),
(72, 82, 0),
(73, 83, 0),
(74, 84, 0),
(75, 85, 0),
(76, 86, 0),
(77, 87, 0),
(78, 88, 0),
(79, 89, 0),
(80, 90, 0),
(81, 91, 0),
(82, 92, 0),
(83, 93, 0),
(84, 94, 0),
(85, 95, 0),
(86, 96, 0),
(87, 97, 0),
(88, 98, 0),
(89, 99, 0),
(90, 100, 0),
(91, 101, 0),
(92, 102, 0),
(93, 103, 0),
(94, 104, 0),
(95, 105, 0),
(96, 106, 0),
(97, 107, 0),
(98, 108, 0),
(99, 109, 0),
(100, 110, 0),
(101, 111, 0),
(102, 112, 0),
(103, 113, 0),
(104, 114, 0),
(105, 115, 0),
(106, 116, 0),
(107, 117, 0),
(108, 118, 0),
(109, 119, 0),
(110, 120, 0),
(111, 121, 0),
(112, 122, 0),
(113, 123, 0),
(114, 124, 0),
(115, 125, 0),
(116, 126, 0),
(117, 127, 0),
(118, 128, 0),
(119, 129, 0),
(120, 130, 0),
(121, 131, 0),
(122, 132, 0),
(123, 133, 0),
(124, 134, 0),
(125, 135, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `share_item`
--

CREATE TABLE `share_item` (
  `sh-i_id` int(11) NOT NULL,
  `sh_id` int(11) NOT NULL,
  `m_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `comment` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `share_item`
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
(39, 19, 1, 1, ''),
(40, 20, 2, 1, ''),
(41, 20, 2, 1, ''),
(42, 21, 2, 1, ''),
(43, 21, 2, 1, ''),
(44, 21, 1, 1, ''),
(45, 22, 1, 1, ''),
(46, 23, 1, 1, ''),
(47, 23, 2, 1, ''),
(48, 23, 2, 1, ''),
(49, 24, 1, 1, ''),
(50, 24, 2, 1, ''),
(51, 24, 2, 1, ''),
(52, 24, 2, 1, ''),
(53, 25, 2, 2, ''),
(54, 25, 1, 1, ''),
(55, 26, 2, 2, ''),
(56, 26, 1, 1, ''),
(57, 26, 1, 1, ''),
(58, 27, 2, 1, ''),
(59, 27, 1, 2, ''),
(60, 28, 1, 1, ''),
(61, 28, 2, 5, ''),
(62, 29, 2, 1, 'hiiii'),
(63, 30, 1, 1, ''),
(64, 31, 2, 1, ''),
(65, 32, 1, 10, ''),
(66, 33, 2, 3, ''),
(67, 33, 1, 1, ''),
(68, 34, 20, 1, ''),
(69, 35, 22, 1, ''),
(70, 35, 19, 1, ''),
(71, 36, 5, 1, ''),
(72, 37, 1, 3, ''),
(73, 38, 1, 7, ''),
(74, 39, 1, 1, ''),
(75, 40, 1, 1, 'test'),
(76, 40, 2, 1, ''),
(77, 41, 1, 8, ''),
(78, 42, 2, 4, ''),
(79, 43, 1, 1, ''),
(80, 44, 1, 1, ''),
(81, 45, 2, 1, ''),
(82, 46, 2, 1, ''),
(83, 46, 1, 1, ''),
(84, 47, 2, 1, ''),
(85, 48, 2, 1, ''),
(86, 49, 1, 1, ''),
(87, 50, 2, 1, ''),
(88, 51, 2, 1, ''),
(89, 52, 2, 1, ''),
(90, 52, 2, 1, ''),
(91, 53, 23, 3, ''),
(92, 53, 25, 1, ''),
(93, 53, 23, 1, ''),
(94, 54, 23, 1, ''),
(95, 55, 25, 1, ''),
(96, 56, 2, 1, ''),
(97, 57, 25, 1, ''),
(98, 58, 2, 2, ''),
(99, 58, 23, 1, ''),
(100, 58, 25, 1, ''),
(101, 59, 2, 1, ''),
(102, 59, 23, 1, ''),
(103, 60, 23, 1, ''),
(104, 61, 2, 1, ''),
(105, 61, 25, 1, ''),
(106, 62, 27, 1, ''),
(107, 63, 27, 1, ''),
(108, 64, 28, 10, ''),
(109, 65, 27, 1, ''),
(110, 66, 28, 5, ''),
(111, 66, 27, 1, ''),
(112, 67, 28, 1, ''),
(113, 68, 28, 1, ''),
(114, 68, 27, 1, ''),
(115, 69, 28, 1, ''),
(116, 69, 27, 1, ''),
(117, 70, 29, 10, ''),
(118, 71, 28, 2, ''),
(119, 71, 29, 9, ''),
(120, 71, 27, 1, ''),
(121, 72, 28, 1, ''),
(122, 72, 27, 9, ''),
(123, 73, 27, 1, ''),
(124, 74, 29, 9, ''),
(125, 75, 27, 1, ''),
(126, 76, 27, 1, ''),
(127, 77, 30, 1, ''),
(128, 78, 27, 1, ''),
(129, 79, 27, 9, ''),
(130, 79, 28, 4, ''),
(131, 79, 30, 4, ''),
(132, 80, 27, 1, ''),
(133, 81, 27, 1, ''),
(134, 82, 27, 1, ''),
(135, 83, 27, 9, ''),
(136, 83, 28, 4, ''),
(137, 83, 29, 4, ''),
(138, 84, 27, 1, ''),
(139, 84, 29, 1, ''),
(140, 85, 27, 1, ''),
(141, 86, 30, 1, ''),
(142, 86, 29, 1, ''),
(143, 86, 27, 1, '不胡'),
(144, 87, 27, 1, ''),
(145, 87, 31, 1, ''),
(146, 87, 30, 1, ''),
(147, 87, 29, 1, ''),
(148, 88, 29, 1, ''),
(149, 89, 29, 1, ''),
(150, 90, 29, 9, ''),
(151, 90, 30, 9, ''),
(152, 90, 28, 9, ''),
(153, 91, 28, 7, ''),
(154, 91, 30, 1, ''),
(155, 92, 27, 5, ''),
(156, 93, 30, 1, ''),
(157, 93, 29, 1, ''),
(158, 94, 30, 1, ''),
(159, 95, 29, 9, ''),
(160, 96, 30, 8, ''),
(161, 96, 29, 5, ''),
(162, 97, 30, 6, ''),
(163, 98, 30, 1, ''),
(164, 98, 29, 1, ''),
(165, 99, 29, 1, ''),
(166, 99, 30, 2, ''),
(167, 99, 30, 1, ''),
(168, 100, 33, 4, ''),
(169, 101, 34, 1, ''),
(170, 102, 34, 1, ''),
(171, 102, 30, 5, ''),
(172, 103, 33, 2, ''),
(173, 104, 33, 1, ''),
(174, 105, 34, 1, ''),
(175, 106, 33, 1, ''),
(176, 107, 30, 1, ''),
(177, 108, 35, 1, ''),
(178, 108, 35, 1, ''),
(179, 109, 29, 1, ''),
(180, 110, 30, 1, ''),
(181, 110, 29, 1, ''),
(182, 111, 34, 10, ''),
(183, 112, 33, 1, ''),
(184, 112, 30, 1, ''),
(185, 112, 35, 1, ''),
(186, 112, 34, 1, ''),
(187, 112, 29, 1, ''),
(188, 113, 30, 5, ''),
(189, 113, 29, 4, ''),
(190, 114, 33, 1, ''),
(191, 115, 33, 1, 'defat'),
(192, 116, 33, 2, 'ddddd'),
(193, 117, 33, 2, 'null '),
(194, 118, 33, 2, '11'),
(195, 119, 33, 2, ''),
(196, 120, 45, 6, ''),
(197, 121, 44, 1, ''),
(198, 122, 43, 1, ''),
(199, 123, 45, 1, ''),
(200, 124, 34, 1, ''),
(201, 124, 38, 1, ''),
(202, 125, 41, 3, ''),
(203, 125, 35, 7, ''),
(204, 125, 46, 4, ''),
(205, 125, 33, 9, ''),
(206, 125, 36, 16, ''),
(207, 125, 39, 1, ''),
(208, 125, 37, 7, '');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `u_pass` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `u_type` tinyint(3) NOT NULL COMMENT '0:not active, 1:active, 2:admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `user`
--

INSERT INTO `user` (`u_id`, `u_name`, `u_pass`, `u_type`) VALUES
(1, 'mrtoast', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 2),
(2, 'potato', '1234', 0),
(3, 'test', '', 0),
(4, 'Yoo', '', 0),
(5, 'hey', '', 0),
(6, 'mrtoast_1', 'insidetheshop', 0),
(7, 'mrtoast_1', 'insidetheshop', 0),
(8, 'mrtoast_1', 'insidetheshop', 0),
(9, 'mrtoast_1', 'insidetheshop', 0),
(10, 'mrtoast_1', 'insidetheshop', 0),
(11, 'mrtoast_1', '818bad679ef2a462bd8076a039450f18df0bd314533285e37e16bc37ecd5234c', 0),
(12, 'test123', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 0),
(13, 'test12', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 1),
(14, 'test124', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 0),
(15, 'Papa', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `user_info`
--

CREATE TABLE `user_info` (
  `ui_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `ui_advsecurity` tinyint(1) NOT NULL,
  `ui_occupation` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ui_phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `user_info`
--

INSERT INTO `user_info` (`ui_id`, `u_id`, `ui_advsecurity`, `ui_occupation`, `ui_phone`) VALUES
(1, 1, 1, '學生', '0933592674'),
(2, 2, 0, '上班族', '921485469'),
(3, 3, 0, '學生', '933592674'),
(4, 4, 0, 'student', '95678900'),
(5, 5, 0, 'yo', '0933592674'),
(6, 11, 0, '', ''),
(7, 12, 0, '', '0933592674'),
(8, 13, 0, '', '0933592673'),
(9, 14, 0, '', '0933592674'),
(10, 15, 0, '', '0933592674');

-- --------------------------------------------------------

--
-- 資料表結構 `user_register`
--

CREATE TABLE `user_register` (
  `u_id` int(50) NOT NULL,
  `code` varchar(5) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `user_register`
--

INSERT INTO `user_register` (`u_id`, `code`, `expiration`) VALUES
(1, 'bcdf', 123),
(12, '7130', 1465608952),
(13, '8fd0', 1465612344),
(14, '36f8', 1465613195),
(15, 'b7a9', 1465613513);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `additional_item`
--
ALTER TABLE `additional_item`
  ADD PRIMARY KEY (`ai_id`);

--
-- 資料表索引 `additional_type`
--
ALTER TABLE `additional_type`
  ADD PRIMARY KEY (`at_id`);

--
-- 資料表索引 `config`
--
ALTER TABLE `config`
  ADD UNIQUE KEY `name` (`name`);

--
-- 資料表索引 `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`log_id`);

--
-- 資料表索引 `main`
--
ALTER TABLE `main`
  ADD PRIMARY KEY (`m_id`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`o_id`);

--
-- 資料表索引 `required_option`
--
ALTER TABLE `required_option`
  ADD PRIMARY KEY (`ro_id`);

--
-- 資料表索引 `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`s_id`);

--
-- 資料表索引 `sh-i_ai`
--
ALTER TABLE `sh-i_ai`
  ADD PRIMARY KEY (`sh-i_ai_id`);

--
-- 資料表索引 `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`sh_id`);

--
-- 資料表索引 `share_item`
--
ALTER TABLE `share_item`
  ADD PRIMARY KEY (`sh-i_id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`);

--
-- 資料表索引 `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`ui_id`);

--
-- 資料表索引 `user_register`
--
ALTER TABLE `user_register`
  ADD PRIMARY KEY (`u_id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `additional_item`
--
ALTER TABLE `additional_item`
  MODIFY `ai_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- 使用資料表 AUTO_INCREMENT `additional_type`
--
ALTER TABLE `additional_type`
  MODIFY `at_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- 使用資料表 AUTO_INCREMENT `log`
--
ALTER TABLE `log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- 使用資料表 AUTO_INCREMENT `main`
--
ALTER TABLE `main`
  MODIFY `m_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- 使用資料表 AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
--
-- 使用資料表 AUTO_INCREMENT `required_option`
--
ALTER TABLE `required_option`
  MODIFY `ro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- 使用資料表 AUTO_INCREMENT `series`
--
ALTER TABLE `series`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- 使用資料表 AUTO_INCREMENT `sh-i_ai`
--
ALTER TABLE `sh-i_ai`
  MODIFY `sh-i_ai_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;
--
-- 使用資料表 AUTO_INCREMENT `share`
--
ALTER TABLE `share`
  MODIFY `sh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;
--
-- 使用資料表 AUTO_INCREMENT `share_item`
--
ALTER TABLE `share_item`
  MODIFY `sh-i_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;
--
-- 使用資料表 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- 使用資料表 AUTO_INCREMENT `user_info`
--
ALTER TABLE `user_info`
  MODIFY `ui_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
