function setFire() {
    const fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 },
    { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 },
    { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 },
    { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, 
    { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 },
    { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 },
    { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 },
    { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 },
    { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 },
    { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }];

    const fireElement = document.getElementById('fire');
    const fireWidth = 80;
    const fireHeight = 40;
    let matrix = [];

    let fireIntensity = 0;
    document.getElementById('intensity').innerText = fireIntensity.toString();

    function decreaseIntensity() {
        if (fireIntensity > 0) {
            fireIntensity = fireIntensity - 6;
            updateIntesityHtml()
        }
    }

    function increaseIntensity() {
        if (fireIntensity < 36) {
            fireIntensity = fireIntensity + 6;
            updateIntesityHtml()
        }
    }

    function turnOff() {
        const inter = setInterval(() => {
            if (fireIntensity > 0) {
                decreaseIntensity()
            } else {
                clearInterval(inter);
            }
        }, 100)
        updateIntesityHtml()
    }

    function setMax() {
        const inter = setInterval(() => {
            if (fireIntensity < 36) {
                increaseIntensity()
            } else {
                clearInterval(inter);
            }
        }, 100)
        updateIntesityHtml()
    }

    function updateIntesityHtml() {
        document.getElementById('intensity').innerText = fireIntensity.toString();
    }

    document.getElementById('decrease').addEventListener('click', decreaseIntensity);
    document.getElementById('increase').addEventListener('click', increaseIntensity);
    document.getElementById('turnOff').addEventListener('click', turnOff);
    document.getElementById('setMax').addEventListener('click', setMax);

    function createMatrix() {
        let fireMatrix = [];
        for (let i = 0; i < fireHeight; i++) {
            const row = [];
            for (let f = 0; f < fireWidth; f++) {
                row.push(`<div class="cel">row: ${i} col: ${f}</div>`);
            }
            fireMatrix.push(row);
        }
        return fireMatrix;

    }


    function getHtml(fireMatrix) {
        return fireMatrix
            .map(row => `<div class="row">${
                row.map(col => {
                    color = fireColorsPalette[col];
                    const colorString = `${color.r},${color.g},${color.b}`;
                    return `<div class="cel" style="background-color: rgb(${colorString})"></div>`;
                })
                    .reduce((acc, cur) => acc + cur, '')
                }</div>`)
            .reduce((acc, cur) => acc + cur, '');
    }

    matrix = createMatrix();
    setBase(matrix, fireIntensity);

    setInterval(() => {
        doAnimation(matrix);
    }, 100);

    setMax();

    function doAnimation(matrix) {
        startPropagation(matrix);
        setColors(matrix);
        fireElement.innerHTML = getHtml(matrix);
    }

    function setBase(fireMatrix, intensity) {
        let lastRow = fireMatrix[fireHeight - 1];
        fireMatrix[fireHeight - 1] = lastRow.map(cel => intensity)
    }

    function startPropagation(fireMatrix) {
        for (let f = 0; f < fireWidth; f++) {
            for (let i = 0; i < fireHeight; i++) {
                const heightDecay = Math.floor(Math.random() * 3);
                const widthDecay = Math.floor(Math.random() * 2);
                if (i == fireHeight - 1) {
                    fireMatrix[i][f] = fireIntensity;
                } else {
                    fireMatrix[i][f] = fireMatrix
                    [i + 1]
                    [f + widthDecay < fireWidth ? f + widthDecay : f] - heightDecay;
                }
            }
        }
    }

    function setColors(fireMatrix) {
        fireMatrix.forEach((row, indexR) => {
            row.forEach((cel, indexC) => {
                const decay = Math.floor(Math.random() * 3);
                const color = cel - decay > 0 ? cel - decay : 0;
                fireMatrix[indexR][indexC] = color;
            })
        });

    }
}


setFire();