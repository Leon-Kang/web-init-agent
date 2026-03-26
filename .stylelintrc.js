/** @type {import("stylelint").Config} */
export default {
    'extends': ['stylelint-config-standard'],
    'plugins': ['stylelint-declaration-block-no-ignored-properties'],
    'overrides': [{
        'files': ['**/*.module.css'],
        'rules': {
            'selector-pseudo-class-no-unknown': [true, {
                'ignorePseudoClasses': ['global'],
            }],
        },
    }],
    'rules': {
        'function-name-case': ['lower', {
            'ignoreFunctions': [],
        }],
        'declaration-property-value-no-unknown': null,
        'no-descending-specificity': null,
        'no-invalid-position-at-import-rule': null,
        'declaration-block-no-redundant-longhand-properties': null,
        'declaration-empty-line-before': null,
        'keyframes-name-pattern': null,
        'custom-property-pattern': null,
        'number-max-precision': 8,
        'alpha-value-notation': 'number',
        'color-function-notation': 'modern',
        'color-function-alias-notation': 'without-alpha',
        'media-feature-range-notation': 'context',
        'media-query-no-invalid': null,
        'selector-class-pattern': null,
        'selector-id-pattern': null,
        'selector-not-notation': 'complex',
        'selector-pseudo-class-no-unknown': [true, {
            'ignorePseudoClasses': ['global'],
        }],
        'value-keyword-case': ['lower', {
            'ignoreKeywords': ['currentColor', 'optimizeLegibility'],
        }],
    },
};
