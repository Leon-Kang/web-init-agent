export interface ProjectReadinessInput {
    readonly hasBuild: boolean;
    readonly hasTests: boolean;
    readonly protectsMainBranch: boolean;
}

export interface ProjectReadinessReport {
    readonly ready: boolean;
    readonly missingGates: readonly string[];
}

export const createProjectReadinessReport = (
    input: ProjectReadinessInput,
): ProjectReadinessReport => {
    const missingGates = [
        input.hasBuild ? undefined : 'build',
        input.hasTests ? undefined : 'tests',
        input.protectsMainBranch ? undefined : 'protected-main',
    ].filter((gate): gate is string => gate !== undefined);

    return {
        ready: missingGates.length === 0,
        missingGates,
    };
};
