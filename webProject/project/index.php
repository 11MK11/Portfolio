<?php 
    $servername = "localhost";
    $username = "root";
    $password = "";	
    $dbname = "dbproject";

    $conn = new mysqli ($servername, $username, $password, $dbname);

    if ($conn->connect_error)
    {
        echo "Error: " . $stmt->error;
    } 

    $sql = "INSERT INTO dbproject (FirstName, LastName, EmailAddress, BusinessName, PhoneNumber, ReasonForContacting, Messages) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $_POST["name"], $_POST["surname"], $_POST["email"], $_POST["business"], $_POST["phone"], $_POST["inquiryType"], $_POST["details"]);

    if ($stmt->execute()) 
    {
        echo "New record created successfully";
    } else 
    {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();


?>