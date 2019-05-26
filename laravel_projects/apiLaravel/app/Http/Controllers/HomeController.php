<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Medicos;
use App\Especialidades;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $retorno_view['qtd_medicos'] =  Medicos::all();
        $retorno_view['qtd_especialidades'] =  Especialidades::all();

        return view('home',compact('retorno_view'));
    }
}
