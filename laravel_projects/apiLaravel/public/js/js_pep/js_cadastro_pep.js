
		/* Js da pagina de cadastro de usuario */
		$(document).ready(function() {

	 		
	 	});


	 

 		/* Js da pagina de cadastro de usuario */ 

 		  $( "#form_cadastro_pep" ).submit(function( event ) {
 		  	/*Valida pra ver se tem algum requeried vazio*/
		 	var isValid = true; 

		    $('#form_cadastro_pep input.required').each(function() { 
		        var name = $("input.required").val();
		        if(name != "") {

		        } else {          
		            isValid = false;
		            return false;
		        }
		    });

		    if(isValid){ 
		      //caso esteja tudo correto chama a funcao que grava
		      var formData = new FormData(this);
              salvar(formData);
		    }
		    else{
		       alert('Preencha todos os campo para enviar');
		    return false;
			}
			/*Valida pra ver se tem algum requeried vazio*/
          
   		 });


 		var id_registro = $( "#id_registro" ).val();	 
	 	if(id_registro=='' ){
	 		/************Valida campo de login *********************/
			var campo_pep = document.getElementById("pep");
			campo_pep.onchange = verifica_pep_existe;
			campo_pep.onkeyup = verifica_pep_existe;
			/************Valida campo de login *********************/
		}


		/*Verifica se o login já existe*/
		function verifica_pep_existe(){

			/* Faz a configuração necessaria do laravel antes de enviar */
	        $.ajaxSetup({
	          headers: {
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	         }
	        });

	       	var filtro = $("#pep").val();

	        $.ajax({    
	                type: 'GET',  
	                url: './verifica_pep_existe?filtro='+filtro,
	                dataType:'json',
	                beforeSend:function(xhr, settings){
	                    $("#botao_acao").text("Carregando...");
	                },
	                success:function(data){

	    
	                        //  json response  
	                        if(data.qtd_registros>0){
	                           document.getElementById("pep").setCustomValidity("Esse pep já existe! Por favor escolha outro.");
	                           $("#botao_acao").text("Salvar");
	                           return false; 

	                        }else{

	                           document.getElementById("pep").setCustomValidity("");
	                           $("#botao_acao").text("Salvar");
	                           return false; 
	                        }
	                },
	                error: function(data) { 
	                    // if error occured
	                    alert("Falha ao executar função, Por favor informe ao adminstrador do sistema");
	                    $("#botao_acao").css('display','none');
	                }
	        });

		}


		/*Envia o post para alteracao do pep*/    
	    function salvar(formData){ 

	    	//antes de enviar verifica se o usuario esta logado
        	var  sessao_expirada = valida_sessao_expirada();
        	$("#mensagem_erro_retorno_funcao").hide();
        	
	        /* Faz a configuração necessaria do laravel antes de enviar */
	        $.ajaxSetup({
	          headers: {
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	          }
	        });
	        console.log(formData);

	        var myCheckboxes = new Array();
	        $("input:checked").each(function() {
	        	var valor_c=$(this).val();
	        	if(valor_c!=''){
	        	 myCheckboxes.push($(this).val());
	        	}
	          
	        });
	       
	        var linha_atual = 1;
	        var descricao_pep = $( "#descricao_pep" ).val();
	        var pep = $( "#pep" ).val();
	        var unidade_negocio = pep.substr(0,2);
	        var pep1 = pep.substr(0,7);
			var linha = unidade_negocio+','+pep1+','+pep+','+descricao_pep;
			var id_registro_val = $( "#alterar_registro" ).val();

	        $.ajax({    
	                type: 'POST',  
	                url: './recebe_arquivo_pep2',  
	                data : {escopo_projeto_escolhidos: myCheckboxes ,linha_arquivo : linha , linha_atual_arquivo: linha_atual, id_registro: id_registro_val },  
	                dataType:'json',
	                cache: false,
                    contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
	                beforeSend:function(xhr, settings){
	                    $("#botao_acao").text("Carregando...");
	                },
	                success:function(data){

	                        //  json response  
	                        if(data.resultado==='inserido'){

	                           $("#botao_acao").text("Salvar");

	                           var id_registro = $( "#id_registro" ).val();	 
	 		 			       if(id_registro=='' ){
	                           		document.getElementById("form_cadastro_pep").reset();
	                           }else{
	                           		$("#mensagem_retorno_funcao").text("PEP alterado com sucesso!");
	                           }

	                           $("#mensagem_retorno_funcao").css("display","block");

	                           return false; 


	                        }else if(data.resultado==='atualizado'){
	                        	
	                        	$("#botao_acao").text("Salvar");
	                        	$("#mensagem_retorno_funcao").text("PEP alterado com sucesso!");
	                        	$("#mensagem_retorno_funcao").css("display","block");

	                        }else{

	                           $("#mensagem_retorno_funcao").css("display","block");
	                           $("#mensagem_retorno_funcao").text("Falha ao executar função, verifique a unidade de negócio e Por favor informe ao adminstrador do sistema");
	                           $("#botao_acao").text("Salvar");
	                           return false; 
	                        }
	                },
	                error: function(data) { 

                		$("#mensagem_erro_retorno_funcao").html('Falha ao executar função, Por favor informe ao adminstrador do sistema');
                		$("#mensagem_erro_retorno_funcao").show();

	                    $("#botao_acao").text("Salvar");
	                }
	        });
	    }
	      

   