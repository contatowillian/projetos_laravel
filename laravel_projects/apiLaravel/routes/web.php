<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/* Chama a home do sistema caso entre na raiz da pasta */
Route::get('/', 'HomeController@index');

Auth::routes();

/* Chama a home do sistema*/
Route::get('/home', 'HomeController@index')->name('home');

/* Chama o cadastro de medicos*/
Route::get('/cadastrar_medico', 'MedicosController@cadastro_medico')->name('Cadastro de Médicos');

/* Chama o caadastro de medicos*/
Route::get('/pesquisar_medico', 'MedicosController@pesquisa_medico')->name('Pesquisa de Médicos');


//abaixo são as chamadas da API
Route::get('/api/v1/medicos/{id?}', 'MedicosController@index');
Route::post('/api/v1/medicos', 'MedicosController@store');
Route::post('/api/v1/medicos/{id}', 'MedicosController@update');
Route::delete('/api/v1/medicos/{id}', 'MedicosController@destroy');
