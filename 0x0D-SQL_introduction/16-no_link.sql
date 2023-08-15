-- lista all records in a table except those wil no name value
SELECT score, name
FROM second_table
HAVING name IS NOT NULL
ORDER BY score DESC;
