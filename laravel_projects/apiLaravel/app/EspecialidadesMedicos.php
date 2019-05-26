<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EspecialidadesMedicos extends Model
{
     use SoftDeletes;

   protected $table = 'especialidades_medicos';
   protected $primaryKey = 'id';
   protected $fillable = ['especialidades_id','medicos_id'];
   protected $dates = ['deleted_at'];
}
