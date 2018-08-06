var container = document.getElementById('container');
var lastId = -1;
var colors = ['#27ae60', '#2980b9',  /*'#3498db',*/ '#8e44ad', '#e67e22', '#c0392b'];

function checkMessages(initialLoad) {
    fetch('/messages?from=' + (lastId + 1)).then(response => response.json()).then(data => {
        for (var d of data) {

            var div = document.createElement('div');
            div.className = 'message';
            div.style['background-color'] = colors[Math.floor(Math.random() * colors.length)];

            var p = document.createElement('p');
            p.innerHTML = d.message;

            var img = document.createElement('img');
            img.src = 'lissa.svg';

            div.appendChild(img);

            div.appendChild(p);

            container.insertBefore(div, container.firstChild);
            lastId = d.id;

            var animate = function (div) {
                setTimeout(() => {
                    div.style['max-height'] = '1000px';
                    div.style['margin'] = '15px';
                    div.style['padding'] = '10px 10px 10px 0';
                    if (!initialLoad) {
                        div.classList.add('new1');

                        container.children[1].classList.remove('new1');
                        container.children[1].classList.add('new2');

                        container.children[2].classList.remove('new2');
                        container.children[2].classList.add('new3');

                        container.children[3].classList.remove('new3');
                    }
                }, 100);
            };

            animate(div);
        }
    });
}

checkMessages(true);

setInterval(() => checkMessages(false), 1000);

doStuff();
