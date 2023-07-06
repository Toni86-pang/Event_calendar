import pg from 'pg'

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE, PG_SSL } = process.env

console.log(PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE, PG_SSL)

const pool = new pg.Pool({
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: PG_SSL === 'true'
})

export const executeQuery = async (query: string, params?: Array<any>) => {
    const client = await pool.connect()
    try {
        const result = await client.query(query, params)
        return result
    } catch (error: any) {
        console.error(error.stack)
        error.name = 'dbError'
        throw error
    } finally {
        client.release()
    }
}
