<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Especialidades extends Model
{
   use SoftDeletes;
 
   protected $fillable = ['nome'];

   protected $dates = ['deleted_at'];
}
