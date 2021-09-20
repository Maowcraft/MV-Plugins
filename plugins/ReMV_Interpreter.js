// ===================================
//  ReMV_Interpreter.js
// ===================================

// ___________________________________
// WARNING/NOTICE:
// W.I.P.
// THIS IS UNFINISHED!!!!
// ___________________________________

/*:
 * @author       Maow
 * @plugindesc   ReMV - Global Interpreter
 * 
 * @help
 * Unfinished
 * -----------------------------------
 *  Terms of Use
 * -----------------------------------
 * 1. Do not try to claim this as your own work.
 * 2. Attribution is not required, but it is preferred.
 * 3. Free-use for commercial and noncommercial projects.
 * -----------------------------------
 *  Calls
 * -----------------------------------
 * TODO
 */

var $I;

function $$message(data) {
    $I.queue.push(() => {
        if (typeof data !== 'undefined') {

            const face = data["face"];
            if (typeof face !== 'undefined')        $gameMessage.setFaceImage(face[0], face[1]);
            if (typeof data["bg"] !== 'undefined')  $gameMessage.setBackground(data["bg"]);
            if (typeof data["pos"] !== 'undefined') $gameMessage.setPositionType(data["pos"]);
            
            const text = data["text"];
            if (typeof text === 'string') {
                $gameMessage.add(text);
            } else if (typeof text !== 'undefined') {
                for (line of text) {
                    $gameMessage.add(line);
                }
            }
            
            $I.lock = 'message';
        }  
    });
}

(function() {
	'use strict';

    // -----------------------
    //  Interpreter
    // -----------------------

    class Interpreter {
        constructor() {
            this.queue = new Queue();
            this.lock = '';
        }

        next() {
            this.lock = '';
            if (!this.queue.empty()) {
                this.queue
                    .pop()
                    .call(this);
            }
        }
    }

    $I = $I || new Interpreter();

    // -----------------------
    //  Hooks
    // -----------------------

    const terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        terminateMessage.call(this);
        if ($I.lock === 'message') {
            $I.next();
        }
    }

    const command355 = Game_Interpreter.prototype.command355;
    Game_Interpreter.prototype.command355 = function() {
        command355.call(this);
        if (!$I.queue.empty()) {
            $I.next();
        }
    }

    // -----------------------
    //  Util
    // -----------------------

    //code.iamkate.com
    function Queue(){var a=[],b=0;this.length=function(){return a.length-b};this.empty=function(){return 0==a.length};this.push=function(b){a.push(b)};this.pop=function(){if(0!=a.length){var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c}};this.peek=function(){return 0<a.length?a[b]:void 0}};
})();