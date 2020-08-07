const test = require('ava');
const gitCSV = require('./index.js');

test('getting public csv', async t => {
    const rows = await gitCSV({
        debug: false,
        header: false,
        url: 'https://github.com/cambridgegis/cambridgegis_data/blob/master/Address/Address_Points/Master_Address_Points_of_Interest.csv'
    })
    t.is(typeof rows[0][0], 'number');
    t.true(rows.length > 1);
    t.true(rows[0].length > 3);
})

test('getting private csv', async t => {
    const rows = await gitCSV({
        accessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        debug: false,
        header: true,
        url: 'https://github.com/DanielJDufour/private-git-csv-test/blob/master/folder/test.csv'
    })
    t.true(rows.length > 1);
    t.is(rows[0].team_name, 'Celtics');
    t.is(rows[1].location, 'Los Angeles');
});
