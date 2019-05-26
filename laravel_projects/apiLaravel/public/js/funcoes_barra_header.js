
	/* Chama a busca quando a pagina inicial, elas infos de mensagens da barra do topo */
	$(document).ready(function() {

		//verifica se tem questionamentos para o usuario logado
		//verifica_questionamentos();

		//verifica se tem aprovacoes de pv para o usuario logado
		/*verifica_aprovacoes_pv_pendentes();*/

		//chama as funcoes a cada 60 segundos
		//setInterval(function(){ verifica_questionamentos();}, 60000);

	});

	function verifica_aprovacoes_pv_pendentes(){


		/* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'POST',  
                url: './verifica_aprovacoes_pendentes',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : { }, 
                dataType:'json',


                beforeSend:function(xhr, settings){
                   
                },
                success:function(data){
                        //  json response  
                        if(data[0]===true){


                        	console.log(data);


                        	$("#lista_aprovacoes_header").html('');

							//preenche os numeros questionamentos
							$("#numero_aprovacoes_header").html(data.registros_aprovacoes.length);
							$("#numero_aprovacoes_alerta_header").html(data.registros_aprovacoes.length);


                            /*********** Verifica se tem questionamentos **************/
                            if(data.registros_aprovacoes.length==0){
                               $("#lista_aprovacoes_header").html("");
                               $("#balao_aprovacoes_header").hide();
                            }

                            /********************* Historico de questionamentos ********************************/
                            $.each(data.registros_aprovacoes , function(key,value) {

                            	

                              $("#lista_aprovacoes_header").append("<a class='dropdown-item media mensagem_questionamento' href='./pesquisa_aprovacao_pv?abre_questionario="+this.id_solicitacao_capex+"&pv_id="+this.id_solicitacao_capex+"'>"+
										                                "<span class='photo media-left'>"+
										                                "<img alt='avatar' "+imagem_questionador_header+"></span>"+
										                                "<span class='message media-body'>"+
										                                "<span class='name float-left limit_questionamento'>"+this.nome_questionador+"</span>"+
										                                "<span class='time float-right'></span>"+
										                                "<p>"+this.questionamento.substring(0,30)+"</p>"+
										                                "</span>"+
										                                "</a>");
                            });

                           return false; 

                        }else{

                          console.log("Erro ao buscar aprovacoes");
                          return false; 
                        }
                },
                error: function(data) { 
                     console.log("Erro ao buscar aprovacoes");
                },     
          });

	}

	function verifica_questionamentos(){
		

		/* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'POST',  
                url: './verifica_questionamentos',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : { }, 
                dataType:'json',


                beforeSend:function(xhr, settings){
                   
                },
                success:function(data){
                        //  json response  
                        if(data[0]===true){

                        	$("#lista_questionamentos_header").html('');

							//preenche os numeros questionamentos
							$("#numero_questionamentos_header").html(data.registros_questionamento.length);
							$("#numero_questionamentos_alerta_header").html(data.registros_questionamento.length);


                            /*********** Verifica se tem questionamentos **************/
                            if(data.registros_questionamento.length==0){
                               $("#lista_questionamentos_header").html("");
                               $("#balao_quantidades_alerta_header").hide();
                            }

                            /********************* Historico de questionamentos ********************************/
                            $.each(data.registros_questionamento , function(key,value) {

                            	if(this.imagem_usuario_questionador!='' && this.imagem_usuario_questionador!==null ){
                            		var imagem_questionador_header = "src='./storage/"+this.imagem_usuario_questionador+"'";
                            	}else{	
                            		var imagem_questionador_header = "src='./imagens/sem_avatar.jpeg'";
                            	}
                            	

                              $("#lista_questionamentos_header").append("<a class='dropdown-item media mensagem_questionamento' href='./pesquisa_aprovacao_pv?abre_questionario="+this.id_solicitacao_capex+"&pv_id="+this.id_solicitacao_capex+"'>"+
										                                "<span class='photo media-left'>"+
										                                "<img alt='avatar' "+imagem_questionador_header+"></span>"+
										                                "<span class='message media-body'>"+
										                                "<span class='name float-left limit_questionamento'>"+this.nome_questionador+"</span>"+
										                                "<span class='time float-right'></span>"+
										                                "<p>"+this.questionamento.substring(0,30)+"</p>"+
										                                "</span>"+
										                                "</a>");
                            });

                           return false; 

                        }else{

                          console.log("Erro ao buscar questionamentos");
                          return false; 
                        }
                },
                error: function(data) { 
                     console.log("Erro ao buscar questionamentos");
                },     
          });


	}

