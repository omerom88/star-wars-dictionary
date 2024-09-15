import { v4 as uuid } from 'uuid';

const getRandomIndex = (array: (string | number)[]) => {
    return Math.floor(Math.random() * array.length);
};

export const generateMockEntry = () => {
    const birthYears = new Array(10).fill(0).map((_, index) => index + 1900);
    const genderList = ['female', 'male'];
    const heightList = new Array(10).fill(0).map((_, index) => index + 150);
    const massList = new Array(10).fill(0).map((_, index) => index + 50);
    const urlList = new Array(10)
        .fill(0)
        .map((_, index) => `https://swapi.dev/api/people/${index + 50}`);

    return {
        birth_year: birthYears[getRandomIndex(birthYears)].toString(),
        created: new Date().toISOString(),
        gender: genderList[getRandomIndex(genderList)],
        height: heightList[getRandomIndex(heightList)].toString(),
        mass: massList[getRandomIndex(massList)].toString(),
        url: urlList[getRandomIndex(urlList)],
        name: `Mocked Name`,
        id: uuid(),
    };
};
