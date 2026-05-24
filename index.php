<?php

use App\Kernel;

// Проверяем, есть ли файл
$autoloadFile = __DIR__.'/vendor/autoload_runtime.php';
if (!file_exists($autoloadFile)) {
    die('Файл не найден: ' . $autoloadFile . '<br>Текущая директория: ' . __DIR__);
}

require_once $autoloadFile;

return static function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};