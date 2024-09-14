export function getMockResults() {
    return [
        {
            count: 5,
            next: 'https://api.example.com/people/?page=2',
            previous: null,
            results: [
                {
                    name: 'Luke Skywalker',
                    height: '172',
                    mass: '77',
                    birth_year: '19BBY',
                    gender: 'male',
                    url: 'https://swapi.dev/api/people/1/',
                },
                {
                    name: 'C-3PO',
                    height: '167',
                    mass: '75',
                    birth_year: '112BBY',
                    gender: 'n/a',
                    url: 'https://swapi.dev/api/people/2/',
                },
                {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    url: 'https://swapi.dev/api/people/3/',
                },
                {
                    name: 'Darth Vader',
                    height: '202',
                    mass: '136',
                    birth_year: '41.9BBY',
                    gender: 'male',
                    url: 'https://swapi.dev/api/people/4/',
                },
                {
                    name: 'Leia Organa',
                    height: '150',
                    mass: '49',
                    birth_year: '19BBY',
                    gender: 'female',
                    url: 'https://swapi.dev/api/people/5/',
                },
            ],
        },
        {
            count: 2,
            next: null,
            previous: null,
            results: [
                {
                    name: 'Owen Lars',
                    height: '178',
                    mass: '120',
                    birth_year: '52BBY',
                    gender: 'male',
                    url: 'https://swapi.dev/api/people/6/',
                },
                {
                    name: 'Beru Whitesun lars',
                    height: '165',
                    mass: '75',
                    birth_year: '47BBY',
                    gender: 'female',
                    url: 'https://swapi.dev/api/people/7/',
                },
            ],
        },
        {
            count: 0,
            next: null,
            previous: null,
            results: [],
        },
    ];
}
