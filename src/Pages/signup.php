<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$pdo = new PDO("mysql:host=localhost;dbname=StudySync", "root", "mona2002");

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// تحقق إذا الإيميل مسجل
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["success" => false, "message" => "Email already exists."]);
    exit;
}

// حفظ المستخدم
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$insert = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$success = $insert->execute([$username, $email, $hashedPassword]);

echo json_encode([
    "success" => $success,
    "message" => $success ? "Signup successful!" : "Signup failed."
]);
