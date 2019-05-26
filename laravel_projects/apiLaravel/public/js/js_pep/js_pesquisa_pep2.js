
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
	                type: 'GET',  
	                contentType: "application/json",
	                url: './lista_pep2',  
	                data: $( "#dados_form" ).serialize(),
	                dataType:'json',
	                cache: false,
	                beforeSend:function(xhr, settings){
	                    $("#listagem_dados").html( "<tr align='center' ><td colspan='10'><i class='fa fa-circle-o-notch fa-spin fa_carregando'></i></td></tr>" );
	                },
	                success:function(results){
                        var i = 1;

                		/***********************************Preenche a listagem dos dados***************************/
	                	$("#listagem_dados").html('');
				        $.each(results.lista, function() {

                        var conf_elemento_segmento = this.possui_elemento_segmento;
                        
                        if(conf_elemento_segmento!=null){
                           classe_elemento_segmento = "icone fa-thumbs-up cor_aprovado";
                        }else{
                           classe_elemento_segmento = "icone fa-thumbs-o-down";
                        }

				        $("#listagem_dados").append("<tr>"+
                                                            "<td><a href='./alterar_pep?id_registro="+this.id_pep_md5+"' ><i class='espaco_icone_acao fa fa-pencil'></i></a></td>"+
                                                            "<td>"+this.pep2+"</td>"+
				                                            "<td>"+this.descricao_pep+"</td>"+
                                                            "<td >Ativo</td>"+
                                                            "<td onclick='carrega_modal_elementos_rede("+this.id_pep_level_2+")' align='center' data-toggle='modal' data-target='#modal_conf_elemento_segmento'><i class='  fa "+classe_elemento_segmento+"  hiperlink'></i></td>"+
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
	      

        



        /* carregas os elementos de acordo com o PEP escolhido*/
        function carrega_modal_elementos_rede(pep_id){ 


            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();

            //atualiza as opções do modal
            $( "#conteudo_elemento_rede" ).show( "slow");
            $( "#conteudo_plantas_configuracao" ).hide( "slow");
            $( "#mensagem_retorno_valida_elemento_rede" ).hide();
            $( "#id_pep_nivel2_conf" ).val(pep_id);
            $( "#botao_finaliza_configuracao" ).hide();
            $( "#botao_avanca_configuracao" ).show();
            $( "#mensagem_retorno_funcao_configuracao").hide();
            $( "#mensagem_erro_valida_elemento_rede" ).hide();
            $( "#botao_fechar_modal").hide();
            


            /* Faz a configuração necessaria do laravel antes de enviar */
            $.ajaxSetup({
              headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            });

            $.ajax({    
                    type: 'GET',  
                    contentType: "application/json",
                    url: './lista_elemento_segmento?pep2='+pep_id,  
                    data: '',
                    dataType:'json',
                    cache: false,
                    beforeSend:function(xhr, settings){
                        $("#lista_elementos_rede").html( "<tr align='center' ><td colspan='10'><i class='fa fa-circle-o-notch fa-spin fa_carregando'></i></td></tr>" );
                    },
                    success:function(results){
                        var i = 1;

                        /***********************************Preenche a listagem dos dados***************************/
                        $("#lista_elementos_rede").html('');

                        $.each(results.lista, function() {

                            var checked = '';

                            if(this.tem_acesso!=null){
                                var checked = " checked='checked' ";
                            }else{
                                var checked = " ";  
                            }


                            $("#lista_elementos_rede").append("<label for='checkbox1' class='form-check-label '>"+
                                                               "<input  "+checked+"  type='checkbox'  name='id_elemento_rede[]' "+ 
                                                               "' value='"+this.id_elemento_rede+"' class='form-check-input'>"+this.codigo_elemento_rede+
                                                               " - "+this.elemento_rede+"</label><br>");

                        });

                        /***********************************Preenche a listagem dos dados***************************/
                        

                    },
                    error: function(data) { 
                        //Exibe mensage de erro
                        $("#lista_elementos_rede").html("Falha ao executar função,Por favor faça o login novamente. Caso o erro persista Por favor informe ao adminstrador do sistema");

                    }
            });
        }




        function escolhe_plantas(){

            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();

            var var_elemento_escolhido = 0; 

            $('#conteudo_elemento_rede input[type=checkbox]').each(function () {
               if (this.checked) {
                   var_elemento_escolhido = 1 ;
               }
            });

            if(var_elemento_escolhido==1){
                //carrega lista de plantas
                carrega_modal_plantas();
                $( "#conteudo_elemento_rede" ).hide( "slow");
                $( "#conteudo_plantas_configuracao" ).show( "slow");
                $( "#botao_finaliza_configuracao").show();
            }else{

                $( "#mensagem_retorno_valida_elemento_rede" ).show();
                document.getElementById('mensagem_retorno_valida_elemento_rede').scrollIntoView({block: 'end', behavior: 'smooth'});

            }

            //lista_plantas
        }




        /* carregas os elementos de acordo com os elementos de rede  escolhidos*/
        function carrega_modal_plantas(){ 

            $( "#botao_finaliza_configuracao" ).show();
            $( "#botao_avanca_configuracao" ).hide();
            
            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();

            var array_elementos_escolhidos = [];

             $('#conteudo_elemento_rede input[type=checkbox]').each(function () {
               if (this.checked) {
                   array_elementos_escolhidos.push(this.value);
               }
            });


            /* Faz a configuração necessaria do laravel antes de enviar */
            $.ajaxSetup({
              headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
            });

            var id_pep_nivel2 = $( "#id_pep_nivel2_conf" ).val( );

             $.ajax({    
                    type: 'POST',  
                    url: './lista_plantas_configuracao',  
                    data: {
                        'lista_elementos[]': array_elementos_escolhidos,
                         'id_pep2': id_pep_nivel2
                        // other data
                    },
                    dataType:'json',
                    cache: false,
                    contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                    beforeSend:function(xhr, settings){
                        $("#lista_plantas").html( "<tr align='center' ><td colspan='10'><i class='fa fa-circle-o-notch fa-spin fa_carregando'></i></td></tr>" );
                    },
                    success:function(results){
                        var i = 1;

                        /***********************************Preenche a listagem dos dados***************************/
                        $("#lista_plantas").html('');

                        $.each(results.lista, function() {

                            var checked = '';

                            if(this.tem_acesso!=null){
                                var checked = " checked='checked' ";
                            }else{
                                var checked = " ";  
                            }


                            $("#lista_plantas").append("<label for='checkbox1' class='form-check-label '>"+
                                                               "<input  "+checked+"  type='checkbox'  name='elemento_segmento[]' "+ 
                                                               "' value='"+this.id_elemento_x_segmento+"' class='form-check-input'>"+this.codigo_elemento_rede+" - "+this.codigo_segmento_planta+
                                                               "</label><br>");

                        });

                        /***********************************Preenche a listagem dos dados***************************/
                        

                    },
                    error: function(data) { 
                        //Exibe mensage de erro
                        $("#lista_plantas").html("Falha ao executar função,Por favor faça o login novamente. Caso o erro persista Por favor informe ao adminstrador do sistema");

                    }
            });
        }

        /*Envia o post para fazer a configuracao do projeto do pep2*/    
        function finaliza_configuracao(){
    
            var var_elemento_escolhido = 0;

            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();
            $("#mensagem_retorno_funcao_configuracao").hide();


            $('#lista_plantas input[type=checkbox]').each(function () {
               if (this.checked) {
                   var_elemento_escolhido = 1 ;
               }
            });

            if(var_elemento_escolhido==1){
                //carrega lista de plantas
                salva_configuracao_rede();
                $( "#mensagem_retorno_valida_planta" ).hide();
            }else{

                $( "#mensagem_retorno_valida_planta" ).show();
                document.getElementById('mensagem_retorno_valida_planta').scrollIntoView({block: 'end', behavior: 'smooth'});

            }
          
        }



        function salva_configuracao_rede(){

            /* Faz a configuração necessaria do laravel antes de enviar */
            $.ajaxSetup({
              headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            });

            $.ajax({    
                    type: 'POST',  
                    url: './salvar_elemento_segmento',  
                    data:$("#form_cadastro_projeto_configuracoes").serialize(),   
                    dataType:'json',
                    cache: false,
                    contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                    processData: false,
                    beforeSend:function(xhr, settings){
                        $("#botao_finaliza_configuracao").text("Carregando...");
                    },
                    success:function(data){
                            //  json response  
                            if(data[0]===true){

                               $("#botao_finaliza_configuracao").text("Finalizar");
                               $("#mensagem_retorno_funcao_configuracao").text("Configuração realizada com sucesso!");
                               $("#mensagem_retorno_funcao_configuracao").css("display","block");
                               $("#botao_finaliza_configuracao").hide();
                               $("#botao_fechar_modal").show();
                               document.getElementById('mensagem_retorno_funcao_configuracao').scrollIntoView({block: 'end', behavior: 'smooth'});


                               //carrega o grid novamente
                               busca();

                               return false; 
                            }else{

                               $("#mensagem_retorno_funcao_configuracao").css("display","block");
                               $("#mensagem_retorno_funcao_configuracao").text("Falha ao executar função, Por favor informe ao adminstrador do sistema");
                               $("#botao_finaliza_configuracao").text("Finalizar");
                               //carrega o grid novamente
                               return false; 
                            }
                    },
                    error: function(data) { 

                        $("#mensagem_retorno_funcao_configuracao").html('Falha ao executar função, Por favor informe ao adminstrador do sistema');
                        $("#mensagem_retorno_funcao_configuracao").show();



                        $("#botao_acao").text("Salvar");
                    }
            });
        

        }