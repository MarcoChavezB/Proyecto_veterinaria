<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitecc0813df0ffde57a8a968677dbc3e2a
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitecc0813df0ffde57a8a968677dbc3e2a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitecc0813df0ffde57a8a968677dbc3e2a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitecc0813df0ffde57a8a968677dbc3e2a::$classMap;

        }, null, ClassLoader::class);
    }
}
