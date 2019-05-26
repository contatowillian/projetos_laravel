
		/* Js da pagina de cadastro de usuario */
		$(document).ready(function() {

	 		 $("#celular").mask('(00) 000000009', {clearIfNotMatch: true});
	 		 $("#telefone").mask('(00) 000000009', {clearIfNotMatch: true});
	 		 
	 		 var id_registro = $( "#id_registro" ).val();	 

	 		
	 	});


	 
 		/* Js da pagina de cadastro de usuario */ 

 		  $( "#form_cadastro_usuario" ).submit(function( event ) {
 		  	/*Valida pra ver se tem algum requeried vazio*/
		 	var isValid = true; 

		    $('#form_cadastro_usuario input.required').each(function() { 
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

 		 

		/*Envia o post para salvar o medico*/    
	    function salvar(formData){ 


	        /* Faz a configuração necessaria do laravel antes de enviar */
	        $.ajaxSetup({
	          headers: {
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        }
	        });
	        var id_registro = $( "#id_registro" ).val();

	 		if(id_registro!='' ){
	 			var url = './api/v1/medicos/'+id_registro;
	 		}else{
	 			var url = './api/v1/medicos';
	 		}

	        $.ajax({    
	                type: 'POST',  
	                url: url,  
	                data:formData,  
	                dataType:'json',
	                cache: false,
			        contentType: false,
			        processData: false,
	                beforeSend:function(xhr, settings){
	                    $("#botao_acao").text("Carregando...");
	                },
	                success:function(data){

	                    console.log(data[0]);
	                        //  json response  
	                        if(data[0]===true){

	                           $("#mensagem_retorno_funcao").removeClass('alert-danger');
       						   $("#mensagem_retorno_funcao").addClass('alert-success');

	                           $("#botao_acao").text("Salvar");
	                           var id_registro = $( "#id_registro" ).val();	 
	 		 			       if(id_registro=='' ){
	                            document.getElementById("form_cadastro_usuario").reset();
	                            $("#mensagem_retorno_funcao").text(data['mensagem']);
	                           }else{
	                           	$("#mensagem_retorno_funcao").text(data['mensagem']);
	                           }

	                           $("#mensagem_retorno_funcao").css("display","block");


	                           return false; 

	                        }else{

	                           $("#mensagem_retorno_funcao").addClass('alert-danger');
       						   $("#mensagem_retorno_funcao").removeClass('alert-success');

	                           $("#mensagem_retorno_funcao").css("display","block");
	                           $("#mensagem_retorno_funcao").text("Falha ao executar função, Por favor informe ao adminstrador do sistema");
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
	      

   