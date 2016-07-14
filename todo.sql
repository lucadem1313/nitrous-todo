-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2016 at 05:59 AM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `list-items`
--

CREATE TABLE `list-items` (
  `id` int(11) NOT NULL,
  `done` tinyint(1) NOT NULL,
  `level` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `text` text NOT NULL,
  `number` int(11) NOT NULL,
  `date-created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `listid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `list-items`
--

INSERT INTO `list-items` (`id`, `done`, `level`, `title`, `text`, `number`, `date-created`, `listid`) VALUES
(1, 0, 1, 'Something to do', 'I need to do this, but not that badly.', 1, '2016-07-11 18:32:11', 1),
(2, 0, 1, 'Item 1', 'Here is something to do!', 0, '2016-07-11 22:48:32', 51),
(3, 1, 1, 'Item 2', 'Here is something I''ve done!', 1, '2016-07-11 22:48:32', 51),
(4, 0, 1, 'Item 3', 'Here is something important!', 2, '2016-07-11 22:48:32', 51),
(9, 0, 1, 'Item Title', 'Something to do...', 0, '2016-07-11 23:31:32', 62),
(10, 0, 1, 'Item 1', 'Here is something to do!', 1, '2016-07-11 23:31:32', 62),
(11, 1, 1, 'Item 2', 'Here is something I''ve done!', 2, '2016-07-11 23:31:32', 62),
(12, 0, 1, 'Item 3', 'Here is something important!', 3, '2016-07-11 23:31:32', 62),
(13, 0, 1, 'Item Title', 'Something to do...', 0, '2016-07-11 23:33:36', 61),
(14, 0, 1, 'Item 1', 'Here is something to do!', 1, '2016-07-11 23:33:36', 61),
(15, 1, 1, 'Item 2', 'Here is something I''ve done!', 2, '2016-07-11 23:33:36', 61),
(16, 0, 1, 'Item 3', 'Here is something important!', 3, '2016-07-11 23:33:36', 61);

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `user` int(11) NOT NULL,
  `date-created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last-updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `urlid` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `title`, `user`, `date-created`, `last-updated`, `urlid`) VALUES
(1, 'asdfasdf', 1, '2016-07-11 18:13:45', '2016-07-11 22:13:45', 'asdf'),
(6, 'To-Do', 1, '2016-07-11 20:47:53', '2016-07-12 00:47:53', 'D4F17C0E1CEC71C'),
(7, 'To-Do', 1, '2016-07-11 20:50:39', '2016-07-12 00:50:39', '4D27B63'),
(8, 'To-Do', 1, '2016-07-11 20:51:23', '2016-07-12 00:51:23', '1A74ABB1BB9'),
(9, 'To-Do', 1, '2016-07-11 20:51:26', '2016-07-12 00:51:26', '7D4E99BC'),
(10, 'To-Do', 1, '2016-07-11 20:53:26', '2016-07-12 00:53:26', '74B0ADBED5'),
(11, 'To-Do', 1, '2016-07-11 21:15:03', '2016-07-12 01:15:03', 'C8EA37DBC0D80'),
(12, 'To-Do', 1, '2016-07-11 21:15:41', '2016-07-12 01:15:41', '758D39F8C'),
(13, 'To-Do', 1, '2016-07-11 21:16:13', '2016-07-12 01:16:13', '5C97B3B'),
(14, 'To-Do', 1, '2016-07-11 21:17:43', '2016-07-12 01:17:43', 'BEDCF'),
(15, 'To-Do', 1, '2016-07-11 21:18:16', '2016-07-12 01:18:16', '5DF74BF4E92'),
(16, 'To-Do', 1, '2016-07-11 21:19:50', '2016-07-12 01:19:50', '551520BCA8F4'),
(17, 'To-Do', 1, '2016-07-11 21:23:57', '2016-07-12 01:23:57', '712596C6AB'),
(18, 'To-Do', 1, '2016-07-11 21:25:54', '2016-07-12 01:25:54', '72237'),
(19, 'To-Do', 1, '2016-07-11 21:26:56', '2016-07-12 01:26:56', '5177E0316FD'),
(20, 'To-Do', 1, '2016-07-11 21:27:37', '2016-07-12 01:27:37', '13496E50183E481'),
(21, 'To-Do', 1, '2016-07-11 21:29:34', '2016-07-12 01:29:34', '875FF73'),
(22, 'To-Do', 1, '2016-07-11 21:54:30', '2016-07-12 01:54:30', 'D172A767'),
(23, 'To-Do', 1, '2016-07-11 21:57:06', '2016-07-12 01:57:06', '279B00B73B1EC'),
(24, 'To-Do', 1, '2016-07-11 21:57:47', '2016-07-12 01:57:47', '3D42043A'),
(25, 'To-Do', 1, '2016-07-11 22:10:47', '2016-07-12 02:10:47', '1F48D6E5A'),
(26, 'To-Do', 1, '2016-07-11 22:18:40', '2016-07-12 02:18:40', '3C483680069618'),
(27, 'To-Do', 1, '2016-07-11 22:19:05', '2016-07-12 02:19:05', '55CEF'),
(28, 'To-Do', 1, '2016-07-11 22:20:32', '2016-07-12 02:20:32', 'F2B0F1A07'),
(29, 'To-Do', 1, '2016-07-11 22:22:56', '2016-07-12 02:22:56', '3EAD00DA88'),
(30, 'To-Do', 1, '2016-07-11 22:24:52', '2016-07-12 02:24:52', 'BF5C205'),
(31, 'To-Do', 1, '2016-07-11 22:25:34', '2016-07-12 02:25:34', 'ED7708'),
(32, 'To-Do', 1, '2016-07-11 22:26:22', '2016-07-12 02:26:22', 'E354BCBD2434'),
(33, 'To-Do', 1, '2016-07-11 22:27:09', '2016-07-12 02:27:09', '3A595'),
(34, 'To-Do', 1, '2016-07-11 22:27:46', '2016-07-12 02:27:46', 'C6DBB624A'),
(35, 'To-Do', 1, '2016-07-11 22:28:14', '2016-07-12 02:28:14', '28AA0A1'),
(36, 'To-Do', 1, '2016-07-11 22:28:43', '2016-07-12 02:28:43', 'F88FF7E'),
(37, 'To-Do', 1, '2016-07-11 22:29:54', '2016-07-12 02:29:54', '92D01F4FDA5'),
(38, 'To-Do', 1, '2016-07-11 22:32:14', '2016-07-12 02:32:14', '30313B17C18'),
(39, 'To-Do', 1, '2016-07-11 22:32:55', '2016-07-12 02:32:55', '3E65BB7C'),
(40, 'To-Do', 1, '2016-07-11 22:34:21', '2016-07-12 02:34:21', '2DEA47BCF'),
(41, 'To-Do', 1, '2016-07-11 22:35:47', '2016-07-12 02:35:47', '36BD33EC'),
(42, 'To-Do', 1, '2016-07-11 22:36:24', '2016-07-12 02:36:24', 'C927FE68775'),
(43, 'To-Do', 1, '2016-07-11 22:38:12', '2016-07-12 02:38:12', 'AFF908639'),
(44, 'To-Do', 1, '2016-07-11 22:38:40', '2016-07-12 02:38:40', '0288EBF1618CF'),
(45, 'To-Do', 1, '2016-07-11 22:42:41', '2016-07-12 02:42:41', '69E8A82072CAC'),
(46, 'To-Do', 1, '2016-07-11 22:43:13', '2016-07-12 02:43:13', '6112E13EB'),
(47, 'To-Do', 1, '2016-07-11 22:43:32', '2016-07-12 02:43:32', 'EC8A0988FA4D625'),
(48, 'To-Do', 1, '2016-07-11 22:44:56', '2016-07-12 02:44:56', '126B24D0DF'),
(49, 'To-Do', 1, '2016-07-11 22:45:23', '2016-07-12 02:45:23', 'F0723F23B15'),
(50, 'To-Do', 1, '2016-07-11 22:47:22', '2016-07-12 02:47:22', '01F93'),
(51, 'To-Do', 1, '2016-07-11 22:48:32', '2016-07-12 02:48:32', 'B26B0903164A2'),
(52, 'To-Do', 1, '2016-07-11 23:16:22', '2016-07-12 03:16:22', 'C50732CC'),
(53, 'To-Do', 1, '2016-07-11 23:16:49', '2016-07-12 03:16:49', 'BDE4280A0'),
(54, 'To-Do', 1, '2016-07-11 23:17:48', '2016-07-12 03:17:48', '9ADD25'),
(55, 'To-Do', 1, '2016-07-11 23:22:12', '2016-07-12 03:22:12', 'A09B6381'),
(56, 'To-Do', 1, '2016-07-11 23:23:46', '2016-07-12 03:23:46', 'E0A4BC'),
(57, 'To-Do', 1, '2016-07-11 23:24:45', '2016-07-12 03:24:45', 'E22B8C879'),
(58, 'To-Do', 1, '2016-07-11 23:25:56', '2016-07-12 03:25:56', '9C8E54'),
(59, 'To-Do', 1, '2016-07-11 23:28:16', '2016-07-12 03:28:16', 'BF46C8'),
(60, 'To-Do', 1, '2016-07-11 23:28:51', '2016-07-12 03:28:51', '2D73B'),
(61, 'To-Do', 1, '2016-07-11 23:29:50', '2016-07-12 03:29:50', 'CA63A43CCE60'),
(62, 'To-Do', 1, '2016-07-11 23:31:32', '2016-07-12 03:31:32', '3D96026C');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `datejoined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastactive` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `datejoined`, `lastactive`, `email`) VALUES
(1, 'lucadem1313', '1', '2016-07-11 18:42:08', '2016-07-11 22:42:08', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `list-items`
--
ALTER TABLE `list-items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `list-items`
--
ALTER TABLE `list-items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
