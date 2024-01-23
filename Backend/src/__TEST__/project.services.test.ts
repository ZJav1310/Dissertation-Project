import { describe, expect, test } from '@jest/globals'
import ProjectService from "../services/project.services";

describe('Get Project By Id', () => {
    it('Returns a valid project when ID is correct', () => {
        const id = 3;

        return expect(ProjectService.getById(id)).resolves.toHaveProperty(
            'project_id', id
        );
        
    });
    it('Returns a -1 project_id when project is not found', () => {
        const id = 100000;

        return expect(ProjectService.getById(id)).resolves.toHaveProperty('project_id', -1)
    });
})
