# git-csv
The Easiest Way to Get the Rows from a CSV on Github

# install
```bash
npm install git-csv
```

# usage
## Getting a CSV from a Public Repo
```javascript
const gitCSV = require('git-csv');

const rows = gitCSV({
    url: 'https://github.com/org/repo/blob/master/folder/example.csv'
});
// rows is like [ [ 5, 389, 'HARVARD UNIV', 'Ames Hall', true ], ...]
```

## Getting a CSV from a Private Repo
```javascript
const gitCSV = require('git-csv');

const rows = gitCSV({
    accessToken: '12ye7taslasudfbhkyjasvfjysdce621tcu6ertc12y5r',
    url: https://github.com/org/repo/blob/master/folder/example.csv
});
```

## Getting a CSV with a Header
```javascript
const gitCSV = require('git-csv');

const rows = gitCSV({
    header: true,
    url: https://github.com/org/repo/blob/master/folder/example.csv
});
// rows is like [ { team_name: 'Celtics', location: 'Boston' }, ...]
```

