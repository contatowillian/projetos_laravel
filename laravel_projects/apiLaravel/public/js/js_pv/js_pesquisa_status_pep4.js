
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


        /**********Funcao que faz envio  de inform em massa dos pep cadastrados ************/
        function informa_peps_cadastrados(){


          //antes de enviar verifica se o usuario esta logado
          var  sessao_expirada = valida_sessao_expirada();
          $("#mensagem_pep_cancelada").hide();
          $("#botao_aprovar_peps").html("<i class='fa fa-user-o '></i>  - Carregando");


          var array_pep = [];
          var i = 0;

          $('#listagem_dados input:checkbox:checked').each(function () {
             var pep = $(this).val();
             //verifica se nao tem nenhum repetido e envia para a função que aprova a pv
             if(array_pep.indexOf(pep)=== -1){
                informar_pep(pep);
                i++;
             }

              array_pep.push(pep);

          });

          if(i==0){
                alert("Selecione as Pep's para informar");
          }

          $("#botao_aprovar_peps").html("Enviar selecionados");
        }
        /**********Funcao que faz envio  de inform em massa dos pep cadastrados ************/


      /**********Funcao que envia o post para o controller que informa PEP************/
      function informar_pep(pep){

        
        $("#mensagem_retorno_aprovacao_pep").removeClass('alert-danger');
        $("#mensagem_retorno_aprovacao_pep").addClass('alert-success');
        $("#mensagem_erro_aprovacao_pep").hide();

        /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'POST',  
                url: './informar_pep_cadastrado',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : {cod_pep : pep  }, 
                dataType:'json',


                beforeSend:function(xhr, settings){
                   
                },
                success:function(data){
                        //  json response  
                        if(data[0]===true || data[0]===''){


                           var sucesso_atual = parseInt($("#quantidade_sucesso").html());
                           $("#quantidade_sucesso").html(sucesso_atual+1);

                           //$("#botao_aprovar_pvs").html("<i class='fa fa-user-o '></i>  - Aprovar selecionados");
                           $("#mensagem_retorno_aprovacao_pep").css("display","block");
                          
                           busca();

                           return false; 
                        }else{

                            $("#mensagem_erro_aprovacao_pep").show();


                           //carrega o grid novamente
                           return false; 
                        }
                },
                error: function(data) { 

                     $("#mensagem_erro_aprovacao_pep").show();

                }
          });
    

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
	                url: './lista_status_pep4',  
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

                        if(!this.mensagem_retorno_sap){
                            this.mensagem_retorno_sap ='';
                        }

                        if(!this.verifica_pendencias_pep){
                            this.verifica_pendencias_pep ='';
                        }


                        if(this.status_pep4==1 && this.verifica_pendencias_pep==0){
                          var input_informe_aprovacao  = "<input type='checkbox' value='"+this.solicitacao+"'  id='id_pep_"+this.id_solicitacao_capex+"' name='id_pep_"+this.id_solicitacao_capex+"'/>";
                        }else if(this.verifica_pendencias_pep>0){
                            var input_informe_aprovacao  = "<i  title='Esta solicitação tem PEP com erro' class=' fa fa-ban' ></i>";
                        }else{
                          var input_informe_aprovacao  = "<i  title='Este PEP contem erros' class=' fa fa-ban' ></i>";
                        }


				        $("#listagem_dados").append("<tr>"+"<td>"+input_informe_aprovacao+"</td>"+
                                                            "<td>"+this.pep+"</td>"+
                                                            "<td>"+this.centro+"</td>"+
                                                            "<td>"+this.solicitacao+"</td>"+
                                                            "<td>"+this.fornecedor+"</td>"+
				                                            "<td>"+this.escopo_projeto+"</td>"+
                                                            "<td >"+this.usuario_upload_pv+"</td>"+
                                                            "<td>"+this.mensagem_retorno_sap+"</td>"+
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
            				$("#listagem_dados").html( "<tr align='center' ><td colspan='10'><i class='fa fa-frown-o  fa_nao_encontrado'></i> Nenhum registro encontrado com o filtro selecionado</td></tr>" );
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
	      

        

