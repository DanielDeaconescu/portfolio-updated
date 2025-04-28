<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Load PHPMailer via Composer

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Cloudflare Turnstile secret key
    $secretKey = "0x4AAAAAAA90SZK5VoYXPF1ziJw4c1zwncQ"; // Replace with your Cloudflare Turnstile secret key
    $token = $_POST["cf-turnstile-response"] ?? '';

    if (!$token) {
        die("CAPTCHA verification failed: No token provided.");
    }

    // Verify Turnstile token with Cloudflare
    $url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    $data = [
        "secret" => $secretKey,
        "response" => $token
    ];

    $options = [
        "http" => [
            "header"  => "Content-Type: application/x-www-form-urlencoded\r\n",
            "method"  => "POST",
            "content" => http_build_query($data),
        ],
    ];

    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $verification = json_decode($result, true);

    if (!$verification["success"]) {
        die("CAPTCHA verification failed. Please try again.");
    }

    // CAPTCHA passed - Process the form
    $fullName = htmlspecialchars($_POST["full-name"]);
    $companyName = htmlspecialchars($_POST["company-name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address.");
    }

    // Send email using PHPMailer
    $mail = new PHPMailer(true);
    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'mail.danieldeaconescu.com'; // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'contact@danieldeaconescu.com'; // Your email address
        $mail->Password = 'contactPassword!23'; // Your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use 'ssl' or 'tls'
        $mail->Port = 465; // Use 465 for SSL, 587 for TLS

        // Email settings
        $mail->setFrom($email, $fullName);
        $mail->addAddress('contact@danieldeaconescu.com', 'Daniel Dev Website'); // Replace with your email
        $mail->Subject = "New Contact Form Submission from $fullName";
        $mail->Body = "Full Name: $fullName\nCompany Name: $companyName\nEmail: $email\n\nMessage:\n$message";

        if ($mail->send()) {
            echo "Your message has been sent successfully!";
        } else {
            echo "Failed to send message. Please try again.";
        }
    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
} else {
    echo "Invalid request.";
}
?>
