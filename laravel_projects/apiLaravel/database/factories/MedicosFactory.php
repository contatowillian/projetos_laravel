<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Medicos;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Medicos::class, function (Faker $faker) {

	//coloca o idioma em português
	$faker = \Faker\Factory::create('pt_BR');
	$random_crm = rand(10000000000,99999999999);
    return [
        'nome' => $faker->name,
        'crm' => $random_crm,
        'telefone' => $faker->phoneNumber,
        'status' => 0,
    ];
});



