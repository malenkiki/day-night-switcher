/*
The MIT License (MIT)

Copyright (c) 2019 Michel Petit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


(function() {
    'use strict';
    if ( !('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) ) {
        console.log('Feature not supported by your browser');
        return false;
    }
        
    var switchers = document.querySelectorAll('[data-daynight-moment]');
    var currentChoice = localStorage.getItem('daynight');

    function getOppositeAction(action) {
        return action == 'enable' ? 'disable' : 'enable';
    }

    function getOppositeMoment(moment) {
        return moment == 'day' ? 'night' : 'day';
    }

    function getRelAttribute(action) {
        var rels = {
            'disable': 'alternate stylesheet',
            'enable': 'stylesheet'
        };

        return rels[action];
    }

    function daynight(action, moment) {
        var links = document.querySelectorAll(`[data-daynight-css="${moment}"]`);
        var oLinks = document.querySelectorAll(`[data-daynight-css="${getOppositeMoment(moment)}"]`);

        [].forEach.call(links, function (l) {
            l.removeAttribute('rel');
            l.setAttribute('rel', getRelAttribute(action));
        });

        [].forEach.call(oLinks, function (l) {
            l.removeAttribute('rel');
            l.setAttribute('rel', getRelAttribute(getOppositeAction(action)));
        });

    }

    function switchDataStatus(s) {
        if (s.dataset.daynightMoment === 'day'){
            s.dataset.daynightMoment = 'night';
        } else if(s.dataset.daynightMoment === 'night') {
            s.dataset.daynightMoment = 'day';
        }
    }

    if (currentChoice) {
        daynight('enable', currentChoice);
        [].forEach.call(switchers, function (s) {
            s.dataset.daynightMoment = currentChoice;
        }); 
    }

    [].forEach.call(switchers, function (s) {
        s.addEventListener("click", function (e) {

            e.preventDefault();

            if (s.dataset.daynightMoment === 'day'){
                localStorage.setItem('daynight','night');
                daynight('disable', 'day');
            } else if(s.dataset.daynightMoment === 'night') {
                localStorage.setItem('daynight','day');
                daynight('enable', 'day');
            }

            switchDataStatus(s);
            
        }, false);
    }); 
    
})();
