
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

            // chama a funcao que faz a leitura do arquivo
            leitor_arquivo();

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

    
        function ProcessaArquivo(linhas_arquivo,linha_registro,tamanho_arquivo) {


                           /* var row = table.insertRow(-1);
                            var cells = rows[i].split(";");*/
                            var contador_registro = linha_registro+1;
                            var total_arquivos = tamanho_arquivo;

                            
                            if(linhas_arquivo[0]!=''){
                                
                                /* Faz a configuração necessaria do laravel antes de enviar */
                                $.ajaxSetup({
                                  headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                 }
                                });


                                $.ajax({    
                                        type: 'POST',  
                                        url: './recebe_arquivo_valor_pep2',
                                        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                                        data : {linha_arquivo : linhas_arquivo , linha_atual_arquivo: contador_registro }, 
                                        dataType:'json',
                                        beforeSend:function(xhr, settings){
                                            /*$("#botao_acao").text("Carregando...");*/
                                        },
                                        success:function(data){


                                             muda_progresso_barra(contador_registro,total_arquivos);

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


                                                if(contador_registro==total_arquivos){
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


  
 


        function leitor_arquivo(e) {


        var contador_registros=0;
      

        //Get the files from Upload control
        var files = $("#arquivo_base").prop('files');
        var i, f;

        //Loop through files
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;

                var result;
                var workbook = XLSX.read(data, { type: 'binary' });
                
                var sheet_name_list = workbook.SheetNames;
                sheet_name_list.forEach(function (y) { /* iterate through sheets */
                    //Convert the cell value to Json
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    if (roa.length > 0) {
                        result = roa;
                    }
                });
               //Le linha a linha do arquivo e chama a funcao que processa o arquivo
               $.each(result, function(i, item) {
                    ProcessaArquivo(item,i,result.length);
                });
            };
            reader.readAsArrayBuffer(f);
        }
    }

