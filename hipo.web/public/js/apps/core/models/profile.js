'use strict';
var hipoApp = angular.module('hipoApp.models',[]);


hipoApp.service('profile', function($http) {
    return {
        name:"Hipocampo",
        likes: [],
        likeTags : [],
        mobility: "",
        save : function(){
            //todo: save on localstorage
        },
        load: function(){
            //todo: load from localstorage
        },
        asSuggestionParameter: function(){
            var data ={
                name: this.name,
                tags: this.likeTags,
                mobility: this.mobility,
                date: new Date(),
            }
            return data;
        }
    };
});