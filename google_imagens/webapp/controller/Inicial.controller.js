sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {
                var imageList = {
                    imagens: []
                };

                let imageModel = new JSONModel(imageList);
                this.getView().setModel(imageModel, "ModeloImagem");
            },

            onPressBuscar: function(){
                let inputBusca = this.byId("inpBusca").getValue();

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="+inputBusca+"&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "a5988c0800msha121a64d918c5adp1b767djsnfb3e312cb9cd",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();

                    oDadosImage.imagens = [];

                    let listaDeResultados = response.value;
                    let newItem;

                    for(var i=0; i< listaDeResultados.length; i++){
                        newItem = listaDeResultados[i];
                        oDadosImage.imagens.push(newItem);
                    }

                    oImageModel.refresh();
                }.bind(this)
                );
            }
        });
    });


    
