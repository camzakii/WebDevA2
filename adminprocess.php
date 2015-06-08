<?php

    include_once("settings.php");
	
    //Connect to database
    $dbconn = mysqli_connect($host, $user, $pswd, $dbnm);
    //If db failed display error
    if (!$dbconn) {
        print'PHP could not connect to database server';
        exit;
    }
	
    //Set the timezone
	date_default_timezone_set('NZ');
	//Get current date and time
	$dateTime = date("Y-m-d H:i:s");
	//Get a new date
	$timeAhead = new DateTime($dateTime);
	//And set it 2 hours ahead of now
	$timeAhead->modify('+2 hour');
	//Set to datetime format
	$timeAhead = $timeAhead->format('Y-m-d H:i:s');
	//new line
	echo "<br>";
	//Select rows where status is unassigned, and the not before now and not past 2 hours order results by oldest to newest
    $sql = "SELECT * FROM carstable where status='unassigned' and pickuptime >= '$dateTime' && pickuptime <= '$timeAhead' ORDER BY pickuptime";
    //Execute query
    $result = mysqli_query($dbconn, $sql) or die(mysqli_error($dbconn));
    //Get number of rows
    $rowCount = mysqli_num_rows($result);
    //If there is a result
    if ($rowCount > 0) {
        //Create table
   		//And top row
		echo "<table><tr>
			<td><strong>Reference number</strong></td>
			<td><strong>Contact Name</strong></td>
			<td><strong>Contact Number</strong></td>
			<td><strong>Pick-up</strong></td>
			<td><strong>Destination</strong></td>
			<td><strong>Date</strong></td>
			<td><strong>Time</strong></td>
		  	</tr>";
		//Looop through each row
        while($row = mysqli_fetch_assoc($result)) {
			//Add new row and column
			//Add each piece of information from the booking 
			echo "<tr>";
			echo "<td>#" . $row["code"]. "</td><td>" . $row["name"]. "</td>";
			echo "<td>" . $row["phone"] . "</td><td>" . $row["suburb"] . "</td>";
			echo "<td>" . $row["destination"] . "</td><td>" . $row["dates"] . "</td>";
			echo "<td>" . $row["times"] . "</td>";
			echo "</tr>";
        }
		echo "</table>";
    } 
    //Close db connection
    mysqli_close($dbconn);

?>