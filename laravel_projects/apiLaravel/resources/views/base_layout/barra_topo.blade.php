<div id="right-panel" class="right-panel">

        <!-- Header-->
        <header id="header" class="header">

            <div class="header-menu">
                <div class="col-sm-7">
                    <a id="menuToggle" class="menutoggle pull-left"><i class="fa fa fa-bars"></i></a>
                    <div class="header-left">
                        <button class="search-trigger"><i class="fa fa-search"></i></button>
                        <div class="form-inline">
                            <form class="search-form" action="./pesquisa_aprovacao_pv" method="GET">
                                
                                <input autocomplete="off" class="form-control mr-sm-2" name="pv_id" type="text" placeholder="Buscar PV por N°" aria-label="Search">
                                
                                <button class="search-close" type="button"><i class="fa fa-close"></i></button>
                            </form>
                        </div>

                        <div class="dropdown for-notification">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-bell"></i>
                                <span class="count bg-danger"  id="balao_quantidades_aprovacoes_header"><span id="numero_aprovacoes_alerta_header">0</span>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="notification">
                                <p class="red" >Você tem <span id="numero_aprovacoes_header">0</span> aprovaçẽs pendentes</p>
                                <!--<a class="dropdown-item media bg-flat-color-1" href="#">
                                <i class="fa fa-check"></i>
                                <p>Server #1 overloaded.</p>
                                </a>-->
                                
                            </div>
                        </div>

                        <div class="dropdown for-message">
                            <button class="btn btn-secondary dropdown-toggle" type="button"
                                id="message"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="ti-email"></i>
                                <span class="count bg-primary" id="balao_quantidades_alerta_header"><span id="numero_questionamentos_alerta_header">0</span>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="message">
                                <p class="red">Você tem <span id="numero_questionamentos_header"></span> questionamento(s)</p>
                                <div id="lista_questionamentos_header"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-5">
                    <div class="user-area dropdown float-right">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="user-avatar rounded-circle" src="{{ URL::asset('imagens/sem_avatar.jpeg')}}">
                        </a>

                        <div class="user-menu dropdown-menu">
                            <a class="nav-link" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                        </div>
                    </div>

                    <div class="language-select dropdown" id="language-select">
                            <i class="flag-icon flag-icon-br espaco_bandeira"></i>{{ Auth::user()->name }}
                    </div>

                </div>
            </div>

        </header><!-- /header -->
        <!-- Header-->


        <!-- menu breadcrumb 
        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Configurações de perfil</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="#"></a></li>
                            <li>Categoria</li>
                            <li>Perfil</li>
                            <li class="active">Módulo</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>-->