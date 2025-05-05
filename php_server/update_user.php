<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? null;
$username = $data["username"] ?? null;
$email = $data["email"] ?? null;
$notification = $data["notification"] ?? null;

if (!$id || !$username || !$email || !$notification) {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit;
}

$stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, notification = ? WHERE id = ?");
$success = $stmt->execute([$username, $email, $notification, $id]);

if ($success) {
    $stmt = $pdo->prepare("SELECT id, username, email, notification FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $updatedUser = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "message" => "User updated successfully.",
        "user" => $updatedUser
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update user."]);
}
