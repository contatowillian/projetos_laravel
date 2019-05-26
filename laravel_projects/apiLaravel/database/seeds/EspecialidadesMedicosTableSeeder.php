<?php

use Illuminate\Database\Seeder;
use App\Medicos;
use App\Especialidades;
use App\EspecialidadesMedicos;

class EspecialidadesMedicosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
        // perguntas quantas especialidade precisa
        $numero_de_especialidades = (int)$this->command->ask('Quantas especialidades cada médico vai ter ?', 10);

        //pega  a listas de médicos
        $lista_medicos = Medicos::get();
      
        //faz o looping na lista de médicos
        foreach($lista_medicos as $medicos){

        	// pega as especialidades randomicamente
        	$lista_especialidades =Especialidades::whereNull('deleted_at')->inRandomOrder()->take($numero_de_especialidades)->get();


			foreach($lista_especialidades as $especialidade){
				EspecialidadesMedicos::create([
	            'medicos_id' => $medicos->id,
	            'especialidades_id' => $especialidade->id,
	        	]);
			}
        }
       // $this->command->info('Users and Films Created!');
    }
}
