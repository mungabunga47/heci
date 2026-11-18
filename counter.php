<?php
header('Content-Type: application/json');

$file = __DIR__ . 'counter.json';
if (!file_exists($file)) {
    file_put_contents($file, json_encode(['count' => 0]));
}

$data = json_decode(file_get_contents($file), true);
if (!$data || !isset($data['count'])) {
    $data = ['count' => 0];
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    $data['count'] = (int)$data['count'] + 1;
    file_put_contents($file, json_encode($data));
}

echo json_encode(['count' => (int)$data['count']]);
?>
