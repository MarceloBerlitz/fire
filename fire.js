function setFire() {
    const fireColorsPalette = [{"r": 7, "g": 7, "b": 7}, {"r": 31, "g": 7, "b": 7}, {
        "r": 47,
        "g": 15,
        "b": 7
    }, {"r": 71, "g": 15, "b": 7}, {"r": 87, "g": 23, "b": 7}, {"r": 103, "g": 31, "b": 7}, {
        "r": 119,
        "g": 31,
        "b": 7
    }, {"r": 143, "g": 39, "b": 7}, {"r": 159, "g": 47, "b": 7}, {"r": 175, "g": 63, "b": 7}, {
        "r": 191,
        "g": 71,
        "b": 7
    }, {"r": 199, "g": 71, "b": 7}, {"r": 223, "g": 79, "b": 7}, {"r": 223, "g": 87, "b": 7}, {
        "r": 223,
        "g": 87,
        "b": 7
    }, {"r": 215, "g": 95, "b": 7}, {"r": 215, "g": 95, "b": 7}, {"r": 215, "g": 103, "b": 15}, {
        "r": 207,
        "g": 111,
        "b": 15
    }, {"r": 207, "g": 119, "b": 15}, {"r": 207, "g": 127, "b": 15}, {"r": 207, "g": 135, "b": 23}, {
        "r": 199,
        "g": 135,
        "b": 23
    }, {"r": 199, "g": 143, "b": 23}, {"r": 199, "g": 151, "b": 31}, {"r": 191, "g": 159, "b": 31}, {
        "r": 191,
        "g": 159,
        "b": 31
    }, {"r": 191, "g": 167, "b": 39}, {"r": 191, "g": 167, "b": 39}, {"r": 191, "g": 175, "b": 47}, {
        "r": 183,
        "g": 175,
        "b": 47
    }, {"r": 183, "g": 183, "b": 47}, {"r": 183, "g": 183, "b": 55}, {"r": 207, "g": 207, "b": 111}, {
        "r": 223,
        "g": 223,
        "b": 159
    }, {"r": 239, "g": 239, "b": 199}, {"r": 255, "g": 255, "b": 255}];
    const fireElement = document.getElementById('fire');
    const fireWidth = 80;
    const fireHeight = 80;
    let matrix = [];

    let fireIntensity = 36;
    document.getElementById('intensity').innerText = fireIntensity.toString();

    function decreaseIntensity() {
        if (fireIntensity > 0) {
            fireIntensity--;
            setBase(matrix, fireIntensity);
            document.getElementById('intensity').innerText = fireIntensity.toString();
        }
    }

    function increaseIntensity() {
        if (fireIntensity < 36) {
            fireIntensity++;
            setBase(matrix, fireIntensity);
            document.getElementById('intensity').innerText = fireIntensity.toString();
        }
    }

    document.getElementById('decrease').addEventListener('click', decreaseIntensity);
    document.getElementById('increase').addEventListener('click', increaseIntensity);


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
                row.map(col => `${col}`)
                    .reduce((acc, cur) => acc + cur, '')
            }</div>`)
            .reduce((acc, cur) => acc + cur, '');
    }


    setInterval(() => {
        matrix = createMatrix();
        doAnimation(matrix);
    }, 100);


    function doAnimation(matrix) {
        setBase(matrix, fireIntensity);
        startPropagation(matrix);
        renderFire(matrix);
        fireElement.innerHTML = getHtml(matrix);
    }

    function setBase(fireMatrix, intensity) {
        let lastRow = fireMatrix[fireHeight - 1];
        fireMatrix[fireHeight - 1] = lastRow.map(cel => intensity)
    }

    function startPropagation(fireMatrix) {
        for (let f = fireWidth; f--; f >= 0) {
            for (let i = fireHeight; i--; i >= 0) {
                const heightDecay = Math.floor(Math.random() * 3);
                const widthDecay = Math.floor(Math.random() * 1.5);
                fireMatrix[i][f] = fireMatrix[i + 1 < fireHeight ? i + 1 : i][f + widthDecay < fireWidth ? f + widthDecay : f] - heightDecay;
            }
        }
    }

    function renderFire(fireMatrix) {
        fireMatrix.forEach((row, indexR) => {
            row.forEach((cel, indexC) => {
                const decay = Math.floor(Math.random() * 3);
                const color = fireColorsPalette[cel - decay || 0] || fireColorsPalette[0];
                const colorString = `${color.r},${color.g},${color.b}`;
                fireMatrix[indexR][indexC] = `<div class="cel" style="background-color: rgb(${colorString})"></div>`;
            })
        });

    }
}


setFire();