
        /* Chama a busca quando a pagina inicia */
        /*$(document).ready(function() {
            busca();
        });*/
        

       // primeira funcao chamada quando clica em enviar
       $( "#form_acao" ).submit(function( event ) {
          
            $( "#quadro_bt_acao" ).hide();
            $( "#quadro_bt_carregando" ).show();
        
            //Inicia a barra de progresso
            $( "#progressbar_upload" ).show();
            var porcentagem = 1;
            muda_progresso_barra(1,100);
            //Inicia a barra de progresso

            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();

            /* Chama funcao que  le os arquivos csv*/
            Upload();
        });

        
       function abre_erros_importacao(){
            if($("#lista_erros_importacao" ).is(":hidden")){
                $( "#lista_erros_importacao" ).show();
            }else{
                $( "#lista_erros_importacao" ).hide();
            }
       }

       function abre_importados(){
            if($("#lista_importados" ).is(":hidden")){
                $( "#lista_importados" ).show();
            }else{
                $( "#lista_importados" ).hide();
            }
       }


       function abre_atualizados(){
            if($("#lista_atualizados" ).is(":hidden")){
                $( "#lista_atualizados" ).show();
            }else{
                $( "#lista_atualizados" ).hide();
            }
       }



        function muda_progresso_barra(atual, total){
           porcentagem = atual/total*100;
           porcentagem_formatada = porcentagem.toFixed(0);
           $('.progress-bar').css('width', porcentagem_formatada+'%').attr('aria-valuenow', porcentagem_formatada).html(porcentagem_formatada+'%');    
        }

    
        function Upload() {

            var fileUpload = document.getElementById("arquivo_base");
         
            /*************** A funcao abaixo faz a leitura do arquivo e quebra linha a linha em JS ***/
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
            if (regex.test(fileUpload.value.toLowerCase())) {
                if (typeof (FileReader) != "undefined") {
                    var reader = new FileReader();
                    
                    var contador_registros=1;

                    
                    reader.onload = function (e) {
                        var table = document.createElement("table");
                        var rows = e.target.result.split("\n");
                        /*muda o valor da barra de progresso*/
                        muda_progresso_barra(1,rows.length);
                       
                        for (var i = 0; i < rows.length; i++) {
                            
                            var row = table.insertRow(-1);
                            var cells = rows[i].split(";");
                            var id_registro_val = '';

                            
                            if(cells[0]!=''){
                                
                                /* Faz a configuração necessaria do laravel antes de enviar */
                                $.ajaxSetup({
                                  headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                 }
                                });

                                var linha_atual = i+1;

                                $.ajax({    
                                        type: 'POST',  
                                        url: './recebe_arquivo_pep2',
                                        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                                        data : {linha_arquivo : rows[i] , linha_atual_arquivo: linha_atual, id_registro: id_registro_val }, 
                                        dataType:'json',
                                        beforeSend:function(xhr, settings){
                                            /*$("#botao_acao").text("Carregando...");*/
                                        },
                                        success:function(data){

                                             contador_registros++;

                                             muda_progresso_barra(contador_registros,rows.length);

                                                switch (data.resultado) {
                                                  case "inserido":
                                                    var sucesso_atual = parseInt($("#quantidade_sucesso").html());
                                                    $("#quantidade_sucesso").html(sucesso_atual+1);

                                                    var lista_importados = $("#lista_importados").html()+'</br>';
                                                    $("#lista_importados").html(lista_importados+data.Mensagem);

                                                    break;
                                                  case "erro":
                                                    var erros_atual = parseInt($("#quantidade_erros").html());
                                                    $("#quantidade_erros").html(erros_atual+1);

                                                    var lista_erros = $("#lista_erros_importacao").html()+'</br>';
                                                    $("#lista_erros_importacao").html(lista_erros+data.Mensagem);

                                                    break;
                                                  case "atualizado":
                                                    var quantidade_atualizado = parseInt($("#quantidade_atualizado").html());
                                                    $("#quantidade_atualizado").html(quantidade_atualizado+1);

                                                    var lista_atualizados = $("#lista_atualizados").html()+'</br>';
                                                    $("#lista_atualizados").html(lista_atualizados+data.Mensagem);
                                                    
                                                    break;
                                                  case null:
                                                    break;
                                                }

                                                console.log('contador'+contador_registros+'linhas'+rows.length);

                                                if(contador_registros==rows.length){
                                                //Finaliza a importação do arquivo e mostra o resultado
                                                $( "#progressbar_upload" ).hide();
                                                $( "#quadro_bt_carregando" ).hide();
                                                $( "#resultado_importacao" ).show();
                                                $( "#quadro_bt_acao" ).hide();
                                                //Finaliza a importação do arquivo e mostra o resultado
                                                }


                                        },
                                        error: function(data) { 
                                            // if error occured
                                            $( "#mensagem_erro_retorno_funcao" ).show();
                                            $( "#progressbar_upload" ).hide();
                                            $( "#quadro_bt_carregando" ).hide();
                                            $("#mensagem_erro_retorno_funcao").html("Falha ao executar função, por favor informe ao administrador do sistema");
                                            //$("#botao_acao").css('display','none');
                                        }
                                });
                             }                
                        }
                    }

                    reader.readAsText(fileUpload.files[0],'ISO-8859-1');
                } else {
                    alert("Este Browser não suporta HTML5.");
                }
            } else {
                alert("Por favor suba um arquivo csv.");
            }
        }



