import sipay_constants from './sipay_constants.json';
import $ from 'zepto';

export default class PWall{
  constructor(enviroment, debug){
    this.enviroment         = enviroment;
    this.debug              = debug;
    this.processedRedirect  = false;
  }
  //STATIC FUNCTIONS
  static VALIDATE_EMAIL(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  static VALIDATE_MIN_LENGTH(length) {
    return (field) => {
      return field.length >= length;
    }
  }

  checkout(){
    this.elementId        = null;
    this.backendUrl       = null;
    this.submitElement    = null;
    this.validateFunction = null;
    this.validationArray  = null;
    this.currencyCode     = null;
    this.customerGroupId  = null;
    this.saleAmount       = null;
    this.selected         = true;
    this.events           = {
      "beforeSubmit"      : null,
      "beforeValidation"  : null,
      "afterValidation"   : null,
      "paymentOk"         : null,
      "paymentKo"         : null
    }

    this.appendTo = function(elementId){
      this.elementId = elementId;
      return this;
    }

    this.backendUrl = function(url){
      this.backendUrl = url;
      return this;
    }

    this.submitButton = function(submitId){
      this.submitElement = submitId;
      return this;
    }

    this.validateForm = function(validateFunction){
      this.validateFunction = validateFunction;
      return this;
    }

    this.currency = function (currencyCode){
      this.currencyCode = currencyCode;
      return this;
    }

    this.isSelected = function (selected){
      this.selected = selected;
      return this.init();
    }

    this.groupId = function (customerGroupId){
      this.customerGroupId = customerGroupId;
      return this.init();
    }

    this.amount = function (saleAmount){
      this.saleAmount = saleAmount * 100;
      return this.init();
    }

    this.validateFields = function (validationArray){
      this.validationArray = validationArray;
      for (var field in this.validationArray) {
        var element = $(field);
        if (element) {
          console.log("added event listener");
          element.on('change', function () {
            this.init();
          }.bind(this));
        }
      }
      return this;
    }

    //Events 
    this.on = function(event, callback){
      if(event in this.events){
        if(typeof callback === "function"){
          this.events[event] = callback;
        }else{
          this.__log("CALLBACK ARGUMENT IS NOT A FUNCTION");
        }
      }else{
        this.__log("NO EVENT FOUND WITH "+event+" IDENTIFIER");
      }
      return this;
    }

    this.init = function(){
      this._callEvent("beforeValidation");
      this._toggleSubmitButton();
      if (this._validateCheckoutData() === true && this.validateFunction() === true && this.selected === true) {
        this._callEvent("afterValidation");
        this._createAppDiv(this.elementId);
        this._createAppScript(this.backendUrl, "false", this.customerGroupId, this.saleAmount, this.currencyCode);
        this.__log("IS VALID, RENDERING");
      } else {
        this._removeAppDiv();
        this.__log("NOT VALID DATA OR NOT SELECTED");
      }
      return this;
    }

    this._validateCheckoutData = function(){
      
      return this._validateFields()
              && this.validateFunction  !== null 
              && this.customerGroupId   !== null
              && this.saleAmount        !== null
              && this.currencyCode      !== null;
    }

    this._validateFields = function () {
      var fieldsValidation = true;
      if (this.validationArray !== null && typeof this.validationArray !== "boolean") {
        for (var field in this.validationArray) {
          var validation = this.validationArray[field];
          var element = $(field);
          if(element){
            if (typeof validation === "function") {
              if (validation(element.val()) === false) {
                this.__log("FIELD " + field + " DOES NOT PASS FUNCTION VALIDATION");
                fieldsValidation = false;
                break;
              }
            } else if (validation === "required") {
              if (element.val() === "") {
                this.__log("FIELD " + field + " HAS NO VALUE");
                fieldsValidation = false;
                break;
              }
            } else {
              this.__log("CAN'T VALIDATE FIELD " + field + " WITH CRITERIA " + validation);
            }
          }else{
            this.__log("FIELD #" + field + " DOES NOT EXISTS");
          }
        }
      }
      return fieldsValidation;
    }

    this._callEvent = function(event){
      var callback = this.events[event];
      if (callback !== null && typeof callback === "function"){
        this.__log("CALLING EVENT " + event);
        callback();
      }
    }

    this._toggleSubmitButton = function(event){
      if (this.submitElement !== null) {
        if (this.selected === true){
          $(this.submitElement).hide();
        }else{
          $(this.submitElement).show();
        }
      }
    }

    return this;
  }
  
  backoffice(){
    this.backendUrl = null;
    this.elementId = null;

    this.backendUrl = function (url) {
      this.backendUrl = url;
    }
    this.appendTo = function (elementId) {
      this.elementId = elementId;
    }
    this.init = function () {
      this._createAppDiv(this.elementId);
      this._createAppScript(this.backendUrl, "true", "0", "0", "");
    }
    return this;
  }

  _createAppDiv(elementId){
    var app = document.createElement('div');
    const divId = sipay_constants["elementsIds"]["div"];
    app.id = divId;
    //if exists, return
    if (document.getElementById(divId)) {
      return;
    }
    $(elementId).empty();
    $(elementId).append(app);
  }

  _removeAppDiv(){
    var divId = sipay_constants["elementsIds"]["div"]; 
    var child = document.getElementById(divId);
    if(child){
      child.parentNode.removeChild(child);
    }
  }

  _createAppScript(backendUrl, isBackoffice, groupId, amount, currency) {
    var head      = document.getElementsByTagName('head')[0];
    var scriptId  = sipay_constants["elementsIds"]["script"];
    var divId     = sipay_constants["elementsIds"]["div"]; 
    var script    = document.createElement('script');

    //if exists, update data and re render
    if (document.getElementById(scriptId)) {
      script = document.getElementById(scriptId);
      script.dataset.groupId = groupId;
      script.dataset.amount = amount;
      script.dataset.currency = currency;
      window.PaymentWall.start();
    }

    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = sipay_constants["enviroments"][this.enviroment] + "pwall_app/js/app.js";
    if(isBackoffice === "true"){
      script.dataset.backoffice = isBackoffice;
    }
    script.dataset.placeholder  = "#" + divId;
    script.dataset.groupId      = groupId;
    script.dataset.amount       = amount;
    script.dataset.currency     = currency;
    script.dataset.endpoint     = backendUrl;
    script.onload = function () { this._setPaymentWallListeners() }.bind(this);
    head.parentNode.appendChild(script);
  }

  _setPaymentWallListeners(){
    window.PaymentWall.listenTo(document, 'payment_wall_load', function(){
      var scriptId = sipay_constants["elementsIds"]["div"];
      var placeholder = document.getElementById(scriptId);
      window.PaymentWall.listenTo(placeholder,"payment_wall_loaded", function(){
        if (!this.processedRedirect) {
          window.PaymentWall.listenTo(placeholder, "payment_wall_drawn", function () {
            if (this.parseUrlParams('request_id') && this.parseUrlParams('method')) {
              var request_id = this.parseUrlParams('request_id');
              var method = this.parseUrlParams('method');
              var error = this.parseUrlParams('error');
              placeholder.dispatchEvent(window.pwall.dispatch('process_redirect', { "error": error, "method": method, "request_id": request_id }));
              this.processedRedirect = true;
            }
          }.bind(this));
        }
        window.PaymentWall.listenTo(placeholder, "payment_wall_payment_ok", function () {
          this._callEvent("paymentOk");
        }.bind(this));
        window.PaymentWall.listenTo(placeholder, "payment_wall_payment_ko", function () {
          this._callEvent("paymentKo");
        }.bind(this));
      }.bind(this));
    }.bind(this));
    window.PaymentWall.start();
  }

  parseUrlParams(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
      return null;
    }
    else {
      return decodeURI(results[1]) || 0;
    }
  }

  __log(){
    if (this.debug) {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift("[WAIAP DEBUG]");
      console.log.apply(console, args);
    }
  }
}
