!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.scribePluginToolbar=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
module.exports = function (toolbarNode) {
    return function (scribe) {
        var buttons = toolbarNode.querySelectorAll('[data-command-name]');
        Array.prototype.forEach.call(buttons, function (button) {
            button.addEventListener('click', function () {
                var command = scribe.getCommand(button.dataset.commandName);
                scribe.el.focus();
                command.execute();
            });
            scribe.el.addEventListener('keyup', updateUi);
            scribe.el.addEventListener('mouseup', updateUi);
            scribe.el.addEventListener('focus', updateUi);
            scribe.el.addEventListener('blur', updateUi);
            scribe.on('content-changed', updateUi);
            function updateUi() {
                var command = scribe.getCommand(button.dataset.commandName);
                var selection = new scribe.api.Selection();
                if (selection.range && command.queryState()) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
                if (selection.range && command.queryEnabled()) {
                    button.removeAttribute('disabled');
                } else {
                    button.setAttribute('disabled', 'disabled');
                }
            }
        });
    };
};
},{}]},{},[1])(1)
});