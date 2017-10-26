Vue.component('ved-form-component', {

    template: `<div><div class="row"><div class="col-md-3"><div class="form-group"> <label for="inputCep">CEP</label> <input type="text" class="form-control" id="inputCep" v-model="cep" v-on:keyup="buscar" ref="cep"></div></div><div class="col-md-9"></div></div><p class="text-danger" style="display:none;" v-show="naoLocalizado ">Cep inválido! Por favor, digite o endereço manualmente.</p><div class="row"><div class="col-md-5"><div class="form-group"> <label for="inputLogra">Logradouro</label> <input type="text" class="form-control" id="inputLogra" v-model="endereco.logradouro" ref="logradouro"></div></div><div class="col-md-0"></div><div class="col-md-2"><div class="form-group"> <label for="inputNum">Número</label> <input type="text" class="form-control" id="inputNum" ref="numero"></div></div><div class="col-md-5"><div class="form-group"> <label for="inputComp">Complemento</label> <input type="text" class="form-control" id="inputComp"></div></div></div><div class="row"><div class="col-md-5"><div class="form-group"> <label for="inputBairro">Bairro</label> <input type="text" class="form-control" id="inputBairro" v-model="endereco.bairro"></div></div><div class="col-md-0"></div><div class="col-md-5"><div class="form-group"> <label for="inputCidade">Cidade</label> <input type="text" class="form-control" id="inputCidade" v-model="endereco.localidade"></div></div><div class="col-md-2"><div class="form-group"> <label for="inputEst">Estado</label> <input type="text" class="form-control" id="inputEst" v-model="endereco.uf"></div></div></div></div>`,

    data: function()
    {
        return{
            cep: '',
            endereco: {},
            naoLocalizado: false
        }
            
    },
    methods:{
        buscar: function() {
            
            var self = this;
            self.endereco = {};
            self.naoLocalizado = false;
            
            if(/^[0-9]{5}-[0-9]{3}$/.test(this.cep))
            {
                jQuery.getJSON('http://viacep.com.br/ws/'+this.cep+'/json/', function(endereco){
                    
                        if(endereco.erro === true)
                        {
                            jQuery(self.$refs.logradouro).focus();
                            self.naoLocalizado = true;
                            return; 
                        }
                        self.endereco = endereco;
                        jQuery(self.$refs.numero).focus();
                        
                    });
                }
            }
            
        }
    
    
    
});