
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
            <div class="col-xl-6 col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <div class="stat-widget-one">
                            <div class="stat-icon dib"><i class="ti-user text-success border-success"></i></div>
                            <div class="stat-content dib">
                                <div class="stat-text">Número de Médicos Ativos Cadastrados</div>
                                <div class="stat-digit">{{count($retorno_view['qtd_medicos'])}}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <div class="stat-widget-one">
                            <div class="stat-icon dib"><i class="ti-check-box text-primary border-primary"></i></div>
                            <div class="stat-content dib">
                                <div class="stat-text">Número de Especialidades</div>
                                <div class="stat-digit">{{count($retorno_view['qtd_especialidades'])}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            <div class="col-xl-12 col-lg-12">
               
                <div class="alert alert-success" role="alert">
                 Sistema que consome a API criado para os testes da Bionexo
                </div>
            </div>

            </div> <!-- .row -->
            </div><!-- .animated -->

        </div>
        </div> <!-- .content -->
    </div><!-- /#right-panel -->

<!-- footer do layout -->
@include('base_layout.footer')
<!-- footer do layout -->