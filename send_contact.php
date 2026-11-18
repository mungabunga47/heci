<?php

$config = include __DIR__ . 'config.php'; 


if (!empty($_POST['website'])) {
    
    http_response_code(400);
    exit('Bad Request');
}


$fullName = isset($_POST['full_name']) ? trim($_POST['full_name']) : '';
$email    = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : false;
$phone    = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$message  = isset($_POST['message']) ? trim($_POST['message']) : '';

$errors = [];
if ($fullName === '') $errors[] = 'Ad Soyad gerekli.';
if ($email === false) $errors[] = 'Geçerli bir e-posta girin.';
if ($phone === '') $errors[] = 'Telefon gerekli.';
if ($message === '') $errors[] = 'Mesaj gerekli.';

if (!empty($errors)) {
    http_response_code(400);
    echo implode("\n", $errors);
    exit;
}


$body = "Yeni iletişim formu kaydı:\n\n".
        "Ad Soyad: $fullName\n".
        "E-posta: $email\n".
        "Telefon: $phone\n".
        "Mesaj:\n$message\n";


$to      = $config['recipient'];
$subject = $config['subject'];
$headers = "From: $fullName <$email>\r\n" .
           "Reply-To: $email\r\n" .
           "Content-Type: text/plain; charset=UTF-8";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo "Mesajınız başarıyla iletildi. Teşekkürler!";
} else {
    http_response_code(500);
    echo "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
}