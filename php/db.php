<?php
class DB
{
    private $address = '127.0.0.1';
    private $login = 'root';
    private $pass = '';
    private $db1 = 'variants';
    private $mysql;

    function __construct()
    {
        $this->mysql = new mysqli($this->address, $this->login, $this->pass, $this->db1);
        if ($this->mysql->connect_error) {
            die("Connection to db1 failed: " . $this->mysql->connect_error);
        }
    }

    function fillingAnArray($table)
    {
        $dbObj = $this->mysql->query('SELECT * FROM ' . $table);
        $result = [];
        $setConfig = [];
        while ($row = $dbObj->fetch_assoc()) {
            $result[] = $row;
        }

        foreach ($result as $res) {
            $setConfig[$res['id']] = array(
                "variants" => explode("/", $res['variant']),
                "answer" => $res['result'],
                "type" => $res['type']
            );
        }
        $json_data = json_encode($setConfig);

        echo $json_data;
    }
}

$DB = new DB();
$DB->fillingAnArray('variants_table');
