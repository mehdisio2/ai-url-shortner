/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export function up(pgm) {
    pgm.addColumn('clicks', {user_id: {
        type: 'integer'
    }})
    pgm.addConstraint('clicks', 'user_clicks_fkey', {
        foreignKeys: {
            columns: 'user_id',
            references: 'users(id)',
            onDelete: 'NO ACTION',
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export function down(pgm) {
    pgm.dropColumn('clicks', 'user_id')
    pgm.dropConstraint('clicks', 'user_clicks_fkey')
};
