async function getPokemons() {
    const params = new URLSearchParams({
        limit: 5,
        offset: 0
    });

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${params}`);
        const data  = await response.json();
        console.log(data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getUsersByName(name) {
    const params = new URLSearchParams({
        'name_like': name,
        limit: 5
    });
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?${params}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchData() {
    console.log('Started fetching...');

    await Promise.all([
        getPokemons(),
        getUsersByName('Leanne')
    ]);

    console.log('Finished fetching!');
}

fetchData();

