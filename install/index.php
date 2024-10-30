<?php
session_start();
header('Content-Type: text/html; charset=utf-8');

$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;
$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($step === 1) {
        // Validate database connection
        $host = $_POST['db_host'];
        $user = $_POST['db_user'];
        $pass = $_POST['db_password'];
        $name = $_POST['db_name'];
        
        try {
            $conn = new mysqli($host, $user, $pass, $name);
            if ($conn->connect_error) {
                throw new Exception("Connection failed: " . $conn->connect_error);
            }
            
            $_SESSION['db_config'] = [
                'host' => $host,
                'user' => $user,
                'pass' => $pass,
                'name' => $name
            ];
            
            header('Location: index.php?step=2');
            exit;
        } catch (Exception $e) {
            $error = $e->getMessage();
        }
    } elseif ($step === 2) {
        // Save admin and app configuration
        $_SESSION['admin_config'] = [
            'email' => $_POST['admin_email'],
            'password' => $_POST['admin_password']
        ];
        $_SESSION['app_config'] = [
            'jwt_secret' => bin2hex(random_bytes(32)),
            'cloudinary_name' => $_POST['cloudinary_name'],
            'cloudinary_key' => $_POST['cloudinary_key'],
            'cloudinary_secret' => $_POST['cloudinary_secret']
        ];
        
        header('Location: index.php?step=3');
        exit;
    } elseif ($step === 3) {
        try {
            // Create .env file
            $env_content = "DB_HOST={$_SESSION['db_config']['host']}\n";
            $env_content .= "DB_USER={$_SESSION['db_config']['user']}\n";
            $env_content .= "DB_PASSWORD={$_SESSION['db_config']['pass']}\n";
            $env_content .= "DB_NAME={$_SESSION['db_config']['name']}\n";
            $env_content .= "ADMIN_EMAIL={$_SESSION['admin_config']['email']}\n";
            $env_content .= "ADMIN_PASSWORD={$_SESSION['admin_config']['password']}\n";
            $env_content .= "JWT_SECRET={$_SESSION['app_config']['jwt_secret']}\n";
            $env_content .= "CLOUDINARY_CLOUD_NAME={$_SESSION['app_config']['cloudinary_name']}\n";
            $env_content .= "CLOUDINARY_API_KEY={$_SESSION['app_config']['cloudinary_key']}\n";
            $env_content .= "CLOUDINARY_API_SECRET={$_SESSION['app_config']['cloudinary_secret']}\n";
            
            file_put_contents('../.env', $env_content);
            
            // Run npm install and setup commands
            exec('cd .. && npm install && npm run install-cpanel 2>&1', $output, $return_var);
            
            if ($return_var !== 0) {
                throw new Exception("Installation failed: " . implode("\n", $output));
            }
            
            // Create an installation complete file
            file_put_contents('../.installation_complete', date('Y-m-d H:i:s'));
            
            // Cleanup session
            session_destroy();
            
            $success = "Installation completed successfully!";
        } catch (Exception $e) {
            $error = $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RUF Nation - Installation</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="max-w-2xl mx-auto py-12 px-4">
        <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="flex items-center justify-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900">RUF Nation Installation</h1>
            </div>

            <?php if ($error): ?>
                <div class="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <?php if ($success): ?>
                <div class="bg-green-50 text-green-600 p-4 rounded-md mb-6">
                    <?php echo htmlspecialchars($success); ?>
                </div>
            <?php endif; ?>

            <?php if ($step === 1): ?>
                <form method="POST" class="space-y-6">
                    <div>
                        <h2 class="text-xl font-semibold mb-4">Database Configuration</h2>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Database Host</label>
                                <input type="text" name="db_host" value="localhost" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Database Name</label>
                                <input type="text" name="db_name" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Database User</label>
                                <input type="text" name="db_user" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Database Password</label>
                                <input type="password" name="db_password" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Next Step
                    </button>
                </form>

            <?php elseif ($step === 2): ?>
                <form method="POST" class="space-y-6">
                    <div>
                        <h2 class="text-xl font-semibold mb-4">Admin Account</h2>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Admin Email</label>
                                <input type="email" name="admin_email" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Admin Password</label>
                                <input type="password" name="admin_password" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold mb-4">Cloudinary Configuration</h2>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Cloud Name</label>
                                <input type="text" name="cloudinary_name" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">API Key</label>
                                <input type="text" name="cloudinary_key" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">API Secret</label>
                                <input type="password" name="cloudinary_secret" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                            </div>
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Next Step
                    </button>
                </form>

            <?php elseif ($step === 3): ?>
                <form method="POST" class="space-y-6">
                    <div class="text-center">
                        <h2 class="text-xl font-semibold mb-4">Ready to Install</h2>
                        <p class="text-gray-600 mb-6">All configuration is complete. Click the button below to install the application.</p>
                        <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Install Now
                        </button>
                    </div>
                </form>

            <?php endif; ?>

            <?php if ($success): ?>
                <div class="mt-6 text-center">
                    <a href="../admin/login" class="text-red-600 hover:text-red-500">
                        Go to Admin Login
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>