const getRandomColor = () => {
    const baseColor = { r: 255, g: 91, b: 91 }; // #ff5b5b의 RGB 값
    const variation = 13; // 색상 변화의 범위

    const randomValue = (value) =>
        Math.max(0, Math.min(255, value + Math.floor(Math.random() * (variation * 2)) - variation));

    const r = randomValue(baseColor.r);
    const g = randomValue(baseColor.g);
    const b = randomValue(baseColor.b);

    return `rgb(${r}, ${g}, ${b})`;
};


export default getRandomColor;