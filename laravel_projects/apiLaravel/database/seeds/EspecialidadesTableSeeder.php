<?php

use Illuminate\Database\Seeder;
use App\Especialidades;

class EspecialidadesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Aqui fica a lista de especialidades
    	$array_especialidades = array( "ALERGOLOGIA"        
										,"ANGIOLOGIA"
										,"BUCO MAXILO"
										,"CARDIOLOGIA CLÍNICA"
										,"CARDIOLOGIA INFANTIL"
										,"CIRURGIA CABEÇA E PESCOÇO"
										,"CIRURGIA CARDÍACA"
										,"CIRURGIA DE CABEÇA/PESCOÇO"
										,"CIRURGIA DE TÓRAX"
										,"CIRURGIA GERAL"
										,"CIRURGIA PEDIÁTRICA"
										,"CIRURGIA PLÁSTICA"
										,"CIRURGIA TORÁCICA"
										,"CIRURGIA VASCULAR"
										,"CLÍNICA MÉDICA");

    	foreach ($array_especialidades as $especialidade ) {
    		Especialidades::create([
	            'nome'      => $especialidade
	        ]);
    	}
    }
}
