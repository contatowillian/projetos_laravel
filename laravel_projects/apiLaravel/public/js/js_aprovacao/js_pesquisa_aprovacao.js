
		/* Chama a busca quando a pagina inicia */
		$(document).ready(function() {
			busca();
	 	});
 		/* Js da pagina de pesquisa de usuario */ 

 		/*funcao que muda a paginacao é chamada quando clica em uma pagina da lista*/
 		function muda_pagina(pagina){
 			$("#pagina").val(pagina);
 			busca(1);
 		}
 		/*funcao que muda a paginacao é chamada quando clica em uma pagina da lista*/

 		/*Funcao que abre todas as opções de paginas quando tem mais de 10 paginas*/
 		function abre_paginas(){
 			
 			$("#abrir_mais_paginas").hide();
 			$(".esconde_paginacao_maior_limite").removeClass("esconde_paginacao_maior_limite");
 		}
 		/*funcao que muda a paginacao é chamada quando clica em uma pagina da lista*/


        /*Funcao que limpa o modal antes de abrir*/
        function limpa_modal_cadastro(){
             $("#form_cadastro_aprovadores")[0].reset();
             $("#texto_aprovador").html('Preencha o formulário abaixo para cadastrar o aprovador');
             $('#id_aprovacoes_usuarios').val("");
             $("#mensagem_retorno_cadastro_aprovador").hide();
        }
        /*Funcao que limpa o modal antes de abrir*/

       



		/*Envia o post para alteracao das configuracoes de perfil*/    
	    function busca(volta_primeira_pagina=0){ 


            //antes de enviar verifica se o usuario esta logado
        	var  sessao_expirada = valida_sessao_expirada();

	    	if(volta_primeira_pagina=='0'){ $("#pagina").val(1); }

	        /* Faz a configuração necessaria do laravel antes de enviar */
	        $.ajaxSetup({
	           headers: {
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	           }
	        });

	        $.ajax({    
	     
                    type: 'POST',  
                    url: './lista_aprovacoes',  
                    data: $("#dados_form").serialize(),   
                    cache: false,
                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                    dataType:'json',
                    processData: false,

	                beforeSend:function(xhr, settings){
	                    $("#listagem_dados").html( "<tr align='center' ><td colspan='10'><i class='fa fa-circle-o-notch fa-spin fa_carregando'></i></td></tr>" );
	                },
	                success:function(results){
                        var i = 1;

                		/***********************************Preenche a listagem dos dados***************************/
	                	$("#listagem_dados").html('');
				        $.each(results.lista, function(key,value) {

                        var status_aprovacao = this.status_aprovacao;
                        
                        if(status_aprovacao==0){
                           classe_status = "icone fa-thumbs-up cor_aprovado";
                           title = "Ativo";
                           classe_icone_acao="fa-times";
                           title_acao = "Inativar";
                        }else{
                           classe_status = "icone fa-thumbs-o-down";
                           title = "Inativo";
                           classe_icone_acao="fa-check-circle-o";
                           title_acao = "Ativar";
                        }


				        $("#listagem_dados").append("<tr>"+
                                                            "<td>"+
                                                            "<i data-target='#modal_cadastro_aprovadores' data-toggle='modal'   onclick=\"altera_aprovacao('"+this.id_aprovacoes_usuarios+"','"+this.id_matriz_aprovacao+"','"+this.id_escopo_projeto+"','"+this.id_regional_claro+"' ,'"+this.id_aprovacoes+"' ,'"+this.index+"' ,'"+this.id_usuario_aprovador+"'  )\"  class='  fa fa-pencil hiperlink float_left'></i>"+
                                                            "<i onclick='inativar_aprovador("+this.id_aprovacoes_usuarios+","+status_aprovacao+")' title='"+title_acao+"' class=' espaco_icone_acao fa "+classe_icone_acao+" hiperlink float_left'></i></td>"+
                                                            "<td>"+this.nome_matriz+"</td>"+
				                                            "<td>"+this.nome_escopo_projeto+"</td>"+
                                                            "<td>"+this.nome_regional_claro+"</td>"+
                                                            "<td>"+this.nome_aprovacao+"</td>"+
                                                            "<td>"+this.index+"</td>"+
                                                            "<td>"+this.nome_completo_aprovador+"</td>"+
                                                            "<td  align='center'><i title='"+title+"' class='  fa "+classe_status+"  hiperlink'></i></td>"+
                                                            "<td>"+this.ultima_alteracao_usuario+"</td>"+
                                                            "<td>"+this.data_ultima_alteracao+"</td>"+
				                                        "</tr>");
				        });

                		/***********************************Preenche a listagem dos dados***************************/


                		/*Preenche a parte do número de registros no rodape da paginacao*/
                		$("#numero_registros").html('');
            			var numero_registro_pagina = $("#pagina").val()-1;
            			var limit_registros = $( "#limite option:selected" ).val();
            			var quantidade_inicial = numero_registro_pagina*$( "#limite option:selected" ).val();
						if(quantidade_inicial==0){ quantidade_inicial=1; }	

						if(results.qtd_registros>0){
                			$("#numero_registros").html(quantidade_inicial+"-"+results.qtd_registros+" registros");

            			}else{
            				$("#listagem_dados").html( "<tr align='center' ><td colspan='10'><i class='fa fa-frown-o  fa_nao_encontrado'></i>Nenhum registro encontrado com o filtro selecionado</td></tr>" );
            				$("#numero_registros").html("0 de 0");
            			}

                		/*Preenche a parte do número de registros no rodape da paginacao*/

                		/*Preenche a parte dos links para escolha da pagina no rodape*/
                		var quantidade_paginas=parseInt(results.qtd_registros/limit_registros);
            			var i_paginacao = 1;

            			//zera a listagem da paginacao
            			$("#listagem_paginacao").html('');


            			  $("#listagem_paginacao").append('<li class="paginate_button page-item previous disabled" id="bootstrap-data-table-export_previous">'+
            			  '<a href="#" aria-controls="bootstrap-data-table-export" data-dt-idx="0" tabindex="0" class="page-link">'+
            			  'Páginas</a></li>');

            			while(i_paginacao<=quantidade_paginas+1){


            				/*****************Define a pgina ativa***********/
            				if(i_paginacao==numero_registro_pagina+1){
            					classe_ativa="active";
            				}else{
            					classe_ativa="";
            				}

            				if(i_paginacao>10){
            					esconde_paginacao_maior_limite=' esconde_paginacao_maior_limite ';
            				}else{
            					esconde_paginacao_maior_limite='';
            				}

            				if(i_paginacao==11){
            					$("#listagem_paginacao").append('<li title="Abrir mais páginas"  class="paginate_button page-item  ">'+
                											'<a href="#" aria-controls="bootstrap-data-table-export" data-dt-idx="1"'+
                											' tabindex="0" id="abrir_mais_paginas" class="page-link" onclick="abre_paginas()">...</a></li>');
            				
            				}
            				/*****************Define a pgina ativa***********/

                			$("#listagem_paginacao").append('<li id="link_pagina_'+i_paginacao+'" class="paginate_button page-item '+esconde_paginacao_maior_limite+classe_ativa+'  ">'+
                											'<a href="#" aria-controls="bootstrap-data-table-export" data-dt-idx="1"'+
                											' tabindex="0" class="page-link" onclick="muda_pagina('+i_paginacao+')">'+i_paginacao+'</a></li>');
            				

            				i_paginacao++;
            			}

                		/*Preenche a parte dos links para escolha da pagina no rodape*/

	                },
	                error: function(data) { 
	                	//Exibe mensage de erro
                        $("#listagem_dados").html("Falha ao executar função,Por favor faça o login novamente. Caso o erro persista Por favor informe ao adminstrador do sistema");

	                }
	        });
	    }
	      

        

        /*preenche o select do escopo no cadastro de aprovadores*/
        function preenche_escopo_cadastro(){

            //esconde a mensagem de retorno
            $("#mensagem_retorno_cadastro_aprovador").hide();

            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();


            /* Faz a configuração necessaria do laravel antes de enviar */
            $.ajaxSetup({
              headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             }
            });


            var id_cadastro_matriz_aprovacoes =  $("#id_cadastro_matriz_aprovacoes").val();
           
            $.ajax({    
                    type: 'GET',  
                    url: './lista_escopo_por_matriz_id?id_matriz_aprovacoes='+id_cadastro_matriz_aprovacoes,
                    data:$("#form_cadastro_usuario").serialize(),  
                    dataType:'json',
                    beforeSend:function(xhr, settings){
                        $("#botao_cadastro_acao").text("Carregando...");
                    },
                    success:function(results){

                       $("#id_cadastro_escopo_projeto").val(id_escopo_projeto).change();

                       $("#botao_cadastro_acao").text("Salvar");
                       $('#id_cadastro_escopo_projeto').empty();
                       $('#id_cadastro_escopo_projeto').append('<option value="">Escolha o escopo</option>');                    

                       $.each(results.lista, function() {
                        $('#id_cadastro_escopo_projeto').append('<option value="'+this.id_escopo_projeto+'">'+this.nome+'</option>');                    
                       });


                       var temp_id_escopo = $("#id_temp_escopo").val();

                       if(temp_id_escopo!=''){
                        var id_cadastro_matriz_aprovacoes =  $("#id_cadastro_escopo_projeto").val(temp_id_escopo).change();
                        $("#id_temp_escopo").val("");
                       }
                          
                    },
                    error: function(data) { 
                        // if error occured
                        alert("Falha ao executar função, Por favor informe ao adminstrador do sistema");
                        $("#botao_acao").css('display','none');
                    }
            });

        }


        $(document).ready(function() {

         $( "#form_cadastro_aprovadores" ).submit(function( event ) {
                /*Valida pra ver se tem algum requeried vazio*/
                var isValid = true; 

                $('#form_cadastro_aprovadores input.required').each(function() { 
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
                  salvar_aprovador(formData);
                }
                else{
                   alert('Preencha todos os campo para enviar');
                   return false;
                }
                /*Valida pra ver se tem algum requeried vazio*/
              
             });
        });





          function salvar_aprovador(){


            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();


            $("#mensagem_retorno_cadastro_aprovador").removeClass('alert-danger');
            $("#mensagem_retorno_cadastro_aprovador").addClass('alert-success');

            /* Faz a configuração necessaria do laravel antes de enviar */
            $.ajaxSetup({
              headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            });

            $.ajax({    
                    type: 'POST',  
                    url: './salvar_aprovador',  
                    data:$("#form_cadastro_aprovadores").serialize(),   
                    dataType:'json',
                    cache: false,
                    contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                    processData: false,
                    beforeSend:function(xhr, settings){
                        $("#botao_cadastro_acao").text("Carregando...");
                    },
                    success:function(data){
                            //  json response  
                            if(data[0]===true){

                               $("#botao_cadastro_acao").text("Salvar");
                               $("#form_cadastro_aprovadores")[0].reset();
                               $("#botao_finaliza_configuracao").text("Finalizar");
                               $("#mensagem_retorno_cadastro_aprovador").text("Operação efetuada com sucesso!");
                               $("#mensagem_retorno_cadastro_aprovador").css("display","block");
                              // $("#botao_cadastro_acao").hide();
                               $("#botao_fechar_modal").show();
                               /*document.getElementById('mensagem_retorno_funcao_configuracao').scrollIntoView({block: 'end', behavior: 'smooth'});*/
                               //carrega o grid novamente
                               busca();

                               return false; 
                            }else{

                                $("#mensagem_retorno_cadastro_aprovador").addClass('alert-danger'); 
                                $("#mensagem_retorno_cadastro_aprovador").css("display","block");

                                if(data.mensagem!=''){
                                 $("#mensagem_retorno_cadastro_aprovador").text(data.mensagem);
                                }else{
                                 $("#mensagem_retorno_cadastro_aprovador").text("Falha ao executar função, Por favor informe ao adminstrador do sistema");
                                }
                               
                               $("#botao_cadastro_acao").text("Salvar");
                               //carrega o grid novamente
                               return false; 
                            }
                    },
                    error: function(data) { 

                        $("#mensagem_retorno_funcao_configuracao").html('Falha ao executar função, Por favor informe ao adminstrador do sistema');
                        $("#mensagem_retorno_funcao_configuracao").show();
                        $("#botao_cadastro_acao").text("Salvar");
                    }
            });
        

        }


        function inativar_aprovador(aprovacao_id,status){


            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();

            /* Faz a configuração necessaria do laravel antes de enviar */
            $.ajaxSetup({
              headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            });



            $.ajax({    
                    type: 'POST',  
                    url: './inativar_aprovador',  
                    data : {id_aprovacao : aprovacao_id , id_status: status},  
                    dataType:'json',
                    cache: false,
                    contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                    beforeSend:function(xhr, settings){
                        /*$("#botao_cadastro_acao").text("Carregando...");*/
                    },
                    success:function(data){
                            //  json response  
                            if(data[0]===true){

                               busca();
                               return false;

                            }else{

                                alert('erro ao inativar!');
                               return false; 
                            }
                    },
                    error: function(data) { 

                        alert('erro ao inativar!');
                    }
            });
        

        }


        function altera_aprovacao(id_aprovacoes_usuarios,id_matriz_aprovacoes,id_escopo_projeto,id_cadastro_regional_claro,id_cadastro_aprovacao,id_cadastro_index,id_cadastro_user_aprovador){
            
            //altera o modal da alteracao
            $("#texto_aprovador").html('Preencha o formulário abaixo para alterar ');
            $("#mensagem_retorno_cadastro_aprovador").hide();
            $('#id_aprovacoes_usuarios').val(id_aprovacoes_usuarios);
            $("#id_cadastro_matriz_aprovacoes").val(id_matriz_aprovacoes).change();
            $("#id_cadastro_regional_claro").val(id_cadastro_regional_claro).change();
            $("#id_cadastro_aprovacao").val(id_cadastro_aprovacao).change();
            $("#id_cadastro_index").val(id_cadastro_index).change();
            $("#id_cadastro_user_aprovador").val(id_cadastro_user_aprovador).change();


            $("#id_temp_escopo").val(id_escopo_projeto).change();
            
           
        }

