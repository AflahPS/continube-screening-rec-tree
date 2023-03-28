const fs = require('fs');

function calculatePercentage(dataArr) {
    const noZero = dataArr.filter(el => el.weight)
    const sum = noZero.reduce((acc, cur) => {
        return acc + (cur.pct * cur.weight)
    }, 0)
    const totalWeight = noZero.reduce((acc, cur) => {
        return acc + cur.weight
    }, 0)
    return Math.floor(sum / totalWeight)
}

function calculateWeight(dataArr) {
    const noZero = dataArr.filter(el => el.weight)
    const weight = noZero.reduce((acc, cur) => {
        return acc + cur.weight
    }, 0)
    return Math.floor(weight / noZero.length)
}

function defineParent(node) {

    const childrenDatas = [];
    if (!node.weight && !node.pct) {
        node.children.forEach(child => {
            childrenDatas.push(defineParent(child))
        })
        node.weight = calculateWeight(childrenDatas)
        node.pct = calculatePercentage(childrenDatas)
    }

    return { weight: node.weight, pct: node.pct }

}

const data = JSON.parse(fs.readFileSync('./samp.json'))
console.log(JSON.stringify(data));
console.log(defineParent(data));


