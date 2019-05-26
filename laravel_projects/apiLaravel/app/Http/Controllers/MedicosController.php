<?php
namespace App;
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Medicos;
use App\Especialidades;
use App\EspecialidadesMedicos;


/************** Class da API e do Crud do médico ****************/
class MedicosController extends Controller
{

	 
	/**
	  * Exibir uma listagem dos registros
	  *
	  * @return Response
	  */
	public function index(Request $request, $id = null) {
	     
	  /**********faz os filtros condicionais**********************/
	  $dados = $request->all();

	  if(!isset($dados['status'])){
	  	$status = 0;
	  }else{
	  	$status = $dados['status'];
	  }

	  if(!isset($dados['filtro'])){
	  	$filtro = '';
	  }else{
	  	$filtro = $dados['filtro'];
	  }

	  if(!isset($dados['limite'])){
	  	$limite = '9999999999999';
	  }else{
	  	$limite = $dados['limite'];
	  }

	  if(!isset($dados['pagina'])){
	  	$pagina = '1';
	  }else{
	  	$pagina = $dados['pagina'];
	  }
	 
	  $pagina = $pagina-1;
	  $offset = $pagina * $limite;
	  /**********faz os filtros condicionais**********************/


	  /******* comeca a montar a query **************************/
	  $query = new Medicos;

	   //monta a query
       $lista_medicos['lista'] = $query->select('medicos.nome', 'medicos.crm' ,'medicos.telefone','medicos.id','medicos.status')
       									->selectraw("(SELECT GROUP_CONCAT(COALESCE(`especialidades`.`nome`,'') SEPARATOR ' , ') AS `lista_especialidades`
											FROM `especialidades`
											JOIN `especialidades_medicos` ON `especialidades_medicos`.`especialidades_id` = `especialidades`.`id` 
											WHERE especialidades_medicos.medicos_id = medicos.id
											LIMIT 1) as lista_especialidades ")
				    					->orderBy('medicos.nome', 'asc')
				    					/*->Where('tb_usuarios.status', '=', $status)*/
				    					->Where('medicos.nome','like', '%' .$filtro. '%')
				    					->Where('medicos.status','=', $status)
				    					->orWhere('medicos.crm','like', '%' .$filtro. '%')
				    					->Where('medicos.status','=', $status)
				    					->offset($offset)
				    					->limit($limite)
				      				    ->get();


		//Faz a mesma query de cima mas somente o count	      				    
        $lista_medicos['qtd_registros'] =   count( $query->select('medicos.nome', 'medicos.crm' ,'medicos.telefone')
       							      
				    					->orderBy('medicos.nome', 'asc')
				    					/*->Where('tb_usuarios.status', '=', $status)*/
				    					->Where('medicos.nome','like', '%' .$filtro. '%')
				    					->Where('medicos.status','=', $status)
				    					->orWhere('medicos.crm','like', '%' .$filtro. '%')
				    					->Where('medicos.status','=', $status)
				      				    ->get());

	    print_r(json_encode($lista_medicos)); 		
	}
	 
	 
	/**
	  * Salva um registro recém-criado.
	  *
	  * @param  Request  $request
	  * @return Response
	  */
	public function store(Request $request) {

	     $post = new Medicos;
	 
	     $post->nome = $request->input('nome');
	     $post->crm = $request->input('crm');
	     $post->telefone = $request->input('telefone');

	     $salva_especilidade =0 ;

	     if( $post->save()){

	     	foreach ($request->input('id_especialidade') as $id_especialidade) {

	     		$especialidades = new EspecialidadesMedicos;
	     		$especialidades->especialidades_id = $id_especialidade;
	     		$especialidades->medicos_id = $post->id;

	     		if($especialidades->save()){
	     			$salva_especilidade = 1;
	     		}else{
	     			$salva_especilidade =0 ;
	     		}
	     		
	     	}

	     	if($salva_especilidade==1){
	     		$retorno[0] = true;
	     		$retorno['mensagem'] = 'Médico criado com sucesso com o id #' . $post->id;
	     	}else{
	     		$retorno[0] = false;
	      		$retorno['mensagem'] = 'Falha ao cadastrar especialidade';
	     	}
	     	
	      }else{
	      	$retorno[0] = false;
	      	$retorno['mensagem'] = 'Falha ao criar médico';
	      } 
	 
	     return $retorno;
	}
	 
	 
	/**
	  * Exibir um registo específico.
	  *
	  * @param  int  $id
	  * @return Response
	  */
	public function show($id) {
	     return Medicos::find($id);
	}
	 
	 
	/**
	  * Editar um registro específico.
	  *
	  * @param  Request  $request
	  * @param  int  $id
	  * @return Response
	  */
	public function update(Request $request, $id) {

	     $post = new Medicos;
	 
	     $post->nome = $request->input('nome');
	     $post->crm = $request->input('crm');
	     $post->telefone = $request->input('telefone');
	     $post->exists = true;
	     $post->id = $id;

	     $salva_especilidade =0 ;



	     if( $post->save()){

	     	//apaga as especialidades existentes antes de incluir
	     	$apaga_especialidades =  EspecialidadesMedicos::where('medicos_id', $id)
				    	     					->delete();


	     	foreach ($request->input('id_especialidade') as $id_especialidade) {

	     		$especialidades = new EspecialidadesMedicos;
	     		$especialidades->especialidades_id = $id_especialidade;
	     		$especialidades->medicos_id = $post->id;

	     		if($especialidades->save()){
	     			$salva_especilidade = 1;
	     		}else{
	     			$salva_especilidade =0 ;
	     		}
	     		
	     	}

	     	if($salva_especilidade==1){
	     		$retorno[0] = true;
	     		$retorno['mensagem'] = 'Médico alterado com sucesso com o id #' . $post->id;
	     	}else{
	     		$retorno[0] = false;
	      		$retorno['mensagem'] = 'Falha ao cadastrar especialidade';
	     	}
	     	
	      }else{
	      	$retorno[0] = false;
	      	$retorno['mensagem'] = 'Falha ao alterado médico';
	      } 
	 
	     return $retorno;
	}
	 
	 
	/**
	  * Remover um registro específico.
	  *
	  * @param  int  $id
	  * @return Response
	  */
	public function destroy(Request $request, $id) {
	 
	     $medico = Medicos::find($id);
	     $medico->delete();
	 	 
	 	 $mensagem_retorno['mensagem'] = "Médico #" . $id. " excluído com sucesso.";
	     return json_encode($mensagem_retorno);
	}
	 


	 public function cadastro_medico(Request $request)
	{
	  

	  $retorno_view= array();

	   
      /*Pega a lista de especialidades*/
      $lista_especialidades=  Especialidades::orderBy('nome', 'asc')
		      				   ->distinct('nome')->get();

     	

	  $dados = $request->all();
	  

	  /*Se vier a variavel is_usuario é uma alteração de usuario ai tem que pegar os dados dele no banco*/
	  if(isset($dados['id_registro'])){

	  	$dados_medico = Medicos::find($dados['id_registro']);

		$retorno_view['dados_medico']=$dados_medico;

	  }	       				   		   

	  /*$retorno_view['lista_modulos']=$lista_modulos;*/
	  $retorno_view['lista_especialidades']=$lista_especialidades; 


	  /*Verifica se o usuario esta autenticado, se nao estiver manda de volta pra pagina de login*/
	  return view('medicos.cadastro_medico',compact('retorno_view'));
      
	}

	//chama a view da pagina de pesquisa de medicos
	public function pesquisa_medico(){


	  /*Verifica se o usuario esta autenticado, se nao estiver manda de volta pra pagina de login*/
	  return view('medicos.pesquisa_medicos',compact('retorno_view'));


	}
	
	 
}
 