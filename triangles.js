function doStuff() {

    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    var distance = 200;
    var triangleSize = 15;

    var colors = ['#CB849C', '#B39F8C', '#BABABA'];

    var amountOfTrianglesPerRow = width / distance;
    var amountOfTrianglesPerColumn = height / distance;

    function generateTriangles() {
        var triangles = [];
        for (var x = 0; x < amountOfTrianglesPerRow; x++) {
            for (var y = 0; y < amountOfTrianglesPerColumn; y++) {
                var position = {
                    x: x * distance + Math.floor(Math.random() * (distance - triangleSize)),
                    y: y * distance + Math.floor(Math.random() * (distance - triangleSize))
                };
                triangles.push({position: position, color: colors[Math.floor(Math.random() * colors.length)]});
            }
        }
        return triangles;
    }

    function drawTriangles(triangles) {
        triangles.forEach(function (triangle) {
            ctx.beginPath();
            ctx.moveTo(triangle.position.x, triangle.position.y);
            ctx.lineTo(triangle.position.x + triangleSize, triangle.position.y);
            ctx.lineTo(triangle.position.x + triangleSize / 2, triangle.position.y + triangleSize);
            ctx.fillStyle = triangle.color;
            ctx.fill();
            ctx.closePath();
        });

    }

    var triangles = generateTriangles();
    drawTriangles(triangles);

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawTriangles(triangles);
    });

}