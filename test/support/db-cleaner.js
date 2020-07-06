const models = require('../../src/models');
const config = require('../../src/config/config');

/**
 * Clear test database
 */
module.exports.truncate = async() => {
    return models.sequelize.query(`CREATE OR REPLACE FUNCTION truncate_tables() RETURNS void AS $$
        DECLARE
            statements CURSOR FOR
                SELECT tablename FROM pg_tables
                WHERE tableowner = '${config.test.username}' AND schemaname = 'public' AND tablename <> 'SequelizeMeta';
        BEGIN
            FOR stmt IN statements LOOP
                EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' CASCADE;';
            END LOOP;
        END;
        $$ LANGUAGE plpgsql;
        SELECT truncate_tables();`);
};
