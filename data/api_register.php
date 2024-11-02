<?php
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_SERVER['PATH_INFO']) ? explode('/', trim($_SERVER['PATH_INFO'],'/')) : [];
$input = json_decode(file_get_contents('php://input'),true);

// connect to the mysql database, provide the appropriate credentials
$conn = mysqli_connect('feenix-mariadb.swin.edu.au', 's103806434', '110503', 's103806434_db');

mysqli_set_charset($conn,'utf8');

// initialise the table name accordingly
$table = "users";

// retrieve the search key field name and value from the path
$fld = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);

// retrieve the data to prepare set values
if (isset ($input))  {
	$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
	$values = array_map(function ($value) use ($conn) {
		if ($value===null) return null;
		return mysqli_real_escape_string($conn,(string)$value);
	},array_values($input));

	$set = '';
	for ($i=0;$i<count($columns);$i++) {
		$set.=($i>0?',':'').'`'.$columns[$i].'`=';
		$set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
	}
}

// create SQL
switch ($method) {
  case 'POST':
    $check_sql = "SELECT * FROM `$table` WHERE username='" . $input['username'] . "'";
    $check_result = mysqli_query($conn, $check_sql);
    if (mysqli_num_rows($check_result) > 0) {
        echo json_encode(["message" => "Username already exists"]);
    } else {
        $sql = "INSERT INTO `$table` SET $set";
        $result = mysqli_query($conn, $sql);
        if ($result) {
            echo json_encode(["message" => "User registered successfully"]);
        } else {
            echo json_encode(["message" => "User registration failed"]);
        }
    }
    break;
}

// execute SQL statement


// close mysql connection
mysqli_close($conn);
?>
