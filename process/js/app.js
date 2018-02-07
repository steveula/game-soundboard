// TODO: make app.js run first and be finished before the other scripts
// must be cross-browser compatible

var Handlebars = require('handlebars');
var $ = require ('jquery');

// $(document).ready(function() {

$(function() {

  $.ajaxSetup({
    async: false
  });

  $.getJSON('/data/zenyatta.json', function(data){
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
    console.log(legalScript(data));
    $('footer').prepend(legalScript(data));

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

}); // Page Ready
// });