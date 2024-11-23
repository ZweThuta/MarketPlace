<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include("dbConnect.php");

class UserController {
    private $conn;

    public function __construct() {
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    public function login($loginData) {
        try {
            // Check if email and password are provided
            if (empty($loginData['email']) || empty($loginData['password'])) {
                return $this->response(0, 'Email and password are required!');
            }

            // Get user data from the database
            $sql = "SELECT * FROM users WHERE email = :email";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(":email", $loginData['email']);
            $stmt->execute();

            // Check if user exists
            if ($stmt->rowCount() == 0) {
                return $this->response(0, 'Invalid email or password!');
            }

            // Fetch user data
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify the password
            if (password_verify($loginData['password'], $user['password'])) {
                return $this->response(1, 'Login successful!', ['userId' => $user['id'], 'name' => $user['name']]);
            } else {
                return $this->response(0, 'Invalid email or password!');
            }
        } catch (PDOException $e) {
            return $this->response(0, 'Database error: ' . $e->getMessage());
        }
    }

    private function response($status, $message, $data = null) {
        return json_encode(['status' => $status, 'message' => $message, 'data' => $data]);
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$userController = new UserController();

switch ($method) {
    case 'POST':
        $loginData = json_decode(file_get_contents('php://input'), true);
        echo $userController->login($loginData);
        break;
}
?>