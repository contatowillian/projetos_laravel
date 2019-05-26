<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEspecialidadesMedicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('especialidades_medicos', function (Blueprint $table) {
       
            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('especialidades_id')->unsigned();
            $table->foreign('especialidades_id')->references('id')->on('especialidades');
            $table->bigInteger('medicos_id')->unsigned();
            $table->foreign('medicos_id')->references('id')->on('medicos'); 
            $table->softDeletes();

            /*
            $table->bigInteger('especialidades_id')->unsigned();
            $table->foreign('especialidades_id')->references('id')->on('especialidades'); */


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('especialidades_medicos');
    }
}
