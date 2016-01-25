import Rx from 'rx';
import Cycle from '@cycle/core';

function main(source) {
    "use strict";

    const observable = source.DOM
        .startWith(null)
        .flatMapLatest(() => Rx.Observable.timer(0, 1000));

    return {
        DOM: observable
            .map(index => `Seconds elapsed ${index}`),
        console: observable.map(index => index * 2)
    };
}

function DOMDriver(text$) {
    text$.subscribe(text => {
        "use strict";

        const container = document.querySelector('#app');
        container.textContent = text;
    });

    const DOMSource = Rx.Observable.fromEvent(document, 'click');
    return DOMSource;
}

function consoleDriver(text$) {
    "use strict";

    text$.subscribe(text => console.log(text));
}

const drivers = {
    DOM: DOMDriver,
    console: consoleDriver
};


Cycle.run(main, drivers);
