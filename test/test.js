(async  () => {
    for (let i = 0; i < 100; i++) {
            // await delay();
            abc();
            console.log(i);
    }
})();

function delay() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
    });
}
function abc(){
    setTimeout(()=>{}, 1000);
    console.log('yo');
}