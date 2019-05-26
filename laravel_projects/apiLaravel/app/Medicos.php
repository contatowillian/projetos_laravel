<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medicos extends Model
{
   use SoftDeletes;

   protected $table = 'medicos';
   protected $primaryKey = 'id';
   protected $fillable = ['nome','crm','telefone','especialidades_id'];
   protected $dates = ['deleted_at'];

}
