
		/* Js da pagina de cadastro de usuario */
		$(document).ready(function() {

	 		 $("#celular").mask('(00) 000000009', {clearIfNotMatch: true});
	 		 $("#telefone").mask('(00) 000000009', {clearIfNotMatch: true});
	 		 
	 		 var id_registro = $( "#id_registro" ).val();	 

	 		 if(id_registro!='' ){
 		 		$("#quadro_senha").hide();
 		 		$("#quadro_confirma_senha").hide();
 		 		$('#senha').prop('required',false);
 		 		$('#confirma_senha').prop('required',false);
	 		 }else{
 		 		$("#quadro_troca_senha").hide();
 		 		$("#quadro_status").hide();
	 		 }
	 	});


	 	function altera_senha(){

	 		$("#quadro_senha").show();
 		 	$("#quadro_confirma_senha").show();
 		    $("#quadro_troca_senha").hide();

 		    $('#barra_progresso').attr("aria-valuenow",10); 


 		    valeur =  $(this).attr('value');
	 	}

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

 		  var uploadField = document.getElementById("foto_usuario");

			uploadField.onchange = function() {
			    if(this.files[0].size > 3000000){
			       alert("O arquivo é muito grande. O máximo é 3MB");
			       this.value = "";
			    };
			};


	 		/************Valida campo de senha *********************/
	 		var password = document.getElementById("senha"),confirm_password = document.getElementById("confirma_senha");

			function validatePassword(){
			  if(password.value != confirm_password.value) {
			    confirm_password.setCustomValidity("O Campo senha e confirma senha precisa ser igual");
			  } else {
			    confirm_password.setCustomValidity('');
			  }
			}

			password.onchange = validatePassword;
			confirm_password.onkeyup = validatePassword;

		
		/************Valida campo de senha *********************/

		/************Valida campo de login *********************/
		campo_login = document.getElementById("login");
		campo_login.onchange = verifica_login_disponivel;
		campo_login.onkeyup = verifica_login_disponivel;
		/************Valida campo de login *********************/



		/*Verifica se o login já existe*/
		function verifica_login_disponivel(){

			/* Faz a configuração necessaria do laravel antes de enviar */
	        $.ajaxSetup({
	          headers: {
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	         }
	        });

	       

	        $.ajax({    
	                type: 'POST',  
	                url: './verifica_login_disponivel',

	                data:$("#form_cadastro_usuario").serialize(),  
	                dataType:'json',
	                beforeSend:function(xhr, settings){
	                    $("#botao_acao").text("Carregando...");
	                },
	                success:function(data){

	                    console.log(data[0]);
	                        //  json response  
	                        if(data[0]===true){
	                           document.getElementById("login").setCustomValidity("Esse login já existe! Por favor escolha outro.");
	                           $("#botao_acao").text("Salvar");
	                           return false; 

	                        }else{

	                           document.getElementById("login").setCustomValidity("");
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


		/*Envia o post para alteracao das configuracoes de perfil*/    
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

	        $.ajax({    
	                type: 'POST',  
	                url: './salvar_usuario',  
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
	                           $("#botao_acao").text("Salvar");
	                           var id_registro = $( "#id_registro" ).val();	 
	 		 			       if(id_registro=='' ){
	                           document.getElementById("form_cadastro_usuario").reset();
	                           }else{
	                           	$("#mensagem_retorno_funcao").text("Usuário alterado com sucesso!");
	                           }

	                           $("#mensagem_retorno_funcao").css("display","block");



	                           return false; 
	                        }else{

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
	      

   