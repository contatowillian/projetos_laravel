<?php

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	$numero_de_medicos = (int)$this->command->ask('Quantos médicos você quer inserir ?', 10);
    	$numero_de_usuarios = (int)$this->command->ask('Quantos usuários você quer inserir ?', 10);

	    factory(\App\User::class, $numero_de_usuarios)->create();
	    $this->call(EspecialidadesTableSeeder::class);
	    factory(\App\Medicos::class, $numero_de_medicos)->create();
	    $this->call(EspecialidadesMedicosTableSeeder::class);
	 
    }
}
