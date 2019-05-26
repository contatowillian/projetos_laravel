
		/* Chama a busca quando a pagina inicia */
		$(document).ready(function() {
     
      //chama a busca assim que inicia
			busca();

      //preenche lista de usuarios questionados
      preenche_lista_usuarios_questionados();

       //caso o usuario tenha clicado na mensagem ele abre a PV
      if($('#abre_questionario').val()!=''){
       $('#abre_questionario').click();
      }


       
	 	});


    /**************** Preenche a lista de usuarios questionados ******************/
    function preenche_lista_usuarios_questionados(){

      //antes de enviar verifica se o usuario esta logado
      var  sessao_expirada = valida_sessao_expirada();

      /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'GET',  
                url: './pega_lista_usuarios_json',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data :'', 
                dataType:'json',
                beforeSend:function(xhr, settings){
                   
                },
                success:function(data){

                        $('#usuarios_questionamento').simplyTag(
                        {
                            forMultiple: true,                      
                            dataSource: data
                        });
                },
                error: function(data) { 

                     $("#listagem_dados").html('Erro ao buscar usuários, informe ao adminstrado do sistema!');

                }
        });

       
    }
    /**************** Preenche a lista de usuarios questionados ******************/


    /***************************** Envia o  questionamento  *************************/


    $( "#questionamento_pv" ).submit(function( event ) {

      //antes de enviar verifica se o usuario esta logado
      var  sessao_expirada = valida_sessao_expirada();

      var usuarios_questionamento = $('#usuarios_questionamento').simplyTag('getitems','');
      var campo_questionamento = $("#pv_questionamento").val();

      var codigo_capex_questionamento = $("#id_capex_questionamento").val();

      //verifica se usuarios de questionamentos foram escolhidos
      if(usuarios_questionamento.validTags.length==0){
       alert("Adicione pelo menos 1 usuário para questionar.");
       return false;
      }


      /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'POST',  
                url: './cadastro_questionamento',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : {usuarios_questionamento : usuarios_questionamento.validTags ,
                         questionamento : campo_questionamento,
                         id_capex_questionamento : codigo_capex_questionamento }, 
                dataType:'json',


                beforeSend:function(xhr, settings){
                    $("#mensagem_erro_retorno_questionamento").hide();
                    $("#mensagem_sucesso_questionamento").hide();

                },
                success:function(data){
                        //  json response  
                        if(data[0]===true){

                           //atualiza os questionamentos
                           atualiza_lista_questionamento($("#id_capex_questionamento").val());
                           $("#mensagem_sucesso_questionamento").show(); 
                           $("#questionamento_pv")[0].reset();

                           return false; 
                        }else{
                          $("#mensagem_erro_retorno_questionamento").html("Erro ao enviar questionamento !");
                          $("#mensagem_erro_retorno_questionamento").show();
                           //carrega o grid novamente
                           return false; 
                        }
                },
                error: function(data) { 
                     $("#mensagem_erro_retorno_questionamento").html("Erro ao enviar questionamento !");
                     $("#mensagem_erro_retorno_questionamento").show();

                }
        });

    });

  

    /***************************** Envia questionamento  *************************/


    /***************************** Envio form de escolha de Pep *************************/

    $( "#form_detalhe_pv_pep2" ).submit(function(e  ) {

       e.preventDefault();    
       var formData = new FormData($(this)[0]);

       $("#botao_acao_upload_pep2").text("Carregando...");
       $("#botao_acao_upload_pep2").prop("type", "button");

      //antes de enviar verifica se o usuario esta logado
      var  sessao_expirada = valida_sessao_expirada();

      /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({

                url: './aprovacao_analista_pv',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                dataType:'json',

                beforeSend:function(xhr, settings){

                    $("#conteudo_form_detalhe_pv_analista").hide();
                    $("#botao_acao_upload_pep2").text("Carregando...");
                    $("#botao_acao_upload_pep2").prop("type", "button");

                },
                success:function(data){

                      $("#botao_acao_upload_pep2").text("Enviar");

                      //  json response  
                      if(data[0]===true){

                        $("#mensagem_retorno_detalhe_pv_analista").removeClass('alert-danger');
                        $("#mensagem_retorno_detalhe_pv_analista").addClass('alert-success');

                        $("#botao_acao_upload_pep2").text("Enviar");
                        $("#mensagem_retorno_detalhe_pv_analista").show();
                        $("#mensagem_retorno_detalhe_pv_analista").html(data.mensagem);
                        $("#conteudo_form_detalhe_pv_analista").hide();
                        $("#botao_acao_upload_pep2").prop("type", "submit");

                        busca();
                        return false;

                      }else{

                        $("#mensagem_retorno_detalhe_pv_analista").removeClass('alert-success');
                        $("#mensagem_retorno_detalhe_pv_analista").addClass('alert-danger');

                        $("#botao_acao_upload_pep2").prop("type", "submit");
                        $("#botao_acao_upload_pep2").text("Enviar");
                        $("#mensagem_retorno_detalhe_pv_analista").show();
                        $("#mensagem_retorno_detalhe_pv_analista").html(data.mensagem);
                        $("#conteudo_form_detalhe_pv_analista").show();
                         //carrega o grid novamente
                        return false; 
                      }
                },
                error: function(data) {

                     $("#mensagem_retorno_detalhe_pv_analista").removeClass('alert-success');
                     $("#mensagem_retorno_detalhe_pv_analista").addClass('alert-danger');
                     
                     $("#botao_acao_upload_pep2").text("Enviar");
                     $("#botao_acao_upload_pep2").prop("type", "submit");
                     $("#conteudo_form_detalhe_pv_analista").show();
                     $("#mensagem_retorno_detalhe_pv_analista").html("Erro ao enviar PV, informe ao adminstrador do sistema !");
                     $("#mensagem_retorno_detalhe_pv_analista").show();
                }
        });
    });

    /***************************** Envio form de escolha de Pep *************************/



    /**************** Preenche a lista de usuarios questionados ******************/

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


    /**********Funcao que faz aprovação em massa das PVS selecionadas************/
    function aprova_pvs(){


      //antes de enviar verifica se o usuario esta logado
      var  sessao_expirada = valida_sessao_expirada();
      $("#mensagem_pv_cancelada").hide();
      $("#botao_aprovar_pvs").html("<i class='fa fa-user-o '></i>  - Carregando");


      var array_pv = [];
      var i = 0;

      $('#listagem_dados input:checkbox:checked').each(function () {
         var id_pv = $(this).val();
         //verifica se nao tem nenhum repetido e envia para a função que aprova a pv
         if(array_pv.indexOf(id_pv)=== -1){
            aprovar_pv(id_pv);
            i++;
         }

          array_pv.push(id_pv);

      });

      if(i==0){
            alert("Selecione as Pv's para aprovar");
      }

      $("#botao_aprovar_pvs").html("Aprovar selecionados");
    }
    /**********Funcao que faz aprovação em massa das PVS selecionadas************/


    /**********Funcao que preenche o modal de detalhe da PV************/

    function abre_modal(id_capex_pv,opcao_modal){

        //antes de enviar verifica se o usuario esta logado
        var  sessao_expirada = valida_sessao_expirada();

        /***** Chama a funcao que zera o modal antes de preencher**********/
        zera_modal(opcao_modal);

        /***** Chama a funcao que preenche os campos de detalhe do modal**********/
        preenche_info_detalhe_pv(id_capex_pv,opcao_modal);

    }



    function zera_modal(opcao_modal){

      if(opcao_modal=='detalhe_pv'){
        /*** Abre o modal carregando *********/
       $("#modal_detalhe_conteudo").hide();
       $("#modal_detalhe_carregando").show();

      }else{

       /*** Abre o modal carregando *********/
       $("#modal_questionamento_pv").hide();
       $("#modal_questionanento_carregando").show();

      }
      

      /*** zera os campos *********/
      $("#modal_detalhe_numero_pv").text();
      $("#modal_detalhe_data_solicitacao").text();
      $("#modal_detalhe_url_arquivo"). attr("href",'');
      $("#modal_detalhe_macro_projeto").text();
      $("#modal_detalhe_atividades").text();
      $("#modal_detalhe_site").text();
      $("#modal_detalhe_tipo_pv").text();
      $("#modal_detalhe_regional").text();
      $("#modal_detalhe_obs").text();
      $("#modal_detalhe_historico_aprovacoes").html("");
      $("#modal_detalhe_historico_questionamentos").html("");
      $("#modal_detalhe_historico_questionar").val();
      $("#modal_detalhe_conteudo_pv").html("");
      $("#modal_detalhe_historico_aprovacoes").html('');
      $("#conteudo_detalhe_pv").hide();
      $("#mensagem_sucesso_questionamento").hide();
      $("#mensagem_pv_cancelada").hide();
      $("#form_detalhe_pv_pep2").hide();
      $("#mensagem_retorno_detalhe_pv_analista").hide();
      $("#conteudo_form_detalhe_pv_analista").show();


    }

    function abre_complemtento_analista(){
        if($("#form_detalhe_pv_pep2" ).is(":hidden")){
            $( "#form_detalhe_pv_pep2" ).show();
        }else{
            $( "#form_detalhe_pv_pep2" ).hide();
        }
    }


    function abre_conteudo_arquivo(){
        if($("#conteudo_detalhe_pv" ).is(":hidden")){
            $( "#conteudo_detalhe_pv" ).show();
        }else{
            $( "#conteudo_detalhe_pv" ).hide();
        }
    }

    function abre_historico_aprovacoes(){
        if($("#historico_aprovacoes_pv" ).is(":hidden")){
            $( "#historico_aprovacoes_pv" ).show();
        }else{
            $( "#historico_aprovacoes_pv" ).hide();
        }
    }

    function abre_linha_questionamento(id_questionamento){
        if($("#linha_questionamento_"+id_questionamento ).is(":hidden")){
            $( "#linha_questionamento_"+id_questionamento ).show();
        }else{
            $( "#linha_questionamento_"+id_questionamento ).hide();
        }
    }

    

    /**********Funcao que preenche o modal de detalhe da PV************/
    function preenche_info_detalhe_pv(id_capex_pv,modal_abertura){

        //antes de enviar verifica se o usuario esta logado
        var  sessao_expirada = valida_sessao_expirada();

        $("#id_capex_detalhe_pv_analista").val(id_capex_pv);


        /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'POST',  
                url: './pega_detalhes_pv',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : {id_capex : id_capex_pv  }, 
                dataType:'json',

                beforeSend:function(xhr, settings){
                   
                },
                success:function(data){
                        //  json response  
                        if(data[0]===true){

                            /******** Preenhe o Id do Capex ****************/
                            $("#id_capex_questionamento").val(id_capex_pv);

                            if(modal_abertura=='detalhe_pv'){
                              /******* Tira o modal carregando *********/
                              $("#modal_detalhe_conteudo").show();
                              $("#modal_detalhe_carregando").hide();

                            }else{

                              /*** Abre o modal carregando *********/
                              $("#modal_questionamento_pv").show();
                              $("#modal_questionanento_carregando").hide();
                            }

                            $.each(data.detalhes, function(key,value) {

                              /**se for etapa do analista mostra a opção de upload***/
                                $("#box_aprovacao_analista").show();
                                $( "#form_detalhe_pv_pep2" ).show();
                             

                              /**se for etapa do analista mostra a opção de upload***/

                              /*** zera os campos *********/
                              $("#modal_detalhe_numero_pv").text(this.id_solicitacao_capex);
                              $("#modal_detalhe_data_solicitacao").text(this.data_solicitacao);
                              $("#nome_arquivo_pv_aprovacao_analista").val(this.nome_arquivo_original);
                              $("#escopo_projeto_pv_aprovacao_analista").val(this.id_escopo_projeto);
                              $("#modal_detalhe_url_arquivo").attr("href", '../storage/arquivos_pv/'+this.nome_arquivo_original);
                              $("#modal_detalhe_macro_projeto").text(this.macro_projeto);
                              $("#modal_detalhe_fornecedor").text(this.fornecedor);
                              $("#modal_detalhe_atividades").text(this.lista_atividades);
                              $("#modal_detalhe_site").text(this.site);
                              $("#modal_detalhe_tipo_pv").text(this.tipo_carga);
                              $("#modal_detalhe_regional").text(this.nome_regional);
                              $("#modal_detalhe_obs").text(this.observacao);
                            });


                          // Faz o preenchimento caso seja o modal de detalhes do PV
                          if(modal_abertura=='detalhe_pv'){


                            /*********** Verifica se tem aprovacoes **************/
                            if(data.aprovacao_registros.length==0){
                               $("#modal_detalhe_historico_aprovacoes").append("<tr >"+
                                                                              "<td align='center' colspan='7'>Nenhuma aprovação realizada nesta PV</td>"+
                                                                         "</tr>");
                            }



                            



                            /********************* Historico de aprovacao ********************************/
                            $.each(data.aprovacao_registros , function(key,value) {

                              $("#modal_detalhe_historico_aprovacoes").append("<tr >"+
                                                                                "<td align='center'>"+this.etapa+"</td>"+
                                                                                "<td>"+this.nome_completo+"</td>"+
                                                                                "<td>"+this.data_criacao+"</td>"+
                                                                                "<td>"+this.data_aprovacao+"</td>"+
                                                                               "</tr>");
                            });

                            var linha_arquivo_detal = 1;
                            /********************* Historico de aprovacao ********************************/
                            $.each(data.dados_arquivo , function(key,value) {
                              
                              //pula a primeira linha do arquivo
                              if(linha_arquivo_detal!='1' && !!value[18]){
                                $("#modal_detalhe_conteudo_pv").append("<tr  class='lista_detalhes_arquivo'>"+
                                                                                "<td align='center'>"+$("#modal_detalhe_macro_projeto").text()+"</td>"+
                                                                                "<td>"+value[18]+"</td>"+
                                                                                "<td>"+value[7]+"</td>"+
                                                                                "<td>"+value[8]+"</td>"+
                                                                                "<td>"+value[9]+"</td>"+
                                                                                "<td>"+value[10]+"</td>"+
                                                                                "<td>"+value[11]+"</td>"+
                                                                                "<td>"+value[12]+"</td>"+
                                                                                "<td>"+value[13]+"</td>"+
                                                                                "<td>"+value[14]+"</td>"+
                                                                                "<td>"+value[15]+"</td>"+
                                                                                "<td>"+value[16]+"</td>"+
                                                                                "<td>"+value[18]+"</td>"+
                                                                           "</tr>");
                             }

                             linha_arquivo_detal++;
                            });


                            /*********** Monta o select menu para aprovacao do pv **************/
                            pega_lista_pep_da_pv(data.registros_peps);
                            /*********** Monta o select menu para aprovacao do pv **************/


                          }else{

                            /******** Abre a lista de questionamentos*********/

                            lista_questionamento(data);

                          } 
          
                           return false;

                        }else{

                           $("#mensagem_erro_aprovacao_pv").show();
                           //carrega o grid novamente
                           return false; 
                        }
                },
                error: function(data) { 

                     $("#mensagem_erro_aprovacao_pv").show();

                }
        });

    }
    /**********Funcao que faz aprovação em massa das PVS selecionadas************/


    function lista_questionamento(data){

            $("#modal_detalhe_historico_questionamentos").html("");

            /*********** Verifica se tem questionamentos **************/
            if(data.lista_questionamentos.length==0){
               $("#modal_detalhe_historico_questionamentos").append("<tr class='padding_sem_questionamento' >"+
                                                                      "<td align='center' colspan='7'>Nenhum questionamento realizado nesta PV</td>"+
                                                                 "</tr>");
            }


            /********************* Lista de Questionamentos ********************************/
            $.each(data.lista_questionamentos , function(key,value) {
              $("#modal_detalhe_historico_questionamentos").append("<tr class='hiperlink'  onclick='abre_linha_questionamento("+this.id_questionamento+")'>"+
                                                                    "<td><i class='menu-icon fa fa-plus-circle'></i> "+this.data_questionamento+"</td>"+
                                                                    "<td>"+this.nome_questionador+"</td>"+
                                                                    "<td>"+this.questionados+"</td>"+
                                                                   "</tr>"+
                                                                    "<tr style='display:none' id='linha_questionamento_"+this.id_questionamento+"' >"+
                                                                    "<td class='espaco_questionamento' colspan='5'>"+this.questionamento+"</td>"+
                                                                   "</tr>");
            });
    }


    // Adiciona o pep no select menu
    function pega_lista_pep_da_pv(registros_peps){

            //zerar select de escolha de PEP
            $("#modal_detalhe_aprovacao_pep2").empty();

            //zerar select de escolha de PEP
            $('#modal_detalhe_aprovacao_pep2').append($('<option>', {
                value: '',
                text: 'Escolha o PEP'
            }));



            $.each(registros_peps , function(key,value) {

              if(!this.saldo_disponivel){
                  this.saldo_disponivel='R$ 0';
              }

              $('#modal_detalhe_aprovacao_pep2').append($('<option>', {
                value: this.id_pep_level_2,
                text: this.pep2+ " - " + this.descricao_pep+" / Saldo: " + this.saldo_disponivel
              }));

            });
    }


    function atualiza_lista_questionamento(id_capex_pv){


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
                url: './pega_detalhes_pv',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : {id_capex : id_capex_pv  }, 
                dataType:'json',

                beforeSend:function(xhr, settings){
                   
                },
                success:function(data){
                        //  json response  
                        if(data[0]===true){

                            /******** Abre a lista de questionamentos*********/
                            lista_questionamento(data);
                                               
                           return false;

                        }else{

                           $("#mensagem_erro_aprovacao_pv").show();
                           //carrega o grid novamente
                           return false; 
                        }
                },
                error: function(data) { 

                     $("#mensagem_erro_aprovacao_pv").show();

                }
        });

    }

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
                url: './lista_pendencias_solicitacao',  
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
             

                if(!this.nome_fornecedor){
                  this.nome_fornecedor='';
                }
                
                if(!this.data_pendencia){
                  this.data_pendencia='';
                }
                
                if(!this.mensagem){
                  this.mensagem='';
                }
                
                if(!this.usuario_pendencia){
                  this.usuario_pendencia='';
                }
                 
                if(!this.escopo_projeto){
                  this.escopo_projeto='';
                }

				        $("#listagem_dados").append("<tr><td ><i onclick='abre_modal("+this.id_solicitacao_capex+",\"detalhe_pv\")' data-target='#modal_detalhe_pv' data-toggle='modal'   class='espaco_icone_acao_aprovacao fa fa-search-plus ' title='Exibir detalhes da PV'></i>"+
                                              "<i onclick='abre_modal("+this.id_solicitacao_capex+",\"questionamento_pv\")' data-target='#modal_questionamento_pv' data-toggle='modal'   class='espaco_icone_acao_aprovacao fa fa-question-circle  ' title='Exibir ou fazer questionamentos'></i>"+
                                              "</td>"+
                                              "<td>"+this.id_solicitacao_capex+"</td>"+
                                              "<td>"+this.nome_fornecedor+"</td>"+
                                              "<td>"+this.data_pendencia+"</td>"+
                                              "<td>"+this.mensagem+"</td>"+
                                              "<td>"+this.usuario_pendencia+"</td>"+
                                              "<td>"+this.escopo_projeto+"</td>"+
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
            				$("#listagem_dados").html( "<tr align='center' ><td colspan='10'><i class='fa fa-frown-o  fa_nao_encontrado'></i>  Nenhum registro encontrado com o filtro selecionado</td></tr>" );
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
	   

      function reprovar_pv(id_pv_capex){

        // abre a confirmacao para cancelar a PV
        if (confirm("Deseja confirmar o cancelamento da PV "+id_pv_capex+" ?")) {
          cancelar_pv(id_pv_capex)
        }

      }

      function cancelar_pv(id_pv_capex){


        /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'POST',  
                url: './cancelar_pv',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : {id_capex : id_pv_capex  }, 
                dataType:'json',


                beforeSend:function(xhr, settings){
                   
                },
                success:function(data){
                        //  json response  
                        if(data[0]===true){

                           $("#mensagem_pv_cancelada").show();
                           //Atualiza a lista de Pvs
                           busca();
                           return false; 

                        }else{

                           alert("Erro ao cancelar PV, informe ao administrador do sistema!");
                           //carrega o grid novamente
                           return false; 
                        }
                },
                error: function(data) { 
                     alert("Erro ao cancelar PV, informe ao administrador do sistema!");
                }
          });

      }

      /**********Funcao que envia o post para o controller da aprovacao************/
      function aprovar_pv(id_pv_capex){

        
        $("#mensagem_retorno_aprovacao_pv").removeClass('alert-danger');
        $("#mensagem_retorno_aprovacao_pv").addClass('alert-success');
        $("#mensagem_erro_aprovacao_pv").hide();

        /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'POST',  
                url: './aprovar_pv_capex',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : {id_capex : id_pv_capex  }, 
                dataType:'json',


                beforeSend:function(xhr, settings){
                   
                },
                success:function(data){
                        //  json response  
                        if(data[0]===true){


                           var sucesso_atual = parseInt($("#quantidade_sucesso").html());
                           $("#quantidade_sucesso").html(sucesso_atual+1);

                           //$("#botao_aprovar_pvs").html("<i class='fa fa-user-o '></i>  - Aprovar selecionados");
                           $("#mensagem_retorno_aprovacao_pv").css("display","block");
                          
                           busca();

                           return false; 
                        }else{

                            $("#mensagem_erro_aprovacao_pv").show();


                           //carrega o grid novamente
                           return false; 
                        }
                },
                error: function(data) { 

                     $("#mensagem_erro_aprovacao_pv").show();

                }
          });
    

    }


       