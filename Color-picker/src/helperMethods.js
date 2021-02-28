function randomSelector(arr){
    return arr[Math.floor(Math.random() * arr.length-1)];
}

export {randomSelector};