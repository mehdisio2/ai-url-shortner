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
    pgm.addColumn('urls', {user_id : {
        type: 'integer',
        unique: true,
    }})

    pgm.addConstraint('urls', 'user_id_fkey', {
        foreignKeys : {
            columns: 'user_id',
            references: 'users(id)',
            onDelete: 'CASCADE'
        }
    } 
    )

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export function down(pgm) {
    pgm.dropConstraint('urls', 'urls_user_id_fkey');
    pgm.dropColumn('urls', 'user_id');

};
