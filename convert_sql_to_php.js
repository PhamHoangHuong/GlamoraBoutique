import { readFileSync, writeFileSync } from 'fs';

// Đọc file SQL
const dataContent = readFileSync('ImportData_vn_units.sql', 'utf8');

function convertSqlToPhpArray(sqlContent, tableName) {
    const dataArray = [];
    let columns = [];

    const insertRegex = new RegExp(`INSERT INTO ${tableName}\\s*\\((.*?)\\)\\s*VALUES\\s*((\\(.*?\\),?\\s*)+);`, 'g');
    const insertStatements = sqlContent.match(insertRegex) || [];

    insertStatements.forEach(statement => {
        const columnMatch = statement.match(`INSERT INTO ${tableName}\\s*\\((.*?)\\)\\s*VALUES`);
        if (!columnMatch) return;

        columns = columnMatch[1].split(',').map(col => col.trim());

        const valuesMatch = statement.match(/VALUES\s*((.*?\),?\s*)+);/);
        if (!valuesMatch) return;

        const valuesString = valuesMatch[1];
        const valueRegex = /\((.*?)\)/g;
        let valueMatch;

        while ((valueMatch = valueRegex.exec(valuesString)) !== null) {
            const values = valueMatch[1].split(',').map(val =>
                val.trim()
                    .replace(/^'|'$/g, '')
                    .replace(/''/g, "'")
                    .trim()
            );

            const row = {};
            columns.forEach((col, index) => {
                if (values[index] === 'NULL') {
                    row[col] = null;
                } else {
                    row[col] = values[index] || '';
                }
            });
            dataArray.push(row);
        }
    });

    return dataArray;
}

function escapeString(str) {
    if (str === null) return 'null';
    return str.replace(/'/g, "\\'");
}

function generatePhpArrayString(data, tableName) {
    const chunkSize = 500;
    let result = '';

    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        result += `        DB::table('${tableName}')->insert([\n            ` +
            chunk.map(row => {
                const values = Object.entries(row)
                    .map(([key, value]) => {
                        if (value === null) return `'${key}' => null`;
                        return `'${key}' => '${escapeString(value)}'`;
                    })
                    .join(', ');
                return `[${values}]`;
            }).join(",\n            ") +
            "\n        ]);\n\n";
    }

    return result;
}

let outputContent = `<?php

namespace Modules\\Location\\Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;

class LocationDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Truncate tables first
        DB::table('wards')->truncate();
        DB::table('districts')->truncate();
        DB::table('provinces')->truncate();
        DB::table('administrative_units')->truncate();
        DB::table('administrative_regions')->truncate();

`;

// Thêm phần import dữ liệu
const tables = [
    'administrative_regions',
    'administrative_units',
    'provinces',
    'districts',
    'wards'
];

for (const tableName of tables) {
    const data = convertSqlToPhpArray(dataContent, tableName);
    outputContent += `        // Import dữ liệu ${tableName} (${data.length} records)\n`;
    outputContent += generatePhpArrayString(data, tableName);
}

outputContent += `        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}`;

// Ghi file Seeder
writeFileSync('Modules/Location/database/seeders/LocationDataSeeder.php', outputContent);
console.log('Seeder created successfully!');

const databaseSeederContent = `<?php

namespace Modules\\Location\\Database\\Seeders;

use Illuminate\\Database\\Seeder;

class LocationDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        \$this->call([
            LocationDataSeeder::class,
        ]);
    }
}
`;

writeFileSync('Modules/Location/database/seeders/LocationDatabaseSeeder.php', databaseSeederContent);
console.log('DatabaseSeeder updated successfully!'); 