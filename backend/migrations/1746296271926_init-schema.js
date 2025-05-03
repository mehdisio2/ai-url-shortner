/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export async function up(pgm) {
    pgm.createTable('clicks', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        url_id: {
          type: 'varchar(10)',
          notNull: true,
        },
        timestamp: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('now()'),
        },
        ip: {
          type: 'varchar(45)',
          notNull: true,
        },
        user_agent: {
          type: 'text',
          notNull: true,
        },
        country: {
          type: 'varchar(4)',
          default: null,
        },
        referrer: {
          type: 'text',
          notNull: true,
          default: 'none',
        },
      });
    
      pgm.createTable('urls', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        short_code: {
          type: 'varchar(10)',
          unique: true,
          default: null, // Accepts null values initially
        },
        original_url: {
          type: 'text',
          notNull: true,
        },
        created_at: {
          type: 'timestamptz',
          notNull: true,
          default: pgm.func('now()'),
        },
      });

      pgm.createTable('users', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        username: {
          type: 'varchar(255)',
        },
        password: {
          type: 'varchar(255)',
        },
      });
    

};

