
var Handlebars = require('handlebars');
var $ = require ('jquery');

$(function() {
  let characterToRender = window.localStorage;

  // if('serviceWorker' in navigator) {
  //   navigator.serviceWorker
  //     .register('./service-worker.js')
  //     .then(function() {
  //       console.log('service worker active');
  //     })
  // }

  $.ajaxSetup({
    async: false
  });

  $.getJSON(`/data/${characterToRender.getItem('character')}.json`, function(data){

    // insert chracter name into title tag
    $('title').text(function(){
      return $('title').text().replace('character-name', data["character-name"]);
    });

    // render the css data
    var styleTemplate = $('#styleTemplate').html();
    var styleScript = Handlebars.compile(styleTemplate);
    $('head').prepend(styleScript(data));

    // render the html data
    var headerTemplate = $('#headerTemplate').html();
    var headerScript = Handlebars.compile(headerTemplate);
    $('header').append(headerScript(data));

    var tabTemplate = $('#tabTemplate').html();
    var tabScript = Handlebars.compile(tabTemplate);
    $('.tab').append(tabScript(data));

    var sectionTemplate = $('#sectionTemplate').html();
    var sectionScript = Handlebars.compile(sectionTemplate);
    $('main').append(sectionScript(data));

    var legalTemplate = $('#legalTemplate').html();
    var legalScript = Handlebars.compile(legalTemplate);
    $('footer').prepend(legalScript(data));

    // remove handlebar scripts
    $('script[type="text/handlebars-template"]').remove();

  });

  $.ajaxSetup({
    async: true
  });

  $('.tabcontent').each(function(){

    // removes dashes in button text
    let btns = $(this).children().filter('.brd-btn');
    btns.each(function(){
      $(this).find('.btn-text').text($(this).find('.btn-text').text().replace(/\-/g, ' '));
    });

    // wraps grid class for every 6 buttons, so styling with css grid works
    for(let i = 0; i < btns.length; i+=6) {
      btns.slice(i, i+6).wrapAll('<div class="grid"></div>');
    }
  });

  $('.loader, .load-cover').fadeOut(1500);
}); // Page Ready
