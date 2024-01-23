/**
 * Testing for user authentication and functions
 */

//FIXME: These tests are using live data which is not good because they can change, need to mock the service.

import AuthService from "../services/auth.services";

describe("Get user by ID", () => {
    it("Should return a an ID matching the ID requested when the user is found", () => {
        const id = 1;

        const result = AuthService.getById(id);

        return expect(result).resolves.toHaveProperty(
            'user_id', id
        );
    });
    it('Returns a -1 user_id when user is not found', () => {
        const id = 100000;
        const result = AuthService.getById(id);
        return expect(result).resolves.toHaveProperty('user_id', -1)
    });
})
