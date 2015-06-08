<?php
	//Post fields
	$custname = $_POST['custname'];
	$phone = $_POST['phone'];
	$unitno = $_POST['unitno'];
	$streetno = $_POST['streetno'];
	$streetname = $_POST['streetname'];
	$suburb = $_POST['suburb'];
	$destination = $_POST['destination'];
	$pickupdate = $_POST['pickupdate'];
	$pickuptime = $_POST['pickuptime'];
	$ampm = $_POST['ampm'];
	//Convert time and date
	$pickuptime = date("H:i", strtotime($pickuptime));
		
	//connect to Database
	require_once ("settings.php"); 
	$dbconn = mysqli_connect($host, $user, $pswd , $dbnm); 
	if (!$dbconn) { 
		print'PHP could not connect to database server'; 
		exit;
	} 
	
	//Check is table exist
	$val = mysqli_query($dbconn, "select 1 from cabstable");
	
	if(!$val)
	{
	   //Create the table
	   $table_sql = "CREATE TABLE IF NOT EXISTS cabstable (reference int(11) PRIMARY KEY AUTO_INCREMENT, custname varchar(25) NOT NULL, phone int(25) NOT NULL, unitno int(11), streetno int(11) NOT NULL, streetname varchar(25) NOT NULL, suburb varchar(25) NOT NULL, destination varchar(25) NOT NULL, pickupdate varchar(25) NOT NULL, pickuptime varchar(25) NOT NULL, ampm varchar(2) NOT NULL, status varchar(25) NOT NULL)";
	   
	   //Query to create table is doesn't exist
		mysqli_query($dbconn, $table_sql) or die(mysqli_error($dbconn));
	}
	
	//Post into database
	$post_sql = "INSERT INTO cabstable(custname, phone, unitno, streetno, streetname, suburb, destination, pickupdate, pickuptime, ampm, status) VALUES ('$custname', '$phone', '$unitno', '$streetno', '$streetname', '$suburb', '$destination', '$pickupdate', '$pickuptime', '$ampm', 'unassigned')";
	
	$reference = 1;
	$ref = "SELECT reference FROM cabstable ORDER BY reference DESC LIMIT 1";
	$ref_query = mysqli_query($dbconn, $ref) or die(mysqli_error($dbconn));
	$rowCount = mysqli_num_rows($ref_query);
	if($rowCount > 0)
	{
		//Get the last booking number
		$row = mysqli_fetch_assoc($ref_query);
		//lastr booking number + 1
		$reference += $row["reference"];
		
	}
	
	
	//Execute insert query
	$post_Query = mysqli_query($dbconn, $post_sql) or die(mysqli_error($dbconn));
	
	//If post is success
	if($post_Query)
	{
		//Tell the user success and givve reference number and date and time
		
		echo "Booking requested!<br>Your reference number is #" . "<b>". $reference . "<br>" . "<br>";
		echo "Your pick-up date is " . $pickupdate . "<br>";
		echo "Your pick-up time is " . $pickuptime . $ampm . "<br>";
		
	} 
	//Close connection
	mysqli_close($dbconn);
	
?>