import { describe, expect, it } from 'vitest';

import { createProjectReadinessReport } from '../src/createProjectReadinessReport';

describe('createProjectReadinessReport', () => {
    it('accepts a project only after every safety gate is present', () => {
        const report = createProjectReadinessReport({
            hasBuild: true,
            hasTests: true,
            protectsMainBranch: true,
        });

        expect(report).toEqual({ ready: true, missingGates: [] });
    });

    it('lists missing safety gates', () => {
        const report = createProjectReadinessReport({
            hasBuild: true,
            hasTests: false,
            protectsMainBranch: false,
        });

        expect(report).toEqual({
            ready: false,
            missingGates: ['tests', 'protected-main'],
        });
    });
});
