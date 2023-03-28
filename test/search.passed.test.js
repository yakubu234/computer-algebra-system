const request = require('supertest')
const app = require('../math')
describe('Post Endpoints', () => {
    test('search for step by step equation solution', async () => {
        const res = await request(app)
            .post('/search')
            .send({
                search_key: '2x + 3x = 35',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toBe('success')

    })
})