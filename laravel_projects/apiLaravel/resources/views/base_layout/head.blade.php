<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }}</title>
    <meta name="description" content="Sufee Admin - HTML5 Admin Template">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <link rel="apple-touch-icon" href="apple-icon.png">
    <link rel="shortcut icon" href="{{ URL::asset('imagens/favicon.ico')}}">
    <link rel="stylesheet" href="{{ URL::asset('base_layout/bootstrap/dist/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('base_layout/font-awesome/css/font-awesome.min.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('base_layout/themify-icons/css/themify-icons.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('base_layout/flag-icon-css/css/flag-icon.min.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('base_layout/selectFX/css/cs-skin-elastic.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('css/style.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('css/style_mobile.css')}}">
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap-switch.css')}}">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>
    <script src="{{ URL::asset('js/jquery-3.3.1.slim.min.js')}}"></script>
    <script src="{{ URL::asset('js/jquery.mask.js')}}"></script>
    <script src="{{ URL::asset('js/valida_sessao_expirada.js')}}"></script>
    <script src="{{ URL::asset('js/bootstrap-switch.js')}}"></script>
    <script src="{{ URL::asset('js/funcoes_barra_header.js')}}"></script>
</head>