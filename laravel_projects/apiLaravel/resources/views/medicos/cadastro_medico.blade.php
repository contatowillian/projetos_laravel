
<!-- Chama o header do layout -->
@include('base_layout.head')
<!-- Chama o header do layout -->

<body>

    <!-- Chama o menu do sistema -->
    @include('base_layout.menu')
    <!-- Chama o menu do sistema -->

    <!-- Chama o barra que fica no topo do lado direito sistema -->
    @include('base_layout.barra_topo')
    <!-- Chama o barra que fica no topo do lado direito sistema -->


        <div class="content mt-3">
            <div class="animated fadeIn">

                <div class="row">
                    <form id="form_cadastro_usuario" method="_post"  enctype="multipart/form-data" onsubmit="return false" >

                        <input type="hidden" name="id_registro" id="id_registro" value="<?php echo ( isset($_GET['id_registro'])? $_GET['id_registro'] : "" ); ?>">
                    <div class="col-xs-12 col-sm-12 col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <strong><?php echo ( isset($_GET['id_registro'])? "Alterar Médico" : "Cadastro de Médico" ); ?> </strong>
                            </div>
                            <div class="card-body card-block ">

                                <div class="form-group col-lg-6">Nome *
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-user"></i></div>
                                        <input maxlength="100" class="form-control" required="required" name="nome" id="nome" value="<?php echo ( isset($retorno_view['dados_medico']->nome) ? $retorno_view['dados_medico']->nome : "" ); ?>"  > 
                                    </div>
                                    <small class="form-text text-muted">Preencha o nome</small>
                                </div>


                                <div class="form-group col-lg-6">
                                    <label class=" form-control-label">CRM *</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-id-card-o"></i></div>
                                        <input maxlength="45" required="required"   name="crm" id="crm" class="form-control"
                                         value="<?php echo ( isset($retorno_view['dados_medico']->crm) ? $retorno_view['dados_medico']->crm : "" ); ?>">
                                    </div>
                                        <small class="form-text text-muted">88888888**</small>
                                </div>

                              
                                <div class="form-group col-lg-6">
                                    <label class=" form-control-label">Telefone *</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-phone"></i></div>
                                        <input  maxlength="45" required="required"  name="telefone" id="telefone" class="form-control" value="<?php echo ( isset($retorno_view['dados_medico']->telefone) ? $retorno_view['dados_medico']->telefone : "" ); ?>">
                                    </div>
                                    <small class="form-text text-muted">ex.(11)22222222</small>
                                </div>

                          
                                 <div class="col-lg-6 col-sm-6 padding_0">
                                    <div class="col col-md-12">
                                        <label for="select" class=" form-control-label">Especialidades *</label>
                                    </div>
                                    <div class="col-12 col-md-12">
                                        <select  name="id_especialidade[]"  multiple="multiple" required="required"  id="id_especialidade" class="form-control">
                                            <option value="">Escolha o Especialidade</option>

                                            @if (count($retorno_view['lista_especialidades']) > 0)
                                            @foreach($retorno_view['lista_especialidades'] as $array_especialidades)
                                              
                                                <option value="{{ $array_especialidades->id }}">{{ $array_especialidades->nome }}</option>
                                            
                                            @endforeach
                                            @endif
                                        </select>
                                    </div>
                                </div>

                            <div class="col col-md-12"><br></div>
                            <div class="col-lg-12 clear espaco_bt_acao">
                            <div class="form-group  alert alert-success col-lg-11 col-sm-9" role="alert" id="mensagem_retorno_funcao">
                                  Usuário salvo com sucesso!!
                                </div>
                            </div>    
                            <div class="form-group  alert alert-danger col-lg-11 col-sm-9" role="alert" id="mensagem_erro_retorno_funcao">
                                </div>
                            </div>    
                                                        
                            <div class="form-group col-lg-8 espaco_bt_acao">
                                <div class="input-group">
                                    <!-- div class="input-group-addon"><i class="fa fa-save"></i></div> -->
                                    <button id="botao_acao" type="submit"  class="btn btn-success btn-sm col-lg-3">
                                    <i class="fa fa-save"></i> Salvar
                                    </button>
                                </div>
                            </div>
                            </br></br>
                        </div>
                    </div>
                    </div>
                </div>
            </form>
            </div><!-- .animated -->
        </div><!-- .content -->

    </div><!-- /#right-panel -->

    <!-- Right Panel -->


    <!-- Chama os Js que contem as funcoes para esta pagina -->
    <script src="{{ URL::asset('js/js_medicos/js_cadastro_medico.js')}}"></script>

<!-- footer do layout -->
@include('base_layout.footer')
<!-- footer do layout -->


