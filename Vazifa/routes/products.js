let Prod = []; // Prod massiv sifatida e'lon qilinadi

function prod(produc) {
    produc.forEach(e => {
        Prod.push({
            id: e.id,
            name: e.name,
            price: e.price,
            color: e.color
        });
    });

}


module.exports = { prod, Prod };


